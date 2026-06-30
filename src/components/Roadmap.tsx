import React from 'react';
import { CheckCircle, Clock, AlertTriangle, ArrowRight, Lightbulb, Milestone } from 'lucide-react';

interface RoadmapItem {
  quarter: string;
  title: string;
  status: 'Completed' | 'In Progress' | 'Planned' | 'Future';
  color: string;
  icon: React.ReactNode;
  bulletItems: string[];
}

export default function Roadmap() {
  const items: RoadmapItem[] = [
    {
      quarter: 'Q1 - Q2 2026',
      title: 'Foundation & Core DSP Engine',
      status: 'Completed',
      color: 'text-emerald-400 bg-emerald-400/10 border-emerald-500/20',
      icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
      bulletItems: [
        'Material 3 dynamic color palette system implementation',
        'High-fidelity OPUS audio streaming pipeline configuration',
        'Local filesystem scanner with automatic metadata scraping',
        'State persistence architecture using Room DB caches'
      ]
    },
    {
      quarter: 'Q3 2026 (Current)',
      title: 'Sound Curation & DSP Enhancements',
      status: 'In Progress',
      color: 'text-[#00E5FF] bg-[#00E5FF]/10 border-[#00E5FF]/20',
      icon: <Clock className="w-5 h-5 text-[#00E5FF] animate-spin" style={{ animationDuration: '6s' }} />,
      bulletItems: [
        'Parametric 7-band DSP Equalizer integration',
        'Sub-second Crossfade pipeline transitions (0-12s sliders)',
        'Reactive fuzzy search caching algorithms',
        'Synced lyrics file (.lrc) rendering layout engine'
      ]
    },
    {
      quarter: 'Q4 2026',
      title: 'Streaming Catalog & Ecosystem Expansion',
      status: 'Planned',
      color: 'text-[#6C5CE7] bg-[#6C5CE7]/10 border-[#6C5CE7]/20',
      icon: <Milestone className="w-5 h-5 text-[#6C5CE7]" />,
      bulletItems: [
        'Chromecast / Smart TV receiver rendering support',
        'Sleep timers and smart bedside widget settings',
        'Local P2P offline track transfers using Wi-Fi Direct protocols',
        'Advanced artist profile integrations'
      ]
    },
    {
      quarter: '2027 & Beyond',
      title: 'Decentralized Caches & Cross-Platform Client',
      status: 'Future',
      color: 'text-[#FF2D6F] bg-[#FF2D6F]/10 border-[#FF2D6F]/20',
      icon: <Lightbulb className="w-5 h-5 text-[#FF2D6F]" />,
      bulletItems: [
        'Decentralized playlist back-ups using peer cryptographic keys',
        'Kotlin Multiplatform Desktop (Windows/macOS/Linux) full client compiler',
        'Collaborative live listening rooms utilizing standard socket bridges'
      ]
    }
  ];

  return (
    <section id="roadmap" className="bg-[#020205] py-24 sm:py-32 px-4 border-t border-white/5 select-none relative overflow-hidden">
      
      {/* Background soft lighting */}
      <div className="absolute top-[40%] right-[5%] w-96 h-96 bg-[#6C5CE7]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#6C5CE7]">The Strategic Path</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            The Melodify Roadmap.
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            A transparent view of our technical milestones. We iterate rapidly, addressing user issues within days while preparing future audiophile capabilities.
          </p>
        </div>

        {/* Timeline Path Layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central line guide */}
          <div className="absolute left-4 sm:left-1/2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-emerald-400 via-[#00E5FF] to-[#FF2D6F] opacity-15"></div>

          <div className="space-y-12 sm:space-y-16">
            {items.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={idx}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central glowing indicator node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center z-20 shadow-md shadow-indigo-500/5">
                    {item.icon}
                  </div>

                  {/* Left or Right Content Panel (depending on index parity) */}
                  <div className={`w-full sm:w-[46%] pl-12 sm:pl-0 ${
                    isEven ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'
                  }`}>
                    
                    {/* Floating Quarter/Date Card */}
                    <div className="space-y-3">
                      <span className={`inline-flex px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border ${item.color}`}>
                        {item.quarter} • {item.status}
                      </span>
                      
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {item.title}
                      </h3>

                      {/* Bullet steps card */}
                      <div className={`p-5 rounded-2xl bg-slate-900/30 border border-white/5 backdrop-blur-md text-left text-xs text-slate-400 space-y-2.5 ${
                        isEven ? 'sm:ml-auto' : ''
                      } max-w-md`}>
                        {item.bulletItems.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex gap-2.5 items-start">
                            <span className="text-[#00E5FF] font-bold mt-0.5">•</span>
                            <span className="leading-relaxed">{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </section>
  );
}
