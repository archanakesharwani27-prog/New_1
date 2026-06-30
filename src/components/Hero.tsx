import React, { useState, useEffect, useRef } from 'react';
import { Download, Github, ChevronDown, Music, Sparkles, Star, Shield, Cpu, Activity } from 'lucide-react';
import PhoneMockup from './PhoneMockup';

interface HeroProps {
  onScrollToFeatures: () => void;
  onScrollToDownload: () => void;
}

export default function Hero({ onScrollToFeatures, onScrollToDownload }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse Parallax Effect on the Stage
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setMousePosition({ x, y });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Music Particles
  const particles = [
    { text: '♫', top: '15%', left: '10%', delay: '0s', size: 'text-2xl', opacity: 'opacity-20' },
    { text: '♬', top: '35%', left: '85%', delay: '1s', size: 'text-3xl', opacity: 'opacity-30' },
    { text: '♪', top: '75%', left: '12%', delay: '2s', size: 'text-lg', opacity: 'opacity-40' },
    { text: '♩', top: '65%', left: '88%', delay: '3.5s', size: 'text-xl', opacity: 'opacity-20' },
    { text: '♫', top: '25%', left: '20%', delay: '1.5s', size: 'text-xl', opacity: 'opacity-10' },
    { text: '♬', top: '80%', left: '75%', delay: '0.5s', size: 'text-2xl', opacity: 'opacity-25' },
  ];

  return (
    <section 
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden bg-[#050816]"
    >
      {/* Animated Aurora Gradient Background Orbits */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Shifting Purple Orbit */}
        <div 
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#6C5CE7] blur-[150px] opacity-25 animate-aurora-slow"
          style={{ animationDuration: '25s' }}
        />
        {/* Shifting Cyan Orbit */}
        <div 
          className="absolute bottom-[-15%] right-[-10%] w-[55%] h-[55%] rounded-full bg-[#00E5FF] blur-[130px] opacity-20 animate-aurora-slow"
          style={{ animationDuration: '30s', animationDelay: '-10s' }}
        />
        {/* Shifting Secondary Crimson Accent */}
        <div 
          className="absolute top-[40%] left-[35%] w-[40%] h-[40%] rounded-full bg-[#FF2D6F] blur-[160px] opacity-15 animate-aurora-slow"
          style={{ animationDuration: '20s', animationDelay: '-5s' }}
        />
        
        {/* Modern Dot Matrix Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] opacity-80" />
      </div>

      {/* Floating Ambient Particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          className={`absolute ${p.size} ${p.opacity} text-[#00E5FF] select-none pointer-events-none animate-float-slow`}
          style={{
            top: p.top,
            left: p.left,
            animationDelay: p.delay,
            transform: isHovered 
              ? `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)` 
              : 'translate(0px, 0px)',
            transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        >
          {p.text}
        </span>
      ))}

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Copy and Action Buttons */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left select-none">
          
          {/* Version Pill tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-fade-in-down">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse"></span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#00E5FF]">Public Beta Live • v1.0.0-beta-04</span>
            <span className="text-[9px] bg-[#6C5CE7]/20 text-[#6C5CE7] px-2 py-0.5 rounded-full font-bold">100% Free</span>
          </div>

          {/* Premium Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl xl:text-7.5xl font-black tracking-tight text-white leading-[1.05]">
              Experience Music. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C5CE7] via-[#00E5FF] to-[#FF2D6F] animate-gradient-text bg-300%">
                Reimagined.
              </span>
            </h1>
            
            <p className="max-w-lg mx-auto lg:mx-0 text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
              One Player. Unlimited Music. Beautiful Experience. 
              Enjoy pristine sound quality, gorgeous fluid interfaces, and intelligent library management on your Android device.
            </p>
          </div>

          {/* Core Feature bullet snippets */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-400 font-semibold uppercase tracking-wide">
            <div className="flex items-center gap-2 hover:text-[#6C5CE7] transition duration-300">
              <Shield className="w-4 h-4 text-[#6C5CE7]" /> 0 Ads & Completely Safe
            </div>
            <div className="flex items-center gap-2 hover:text-[#00E5FF] transition duration-300">
              <Activity className="w-4 h-4 text-[#00E5FF]" /> Modern M3 Animations
            </div>
            <div className="flex items-center gap-2 hover:text-[#FF2D6F] transition duration-300">
              <Cpu className="w-4 h-4 text-[#FF2D6F]" /> Low Ram & Energy Footprint
            </div>
          </div>

          {/* Buttons Layout */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <button 
              onClick={onScrollToDownload}
              className="relative group px-8 py-4 rounded-2xl bg-gradient-to-r from-[#6C5CE7] to-[#00E5FF] text-slate-950 font-extrabold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-103 shadow-lg shadow-indigo-500/20 active:scale-98 cursor-pointer overflow-hidden"
            >
              {/* Internal glow line decoration */}
              <div className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition duration-350" />
              <Download className="w-5 h-5 stroke-[2.5px]" /> Download APK
            </button>

            <a 
              href="https://github.com/AnshKesharwani" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-extrabold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 transition-all duration-300 hover:bg-white/10 hover:border-[#6C5CE7]/50 active:scale-98 cursor-pointer"
            >
              <Github className="w-5 h-5 text-slate-300" /> GitHub Repository
            </a>

            <button 
              onClick={onScrollToFeatures}
              className="px-6 py-4 rounded-2xl text-slate-400 hover:text-white font-bold text-sm sm:text-base tracking-wide transition-all hover:scale-102 flex items-center justify-center gap-1 cursor-pointer"
            >
              Explore Features
            </button>
          </div>

          {/* Trust stats counter */}
          <div className="pt-6 border-t border-white/5 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
            <div>
              <p className="text-xl sm:text-2xl font-black text-white">100%</p>
              <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider">Free of Ads</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-white">14 MB</p>
              <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider">Lightweight size</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-white">4.9 ★</p>
              <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider">Beta feedback</p>
            </div>
          </div>

        </div>

        {/* Right Side: Interactive Parallax 3D Smartphone Demonstration */}
        <div className="lg:col-span-5 flex justify-center relative select-none">
          <div 
            className="relative cursor-grab active:cursor-grabbing transition-transform duration-500 ease-out"
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 25}deg) rotateX(${-mousePosition.y * 25}deg) translateZ(10px)`,
            }}
          >
            {/* Soft backdrop radial neon aura glow following mouse */}
            <div 
              className="absolute -inset-8 bg-gradient-to-tr from-[#6C5CE7] via-[#00E5FF] to-[#FF2D6F] rounded-[52px] blur-2xl opacity-35 transition duration-500"
              style={{
                transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px) scale(0.95)`,
              }}
            />

            {/* Glowing Soundwave Particles floating around stage */}
            <div className="absolute top-1/4 -left-12 p-3 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-md shadow-xl flex items-center gap-2.5 animate-float-slow" style={{ animationDelay: '0.2s' }}>
              <div className="w-8 h-8 rounded-full bg-[#00E5FF]/20 flex items-center justify-center">
                <Music className="w-4 h-4 text-[#00E5FF]" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white">Crossfade Engine</p>
                <p className="text-[8px] text-slate-400">Perfect Transitions</p>
              </div>
            </div>

            <div className="absolute bottom-1/4 -right-12 p-3 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-md shadow-xl flex items-center gap-2.5 animate-float-slow" style={{ animationDelay: '1.4s' }}>
              <div className="w-8 h-8 rounded-full bg-[#FF2D6F]/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#FF2D6F]" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white">Parametric 3D EQ</p>
                <p className="text-[8px] text-slate-400">High Fidelity Audio</p>
              </div>
            </div>

            {/* The Actual Phone Mockup Rendered Live! */}
            <PhoneMockup activeScreen="Splash" interactive={true} />
          </div>
        </div>

      </div>

      {/* Floating Scroll Indicator */}
      <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 text-[10px] font-bold uppercase tracking-widest transition-opacity duration-500 pointer-events-none ${scrolled ? 'opacity-0' : 'opacity-100 animate-pulse'}`}>
        <span>Explore Experience</span>
        <ChevronDown className="w-4 h-4 text-[#00E5FF] animate-bounce" />
      </div>

      <style>{`
        @keyframes aurora-slow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(10%, -10%) scale(1.1);
          }
          66% {
            transform: translate(-10%, 15%) scale(0.9);
          }
        }
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        .animate-aurora-slow {
          animation: aurora-slow 20s ease-in-out infinite alternate;
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        .bg-300% {
          background-size: 300% 300%;
        }
        @keyframes gradient-text {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-text {
          animation: gradient-text 6s ease infinite;
        }
      `}</style>
    </section>
  );
}
