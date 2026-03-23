import Link from 'next/link';
import { BarChart2, Database, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen z-40 bg-transparent">

      {/* Glassy Header */}
      <header className="w-full py-6 px-8 flex justify-between items-center backdrop-blur-lg bg-transparent border-b border-white/20">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          AI Data Analyst
        </h1>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col flex-1 items-center justify-center px-6 text-center">

        {/* Glassy glowing card */}
        <div className="glass rounded-2xl p-12 shadow-2xl max-w-2xl animate-glow">

          <h2 className="text-5xl font-extrabold tracking-tightest mb-6 text-electric">
            Your Data, Explained Clearly
          </h2>

          <p className="text-xl leading-relaxed text-teal/90 mb-12 max-w-xl mx-auto">
            Upload datasets, ask questions, generate insights, and visualize patterns — all powered by AI.
          </p>

          {/* Ripple Button */}
          <a
            href="/dashboard"
            className="relative overflow-hidden px-10 py-4 bg-electric text-navy font-semibold rounded-lg shadow-lg transition-all group"
          >
            <span className="relative z-10">Enter the App</span>
            <span className="absolute inset-0 bg-white/40 scale-0 group-hover:scale-150 rounded-full transition-transform duration-500"></span>
          </a>

        </div>
      </section>

      {/* Glassy Footer */}
      <footer className="w-full py-6 px-8 backdrop-blur-lg bg-transparent border-t border-white/20 text-center text-white/70">
        © 2026 AI Data Analyst — Built with Next.js + Tailwind
      </footer>

    </main>
  );
}

