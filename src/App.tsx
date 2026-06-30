import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import PhoneShowcase from './components/PhoneShowcase';
import Features from './features';
import Gallery from './components/Gallery';
import WhyMelodify from './components/WhyMelodify';
import DownloadSection from './components/Download';
import GithubSection from './components/GithubSection';
import Roadmap from './components/Roadmap';
import Developer from './components/Developer';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { Menu, X, Smartphone, Play, Download, Github } from 'lucide-react';

import logoImg from './assets/images/melodify_logo_1782814975818.jpg';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white font-sans selection:bg-[#6C5CE7]/30 selection:text-[#00E5FF]">
      
      {/* GLOBAL HEADER NAVIGATION (Glassmorphic) */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b select-none ${
        scrolled 
          ? 'bg-[#050816]/75 backdrop-blur-md border-white/10 py-4 shadow-lg' 
          : 'bg-transparent border-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          
          {/* Logo Brand Brand */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            {/* Real App Logo */}
            <img 
              src={logoImg} 
              alt="Melodify Logo" 
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-xl border border-white/15 shadow-md shadow-indigo-500/10 group-hover:scale-105 transition duration-300" 
            />
            <span className="font-display font-black text-xl tracking-tight text-white">
              Melodify
            </span>
          </div>

          {/* Desktop Navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            <button onClick={() => scrollToSection('showcase')} className="hover:text-[#6C5CE7] transition duration-200 cursor-pointer">
              Showcase
            </button>
            <button onClick={() => scrollToSection('features')} className="hover:text-[#00E5FF] transition duration-200 cursor-pointer">
              Features
            </button>
            <button onClick={() => scrollToSection('why-melodify')} className="hover:text-[#FF2D6F] transition duration-200 cursor-pointer">
              Why Melodify
            </button>
            <button onClick={() => scrollToSection('github')} className="hover:text-white transition duration-200 cursor-pointer">
              Open Source
            </button>
            <button onClick={() => scrollToSection('roadmap')} className="hover:text-[#6C5CE7] transition duration-200 cursor-pointer">
              Roadmap
            </button>
            <button onClick={() => scrollToSection('developer')} className="hover:text-[#00E5FF] transition duration-200 cursor-pointer">
              Developer
            </button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-[#FF2D6F] transition duration-200 cursor-pointer">
              FAQ
            </button>
          </nav>

          {/* Download Action Trigger */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => scrollToSection('download')}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/10 hover:border-white/20 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <Download className="w-4 h-4" /> Download APK
            </button>
          </div>

          {/* Mobile Menu Burger Trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white transition cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </header>

      {/* MOBILE PANEL MENU SCREEN (Glassmorphic) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] z-40 bg-[#050816]/95 backdrop-blur-lg border-t border-white/5 flex flex-col p-6 space-y-6 md:hidden animate-fade-in select-none">
          <nav className="flex flex-col space-y-4 text-sm font-bold uppercase tracking-wider text-slate-400">
            <button onClick={() => scrollToSection('showcase')} className="text-left py-2 hover:text-white transition duration-200">
              Interactive Showcase
            </button>
            <button onClick={() => scrollToSection('features')} className="text-left py-2 hover:text-white transition duration-200">
              System Features
            </button>
            <button onClick={() => scrollToSection('why-melodify')} className="text-left py-2 hover:text-white transition duration-200">
              Why Melodify
            </button>
            <button onClick={() => scrollToSection('github')} className="text-left py-2 hover:text-white transition duration-200">
              Open Source Journey
            </button>
            <button onClick={() => scrollToSection('roadmap')} className="text-left py-2 hover:text-white transition duration-200">
              Evolution Roadmap
            </button>
            <button onClick={() => scrollToSection('developer')} className="text-left py-2 hover:text-white transition duration-200">
              Developer Profile
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-left py-2 hover:text-white transition duration-200">
              FAQ Help
            </button>
          </nav>
          
          <button 
            onClick={() => scrollToSection('download')}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#00E5FF] text-slate-950 font-black text-center text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Get Free APK
          </button>
        </div>
      )}

      {/* SUB SECTIONS IN ORDER OF EXPERIENCE */}
      <main>
        {/* HERO STAGE */}
        <Hero 
          onScrollToFeatures={() => scrollToSection('features')} 
          onScrollToDownload={() => scrollToSection('download')} 
        />

        {/* INTERACTIVE PHONE SHOWCASE */}
        <PhoneShowcase />

        {/* BENTO GRID SPECIFICATIONS */}
        <Features />

        {/* SCREENSHOTS GALLERY */}
        <Gallery />

        {/* WHY CHOOSE MELODIFY STATISTICS */}
        <WhyMelodify />

        {/* DOWNLOAD MANAGER MODULE */}
        <DownloadSection />

        {/* GITHUB OPEN SOURCE PANEL */}
        <GithubSection />

        {/* ROADMAP TIMELINE EVOLUTION */}
        <Roadmap />

        {/* DEVELOPER PROFILE AND BIOGRAPHY */}
        <Developer />

        {/* COMPREHENSIVE FAQS ACCORDION */}
        <FAQ />
      </main>

      {/* GLOBAL FOOTER LINKS */}
      <Footer 
        onScrollToFeatures={() => scrollToSection('features')} 
        onScrollToDownload={() => scrollToSection('download')} 
      />

    </div>
  );
}
