import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, SkipForward, SkipBack, Search, Heart, 
  Settings, Music, ListMusic, Download, ArrowRight, 
  Volume2, Sliders, Sparkles, Check, ChevronRight, Github, 
  User, Shield, Smartphone, Compass, Clock, Bell, Info
} from 'lucide-react';

export type ScreenType = 'Splash' | 'Login' | 'Home' | 'Search' | 'Player' | 'Library' | 'Settings';

interface PhoneMockupProps {
  activeScreen: ScreenType;
  interactive?: boolean;
  onScreenChange?: (screen: ScreenType) => void;
}

// Lofi Synth Engine using Web Audio API (Lazy initialized, perfectly safe)
class LofiSynth {
  private ctx: AudioContext | null = null;
  private nodes: AudioNode[] = [];
  private isPlaying = false;
  private intervalId: any = null;

  public start() {
    if (this.isPlaying) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      this.ctx = new AudioContextClass();
      this.isPlaying = true;

      // Play lofi progression
      let step = 0;
      const chords = [
        [130.81, 164.81, 196.00, 246.94], // Cmaj7
        [146.83, 174.61, 220.00, 261.63], // Dm7
        [164.81, 196.00, 246.94, 293.66], // Em7
        [174.61, 220.00, 261.63, 329.63]  // Fmaj7
      ];

      const playChord = () => {
        if (!this.ctx || this.ctx.state === 'suspended') return;
        const now = this.ctx.currentTime;
        const chord = chords[step % chords.length];
        
        // Soft synth voice for each note in the chord
        chord.forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const gainNode = this.ctx!.createGain();
          
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);
          
          // Lofi warm filter
          const filter = this.ctx!.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(800 + Math.random() * 200, now);

          // Slender envelopes
          gainNode.gain.setValueAtTime(0, now);
          gainNode.gain.linearRampToValueAtTime(0.04, now + 0.5 + idx * 0.1);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 4);

          osc.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(this.ctx!.destination);

          osc.start(now);
          osc.stop(now + 4);
          this.nodes.push(osc, gainNode, filter);
        });

        // Add a soft lofi crackle/vinyl effect occasionally
        if (Math.random() > 0.4) {
          const osc = this.ctx!.createOscillator();
          const gainNode = this.ctx!.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(10 + Math.random() * 20, now);
          
          gainNode.gain.setValueAtTime(0, now);
          gainNode.gain.linearRampToValueAtTime(0.008, now + 0.1);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
          
          osc.connect(gainNode);
          gainNode.connect(this.ctx!.destination);
          osc.start(now);
          osc.stop(now + 2);
          this.nodes.push(osc, gainNode);
        }

        step++;
      };

      playChord();
      this.intervalId = setInterval(playChord, 4000);
    } catch (e) {
      console.warn('Audio Context failed to start: ', e);
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.nodes.forEach(node => {
      try {
        (node as any).disconnect();
      } catch (e) {}
    });
    this.nodes = [];
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }
}

const synthEngine = new LofiSynth();

