import React from 'react';
import { Layers, Database, Layout, ShieldCheck, Code, CheckCircle, Sparkles, Terminal } from 'lucide-react';

export default function About({ personalInfo, philosophy }) {
  const iconMap = {
    Layers: Layers,
    Database: Database,
    Layout: Layout,
    ShieldCheck: ShieldCheck
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 right-0 w-80 h-80 radial-glow-purple pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 radial-glow-emerald pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-xs font-mono text-cyan-400 mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>01. ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering High-Impact <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">MERN Solutions</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
            Bridging the gap between scalable server architecture and intuitive user experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Narrative & Developer Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 relative">
              <div className="absolute -top-3 left-6 px-3 py-0.5 rounded bg-brand-cyan/20 border border-brand-cyan/40 text-[11px] font-mono text-brand-cyan">
                developer_manifesto.md
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 mt-2">
                Turning complex business requirements into fast, maintainable web systems.
              </h3>
              
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  {personalInfo.bio}
                </p>
                <p>
                  My journey began with a curiosity for how data flows across the web. That curiosity evolved into mastering the entire MERN spectrum: creating responsive React interfaces with state synchronization, designing high-throughput Node.js/Express APIs, and architecting optimized MongoDB schemas for real-time applications.
                </p>
                <p>
                  I treat code as an engineering craft: prioritizing clean patterns, maintainability, type safety, test coverage, and documentation so that teams can move fast without breaking production.
                </p>
              </div>

              {/* Quick Pillars Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 mt-6 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sub-second render pipelines</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Secure JWT & OAuth flows</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>REST & WebSocket protocols</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>MongoDB Atlas aggregation</span>
                </div>
              </div>

            </div>
          </div>

          {/* Core Philosophy Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {philosophy.map((item, idx) => {
              const IconComponent = iconMap[item.icon] || Code;
              return (
                <div
                  key={idx}
                  className="glass-card p-6 rounded-2xl border border-white/5 hover:border-brand-cyan/30 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center text-brand-cyan group-hover:scale-110 group-hover:bg-brand-cyan/20 transition-all duration-300 mb-4">
                      <IconComponent className="w-6 h-6 text-brand-cyan" />
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-brand-cyan transition-colors mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-4 flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan"></span>
                    <span>Standardized practice</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
