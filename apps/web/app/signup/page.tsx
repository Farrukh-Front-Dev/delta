'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { SignupForm } from '@/components/auth/SignupForm';
import { useAuthStore } from '@/stores/useAuthStore';

export default function SignupPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <Container size="sm">
        <SignupForm />
      </Container>
    </div>
  );
}
