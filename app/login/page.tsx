'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabaseClient';
import Toast from '@/components/Toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Toast state
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'warning'>('success');

  const router = useRouter();

  const showToast = (message: string, type: 'success' | 'warning' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  // Listen for successful login → insert into users table if new
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const { user } = session;

        // Insert into users table if not exists
        const { data: existing } = await supabase
          .from('users')
          .select('id')
          .eq('id', user.id)
          .maybeSingle();

        if (!existing) {
          const { error: insertError } = await supabase.from('users').insert([
            {
              id: user.id,
              email: user.email,
            },
          ]);
          if (insertError) {
            console.error('User insert failed:', insertError.message);
            showToast('User insert failed after sign-in.', 'warning');
          }
        }

        router.push('/'); // Redirect to home or dashboard
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router]);

  const handleAuth = async () => {
    setSubmitting(true);

    if (!email || !password) {
      showToast('Please fill out both fields.', 'warning');
      setSubmitting(false);
      return;
    }

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Sign-up error:', error.message);
        showToast('Sign-up failed. Try again.', 'warning');
      } else {
        showToast('Check your email to complete sign up.', 'success');
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
        showToast('Login failed. Check credentials.', 'warning');
      }
      // Redirect will be handled by the auth listener
    }

    setSubmitting(false);
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center font-[Arial_Narrow]">
      {/* Toast */}
      <Toast
        message={toastMessage}
        show={toastVisible}
        type={toastType}
        onClose={() => setToastVisible(false)}
      />

      <div className="bg-white border border-pink-200 rounded-2xl p-8 w-[350px] shadow-lg">
        <h1 className="text-2xl font-bold text-pink-500 text-center mb-6">
          {isSignUp ? 'Create an Account' : 'Log In'}
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-pink-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 border rounded focus:outline-pink-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleAuth}
          disabled={submitting}
          className={`w-full bg-pink-500 text-white font-semibold py-2 rounded-lg transition ${
            submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-600 hover:scale-105'
          }`}
        >
          {isSignUp ? 'Sign Up' : 'Log In'}
        </button>

        <p className="text-center text-sm mt-4 text-gray-700">
          {isSignUp ? 'Already have an account?' : 'Need an account?'}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-pink-500 font-medium hover:underline"
          >
            {isSignUp ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}
