import React, { useState } from 'react';
import { 
  Terminal, Code2, Server, Database, Wrench, CheckCircle2, 
  ArrowRight, Sparkles, Cpu, Layers, Activity, Settings, Plus
} from 'lucide-react';

export default function Skills({ skills = {}, onOpenAdmin }) {
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'frontend', label: 'Frontend (React & UI)' },
    { id: 'backend', label: 'Backend (Node & Express)' },
    { id: 'database', label: 'Database & Caching' },
    { id: 'tools', label: 'DevOps, Cloud & Tools' },
  ];

  // Helper to get skills for active tab
  const getDisplayedSkills = () => {
    if (activeTab === 'all') {
      return [
        ...(skills?.frontend || []).map(s => ({ ...s, category: 'Frontend' })),
        ...(skills?.backend || []).map(s => ({ ...s, category: 'Backend' })),
        ...(skills?.database || []).map(s => ({ ...s, category: 'Database' })),
        ...(skills?.tools || []).map(s => ({ ...s, category: 'Tools & DevOps' }))
      ];
    }
    return (skills?.[activeTab] || []).map(s => ({
      ...s,
      category: categories.find(c => c.id === activeTab)?.label.split(' ')[0] || 'Tech'
    }));
  };

  const displayedSkills = getDisplayedSkills();

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-dark-950/60">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 radial-glow-cyan pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono text-emerald-400 mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>02. TECHNICAL ARSENAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Full-Stack <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-brand-cyan to-brand-blue">Proficiencies</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
            Comprehensive mastery across the MERN stack ecosystem, RESTful API design, database modeling, and cloud deployments.
          </p>

          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-brand-cyan/30 text-xs font-medium text-brand-cyan hover:bg-brand-cyan/10 transition-colors shadow-sm cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Customize or Add Skills</span>
            </button>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeTab === cat.id
                  ? 'bg-gradient-to-r from-brand-cyan/20 to-brand-blue/20 text-brand-cyan border border-brand-cyan/40 shadow-[0_0_15px_rgba(0,242,254,0.15)]'
                  : 'bg-dark-900/60 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedSkills.map((skill, index) => (
            <div
              key={index}
              className="glass-card p-5 rounded-2xl border border-white/5 hover:border-brand-cyan/30 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Header */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-brand-cyan group-hover:scale-105 group-hover:border-brand-cyan/50 transition-all">
                      <Cpu className="w-5 h-5 text-brand-cyan" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-brand-cyan transition-colors">
                        {skill.name}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-400">
                        {skill.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                    {skill.level}%
                  </span>
                </div>

                {/* Proficiency Bar */}
                <div className="w-full bg-slate-800/60 h-1.5 rounded-full overflow-hidden my-3">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-brand-cyan to-brand-blue transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>

                {/* Key Tags / Sub-competencies */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {skill.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-slate-900/80 border border-white/5 text-[11px] font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive MERN Architecture Flow Diagram */}
        <div className="mt-16 p-6 sm:p-8 glass-panel rounded-2xl border border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan uppercase tracking-wider mb-1">
                <Layers className="w-4 h-4" />
                <span>Architecture Deep Dive</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                How My Full-Stack MERN Architecture Operates
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Event-Driven Reactive Loop
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            
            {/* Step 1: React UI */}
            <div className="p-4 rounded-xl bg-dark-900/90 border border-cyan-500/30 relative">
              <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-1">01. Client Tier</div>
              <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span> React 18 + SPA
              </h4>
              <p className="text-xs text-slate-300">
                Component state managed with Redux/Zustand. Dispatches async thunks via Axios with Bearer JWT tokens.
              </p>
            </div>

            {/* Step 2: Express Routing & Middleware */}
            <div className="p-4 rounded-xl bg-dark-900/90 border border-slate-600/40 relative">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">02. Gateway Tier</div>
              <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-300"></span> Express Middleware
              </h4>
              <p className="text-xs text-slate-300">
                Validates payloads, rate limits IPs, checks JWT authorization headers, sanitizes inputs, and routes requests.
              </p>
            </div>

            {/* Step 3: Node.js Controller */}
            <div className="p-4 rounded-xl bg-dark-900/90 border border-green-500/30 relative">
              <div className="text-[10px] font-mono text-green-400 uppercase tracking-wider mb-1">03. Logic Tier</div>
              <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400"></span> Node.js Microservices
              </h4>
              <p className="text-xs text-slate-300">
                Executes business logic, queries Redis caches for warm data, handles async background tasks and event emitting.
              </p>
            </div>

            {/* Step 4: MongoDB Atlas */}
            <div className="p-4 rounded-xl bg-dark-900/90 border border-emerald-500/30 relative">
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-1">04. Data Tier</div>
              <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> MongoDB + Mongoose
              </h4>
              <p className="text-xs text-slate-300">
                Executes multi-stage aggregation pipelines on indexed collections with atomic transactions and schema validation.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
