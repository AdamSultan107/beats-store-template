import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

export const config = {
  api: {
    bodyParser: false,
  },
};

// ✅ Setup clients
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

const resend = new Resend(process.env.RESEND_API_KEY!);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BUCKET_NAME = 'kits';
const EXPIRATION_SECONDS = 60 * 60 * 24; // 24 hours

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed.', err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_email || session.customer_details?.email;

    const kitIds = session.metadata?.kitIds?.split(',') || [];

    console.log('🧩 Kit IDs:', kitIds);
    console.log('📨 Email:', email);

    // Step 1: Get kits from Supabase
    const { data: kits, error } = await supabaseAdmin
      .from('kits')
      .select('id, name, file_path')
      .in('id', kitIds);

    if (error || !kits?.length) {
      console.error('❌ Supabase kit fetch error:', error);
      return NextResponse.json({ error: 'Kit lookup failed' }, { status: 500 });
    }

    console.log('📦 Kits fetched:', kits);

    // Step 2: Generate signed URLs
    const signedLinks = await Promise.all(
      kits.map(async (kit) => {
        if (!kit.file_path) {
          console.warn(`⚠️ Kit ${kit.name} has no file_path`);
          return null;
        }

        const { data, error } = await supabaseAdmin.storage
          .from(BUCKET_NAME)
          .createSignedUrl(kit.file_path.trim(), EXPIRATION_SECONDS);

        if (error || !data?.signedUrl) {
          console.error(`❌ Failed to sign URL for ${kit.name}:`, error);
          return null;
        }

        return {
          name: kit.name,
          url: data.signedUrl,
        };
      })
    );

    const filteredLinks = signedLinks.filter(
      (link): link is { name: string; url: string } => link !== null
    );

    if (!filteredLinks.length) {
      console.warn('⚠️ No valid signed links were generated.');
    }

    const kitListHTML = filteredLinks
      .map(
        (kit) =>
          `<li><a href="${kit.url}" target="_blank" rel="noopener noreferrer">${kit.name}</a></li>`
      )
      .join('');

    const html = `
      <h2>Your order is confirmed!</h2>
      <p>Thanks for purchasing from shadx2.</p>
      ${
        filteredLinks.length
          ? `<p>You can download your kits below. These links will expire in 24 hours:</p><ul>${kitListHTML}</ul>`
          : `<p>There was an issue generating download links. Please contact support or visit your <a href="https://shadx2.com/thankyou">thank you page</a>.</p>`
      }
      <p>Visit your <a href="https://shadx2.com/thankyou">Thank You page</a> to download again.</p>
    `;

    console.log('✉️ Email HTML Preview:', html);

    // Step 3: Send confirmation email
    try {
      await resend.emails.send({
        from: 'shadx2 <onboarding@resend.dev>',
        to: email!,
        subject: 'Your shadx2 Kit Download Links',
        html,
      });
      console.log('✅ Confirmation email sent to', email);
    } catch (emailErr) {
      console.error('❌ Failed to send confirmation email:', emailErr);
    }
  }

  return NextResponse.json({ received: true });
}
