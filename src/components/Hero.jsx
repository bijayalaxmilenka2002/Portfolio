import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, User, Camera, Upload, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Hero({ personalInfo, onUpdatePhoto }) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const fileInputRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    const currentRole = personalInfo.typedRoles[currentRoleIndex];
    let timer;

    if (!isDeleting && displayedText !== currentRole) {
      timer = setTimeout(() => {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
      }, 70);
    } else if (!isDeleting && displayedText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayedText !== '') {
      timer = setTimeout(() => {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
      }, 40);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % personalInfo.typedRoles.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex, personalInfo.typedRoles]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (onUpdatePhoto) {
        onUpdatePhoto(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] radial-glow-cyan pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Introductions & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs font-medium text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{personalInfo.status}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple">{personalInfo.name}</span>
                <br />
                <span className="text-slate-300 font-normal text-3xl sm:text-4xl md:text-5xl">
                  Engineering{' '}
                </span>
                <span className="inline-block text-brand-cyan font-mono border-b-2 border-brand-cyan pb-0.5">
                  {displayedText}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>
            </div>

            {/* Tagline & Statement */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              {personalInfo.tagline}
            </p>

            {/* MERN Stack Highlight Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs uppercase tracking-wider font-mono text-slate-400 mr-1">Core Stack:</span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> MongoDB
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-700/30 border border-slate-600/40 text-slate-300 text-xs font-mono font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Express.js
              </span>
              <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-mono font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> React.js
              </span>
              <span className="px-2.5 py-1 rounded-md bg-green-500/10 border border-green-500/25 text-green-400 text-xs font-mono font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Node.js
              </span>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4 w-full sm:w-auto">
              <a
                href="#projects"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue hover:from-cyan-400 hover:to-blue-500 text-dark-950 font-bold text-sm shadow-[0_0_25px_rgba(0,242,254,0.35)] hover:shadow-[0_0_35px_rgba(0,242,254,0.5)] transition-all transform hover:-translate-y-0.5"
              >
                <span>View Featured Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-dark-900/80 hover:bg-slate-800/90 text-slate-200 hover:text-white border border-slate-700/80 font-medium text-sm transition-all"
              >
                <span>Let's Connect</span>
              </a>

              {/* Social Pills */}
              <div className="flex items-center gap-2 pl-2">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-dark-900 border border-slate-700/70 text-slate-400 hover:text-white hover:border-brand-cyan/40 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-dark-900 border border-slate-700/70 text-slate-400 hover:text-white hover:border-brand-cyan/40 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Professional Photo Showcase Card */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <div className="relative group max-w-md w-full">
              {/* Outer decorative ambient backlight glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition duration-1000 group-hover:duration-200"></div>

              {/* Glass Card Container */}
              <div className="relative glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl backdrop-blur-xl bg-dark-900/85">
                
                {/* Image / Avatar Container */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-800 to-dark-950 border border-white/10 flex flex-col items-center justify-center group/img">
                  {personalInfo.avatarUrl ? (
                    <img
                      src={personalInfo.avatarUrl}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/img:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-cyan/20 to-brand-purple/20 border border-brand-cyan/40 flex items-center justify-center shadow-[0_0_20px_rgba(0,242,254,0.2)]">
                        <User className="w-12 h-12 text-brand-cyan" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg">{personalInfo.name}</h4>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">Backend &amp; MERN Engineer</p>
                      </div>
                      <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                        Add your professional photo here anytime.
                      </p>
                    </div>
                  )}

                  {/* Upload Overlay Button */}
                  <div className="absolute inset-0 bg-dark-950/60 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2.5 backdrop-blur-xs">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-dark-950 font-bold text-xs shadow-lg shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <Camera className="w-4 h-4" />
                      <span>{personalInfo.avatarUrl ? 'Change Photo' : 'Upload Your Photo'}</span>
                    </button>
                    <span className="text-[11px] text-slate-300 font-mono">PNG, JPG, WebP supported</span>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>

                {/* Floating Status / Highlight Badges */}
                <div className="mt-5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                    <div>
                      <div className="text-xs font-semibold text-white">Thryvoo Pvt. Ltd.</div>
                      <div className="text-[11px] text-brand-cyan font-mono">Backend Developer Intern</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
                    title="Upload profile photo"
                  >
                    <Upload className="w-3.5 h-3.5 text-brand-cyan" />
                    <span className="hidden sm:inline text-[11px]">Photo</span>
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
