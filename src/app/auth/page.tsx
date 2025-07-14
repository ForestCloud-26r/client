'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { AuthTabSelector } from '@/components/authpage/AuthTabSelector';
import { BackgroundImage } from '@/components/BackgroundImage';
import { LoginForm } from '@/components/authpage/forms/LoginForm';
import { SignupForm } from '@/components/authpage/forms/SignupForm';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleAuth = async () => {
    const url = isLogin ? '/api/auth/login' : '/api/auth/register';
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      if (isLogin) {
        const { token, role } = await res.json();
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        router.push('/profile');
      } else {
        setIsLogin(true);
      }
    } else {
      alert(`${isLogin ? 'Login' : 'Registration'} failed`);
    }
  };

  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/background.jpg" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, interactive-widget=overlays-content"
        />
      </Head>
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <BackgroundImage />
        <div className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden m-3">
          <AuthTabSelector isLogin={isLogin} setIsLogin={setIsLogin} />

          <div className="relative min-h-[440px] overflow-hidden">
            <div
              className="absolute top-0 left-0 flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(${isLogin ? '0%' : '-50%'})`,
                width: '200%',
              }}
            >
              {/*Login*/}
              <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleAuth={handleAuth}
              />

              {/*Register*/}
              <SignupForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                fullname={fullname}
                setFullname={setFullname}
                handleAuth={handleAuth}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
