'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
  fallbackUrl?: string;
}

export default function AuthGuard({ children, fallbackUrl = '/auth' }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      const redirectTarget = pathname ? encodeURIComponent(pathname) : '%2Fmatch';
      router.push(`${fallbackUrl}?redirect=${redirectTarget}`);
    }
  }, [user, loading, router, pathname, fallbackUrl]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6">
        <div className="relative w-14 h-14">
          <div className="w-14 h-14 rounded-full border-4 border-[#E8F0FF] border-t-[#2563EB] animate-spin" />
        </div>
        <p className="mt-4 text-[#080F1C] font-bold text-[15px]">Verifying account...</p>
        <p className="text-[#667085] text-[13px] mt-1">Please wait while we secure your session</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
