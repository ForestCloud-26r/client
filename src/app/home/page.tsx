'use client';
import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { BackgroundImage } from '@/components/BackgroundImage';
import { Toast, ToastStateProps } from '@/components/ui/Toast';
import { SearchParamHandler } from './SeatchParamHandler';

export default function Home() {
  const [role, setRole] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastStateProps | null>(null);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    if (!token || !storedRole) {
      router.push('/auth');
    } else {
      setRole(storedRole);
    }
  }, [router]);

  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/background.jpg" />
      </Head>

      <Suspense fallback={null}>
        <SearchParamHandler onToast={setToast} />
      </Suspense>

      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          timeout={toast.timeout}
        />
      )}

      <main className="relative min-h-screen">
        <BackgroundImage />

        <div className="absolute inset-2 sm:inset-5 bg-white/70 p-6 sm:p-10 rounded-2xl shadow-md z-10 flex flex-col items-center justify-center text-center text-gray-700">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          {role && (
            <p className="text-lg">
              You are logged in as a{' '}
              <span className="font-semibold text-green-600">{role}</span>.
            </p>
          )}
        </div>
      </main>
    </>
  );
}
