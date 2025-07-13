'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { DefaultButton } from '@/components/buttons/DefaultButton';
import { AuthTabSelector } from '@/components/authpage/AuthTabSelector';
import { BackgroundImage } from '@/components/BackgroundImage';
import { Input } from '@/components/authpage/forms/inputs/Input';

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
        <link
          rel="preload"
          as="image"
          href="/background.jpg"
        />
      </Head>
      <main className="relative min-h-screen flex items-center justify-center">
        <BackgroundImage />
        <div
          className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden m-3">
          <AuthTabSelector isLogin={isLogin} setIsLogin={setIsLogin} />

          <div className="relative h-[340px] overflow-hidden">
            <div
              className="absolute top-0 left-0 flex transition-transform duration-700 ease-in-out"
              style={{transform: `translateX(${isLogin ? '0%' : '-50%'})`, width: '200%'}}
            >
              <div className="w-1/2 flex items-center justify-center h-full">
                {/*Login*/}
                <div className="w-full p-8">
                  <h2 className="text-3xl font-bold mb-6 text-center text-green-800">Login</h2>

                  <Input type={'email'} placeholder={'Email'} value={email} onChange={e => setEmail(e.target.value)} isRequired={true} />
                  <Input type={'password'} placeholder={'Password'} value={password} onChange={e => setPassword(e.target.value)} isRequired={true} />

                  <div className="flex justify-center">
                    <DefaultButton onClick={handleAuth} text="Sign In"/>
                  </div>
                </div>
              </div>

                <div className="w-1/2 flex items-center justify-center h-full">
                  <div className="w-full p-8">
                    {/*Register*/}
                    <h2 className="text-3xl font-bold mb-6 text-center text-green-800">Registration</h2>

                    <Input type={'text'} placeholder={'Fullname'} value={fullname} onChange={e => setFullname(e.target.value)} isRequired={true} />
                    <Input type={'email'} placeholder={'Email'} value={email} onChange={e => setEmail(e.target.value)} isRequired={true} />
                    <Input type={'password'} placeholder={'Password'} value={password} onChange={e => setPassword(e.target.value)} isRequired={true} />

                    <div className="flex justify-center">
                      <DefaultButton onClick={handleAuth} text="Create account"/>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
