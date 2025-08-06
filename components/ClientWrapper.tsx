'use client';

import { useEnsureGuestSession } from '@/lib/hooks/useEnsureGuestSession';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  useEnsureGuestSession();
  return <>{children}</>;
}
