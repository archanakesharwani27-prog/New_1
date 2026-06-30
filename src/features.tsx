import React, { useState } from 'react';
import { 
  Sparkles, Music, Sliders, Search, Download, 
  RefreshCw, CheckCircle, ArrowRight, Zap, Eye, ShieldCheck, Heart 
} from 'lucide-react';

interface FeatureCard {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  cols: string;
}

export default function Features() {
  const [activeM3Color, setActiveM3Color] = useState<'Purple' | 'Teal' | 'Crimson' | 'Emerald'>('Purple');
  const [crossfadeVal, setCrossfadeVal] = useState(6);
  const [searchVal, setSearchVal] = useState('');
  
  // Simulated Search filters
  const mockTags = ['Synthwave', 'Midnight Lofi', 'After Hours', 'Starlight Chill', 'Ambient Deep', 'Retrowave Mix'];
  const filteredTags = mockTags.filter(tag => tag.toLowerCase().includes(searchVal.toLowerCase()));

  return (
    <section id="features" className="bg-[#050816] py-24 sm:py-32 px-4 border-t border-white/5 select-none relative overflow-hidden">
      {/* Soft blur orbits background */}
      <div className="absolute top-[30%] left-[10%] w-96 h-96 bg-[#6C5CE7]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00E5FF]">System Architecture</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineering a Flagship Player.
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            No bloated dependencies, no data-mining, and zero advertisements. Just sheer, custom-built hardware performance paired with premium Material You aesthetics.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento Card 1: Beautiful Material 3 & Minimal UI (Col-Span 2) */}
          <div className="md:col-span-2 group relative rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between overflow-hidden hover:border-[#6C5CE7]/40 transition-all duration-500">
            {/* Shifting radial gradient on hover */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-[#6C5CE7]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-[#6C5CE7]/10 border border-[#6C5CE7]/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#6C5CE7]" />
                </div>
                <span className="text-[10px] bg-[#6C5CE7]/10 text-[#6C5CE7] border border-[#6C5CE7]/20 px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                  Material You Engine
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white">Dynamic Material 3 UI & Aesthetics</h3>
                <p className="text-slate-400 text-sm max-w-lg">
                  Every asset, color, contrast, and layout respects Google's modern design specifications. Our adaptive color engine extracts dominant colors from album covers to customize background hues.
                </p>
              </div>
            </div>

            {/* Interactive Color Swatch Demo */}
            <div className="mt-8 p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
                <span>Select active palette theme to preview Material You coloring:</span>
                <span className="font-bold text-white">{activeM3Color} Accent</span>
              </div>
              <div className="flex gap-3 justify-center sm:justify-start">
                {(['Purple', 'Teal', 'Crimson', 'Emerald'] as const).map((color) => {
                  const hexMap = {
                    Purple: 'bg-[#6C5CE7]',
                    Teal: 'bg-[#00E5FF]',
                    Crimson: 'bg-[#FF2D6F]',
                    Emerald: 'bg-emerald-400'
                  };
                  return (
                    <button
                      key={color}
                      onClick={() => setActiveM3Color(color)}
                      className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-2 border transition-all cursor-pointer hover:scale-102 ${
                        activeM3Color === color 
                          ? `${hexMap[color]} text-slate-950 border-white shadow-lg` 
                          : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-current"></span> {color}
                    </button>
                  );
                })}
              </div>
              
              {/* Dynamic Theme Mock UI card */}
              <div className={`p-4 rounded-xl border transition-all duration-500 flex items-center justify-between ${
                activeM3Color === 'Purple' ? 'bg-[#6C5CE7]/10 border-[#6C5CE7]/25 text-[#6C5CE7]'
                : activeM3Color === 'Teal' ? 'bg-[#00E5FF]/10 border-[#00E5FF]/25 text-[#00E5FF]'
                : activeM3Color === 'Crimson' ? 'bg-[#FF2D6F]/10 border-[#FF2D6F]/25 text-[#FF2D6F]'
                : 'bg-emerald-400/10 border-emerald-400/25 text-emerald-400'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center font-bold">♫</div>
                  <div>
                    <p className="text-xs font-bold text-white">Starlight Serenade</p>
                    <p className="text-[10px] text-slate-400">Material 3 Core Theme Engine active</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-white/5 px-2 py-1 rounded">Applied</span>
              </div>
            </div>

          </div>

          {/* Bento Card 2: Dual Audio Pipeline: Online Streaming + Offline Cache (Col-Span 1) */}
          <div className="group relative rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between hover:border-[#00E5FF]/40 transition-all duration-500">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--tw-gradient-stops))] from-[#00E5FF]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center">
                <Music className="w-6 h-6 text-[#00E5FF]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-white">Dual Audio Engine</h3>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Play offline files with zero latency or stream online catalog in high fidelity (up to 320kbps OPUS codec). 
                </p>
              </div>
            </div>

            {/* Offline/Online indicators */}
            <div className="mt-6 space-y-2.5">
              <div className="p-3 bg-slate-950/70 border border-white/5 rounded-xl flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-2"><Download className="w-4 h-4 text-[#00E5FF]" /> Offline File Scraper</span>
                <span className="text-[10px] font-mono text-slate-500">Active</span>
              </div>
              <div className="p-3 bg-slate-950/70 border border-white/5 rounded-xl flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-emerald-400 animate-pulse" /> OPUS Direct Stream</span>
                <span className="text-[10px] font-mono text-emerald-400">320 kbps</span>
              </div>
            </div>
          </div>

          {/* Bento Card 3: Sub-Second Crossfade Engine (Col-Span 1) */}
          <div className="group relative rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between hover:border-[#FF2D6F]/40 transition-all duration-500">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] from-[#FF2D6F]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FF2D6F]/10 border border-[#FF2D6F]/20 flex items-center justify-center">
                <Sliders className="w-6 h-6 text-[#FF2D6F]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-white">Crossfade & Buffer</h3>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Seamlessly fade out current track while fading in next track over highly customizable durations, preventing awkward silences.
                </p>
              </div>
            </div>

            {/* Crossfade slider gauge */}
            <div className="mt-6 p-4 rounded-xl bg-slate-950/70 border border-white/5 space-y-2">
              <div className="flex justify-between text-[11px] text-slate-300">
                <span>Transition Offset:</span>
                <span className="font-bold text-[#FF2D6F]">{crossfadeVal} seconds</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="12" 
                value={crossfadeVal}
                onChange={(e) => setCrossfadeVal(Number(e.target.value))}
                className="w-full accent-[#FF2D6F] h-1 bg-slate-800 cursor-pointer"
              />
              <p className="text-[9px] text-slate-500 text-center">Seamless audio fading configured instantly.</p>
            </div>
          </div>

          {/* Bento Card 4: Modern Search & Fuzzy Filter (Col-Span 1.5) */}
          <div className="group relative rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between hover:border-[#00E5FF]/40 transition-all duration-500">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,var(--tw-gradient-stops))] from-[#00E5FF]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center">
                <Search className="w-6 h-6 text-[#00E5FF]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-white">Modern Instant Search</h3>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Find albums, tracks, or metadata fields instantly. Dynamic search returns fuzzy-matched results as you type.
                </p>
              </div>
            </div>

            {/* Interactive Mock search filter */}
            <div className="mt-6 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Filter local tag categories..." 
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-950/75 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-[#00E5FF]"
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {filteredTags.length > 0 ? (
                  filteredTags.slice(0, 4).map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 bg-white/5 rounded-md text-[9px] text-slate-400 border border-white/5">
                      #{tag}
                    </span>
                  ))
                ) : (
                  <span className="text-[9px] text-slate-600">No matching tag filters</span>
                )}
              </div>
            </div>
          </div>

          {/* Bento Card 5: Smart Playlists & Frequent Updates (Col-Span 1) */}
          <div className="group relative rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between hover:border-[#6C5CE7]/40 transition-all duration-500">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--tw-gradient-stops))] from-[#6C5CE7]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#6C5CE7]/10 border border-[#6C5CE7]/20 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-[#6C5CE7]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-white">Smart Playlists & Curation</h3>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Automatically build dynamic smart collections, recently played archives, and localized folder systems with zero tracking telemetry.
                </p>
              </div>
            </div>

            {/* Small Checklist bullet list */}
            <div className="mt-6 space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Auto-Liked Favorites Folder</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Recent Listen Track Archives</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Dynamic Tag Folder Assembler</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
