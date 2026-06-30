import React from 'react';
import { Github, Heart, Mail, Smartphone } from 'lucide-react';

import logoImg from '../assets/images/melodify_logo_1782814975818.jpg';

interface FooterProps {
  onScrollToFeatures: () => void;
  onScrollToDownload: () => void;
}

export default function Footer({ onScrollToFeatures, onScrollToDownload }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050816] border-t border-white/5 py-16 px-4 select-none relative overflow-hidden">
      
      {/* Footer subtle backdrop gradient */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#6C5CE7]/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
        
        {/* Brand Meta Column */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2.5">
            <img 
              src={logoImg} 
              alt="Melodify Logo" 
              referrerPolicy="no-referrer"
              className="w-7 h-7 rounded-lg border border-white/10 shadow-md" 
            />
            <h4 className="text-lg font-black tracking-tight text-white">Melodify</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Experience Music. Reimagined. A next-generation, open-source Android music player built for perfectionists. No advertisements, no cost.
          </p>
          <div className="flex gap-4">
            <a href="https://github.com/AnshKesharwani" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 border border-white/5 rounded-xl text-slate-400 hover:text-white transition duration-300">
              <Github className="w-4 h-4" />
            </a>
            <a href="mailto:rajeshkesharwani272@gmail.com" className="p-2 bg-slate-900 border border-white/5 rounded-xl text-slate-400 hover:text-white transition duration-300">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Directory Navigation Column */}
        <div className="md:col-span-3 space-y-4">
          <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Product Directory</h5>
          <ul className="space-y-2 text-xs text-slate-400 font-semibold">
            <li>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-all cursor-pointer">
                Intro & Stage
              </button>
            </li>
            <li>
              <button onClick={onScrollToFeatures} className="hover:text-white transition-all cursor-pointer">
                System Features
              </button>
            </li>
            <li>
              <button onClick={onScrollToDownload} className="hover:text-white transition-all cursor-pointer">
                Download APK
              </button>
            </li>
            <li>
              <a href="https://github.com/AnshKesharwani" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all">
                GitHub Repository
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Column */}
        <div className="md:col-span-3 space-y-4">
          <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Privacy & Trust</h5>
          <ul className="space-y-2 text-xs text-slate-400 font-semibold">
            <li>
              <span className="text-slate-500 cursor-not-allowed">Privacy Policy (0-telemetry)</span>
            </li>
            <li>
              <span className="text-slate-500 cursor-not-allowed">Terms & Conditions</span>
            </li>
            <li>
              <span className="text-slate-500 cursor-not-allowed">Beta Sandbox Licensing</span>
            </li>
          </ul>
        </div>

        {/* Engineering statistics Column */}
        <div className="md:col-span-2 space-y-4">
          <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Release Metadata</h5>
          <div className="p-4 bg-slate-900/60 rounded-2xl border border-white/5 space-y-2">
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Beta:</span>
              <span className="font-bold text-white">v1.0.0-beta-04</span>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>OS:</span>
              <span className="font-bold text-white">Android 8.0+</span>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>License:</span>
              <span className="font-bold text-[#00E5FF]">Apache-2.0</span>
            </div>
          </div>
        </div>

      </div>

      {/* Under footer details */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© {currentYear} Melodify. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Crafted with <Heart className="w-3.5 h-3.5 text-[#FF2D6F] fill-[#FF2D6F]" /> by <span className="font-bold text-slate-300">Ansh Kesharwani</span>
        </p>
      </div>

    </footer>
  );
}
