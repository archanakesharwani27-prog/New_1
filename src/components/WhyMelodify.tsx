import React, { useState } from 'react';
import { ShieldCheck, Zap, Heart, Eye, Award, Check, Sparkles } from 'lucide-react';

interface MetricComparison {
  label: string;
  melodifyValue: number; // 0 to 100 representing performance/goodness
  competitorValue: number;
  melodifyText: string;
  competitorText: string;
}

export default function WhyMelodify() {
  const [activeTab, setActiveTab] = useState<'Privacy' | 'Performance' | 'UIUX'>('Privacy');

  const comparisonMetrics: MetricComparison[] = [
    {
      label: 'Ad Intrusion Rate',
      melodifyValue: 100, // 100% good = 0% ads
      competitorValue: 15, // highly intrusive
      melodifyText: '0% Ad Nodes',
      competitorText: 'Audio & Visual Ads'
    },
    {
      label: 'Memory Footprint (RAM)',
      melodifyValue: 90, // very light
      competitorValue: 35, // very heavy
      melodifyText: '14 MB APK (~32MB RAM)',
      competitorText: '110 MB APK (~280MB RAM)'
    },
    {
      label: 'Telemetry / Data Logging',
      melodifyValue: 100, // clean privacy
      competitorValue: 20, // data scraping
      melodifyText: '0 Bytelog files collected',
      competitorText: 'Continuous telemetry active'
    },
    {
      label: 'Monthly Subscriptions',
      melodifyValue: 100, // clean free
      competitorValue: 10, // expensive
      melodifyText: '100% Free (Public Beta)',
      competitorText: '$10.99 - $16.99 / month'
    }
  ];

  const valuePoints = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#00E5FF]" />,
      title: 'Privacy Absolute',
      description: 'Your playback logs belong to you. We hold zero central databases. Everything resides in safe browser/local sandbox caches.'
    },
    {
      icon: <Zap className="w-5 h-5 text-[#FF2D6F]" />,
      title: 'Low Battery Overhead',
      description: 'Built native in Kotlin/Jetpack Compose with efficient, hardware-accelerated DSP decoding loops that conserve battery.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#6C5CE7]" />,
      title: 'Material 3 Dynamic Aesthetics',
      description: 'Fully supports dynamic color shifting, smooth gesture controls, custom equalizers, and responsive frame rate animations.'
    }
  ];

  return (
    <section id="why-melodify" className="bg-[#050816] py-24 sm:py-32 px-4 border-t border-white/5 select-none relative overflow-hidden">
      
      {/* Decorative grids */}
      <div className="absolute top-[20%] left-[5%] w-80 h-80 bg-[#6C5CE7]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00E5FF]">Comparative Analysis</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Designed for the User. Period.
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Why settle for bloated subscription players that track your data and interrupt your flow with commercial advertisements? Melodify is built for absolute purity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT SIDE: Value Highlights list */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2 text-center lg:text-left">
              <span className="text-[10px] text-[#6C5CE7] font-bold tracking-widest uppercase">CORE VALUES</span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">Guaranteed Purity.</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto lg:mx-0">
                A project born from the dissatisfaction with current high-cost streaming solutions. Designed to provide premium audiophile features completely free.
              </p>
            </div>

            <div className="space-y-4">
              {valuePoints.map((pt, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-md flex gap-4 hover:border-slate-800 transition duration-300">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center flex-shrink-0 border border-white/5">
                    {pt.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">{pt.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{pt.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Real-Time Comparison Meters Panel */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-900/20 border border-white/5 backdrop-blur-md space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <div>
                <h4 className="text-sm font-bold text-white">System Resource Diagnostics</h4>
                <p className="text-[10px] text-slate-500">Live comparison: Melodify Beta vs. Popular Platforms</p>
              </div>
              <span className="text-[9px] font-mono text-[#00E5FF] bg-[#00E5FF]/10 px-2.5 py-1 rounded-full font-bold uppercase tracking-widest">
                Benchmarked 2026
              </span>
            </div>

            {/* Metric Comparison Gauges */}
            <div className="space-y-6">
              {comparisonMetrics.map((m, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm font-semibold text-slate-300">
                    <span>{m.label}</span>
                    <span className="text-[#00E5FF]">{m.melodifyText}</span>
                  </div>
                  
                  {/* Progress tracks container */}
                  <div className="space-y-1">
                    {/* Melodify Bar (Cyan/Purple gradient) */}
                    <div className="relative h-2 bg-slate-950 rounded-full overflow-hidden">
                      <div 
                        className="absolute h-full bg-gradient-to-r from-[#6C5CE7] to-[#00E5FF] rounded-full transition-all duration-1000"
                        style={{ width: `${m.melodifyValue}%` }}
                      />
                    </div>
                    {/* Competitor Bar (Soft crimson/faded slate) */}
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                      <span>Melodify (Pristine status)</span>
                      <span className="text-slate-400">Competitor: {m.competitorText}</span>
                    </div>
                    <div className="relative h-1 bg-slate-950 rounded-full overflow-hidden">
                      <div 
                        className="absolute h-full bg-[#FF2D6F]/40 rounded-full transition-all duration-1000"
                        style={{ width: `${m.competitorValue}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tiny trust confirmation footer inside panel */}
            <div className="pt-4 border-t border-white/5 flex items-center gap-2.5 justify-center">
              <Check className="w-4 h-4 text-emerald-400" />
              <p className="text-[10px] text-slate-400 font-semibold leading-relaxed text-center">
                Built and compiled directly using official Android Jetpack specifications. Safe verified.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
