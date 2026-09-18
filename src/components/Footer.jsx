import React from 'react';
import { ArrowUp, Heart, Code2, Terminal } from 'lucide-react';

export default function Footer({ personalInfo }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-950 border-t border-white/10 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono font-bold text-brand-cyan text-base">
                &lt;{personalInfo.name.split(' ')[0]}.dev /&gt;
              </span>
              <span className="px-2 py-0.5 rounded bg-brand-cyan/10 border border-brand-cyan/25 text-[10px] font-mono text-brand-cyan">
                MERN STACK
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              Architecting resilient, production-ready web applications from database schemas to polished pixels.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <a href="#home" className="hover:text-brand-cyan transition-colors">Home</a>
            <a href="#about" className="hover:text-brand-cyan transition-colors">About</a>
            <a href="#skills" className="hover:text-brand-cyan transition-colors">Skills</a>
            <a href="#projects" className="hover:text-brand-cyan transition-colors">Projects</a>
            <a href="#experience" className="hover:text-brand-cyan transition-colors">Experience</a>
            <a href="#contact" className="hover:text-brand-cyan transition-colors">Contact</a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-dark-900 border border-white/10 hover:border-brand-cyan/40 text-xs font-mono text-slate-300 hover:text-white transition-all shadow-sm group"
            title="Scroll to Top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-brand-cyan group-hover:-translate-y-0.5 transition-transform" />
          </button>

        </div>

        {/* Bottom copyright & tech stack badge */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
            <span>Built with</span>
            <span className="text-brand-cyan font-semibold">React.js</span>
            <span>&bull;</span>
            <span className="text-emerald-400 font-semibold">Tailwind CSS</span>
            <span>&bull;</span>
            <span className="text-purple-400 font-semibold">Vite</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
