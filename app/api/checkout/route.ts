// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export async function POST(req: NextRequest) {
  const { items, email } = await req.json();

  if (!items || !email) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  try {
    console.log('🧾 Items received in /api/checkout:', items);
    console.log('✅ Kit IDs extracted:', items.map((item: any) => item.id));

    const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    })),
    customer_email: email,
    metadata: {
      kitIds: items.map((item: any) => item.kit_id).join(','),
    },
    success_url: `${req.nextUrl.origin}/thankyou?status=paid`,
    cancel_url: `${req.nextUrl.origin}/checkout`,
  });


    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Stripe error" }, { status: 500 });
  }
}