import React, { useState, useEffect, useRef } from 'react';
import PhoneMockup, { ScreenType } from './PhoneMockup';
import { Sparkles, Play, Search, Heart, Settings, Shield, User } from 'lucide-react';

interface ShowcaseSection {
  id: ScreenType;
  title: string;
  tagline: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  features: string[];
}

export default function PhoneShowcase() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('Splash');
  const sectionRefs = useRef<{ [key in ScreenType]?: HTMLDivElement | null }>({});

  const sections: ShowcaseSection[] = [
    {
      id: 'Splash',
      title: 'Cinematic Launch',
      tagline: 'Instant. Smooth. Responsive.',
      description: 'Experience a fluid splash entry that prepares your system cache immediately. Melodify initializes audio pipelines in less than 40 milliseconds.',
      color: 'from-[#6C5CE7] to-[#8070FF]',
      icon: <Sparkles className="w-5 h-5 text-[#6C5CE7]" />,
      features: ['Sub-40ms Startup latency', 'SVG responsive vector branding', 'State hydration pipeline', 'Resource verification checking']
    },
    {
      id: 'Login',
      title: 'Zero Friction Entry',
      tagline: 'Your privacy is non-negotiable.',
      description: 'Enter as a guest with 0 fields or sync instantly with your GitHub account. No phone numbers, no tracking, no credit cards. 100% free beta.',
      color: 'from-[#00E5FF] to-[#00B8D4]',
      icon: <User className="w-5 h-5 text-[#00E5FF]" />,
      features: ['Passwordless guest sandbox', 'Secure GitHub OAuth handshake', 'Zero-tracking cookie mechanics', 'Instant local session creation']
    },
    {
      id: 'Home',
      title: 'Tailored Discovery',
      tagline: 'Welcome to your sonic sanctuary.',
      description: 'Greeted by Material 3 dynamic themes. Get instant grid tiles for your recently played lofi playlists, personal recommendations, and beta releases.',
      color: 'from-[#FF2D6F] to-[#D81B60]',
      icon: <Play className="w-5 h-5 text-[#FF2D6F]" />,
      features: ['Personalized greeting nodes', 'Dynamic Material 3 theme colors', 'Recently played caching grid', 'Quick-access radio stream toggle']
    },
    {
      id: 'Search',
      title: 'Intelligent Query Engine',
      tagline: 'Search as fast as you think.',
      description: 'Instantly filter through local tracks, offline files, or streaming repositories. The reactive algorithm serves results as you type with zero debounce lag.',
      color: 'from-[#00E5FF] to-[#6C5CE7]',
      icon: <Search className="w-5 h-5 text-[#00E5FF]" />,
      features: ['Debounce-free local search filter', 'Trending lofi categories', 'Smart artist and playlist tagging', 'Fuzzy match spelling resilience']
    },
    {
      id: 'Player',
      title: 'Sensory Immersion Player',
      tagline: 'A physical relationship with digital music.',
      description: 'The crown jewel of Melodify. Featuring an interactive vinyl orbit animation, real-time parametric soundwave visualizations, active lyrics sync, and built-in procedural synthesizers.',
      color: 'from-[#6C5CE7] to-[#FF2D6F]',
      icon: <Play className="w-5 h-5 text-[#6C5CE7]" />,
      features: ['Responsive vinyl rotation state', 'Real-time Web Audio synths playing lofi chords', 'Live syncing lyrics slider', 'Interactive volume with glide ease']
    },
    {
      id: 'Library',
      title: 'Elegant Vault Storage',
      tagline: 'Your collection, exactly as you want it.',
      description: 'Organize downloaded files, list your liked songs, and cache streaming directories. Dynamic playlists compile automatically based on your listening habits.',
      color: 'from-[#FF2D6F] to-[#6C5CE7]',
      icon: <Heart className="w-5 h-5 text-[#FF2D6F]" />,
      features: ['Automatic liked tracks container', 'Local storage file scraper', 'Download cache progress meters', 'Drag and drop playlist arranger']
    },
    {
      id: 'Settings',
      title: 'True Pitch Equalizer',
      tagline: 'Tailor-made sonic control.',
      description: 'Customize your soundscape down to the decibel. Features an interactive 7-band parametric EQ, sub-second crossfade sliders, and AMOLED True Dark configurations.',
      color: 'from-[#00E5FF] to-[#FF2D6F]',
      icon: <Settings className="w-5 h-5 text-[#00E5FF]" />,
      features: ['7-Band responsive parametric EQ', 'Amoled true pitch dark black toggle', 'Sub-second crossfade configuration (0-12s)', 'Dynamic latency audio buffer config']
    }
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // triggers when the section is in the center of the viewport
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-section-id') as ScreenType;
          if (id) {
            setActiveScreen(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach((section) => {
      const ref = sectionRefs.current[section.id];
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="showcase" className="relative bg-[#020205] py-24 sm:py-32 px-4 border-t border-white/5 select-none overflow-hidden">
      
      {/* Decorative vector grid background line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-white/10 via-white/5 to-transparent z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#6C5CE7]">The Showcase Journey</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Designed for Perfectionists.
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Scroll down to see Melodify's seamless transition through our core player interfaces. 
            Each screen is meticulously crafted to be fully functional, lightweight, and modern.
          </p>
        </div>

        {/* Sticky Scroll Split Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
          
          {/* LEFT COLUMN: Sticky Phone Mockup Stage */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col items-center justify-center py-6">
            
            {/* Visual active screen feedback badges */}
            <div className="flex gap-2 flex-wrap justify-center mb-6 max-w-xs">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    setActiveScreen(sec.id);
                    // scroll to section
                    sectionRefs.current[sec.id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={`px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full transition-all border cursor-pointer ${
                    activeScreen === sec.id 
                      ? 'bg-[#6C5CE7] border-[#6C5CE7] text-slate-950 shadow-md shadow-indigo-500/10' 
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {sec.id}
                </button>
              ))}
            </div>

            {/* Sticky Interactive Phone Representation */}
            <div className="relative">
              {/* Outer soft glowing halo representing current section's color palette */}
              <div 
                className="absolute inset-0 w-full h-full rounded-[48px] blur-3xl opacity-35 transition-all duration-1000 scale-90"
                style={{
                  background: activeScreen === 'Splash' || activeScreen === 'Player' ? 'rgba(108, 92, 231, 0.4)' 
                            : activeScreen === 'Login' || activeScreen === 'Search' || activeScreen === 'Settings' ? 'rgba(0, 229, 255, 0.4)' 
                            : 'rgba(255, 45, 111, 0.4)'
                }}
              />
              <PhoneMockup activeScreen={activeScreen} interactive={true} onScreenChange={(scr) => setActiveScreen(scr)} />
            </div>

            <p className="text-[10px] text-slate-500 font-mono mt-4 text-center">
              * Tap or click the phone buttons to interactively demo the code.
            </p>
          </div>

          {/* RIGHT COLUMN: Scrolling Text Descriptions */}
          <div className="lg:col-span-7 space-y-36 pb-36">
            {sections.map((section) => {
              const isActive = activeScreen === section.id;
              return (
                <div
                  key={section.id}
                  data-section-id={section.id}
                  ref={(el) => { sectionRefs.current[section.id] = el; }}
                  className={`space-y-6 pt-12 border-t border-white/5 transition-all duration-500 ${
                    isActive ? 'opacity-100 translate-x-0 scale-100' : 'opacity-30 -translate-x-2 scale-98 pointer-events-none'
                  }`}
                >
                  {/* Icon + Category Title */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center">
                      {section.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#00E5FF]">
                        {section.id} Interface
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                        {section.title}
                      </h3>
                    </div>
                  </div>

                  {/* Highlight Slogan */}
                  <p className="text-sm font-bold text-[#6C5CE7]">{section.tagline}</p>

                  {/* Long description */}
                  <p className="text-base text-slate-300 leading-relaxed max-w-xl">
                    {section.description}
                  </p>

                  {/* Bullet Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {section.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Beautiful progress accent bar */}
                  <div className="h-1 rounded-full w-24 bg-gradient-to-r from-[#6C5CE7] to-[#00E5FF] opacity-80" />

                </div>
              );
            })}
          </div>

        </div>

      </div>

    </section>
  );
}
