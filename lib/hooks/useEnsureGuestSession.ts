import { useEffect } from 'react';
import supabase from '../supabaseClient';

export function useEnsureGuestSession() {
  useEffect(() => {
    const ensureSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        const { error } = await supabase.auth.signInAnonymously();
        if (error) console.error("Anonymous sign-in failed:", error);
        else console.log("✅ Signed in as guest");
      } else {
        console.log("✅ Already signed in:", session.user.id);
      }
    };

    ensureSession();
  }, []);
}
