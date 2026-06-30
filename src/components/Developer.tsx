import React from 'react';
import { Github, Mail, ShieldCheck, Heart, Code, Terminal, Compass } from 'lucide-react';

export default function Developer() {
  const techStack = [
    { label: 'Kotlin Native', level: 'Core Compiler' },
    { label: 'Jetpack Compose', level: 'Fluid UI Graphics' },
    { label: 'Audio DSP / Decode', level: 'Sound Engineering' },
    { label: 'Room SQLite Cache', level: 'Data Protection' }
  ];

  return (
    <section id="developer" className="bg-[#050816] py-24 sm:py-32 px-4 border-t border-white/5 select-none relative overflow-hidden">
      
      {/* Background radial lighting */}
      <div className="absolute top-[30%] left-[10%] w-80 h-80 bg-[#6C5CE7]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00E5FF]">The Architect</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Meet Ansh Kesharwani.
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            The developer and strategist dedicated to building clean, accessible, premium mobile soundscapes.
          </p>
        </div>

        {/* Content Box layout (Glass Card) */}
        <div className="p-6 sm:p-10 rounded-4xl bg-slate-900/30 border border-white/5 backdrop-blur-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Column Left: Beautiful Profile Symbol representation */}
          <div className="md:col-span-4 flex flex-col items-center text-center space-y-4">
            <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-[#6C5CE7] via-[#00E5FF] to-[#FF2D6F] p-[2px] shadow-lg">
              {/* Outer orbit ripple effect */}
              <div className="absolute -inset-1 rounded-full bg-indigo-500/10 blur-md pointer-events-none"></div>
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden font-black text-2xl tracking-widest text-white uppercase font-mono">
                AK
              </div>
            </div>
            
            <div className="space-y-0.5">
              <h4 className="text-base font-bold text-white">Ansh Kesharwani</h4>
              <p className="text-xs text-slate-500 font-medium">Lead Android Architect</p>
            </div>

            {/* Connection blocks */}
            <div className="flex gap-2 justify-center">
              <a 
                href="https://github.com/AnshKesharwani" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white rounded-xl border border-white/5 transition-all cursor-pointer"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="mailto:rajeshkesharwani272@gmail.com" 
                className="p-2 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white rounded-xl border border-white/5 transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column Right: Biography & Mission Statements */}
          <div className="md:col-span-8 space-y-6">
            
            <div className="space-y-2">
              <span className="text-[10px] text-[#6C5CE7] font-bold tracking-widest uppercase">My Motivation</span>
              <h3 className="text-xl sm:text-2xl font-black text-white">"Democratizing Mobile Playback."</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Modern streaming players have become increasingly user-hostile: subscription limits, repetitive advertisements, persistent tracking cookies, and heavy background battery drains. I built Melodify as an absolute sanctuary. A platform where premium sound DSP and modern Material 3 design collide with zero cost.
              </p>
            </div>

            {/* Competency tags grid */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">TECHNICAL SKILLS & COMPETENCY</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center sm:text-left">
                {techStack.map((stack, i) => (
                  <div key={i} className="p-2.5 bg-slate-950/70 border border-white/5 rounded-xl">
                    <p className="text-[10px] font-bold text-white">{stack.label}</p>
                    <p className="text-[8px] text-slate-500 mt-0.5">{stack.level}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision statement */}
            <div className="p-4 bg-[#6C5CE7]/5 rounded-2xl border border-[#6C5CE7]/15 flex gap-3 text-left">
              <Compass className="w-5 h-5 text-[#6C5CE7] flex-shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-white uppercase tracking-wider">Vision Statement</h5>
                <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                  To establish a robust, free, open-source mobile ecosystem that matches and exceeds proprietary platforms in design and playback performance. No compromise.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
