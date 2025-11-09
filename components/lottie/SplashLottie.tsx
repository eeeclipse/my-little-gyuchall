'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import splashAnimation from '@/public/lottie/splash.json';

export function SplashLottie() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-autumn-50 to-autumn-100">
      <Lottie
        animationData={splashAnimation}
        loop={false}
        style={{ width: 300, height: 300 }}
      />
      <h1 className="text-4xl font-bold text-autumn-700 mt-4">규챌</h1>
      <p className="text-autumn-600 mt-2">25일 가을 챌린지</p>
    </div>
  );
}