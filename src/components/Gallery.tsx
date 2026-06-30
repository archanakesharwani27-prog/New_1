import React, { useState } from 'react';
import { Eye, X, ZoomIn, ChevronLeft, ChevronRight, Play, Sliders, ListMusic, Heart } from 'lucide-react';

import screenshotPlayerImg from '../assets/images/screenshot_player_1782815011783.jpg';
import screenshotSettingsImg from '../assets/images/screenshot_settings_1782815028263.jpg';
import screenshotLibraryImg from '../assets/images/screenshot_library_1782815044328.jpg';
import screenshotHomeImg from '../assets/images/screenshot_home_1782814996239.jpg';

interface Screenshot {
  id: number;
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
  image: string;
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const screenshots: Screenshot[] = [
    {
      id: 0,
      title: 'Neon Horizon Player',
      category: 'Audio Player',
      description: 'Immersion mode. Features smooth vinyl orbits, glowing responsive waveforms, synced lofi lyrics, and real-time buffer meters.',
      icon: <Play className="w-4 h-4" />,
      accent: 'from-[#6C5CE7] to-[#00E5FF]',
      image: screenshotPlayerImg
    },
    {
      id: 1,
      title: 'Parametric Equalizer',
      category: 'DSP Audio',
      description: 'Interactive 7-band soundwave controls. Shape frequency outputs, toggle AMOLED true pitch blacks, and manage transitions.',
      icon: <Sliders className="w-4 h-4" />,
      accent: 'from-[#00E5FF] to-[#FF2D6F]',
      image: screenshotSettingsImg
    },
    {
      id: 2,
      title: 'Smart Playlist Compiler',
      category: 'Smart Library',
      description: 'Auto-arrange tracks based on listener behaviors. Organize custom directories, cache streaming lists, and filter files instantly.',
      icon: <ListMusic className="w-4 h-4" />,
      accent: 'from-[#FF2D6F] to-[#6C5CE7]',
      image: screenshotLibraryImg
    },
    {
      id: 3,
      title: 'Material 3 Customizer',
      category: 'UI/UX Settings',
      description: 'Dynamic color palette extractor. Melodify adapts to dominant cover art tones to personalize background and border hue states.',
      icon: <Heart className="w-4 h-4" />,
      accent: 'from-emerald-400 to-[#6C5CE7]',
      image: screenshotHomeImg
    }
  ];

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % screenshots.length);
    }
  };

  const handlePrev = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + screenshots.length) % screenshots.length);
    }
  };

  return (
    <section id="gallery" className="bg-[#020205] py-24 sm:py-32 px-4 border-t border-white/5 select-none relative overflow-hidden">
      
      {/* Aurora visual decoration behind */}
      <div className="absolute top-[40%] right-[15%] w-80 h-80 bg-[#FF2D6F]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#6C5CE7]">Visual Interface</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Designed for the Discerning.
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            A visual overview of the high-fidelity Android interface layouts. Zero clutter, strict Material 3 design systems, and responsive pixel grids.
          </p>
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {screenshots.map((shot) => (
            <div
              key={shot.id}
              onClick={() => setSelectedImage(shot.id)}
              className="group relative h-[360px] rounded-3xl bg-slate-900/40 border border-white/5 overflow-hidden cursor-pointer hover:border-slate-750 transition-all duration-500 hover:-translate-y-1"
            >
              {/* Glass screenshot card placeholder rendering fluid graphic */}
              <div className={`absolute inset-0 bg-gradient-to-br ${shot.accent} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Actual screenshot design rendering */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-72 bg-[#020205] rounded-2xl border border-white/10 shadow-xl overflow-hidden flex flex-col justify-between group-hover:scale-103 transition-transform duration-500">
                <img 
                  src={shot.image} 
                  alt={shot.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Hover Overlay with Caption */}
              <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex flex-col justify-end p-6 space-y-2">
                <span className="text-[10px] text-[#00E5FF] uppercase font-bold tracking-widest">{shot.category}</span>
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  {shot.title} <ZoomIn className="w-4 h-4 text-[#00E5FF]" />
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {shot.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

        {/* Lightbox Immersive Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-md flex items-center justify-center z-50 p-4 select-none animate-fade-in">
            {/* Close Overlay Trigger */}
            <div className="absolute inset-0" onClick={() => setSelectedImage(null)}></div>

            {/* Lightbox Body Panel */}
            <div className="relative max-w-lg w-full rounded-4xl bg-slate-900 border border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl z-10 animate-scale-up">
              
              {/* Corner Close Button */}
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-slate-300 hover:text-white transition-all cursor-pointer z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Details */}
              <div className="text-center space-y-1 mb-6">
                <span className="text-[10px] text-[#00E5FF] font-bold tracking-widest uppercase">
                  {screenshots[selectedImage].category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {screenshots[selectedImage].title}
                </h3>
              </div>

              {/* Central Premium Vector UI Presentation */}
              <div className="bg-slate-950 rounded-3xl border border-white/5 h-[360px] flex items-center justify-center relative overflow-hidden">
                {/* Aurora gradient splash inside frame */}
                <div className={`absolute top-[-20%] left-[-20%] w-64 h-64 rounded-full bg-gradient-to-br ${screenshots[selectedImage].accent} blur-3xl opacity-20 pointer-events-none`}></div>
                
                <img 
                  src={screenshots[selectedImage].image} 
                  alt={screenshots[selectedImage].title} 
                  referrerPolicy="no-referrer"
                  className="h-full object-contain rounded-2xl p-2 z-10"
                />
              </div>

              {/* Lower Text Caption */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-center mt-6">
                {screenshots[selectedImage].description}
              </p>

              {/* Navigation Controls */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5">
                <button 
                  onClick={handlePrev}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev Interface
                </button>
                <span className="text-xs text-slate-500 font-bold font-mono">
                  {selectedImage + 1} / {screenshots.length}
                </span>
                <button 
                  onClick={handleNext}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                >
                  Next Interface <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

      </section>
    );
}
