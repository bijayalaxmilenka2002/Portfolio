import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Shield, Layers, TrendingUp, AlertCircle } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectModal({ project, onClose }) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-dark-950/80 backdrop-blur-md animate-fadeIn">
      {/* Backdrop click to close */}
      <div 
        className="fixed inset-0"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-dark-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-start justify-between bg-dark-950/80 sticky top-0 z-20 backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan text-xs font-mono font-medium">
                {project.categoryLabel}
              </span>
              <span className="text-xs font-mono text-slate-400">
                CASE STUDY &bull; {project.id.toUpperCase()}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-white/5 transition-colors shrink-0 ml-4"
            aria-label="Close Case Study Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 font-sans">
          
          {/* Quick Links & Tech Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-dark-950/60 border border-white/5">
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-slate-800 text-xs font-mono text-slate-300 border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 text-xs font-semibold text-white transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Source Code</span>
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-brand-cyan hover:bg-cyan-400 text-dark-950 text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,242,254,0.3)]"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Section 1: Problem Statement */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-wider">
              <AlertCircle className="w-4 h-4" />
              <span>01. The Problem</span>
            </div>
            <h3 className="text-lg font-bold text-white">Challenges & User Pain Points</h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-rose-500/5 p-4 rounded-xl border border-rose-500/15">
              {project.caseStudy.problem}
            </p>
          </div>

          {/* Section 2: Solution & Architecture */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>02. Architecture & Technical Strategy</span>
            </div>
            <h3 className="text-lg font-bold text-white">Engineered Solution</h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-3">
              {project.caseStudy.solution}
            </p>
            <div className="p-4 rounded-xl bg-dark-950 border border-brand-cyan/20 font-mono text-xs text-slate-300">
              <div className="text-slate-400 mb-1">// System Topology:</div>
              {project.caseStudy.architecture}
            </div>
          </div>

          {/* Section 3: Key Features */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>03. Core Capabilities</span>
            </div>
            <h3 className="text-lg font-bold text-white">Implemented Feature Set</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.caseStudy.features.map((feature, fIdx) => (
                <div
                  key={fIdx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-dark-950/80 border border-white/5 text-xs text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Contribution & Measurable Outcomes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5" />
                <span>My Contribution</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.caseStudy.contribution}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Measurable Impact</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-300 leading-relaxed font-medium bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                {project.caseStudy.outcome}
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-dark-950/90 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">
            Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">Esc</kbd> to close
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors"
          >
            Done Reading
          </button>
        </div>

      </div>
    </div>
  );
}
