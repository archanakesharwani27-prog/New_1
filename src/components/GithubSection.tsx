import React from 'react';
import { Github, Star, GitFork, BookOpen, AlertCircle, Sparkles, MessageSquare } from 'lucide-react';

export default function GithubSection() {
  const stats = [
    { label: 'GitHub Stars', count: '1.4K+', icon: <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> },
    { label: 'Forks & Clones', count: '242+', icon: <GitFork className="w-4 h-4 text-[#00E5FF]" /> },
    { label: 'Beta Contributors', count: '45+', icon: <Sparkles className="w-4 h-4 text-emerald-400" /> },
    { label: 'Beta Issues Closed', count: '100%', icon: <AlertCircle className="w-4 h-4 text-[#FF2D6F]" /> },
  ];

  return (
    <section id="github" className="bg-[#050816] py-24 sm:py-32 px-4 border-t border-white/5 select-none relative overflow-hidden">
      
      {/* Decorative Orbits */}
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-[#6C5CE7]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* LEFT COLUMN: Open-Source narrative */}
        <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <Github className="w-4 h-4 text-white" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white">100% OPEN SOURCE</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              An Open Source Journey.
            </h2>
            
            <p className="text-base text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Melodify is built on the pillars of transparency, security, and community-driven excellence. Anyone can inspect, compile, audit, or contribute to the Kotlin codebase. No hidden analytics, no data brokerage.
            </p>
          </div>

          {/* Call-to-actions */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <a 
              href="https://github.com/AnshKesharwani" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-white text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <Github className="w-4 h-4" /> Browse Repository
            </a>
            
            <a 
              href="https://github.com/AnshKesharwani" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/10 hover:border-slate-850 transition-all cursor-pointer"
            >
              <AlertCircle className="w-4 h-4 text-[#FF2D6F]" /> Report active bug
            </a>
          </div>

          {/* Contributor notice */}
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/5 flex gap-3 text-left max-w-lg mx-auto lg:mx-0">
            <MessageSquare className="w-5 h-5 text-[#00E5FF] flex-shrink-0" />
            <p className="text-[11px] text-slate-400 leading-relaxed">
              <strong>Interested in contributing?</strong> We welcome PRs relating to audio buffer tweaks, equalizer customization presets, local playlist sorting improvements, and other Jetpack optimizations.
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: Glass statistics blocks */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <div 
              key={i} 
              className="p-6 rounded-3xl bg-slate-900/35 border border-white/5 backdrop-blur-md space-y-4 hover:border-slate-750 hover:scale-101 transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center border border-white/5">
                {s.icon}
              </div>
              <div>
                <p className="text-2xl sm:text-3.5xl font-black text-white tracking-tight">{s.count}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{s.label}</p>
              </div>
            </div>
          ))}

          {/* Collaborative contribution workflow cards */}
          <div className="col-span-2 p-5 rounded-3xl bg-gradient-to-r from-indigo-950/40 to-slate-950 border border-indigo-500/10 space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4.5 h-4.5 text-[#6C5CE7]" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contribution Standards</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our project repository adheres strictly to standard fork guidelines. Fork, create your local buffer branch, write modular Kotlin logic, check compiler lints with Gradle test structures, and issue your Pull Request!
            </p>
          </div>
        </div>

      </div>

    </section>
  );
}
