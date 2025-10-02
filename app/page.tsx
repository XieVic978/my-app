import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated background circles */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
          🚀 Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Victor</span>
        </h1>
        
        <p className="text-xl text-gray-300 mb-6 animate-fade-in-delay-1">
          Follow me on Instagram:{' '}
          <a 
            href="https://instagram.com/victor_xieee" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-pink-400 hover:text-pink-300 font-semibold underline transition-colors duration-300"
          >
            @victor_xieee
          </a>
        </p>
        
        <p className="text-lg text-gray-400 mb-8 animate-fade-in-delay-2">
          Click the button to play the snake game 🐍
        </p>
        
        <Link
          href="/snake"
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-bold rounded-full shadow-2xl hover:shadow-pink-500/50 hover:scale-110 transition-all duration-300 animate-fade-in-delay-3"
        >
          Play Game! 🎮
        </Link>
      </div>
    </main>
  );
}