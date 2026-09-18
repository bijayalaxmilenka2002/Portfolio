import React, { useState } from 'react';
import { Terminal, ExternalLink, ArrowRight, Sparkles, Layers, BookOpen, Radio, Settings, Plus } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function Projects({ projects = [], onSelectProject, onOpenAdmin }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full-Stack MERN' },
    { id: 'frontend', label: 'React / Frontend' },
    { id: 'backend', label: 'Node & APIs' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-10 w-96 h-96 radial-glow-cyan pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 radial-glow-purple pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-xs font-mono text-cyan-400 mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>03. CASE STUDIES & WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple">Full-Stack Projects</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
            Real-world web applications built with the MERN stack. Designed with detailed case studies covering system architecture, challenges, and measurable results.
          </p>

          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-brand-cyan/30 text-xs font-medium text-brand-cyan hover:bg-brand-cyan/10 transition-colors shadow-sm cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Add or Manage Projects</span>
            </button>
          )}
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeFilter === filter.id
                  ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 shadow-[0_0_15px_rgba(0,242,254,0.15)]'
                  : 'bg-dark-900/60 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-white/5'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl border border-white/5 hover:border-brand-cyan/30 flex flex-col justify-between overflow-hidden group transition-all duration-300"
            >
              {/* Card Header Visual Mockup Preview */}
              <div className="p-6 bg-dark-950/70 border-b border-white/5 relative">
                
                {/* Live Status indicator */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  {project.demoUrl ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Live Deployed App
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-white/10 text-slate-300 text-[11px] font-mono font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan"></span>
                      GitHub Project
                    </span>
                  )}

                  <span className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-white/5">
                    {project.categoryLabel || 'Full-Stack'}
                  </span>
                </div>

                {/* Metrics ribbon */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-dark-900/80 border border-white/5 font-mono text-[11px] text-center mb-4">
                  <div>
                    <div className="text-slate-400 text-[10px]">Reliability</div>
                    <div className="text-emerald-400 font-bold">{project.metrics?.stars || 'Production'}</div>
                  </div>
                  <div className="border-x border-white/10">
                    <div className="text-slate-400 text-[10px]">Latency</div>
                    <div className="text-cyan-400 font-bold">{project.metrics?.perf || 'Optimized'}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">Feature</div>
                    <div className="text-purple-400 font-bold truncate px-1">{project.metrics?.users || 'Full-Stack'}</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-brand-cyan transition-colors">
                  {project.title}
                </h3>
                
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2">
                  {project.shortDesc}
                </p>
              </div>

              {/* Card Footer: Tech Stack & Actions */}
              <div className="p-6 flex flex-col justify-between flex-1 gap-6 bg-dark-900/40">
                
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-900/90 border border-white/5 text-[11px] font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/5">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-brand-cyan hover:text-cyan-300 transition-colors py-1 group/btn"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-dark-950 border border-white/10 text-slate-400 hover:text-white hover:border-brand-cyan/40 transition-colors"
                        title="View Source Code on GitHub"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-cyan/15 hover:bg-brand-cyan text-brand-cyan hover:text-dark-950 border border-brand-cyan/30 text-xs font-semibold transition-all"
                        title="Launch Live Project"
                      >
                        <span>Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