export default function PhoneMockup({ activeScreen, interactive = false, onScreenChange }: PhoneMockupProps) {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>(activeScreen);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(42);
  const [activeTab, setActiveTab] = useState<'Home' | 'Search' | 'Library' | 'Settings'>('Home');
  const [likedSongs, setLikedSongs] = useState<string[]>(['After Hours', 'Starlight']);
  const [isAmoled, setIsAmoled] = useState(true);
  const [crossfade, setCrossfade] = useState(6);
  const [searchQuery, setSearchQuery] = useState('');
  const [volume, setVolume] = useState(72);
  const [guestName, setGuestName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const progressInterval = useRef<any>(null);

  // Sync with prop when not interactive or when prop changes
  useEffect(() => {
    setCurrentScreen(activeScreen);
    // sync tab
    if (activeScreen === 'Home') setActiveTab('Home');
    if (activeScreen === 'Search') setActiveTab('Search');
    if (activeScreen === 'Library') setActiveTab('Library');
    if (activeScreen === 'Settings') setActiveTab('Settings');
  }, [activeScreen]);

  // Audio Playback effect for dynamic updates
  useEffect(() => {
    if (isPlaying && currentScreen === 'Player') {
      progressInterval.current = setInterval(() => {
        setPlaybackProgress(p => (p >= 100 ? 0 : p + 0.5));
      }, 300);
      synthEngine.start();
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      synthEngine.stop();
    }
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
      synthEngine.stop();
    };
  }, [isPlaying, currentScreen]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleLike = (song: string) => {
    setLikedSongs(prev => 
      prev.includes(song) ? prev.filter(s => s !== song) : [...prev, song]
    );
  };

  const handleScreenTransition = (screen: ScreenType) => {
    setCurrentScreen(screen);
    if (onScreenChange) {
      onScreenChange(screen);
    }
  };

  // Mock Data
  const songs = [
    { title: 'Neon Horizon', artist: 'Lofi Dreamer', duration: '3:42', plays: '4.2M' },
    { title: 'Midnight City', artist: 'Retro Wave', duration: '4:15', plays: '12.8M' },
    { title: 'After Hours', artist: 'Cosmic Echo', duration: '2:58', plays: '1.5M' },
    { title: 'Starlight', artist: 'Aurora Beats', duration: '3:12', plays: '890K' },
    { title: 'Glitch In Time', artist: 'Synthetic', duration: '3:30', plays: '2.1M' },
  ];

  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="melodify-phone-wrapper" className="relative mx-auto w-[290px] h-[580px] sm:w-[320px] sm:h-[640px] rounded-[48px] border-[10px] border-slate-800 bg-slate-950 shadow-2xl overflow-hidden transition-all duration-700 ease-out hover:scale-102 hover:border-slate-700" style={{ boxShadow: '0 0 50px rgba(108, 92, 231, 0.25)' }}>
      {/* Phone Camera Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[26px] bg-slate-800 rounded-b-2xl z-50 flex items-center justify-around px-3">
        <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-700"></div>
        <div className="w-12 h-1 bg-slate-900 rounded-full"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></div>
      </div>

      {/* Screen Container */}
      <div className={`w-full h-full relative flex flex-col font-sans transition-colors duration-500 overflow-hidden ${isAmoled ? 'bg-[#020205]' : 'bg-[#0a0b16]'}`}>
        
        {/* Phone Top Status Bar */}
        <div className="h-8 pt-1 px-6 flex justify-between items-center text-[10px] text-slate-400 z-40 select-none">
          <span className="font-semibold">02:43 PM</span>
          <div className="flex items-center gap-1.5">
            <Sliders className="w-2.5 h-2.5 text-emerald-400" />
            <span>5G</span>
            <div className="w-5 h-2.5 border border-slate-500 rounded-sm p-0.5 flex items-center">
              <div className="w-3.5 h-full bg-emerald-400 rounded-2xs"></div>
            </div>
          </div>
        </div>

        {/* Dynamic Screens Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative pb-16 pt-2 px-4 scrollbar-none">
          
          {/* SCREEN: Splash */}
          {currentScreen === 'Splash' && (
            <div className="absolute inset-0 flex flex-col items-center justify-between py-12 px-6 bg-gradient-to-b from-[#0a0b1e] via-[#050816] to-[#020205] animate-fade-in z-30">
              <div />
              <div className="flex flex-col items-center gap-4">
                <div className="relative group cursor-pointer" onClick={() => handleScreenTransition('Login')}>
                  {/* Glowing background ripple */}
                  <div className="absolute -inset-4 bg-gradient-to-tr from-[#6C5CE7] to-[#00E5FF] rounded-full blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <div className="relative w-20 h-20 rounded-3xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-lg">
                    <div className="relative flex items-center justify-center gap-1.5">
                      <span className="w-1.5 h-6 bg-[#6C5CE7] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                      <span className="w-1.5 h-10 bg-[#00E5FF] rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                      <span className="w-1.5 h-12 bg-[#FF2D6F] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                      <span className="w-1.5 h-8 bg-[#6C5CE7] rounded-full animate-bounce" style={{ animationDelay: '0.45s' }}></span>
                      <span className="w-1.5 h-4 bg-[#00E5FF] rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></span>
                    </div>
                  </div>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-white mt-4 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">Melodify</h2>
                <p className="text-xs text-[#00E5FF] font-medium tracking-widest uppercase">Experience Music</p>
              </div>

              <button 
                onClick={() => handleScreenTransition('Login')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/10 hover:border-white/20 transition-all text-xs font-medium cursor-pointer"
              >
                Let's Begin <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* SCREEN: Login */}
          {currentScreen === 'Login' && (
            <div className="absolute inset-0 flex flex-col justify-between py-10 px-6 bg-gradient-to-b from-[#050816] to-[#020205] animate-fade-in z-30">
              <div className="space-y-2 mt-4">
                <p className="text-xs text-[#6C5CE7] font-semibold tracking-wider uppercase">V1.0 Beta-04</p>
                <h3 className="text-xl font-bold text-white">Join the Beta</h3>
                <p className="text-xs text-slate-400">Experience true fluid design, completely free of charge.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Your Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="Ansh Kesharwani" 
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#6C5CE7] transition-all"
                    />
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setIsLoggedIn(true);
                    handleScreenTransition('Home');
                  }}
                  className="w-full py-3 bg-gradient-to-r from-[#6C5CE7] to-[#00E5FF] text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-indigo-500/20 active:scale-98 transition-all hover:brightness-110 cursor-pointer"
                >
                  Enter Experience
                </button>

                <div className="relative flex items-center justify-center my-2">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                  <span className="relative px-2 bg-[#020205] text-[10px] text-slate-500 uppercase tracking-widest">Or Secure Login</span>
                </div>

                <button 
                  onClick={() => {
                    setGuestName('Ansh Kesharwani');
                    setIsLoggedIn(true);
                    handleScreenTransition('Home');
                  }}
                  className="w-full py-2.5 bg-slate-900 border border-slate-800 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-slate-850 active:scale-98 transition-all cursor-pointer"
                >
                  <Github className="w-4 h-4" /> Sign in with GitHub
                </button>
              </div>

              <p className="text-[9px] text-center text-slate-500 leading-relaxed px-2">
                By entering, you accept our local state persistence. Melodify is completely open-source and respects your privacy.
              </p>
            </div>
          )}

          {/* SCREEN: Home */}
          {currentScreen === 'Home' && (
            <div className="space-y-5 animate-fade-in pb-4">
              {/* Header */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Welcome back,</p>
                  <h3 className="text-sm font-bold text-white">{guestName || 'Ansh Kesharwani'}</h3>
                </div>
                <div className="flex gap-2">
                  <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#6C5CE7] to-[#00E5FF] p-[1px]">
                    <span className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-[10px] text-white font-bold uppercase">
                      {guestName ? guestName[0] : 'A'}
                    </span>
                  </span>
                </div>
              </div>

              {/* Dynamic Quick Categories */}
              <div className="grid grid-cols-2 gap-2">
                <div 
                  onClick={() => handleScreenTransition('Player')}
                  className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-[#6C5CE7] to-indigo-900 rounded-lg flex items-center justify-center shadow-md">
                    <Music className="w-4 h-4 text-white" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] font-bold text-white truncate">Neon Horizon</p>
                    <p className="text-[8px] text-slate-400 truncate">Now Playing</p>
                  </div>
                </div>
                <div 
                  onClick={() => handleScreenTransition('Library')}
                  className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-[#FF2D6F] to-pink-900 rounded-lg flex items-center justify-center shadow-md">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white">Liked Songs</p>
                    <p className="text-[8px] text-slate-400">{likedSongs.length} tracks</p>
                  </div>
                </div>
              </div>

              {/* Lofi Radio Banner */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-950 via-slate-950 to-emerald-950 border border-indigo-500/20 p-4">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 blur-xl rounded-full"></div>
                <p className="text-[8px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span> Live Beta Streaming
                </p>
                <h4 className="text-xs font-bold text-white mt-1">Lofi Chill Beats</h4>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Tune in to high quality streaming from open sources.</p>
                <button 
                  onClick={() => handleScreenTransition('Player')} 
                  className="mt-3 px-3 py-1.5 bg-white text-slate-950 text-[10px] font-bold rounded-lg flex items-center gap-1 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-slate-950" /> Tune In
                </button>
              </div>

              {/* Recently Played */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] font-bold text-white tracking-wider uppercase">Hot Beta Tracks</h4>
                  <span className="text-[9px] text-[#00E5FF] cursor-pointer">View All</span>
                </div>
                <div className="space-y-1.5">
                  {songs.map((song, i) => (
                    <div 
                      key={i} 
                      className="p-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 flex items-center justify-between transition-all group cursor-pointer"
                      onClick={() => {
                        handleScreenTransition('Player');
                        setIsPlaying(true);
                      }}
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 relative overflow-hidden flex-shrink-0">
                          {/* Colored overlay indicator */}
                          <div className={`absolute inset-0 opacity-20 ${i % 3 === 0 ? 'bg-indigo-500' : i % 3 === 1 ? 'bg-pink-500' : 'bg-cyan-500'}`} />
                          <Music className="w-3.5 h-3.5 z-10 text-white/80" />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-[10px] font-bold text-white truncate">{song.title}</p>
                          <p className="text-[8px] text-slate-400 truncate">{song.artist}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[8px] text-slate-500">{song.duration}</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(song.title);
                          }}
                          className="p-1 hover:text-[#FF2D6F] text-slate-500 transition-all"
                        >
                          <Heart className={`w-3 h-3 ${likedSongs.includes(song.title) ? 'fill-[#FF2D6F] text-[#FF2D6F]' : ''}`} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SCREEN: Search */}
          {currentScreen === 'Search' && (
            <div className="space-y-4 animate-fade-in pb-4">
              <h3 className="text-sm font-bold text-white">Search</h3>
              
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Songs, artists, podcasts..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00E5FF] transition-all"
                />
              </div>

              {searchQuery ? (
                <div className="space-y-2">
                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Search Results</p>
                  {filteredSongs.length > 0 ? (
                    <div className="space-y-1">
                      {filteredSongs.map((song, i) => (
                        <div 
                          key={i} 
                          onClick={() => {
                            handleScreenTransition('Player');
                            setIsPlaying(true);
                          }}
                          className="p-2 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-between cursor-pointer transition-all"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00E5FF]/20 to-slate-900 flex items-center justify-center text-xs font-bold text-slate-300">
                              <Music className="w-3.5 h-3.5 text-[#00E5FF]" />
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-white">{song.title}</p>
                              <p className="text-[8px] text-slate-400">{song.artist}</p>
                            </div>
                          </div>
                          <span className="text-[8px] text-slate-500">{song.duration}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 text-center py-4">No tracks found matching "{searchQuery}"</p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Trending Categories</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-16 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-900 p-3 flex flex-col justify-between hover:brightness-110 cursor-pointer transition-all">
                      <span className="text-[10px] font-bold text-white">Lofi Vibes</span>
                      <Music className="w-4 h-4 text-white/50 self-end" />
                    </div>
                    <div className="h-16 rounded-xl bg-gradient-to-br from-[#FF2D6F] to-red-950 p-3 flex flex-col justify-between hover:brightness-110 cursor-pointer transition-all">
                      <span className="text-[10px] font-bold text-white">Electronic</span>
                      <Sparkles className="w-4 h-4 text-white/50 self-end" />
                    </div>
                    <div className="h-16 rounded-xl bg-gradient-to-br from-[#00E5FF] to-slate-900 p-3 flex flex-col justify-between hover:brightness-110 cursor-pointer transition-all">
                      <span className="text-[10px] font-bold text-slate-950">Synthwave</span>
                      <Sliders className="w-4 h-4 text-slate-950/50 self-end" />
                    </div>
                    <div className="h-16 rounded-xl bg-gradient-to-br from-emerald-600 to-slate-950 p-3 flex flex-col justify-between hover:brightness-110 cursor-pointer transition-all">
                      <span className="text-[10px] font-bold text-white">Podcast</span>
                      <Info className="w-4 h-4 text-white/50 self-end" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SCREEN: Player */}
          {currentScreen === 'Player' && (
            <div className="absolute inset-x-4 top-2 bottom-12 flex flex-col justify-between animate-fade-in text-center">
              {/* Top Meta Info */}
              <div className="flex justify-between items-center text-[10px] text-slate-400">
                <button onClick={() => handleScreenTransition('Home')} className="p-1 hover:text-white transition-all cursor-pointer">
                  Back
                </button>
                <span className="font-bold uppercase tracking-widest text-[#00E5FF]">Now Playing</span>
                <button onClick={() => handleScreenTransition('Settings')} className="p-1 hover:text-white transition-all cursor-pointer">
                  <Settings className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Album Art Cover Spinning Container */}
              <div className="my-3 flex flex-col items-center justify-center relative">
                {/* Neon outer glow orbit */}
                <div className={`absolute w-36 h-36 rounded-full bg-gradient-to-tr from-[#6C5CE7] via-[#00E5FF] to-[#FF2D6F] blur-xl opacity-45 transition-transform duration-1000 ${isPlaying ? 'animate-spin-slow' : 'scale-90'}`}></div>
                
                {/* Album Cover Circle */}
                <div className={`relative w-36 h-36 rounded-full border-4 border-slate-900 bg-slate-950 flex items-center justify-center overflow-hidden shadow-2xl transition-transform duration-500 ${isPlaying ? 'rotate-animation' : ''}`} style={{ animation: isPlaying ? 'spin 12s linear infinite' : 'none' }}>
                  <div className="absolute inset-4 rounded-full border border-slate-800 flex items-center justify-center">
                    <div className="absolute inset-8 rounded-full border-2 border-slate-700/50 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-600 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#00E5FF]" />
                      </div>
                    </div>
                  </div>
                  {/* Vinyl Groove Lines */}
                  <div className="absolute inset-1 rounded-full border border-white/5 pointer-events-none"></div>
                  <div className="absolute inset-3 rounded-full border border-white/5 pointer-events-none"></div>
                  <div className="absolute inset-6 rounded-full border border-white/5 pointer-events-none"></div>
                </div>

                {/* Soundwave Bars playing anim */}
                <div className="flex gap-1 items-end h-8 mt-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((bar) => {
                    const randomDelay = Math.random() * 0.8;
                    const randomDuration = 0.5 + Math.random() * 0.8;
                    return (
                      <span 
                        key={bar} 
                        className={`w-1 bg-gradient-to-t from-[#6C5CE7] to-[#00E5FF] rounded-full transition-all duration-300`}
                        style={{ 
                          height: isPlaying ? `${15 + Math.random() * 20}px` : '4px',
                          animation: isPlaying ? `equalizer-wave ${randomDuration}s ease-in-out infinite alternate` : 'none',
                          animationDelay: `${randomDelay}s`
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Title and Lyrics Scroll snippet */}
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">Neon Horizon</h3>
                <p className="text-[10px] text-[#00E5FF] font-medium">Lofi Dreamer • Chill beats</p>
                
                {/* Live Scrolling Lyrics preview */}
                <div className="h-7 overflow-hidden mt-1 bg-white/5 rounded-lg flex items-center justify-center border border-white/5">
                  <p className="text-[8px] text-indigo-200 animate-pulse truncate px-2">
                    {isPlaying ? "♪ Floating in the space neon stars shine so bright..." : "Paused • Click Play to hear live synth"}
                  </p>
                </div>
              </div>

              {/* Slider Progress Controls */}
              <div className="space-y-1 mt-2">
                <div className="relative h-1 bg-slate-800 rounded-full overflow-hidden cursor-pointer">
                  <div 
                    className="absolute h-full bg-gradient-to-r from-[#6C5CE7] to-[#00E5FF]"
                    style={{ width: `${playbackProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[8px] text-slate-500">
                  <span>1:24</span>
                  <span>3:42</span>
                </div>
              </div>

              {/* Playback Controls button grid */}
              <div className="flex justify-center items-center gap-6 mt-1">
                <button className="p-1 text-slate-400 hover:text-white transition-all cursor-pointer">
                  <SkipBack className="w-4 h-4" />
                </button>
                <button 
                  onClick={handlePlayPause}
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#6C5CE7] to-[#00E5FF] flex items-center justify-center text-slate-950 hover:scale-105 active:scale-95 shadow-md shadow-cyan-500/10 cursor-pointer transition-all"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950 pl-0.5" />}
                </button>
                <button className="p-1 text-slate-400 hover:text-white transition-all cursor-pointer">
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Extra Volume sliders or controls */}
              <div className="flex items-center gap-2 mt-2">
                <Volume2 className="w-3 h-3 text-slate-400" />
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full accent-[#00E5FF] h-0.5 bg-slate-800 cursor-pointer"
                />
                <span className="text-[8px] text-slate-500">{volume}%</span>
              </div>
            </div>
          )}

          {/* SCREEN: Library */}
          {currentScreen === 'Library' && (
            <div className="space-y-4 animate-fade-in pb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white">Your Music</h3>
                <button className="p-1 hover:text-[#00E5FF] text-slate-400 transition-all cursor-pointer">
                  <ListMusic className="w-4.5 h-4.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex flex-col justify-between h-20 hover:bg-white/10 transition-all cursor-pointer">
                  <Heart className="w-5 h-5 text-[#FF2D6F] fill-[#FF2D6F]" />
                  <div>
                    <p className="text-[10px] font-bold text-white">Liked Songs</p>
                    <p className="text-[8px] text-slate-400">{likedSongs.length} items</p>
                  </div>
                </div>
                <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex flex-col justify-between h-20 hover:bg-white/10 transition-all cursor-pointer">
                  <Download className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-[10px] font-bold text-white">Offline Cache</p>
                    <p className="text-[8px] text-slate-400">14 tracks</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Your Playlists</p>
                <div className="space-y-1">
                  <div className="p-2 bg-white/5 hover:bg-white/10 rounded-xl flex items-center gap-3 cursor-pointer transition-all">
                    <div className="w-9 h-9 rounded-lg bg-indigo-900/40 flex items-center justify-center">
                      <ListMusic className="w-4 h-4 text-[#6C5CE7]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white">Lofi Coding Session</p>
                      <p className="text-[8px] text-slate-400">42 songs • Ansh Kesharwani</p>
                    </div>
                  </div>
                  <div className="p-2 bg-white/5 hover:bg-white/10 rounded-xl flex items-center gap-3 cursor-pointer transition-all">
                    <div className="w-9 h-9 rounded-lg bg-pink-900/40 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-[#FF2D6F]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white">Midnight Drive</p>
                      <p className="text-[8px] text-slate-400">18 songs • System Smart</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN: Settings */}
          {currentScreen === 'Settings' && (
            <div className="space-y-4 animate-fade-in pb-4">
              <h3 className="text-sm font-bold text-white">Equalizer & Settings</h3>

              <div className="space-y-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Playback Options</p>
                
                {/* AMOLED Dark Mode switch */}
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span className="text-[10px] text-white">AMOLED True Dark</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={isAmoled} 
                      onChange={() => setIsAmoled(!isAmoled)}
                      className="sr-only peer"
                    />
                    <div className="w-7 h-4 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#00E5FF]"></div>
                  </label>
                </div>

                {/* Crossfade slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-200">
                    <span className="flex items-center gap-2"><Sliders className="w-3.5 h-3.5 text-[#6C5CE7]" /> Crossfade</span>
                    <span className="font-bold text-[#6C5CE7]">{crossfade}s</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="12" 
                    value={crossfade}
                    onChange={(e) => setCrossfade(Number(e.target.value))}
                    className="w-full accent-[#6C5CE7] h-0.5 bg-slate-800 cursor-pointer"
                  />
                </div>
              </div>

              {/* Custom Equalizer preview widget */}
              <div className="p-3 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">3D Parametric EQ</p>
                <div className="flex justify-between items-end h-16 pt-2">
                  {[60, 150, 400, 1000, 3000, 8000, 15000].map((hz, idx) => {
                    // Random-ish high fidelity visual bars
                    const heightVal = [70, 55, 45, 62, 75, 60, 48][idx];
                    return (
                      <div key={idx} className="flex flex-col items-center gap-1 w-full">
                        <div className="h-10 w-1.5 bg-slate-800 rounded-full relative flex items-end">
                          <div 
                            className="w-full rounded-full bg-[#00E5FF]" 
                            style={{ height: `${heightVal}%` }}
                          />
                        </div>
                        <span className="text-[7px] text-slate-500 font-mono">
                          {hz >= 1000 ? `${hz/1000}k` : hz}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Developer Metadata */}
              <div className="p-2 bg-[#6C5CE7]/10 rounded-xl border border-[#6C5CE7]/20 flex items-center gap-2.5">
                <Info className="w-4 h-4 text-[#6C5CE7] flex-shrink-0" />
                <p className="text-[8px] text-[#6C5CE7] font-semibold leading-relaxed">
                  Beta v1.0.0 is 100% free with 0 ads, built for music lovers around the globe by Ansh Kesharwani.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Floating Bottom Navigation Bar (Material 3 style) */}
        <div className="absolute bottom-0 inset-x-0 h-14 bg-slate-950/80 backdrop-blur-md border-t border-white/5 flex items-center justify-around z-40 select-none">
          <button 
            onClick={() => handleScreenTransition('Home')}
            className={`flex flex-col items-center gap-0.5 transition-all cursor-pointer ${activeTab === 'Home' ? 'text-[#6C5CE7]' : 'text-slate-500 hover:text-white'}`}
          >
            <Smartphone className="w-4 h-4" />
            <span className="text-[8px] font-medium font-mono">Home</span>
          </button>
          
          <button 
            onClick={() => handleScreenTransition('Search')}
            className={`flex flex-col items-center gap-0.5 transition-all cursor-pointer ${activeTab === 'Search' ? 'text-[#00E5FF]' : 'text-slate-500 hover:text-white'}`}
          >
            <Search className="w-4 h-4" />
            <span className="text-[8px] font-medium font-mono">Search</span>
          </button>

          <button 
            onClick={() => handleScreenTransition('Player')}
            className="w-9 h-9 -mt-4 bg-gradient-to-tr from-[#6C5CE7] to-[#00E5FF] rounded-full flex items-center justify-center text-slate-950 hover:scale-110 active:scale-95 shadow-md shadow-cyan-500/10 cursor-pointer transition-all"
          >
            <Music className="w-4 h-4 fill-slate-950" />
          </button>

          <button 
            onClick={() => handleScreenTransition('Library')}
            className={`flex flex-col items-center gap-0.5 transition-all cursor-pointer ${activeTab === 'Library' ? 'text-[#FF2D6F]' : 'text-slate-500 hover:text-white'}`}
          >
            <ListMusic className="w-4 h-4" />
            <span className="text-[8px] font-medium font-mono">Library</span>
          </button>

          <button 
            onClick={() => handleScreenTransition('Settings')}
            className={`flex flex-col items-center gap-0.5 transition-all cursor-pointer ${activeTab === 'Settings' ? 'text-[#00E5FF]' : 'text-slate-500 hover:text-white'}`}
          >
            <Settings className="w-4 h-4" />
            <span className="text-[8px] font-medium font-mono">Settings</span>
          </button>
        </div>

      </div>

      {/* Styled inline keyframes for custom animations inside phone mockup */}
      <style>{`
        @keyframes spin {
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes equalizer-wave {
          0% {
            height: 4px;
          }
          100% {
            height: 24px;
          }
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
