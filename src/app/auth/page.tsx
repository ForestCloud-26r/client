'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { AuthTabSelector } from '@/components/authpage/AuthTabSelector';
import { BackgroundImage } from '@/components/BackgroundImage';
import { LoginForm } from '@/components/authpage/forms/LoginForm';
import { SignupForm } from '@/components/authpage/forms/SignupForm';
import { Copyright } from '@/components/copyright';
import { Toast, ToastStateProps } from '@/components/ui/Toast';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState<ToastStateProps | null>(null);
  const router = useRouter();

  const handleAuth = async () => {
    if (!email || !password || (!isLogin && !fullname)) {
      setToast({
        message: 'Please fill in all fields',
        type: 'error',
        id: Date.now(),
      });
      return;
    }

    const url = isLogin ? '/api/auth/login' : '/api/auth/register';

    const body = {
      email,
      password,
      ...(fullname ? { fullname } : {}),
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const { auth_token, user } = await res.json();
      localStorage.setItem('token', auth_token);
      localStorage.setItem('role', user.role);
      setToast({
        message: 'Logged in successfully',
        type: 'success',
        timeout: 1000,
        id: Date.now(),
      });
      setTimeout(() => {
        router.push('/home');
      }, 1400);
    } else {
      setToast({
        message: `${isLogin ? 'Login' : 'Registration'} failed`,
        type: 'error',
        id: Date.now(),
      });
      return;
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
      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          timeout={toast.timeout}
        />
      )}
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
          <Copyright />
        </div>
      </main>
    </>
  );
}
