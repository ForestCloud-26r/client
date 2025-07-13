import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center brightness-75 blur-sm"
          style={{ backgroundImage: 'url(/background.jpg)' }}
        ></div>
      </div>
      <div className="relative z-10 bg-white/80 backdrop-blur-md rounded-2xl p-10 shadow-md text-center m-3">
        <h1 className="text-4xl font-bold mb-4 text-green-800">Welcome to Forest Cloud</h1>
        <p className="text-base md:text-lg mb-8 text-gray-700 leading-relaxed">
          🌲☁️ Your private digital forest – secure, self-hosted & open source.<br className="hidden md:block"/>
          Take back control of your data 🌿💚
        </p>
        <div className="flex flex-col gap-4 items-center">
          <Link href="/auth" className="px-8 py-3 text-lg font-bold bg-green-600 text-white rounded-2xl shadow hover:bg-green-700">
            Get Started
          </Link>
          <Link href="https://github.com/ForestCloud-26r/docs" target="_blank" className="text-sm text-green-800 underline">
            Need help? <b>See the documentation</b>
          </Link>
        </div>
      </div>
    </main>
);
}
