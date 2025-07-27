// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';
import { getOrGenerateGuestId } from './guest';
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 8)); // safe partial log


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    global: {
      headers: {
        shadx2_guest_id: getOrGenerateGuestId(),
      },
    },
  }
);

export default supabase;