import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Check, Info } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQ() {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      q: 'Is Melodify actually 100% free with zero ads?',
      a: 'Yes, absolutely. Melodify is a passion project built for public beta testing and is 100% free of charge. There are no premium subscription tiers, no paywalled DSP settings, and zero marketing advertisements. You can stream or listen to local music indefinitely without interruptions.'
    },
    {
      q: 'Can I play downloaded offline songs directly from my storage?',
      a: 'Yes! Melodify features an integrated filesystem scraper that parses and decodes offline audio formats (.mp3, .m4a, .flac, .ogg, .wav). Your files are indexed locally inside a secure database, allowing rapid offline search and zero-buffering playback.'
    },
    {
      q: 'Will Melodify come to the Google Play Store?',
      a: 'We are currently focused on public beta testing through GitHub Releases and direct secure APK downloads to iterate as quickly as possible. We plan to submit Melodify to the Google Play Store once the beta phase is fully completed in late 2026.'
    },
    {
      q: 'How do I safely install the Android APK?',
      a: 'Simply download the .apk file from our secure pipelines. Go to Android Settings -> Apps -> Special App Access -> Install Unknown Apps, and grant your browser or file coordinator permission to allow external packages. Once granted, tap the downloaded APK in your Downloads folder to install. It is 100% secure.'
    },
    {
      q: 'Is my listening history and personal data kept private?',
      a: 'Absolutely. We hold no central servers, logs, or behavioral tracking files. Your user profile, custom parametric equalizer presets, and playlist collections reside entirely inside your device’s local Room SQLite database cache. We collect exactly 0 bytes of metadata.'
    }
  ];

  return (
    <section id="faq" className="bg-[#020205] py-24 sm:py-32 px-4 border-t border-white/5 select-none relative overflow-hidden">
      
      {/* Background aurora glow */}
      <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-[#FF2D6F]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10 space-y-16">
        
        {/* Header Block */}
        <div className="text-center space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#6C5CE7]">COMMON INQUIRIES</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions.
          </h2>
          <p className="text-base text-slate-400">
            Got questions about Melodify? We have compiled detailed answers covering security, caching, Play Store pathways, and code privacy.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeIdx === idx;
            return (
              <div 
                key={idx}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isOpen 
                    ? 'bg-[#6C5CE7]/5 border-[#6C5CE7]/25 text-[#6C5CE7]' 
                    : 'bg-slate-900/20 border-white/5 text-slate-400 hover:border-slate-800'
                }`}
                onClick={() => setActiveIdx(isOpen ? null : idx)}
              >
                <div className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 flex-shrink-0 ${isOpen ? 'text-[#00E5FF]' : 'text-slate-500'}`} />
                    <h4 className="text-sm sm:text-base font-extrabold text-white leading-snug">{faq.q}</h4>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : ''}`} />
                </div>

                {isOpen && (
                  <p className="text-xs sm:text-sm text-slate-300 mt-4 pl-8 leading-relaxed animate-fade-in-down">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Under FAQ advisory note */}
        <div className="p-4 rounded-2xl bg-slate-900/30 border border-white/5 flex gap-3 text-left max-w-2xl mx-auto">
          <Info className="w-5 h-5 text-[#00E5FF] flex-shrink-0" />
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Have a different question or encountered an audio playback bug? Visit our GitHub Issues page to document feedback, or email us directly at <strong>rajeshkesharwani272@gmail.com</strong>.
          </p>
        </div>

      </div>

    </section>
  );
}
