import React, { useState } from 'react';
import { Download, ChevronRight, Check, AlertCircle, FileCode, Sliders, ChevronDown, Award, RefreshCw } from 'lucide-react';

interface ReleaseNote {
  version: string;
  date: string;
  status: string;
  changes: string[];
}

export default function DownloadSection() {
  const [downloadProgress, setDownloadProgress] = useState(-1); // -1 = not started, 0-100 = active, 101 = finished
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');

  const releaseNotes: ReleaseNote[] = [
    {
      version: 'v1.0.0-beta-04 (Latest)',
      date: 'June 28, 2026',
      status: 'Stable Beta',
      changes: [
        'Added high-end Parametric DSP Equalizer presets',
        'Implemented sub-second Crossfade buffers (0-12 seconds selection)',
        'Enhanced Jetpack Compose state tracking to prevent rendering frames delays',
        'Reduced idle RAM consumption from 48MB down to 32MB'
      ]
    },
    {
      version: 'v1.0.0-beta-03',
      date: 'May 12, 2026',
      status: 'Beta Release',
      changes: [
        'Added offline cache scraping engine',
        'Added dynamic album cover art dominant extraction values',
        'Upgraded OPUS decoding codec to latest stable release specifications'
      ]
    }
  ];

  const installSteps = [
    {
      title: 'Download Secure APK',
      desc: 'Click the "Download APK" button on our official mirror pipeline. The compiled package size is only ~14.2 MB.'
    },
    {
      title: 'Enable Unknown Sources',
      desc: 'Go to your Android Settings -> Apps -> Special App Access -> Install Unknown Apps. Select your browser or file manager and toggle "Allow".'
    },
    {
      title: 'Initiate Installation',
      desc: 'Open your File Manager or Downloads directory. Tap on "melodify-v1.0.0-beta-04.apk" and confirm installation.'
    },
    {
      title: 'Launch & Stream',
      desc: 'Open Melodify, customize your profile guest state, apply your preferred 3D Equalizer preset and start listening!'
    }
  ];

  const startDownloadSimulation = () => {
    if (downloadProgress !== -1) return;
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Auto-trigger a safe client-side mock file download
          try {
            const blob = new Blob(["Melodify Android Client Beta APK Binary"], { type: 'application/vnd.android.package-archive' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'melodify-v1.0.0-beta-04.apk';
            link.click();
          } catch (e) {}
          return 101; // finished
        }
        return prev + 5;
      });
    }, 150);
  };

  return (
    <section id="download" className="bg-[#020205] py-24 sm:py-32 px-4 border-t border-white/5 select-none relative overflow-hidden">
      
      {/* Aurora glow effect */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00E5FF]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* LEFT COLUMN: Downloader Panel */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-3 text-center lg:text-left">
            <span className="text-[10px] text-[#00E5FF] font-bold tracking-widest uppercase">GET MELODIFY TODAY</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Unshackle Your Playlist.
            </h2>
            <p className="text-base text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Experience the absolute summit of fluid design and audiophile fidelity. Download the public beta and help us redefine mobile music.
            </p>
          </div>

          {/* Detailed specifications card */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">VERSION</p>
                <p className="text-sm font-bold text-white">1.0.0-beta-04</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">FILE SIZE</p>
                <p className="text-sm font-bold text-white">14.2 MB</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">ANDROID OS</p>
                <p className="text-sm font-bold text-white">8.0+ (API 26+)</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">COMPILATION</p>
                <p className="text-sm font-bold text-white">Kotlin Native</p>
              </div>
            </div>

            {/* Checksums Details */}
            <div className="pt-4 border-t border-white/5 space-y-2 text-xs text-slate-400">
              <div className="flex flex-col sm:flex-row sm:justify-between font-mono text-[10px]">
                <span>MD5: 8f36c53e8a00bc6e2ef30a109fe2c0fb</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> GPG Key Verified
                </span>
              </div>
            </div>

            {/* Simulated Interactive Downloader Button & Progress */}
            <div className="space-y-4 pt-2">
              {downloadProgress === -1 && (
                <button 
                  onClick={startDownloadSimulation}
                  className="w-full py-4 bg-gradient-to-r from-[#6C5CE7] to-[#00E5FF] text-slate-950 font-extrabold text-sm sm:text-base rounded-2xl flex items-center justify-center gap-2.5 hover:scale-101 active:scale-99 hover:brightness-110 shadow-lg shadow-cyan-500/10 cursor-pointer transition-all"
                >
                  <Download className="w-5 h-5 stroke-[2.5px]" /> Download APK Binary
                </button>
              )}

              {downloadProgress >= 0 && downloadProgress <= 100 && (
                <div className="space-y-2.5 p-4 bg-slate-950/70 border border-white/5 rounded-2xl">
                  <div className="flex justify-between items-center text-xs text-slate-300">
                    <span className="flex items-center gap-2 animate-pulse text-[#00E5FF]">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Gathering blocks from security pipeline...
                    </span>
                    <span className="font-mono font-bold text-white">{downloadProgress}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#6C5CE7] to-[#00E5FF] rounded-full transition-all duration-150"
                      style={{ width: `${downloadProgress}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 text-center font-mono">
                    Downloading: {(14.2 * (downloadProgress/100)).toFixed(1)} MB / 14.2 MB
                  </p>
                </div>
              )}

              {downloadProgress === 101 && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center gap-3 animate-scale-up">
                  <Check className="w-6 h-6 bg-emerald-500/20 rounded-full p-1" />
                  <div>
                    <h4 className="text-xs font-bold text-white">APK File Download Complete</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Check your browser’s downloads folder for "melodify-v1.0.0-beta-04.apk".</p>
                  </div>
                </div>
              )}
            </div>

            {/* Mirrors alternative links */}
            <div className="pt-2 flex justify-center lg:justify-start gap-4 text-xs font-bold">
              <a href="https://github.com/AnshKesharwani" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white flex items-center gap-1 transition duration-300">
                <FileCode className="w-4 h-4 text-[#6C5CE7]" /> GitHub Releases Mirror
              </a>
              <span className="text-slate-700">|</span>
              <span className="text-slate-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-[#00E5FF]" /> No playstore verification needed
              </span>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Installation Guide */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">
          <div className="space-y-1 text-center lg:text-left">
            <span className="text-[10px] text-[#6C5CE7] font-bold tracking-widest uppercase">EASY PROCESS</span>
            <h3 className="text-xl sm:text-2xl font-black text-white">Installation Guide</h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto lg:mx-0">
              Android security prevents applications outside the Play Store by default. Read how to deploy safely:
            </p>
          </div>

          <div className="space-y-2">
            {installSteps.map((step, idx) => {
              const isOpen = activeStep === idx;
              return (
                <div 
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isOpen 
                      ? 'bg-[#6C5CE7]/5 border-[#6C5CE7]/30 text-[#6C5CE7]' 
                      : 'bg-slate-900/40 border-white/5 text-slate-400 hover:border-slate-800'
                  }`}
                  onClick={() => setActiveStep(idx)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                        isOpen ? 'bg-[#6C5CE7] text-slate-950 shadow-md shadow-indigo-500/10' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-white">{step.title}</h4>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                  
                  {isOpen && (
                    <p className="text-xs text-slate-300 mt-3 pl-9 leading-relaxed">
                      {step.desc}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Release Notes Tab Block */}
      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">Release Notes & Logs</h3>
            <p className="text-xs text-slate-500">Meticulously logged updates proving beta dedication.</p>
          </div>
          <div className="flex gap-2 self-start sm:self-center">
            <button 
              onClick={() => setActiveTab('current')}
              className={`px-4 py-2 text-xs font-bold rounded-xl border cursor-pointer transition-all ${
                activeTab === 'current' 
                  ? 'bg-[#6C5CE7] border-[#6C5CE7] text-slate-950' 
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              Current Release
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 text-xs font-bold rounded-xl border cursor-pointer transition-all ${
                activeTab === 'history' 
                  ? 'bg-[#6C5CE7] border-[#6C5CE7] text-slate-950' 
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              Older History
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {releaseNotes.filter((_, idx) => (activeTab === 'current' ? idx === 0 : idx > 0)).map((note, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-900/20 border border-white/5 space-y-4 animate-scale-up">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <div>
                  <h4 className="text-sm font-extrabold text-white">{note.version}</h4>
                  <p className="text-[10px] text-slate-500">Released: {note.date}</p>
                </div>
                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded uppercase">
                  {note.status}
                </span>
              </div>
              <ul className="space-y-2">
                {note.changes.map((change, j) => (
                  <li key={j} className="flex gap-2 text-xs text-slate-300 leading-relaxed">
                    <span className="text-[#00E5FF] font-bold">•</span>
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {activeTab === 'history' && releaseNotes.length <= 1 && (
            <p className="text-xs text-slate-500 py-6 text-center md:col-span-2">No older beta releases logged yet.</p>
          )}
        </div>
      </div>

    </section>
  );
}
