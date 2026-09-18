import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, ArrowUpRight, Code, Download, Settings } from 'lucide-react';

export default function Navbar({ personalInfo, onOpenAdmin }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Simple active section detection
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleResumeDownload = () => {
    // If user uploaded a custom resume (PDF, etc.), download it directly
    if (personalInfo.resumeUrl) {
      const a = document.createElement('a');
      a.href = personalInfo.resumeUrl;
      a.download = personalInfo.resumeFileName || `${personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    // Otherwise generate a clean markdown resume file to download directly
    const resumeContent = `# ${personalInfo.name} - ${personalInfo.role}
Email: ${personalInfo.email}
GitHub: ${personalInfo.github}
LinkedIn: ${personalInfo.linkedin}

## Professional Summary
${personalInfo.bio}

## Core Competencies (MERN Stack)
- Frontend: React.js, Redux Toolkit, JavaScript (ES6+), TypeScript, Tailwind CSS, HTML5/CSS3
- Backend: Node.js, Express.js, RESTful APIs, WebSockets, JWT Authentication, Microservices
- Database: MongoDB, Mongoose ODM, MongoDB Atlas, Aggregation Pipelines, Redis, PostgreSQL
- DevOps & Tools: Git, Docker, Postman, Vercel, Render, CI/CD pipelines
`;

    const blob = new Blob([resumeContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${personalInfo.name.replace(/\s+/g, '_')}_MERN_Developer_Resume.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-950/85 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 rounded-lg p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-cyan via-brand-blue to-brand-purple p-[1.5px] group-hover:shadow-[0_0_20px_rgba(0,242,254,0.5)] transition-all duration-300">
            <div className="w-full h-full bg-dark-900 rounded-[10px] flex items-center justify-center">
              <span className="font-mono font-bold text-brand-cyan text-base tracking-tighter">
                &lt;M/&gt;
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-lg tracking-tight group-hover:text-brand-cyan transition-colors">
              {personalInfo.name.split(' ')[0]}
              <span className="text-brand-cyan">.dev</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono -mt-1 tracking-wider uppercase">
              MERN Stack
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-dark-900/60 border border-white/5 px-3 py-1.5 rounded-full backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30 shadow-[0_0_12px_rgba(0,242,254,0.2)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-cyan/40 bg-brand-cyan/10 hover:bg-brand-cyan/20 text-brand-cyan hover:text-white text-xs font-semibold transition-all shadow-[0_0_12px_rgba(0,242,254,0.15)] cursor-pointer"
            title="Edit Portfolio (Skills, Projects, Resume, Photo)"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Edit Portfolio</span>
          </button>

          <button
            onClick={handleResumeDownload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-700 bg-dark-900/80 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-medium transition-all cursor-pointer"
            title="Download Developer Resume"
          >
            <Download className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Resume</span>
          </button>

          <a
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-blue hover:from-cyan-400 hover:to-blue-500 text-dark-950 font-semibold text-xs transition-all shadow-[0_0_15px_rgba(0,242,254,0.3)] hover:shadow-[0_0_22px_rgba(0,242,254,0.5)]"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-dark-900 border border-white/10 text-slate-300 hover:text-white hover:border-brand-cyan/40 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark-950/95 border-b border-white/10 backdrop-blur-xl px-4 pt-3 pb-6 animate-fadeIn">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:text-brand-cyan hover:bg-white/5 transition-all"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenAdmin?.();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-brand-cyan/40 bg-brand-cyan/15 text-xs font-semibold text-brand-cyan"
              >
                <Settings className="w-4 h-4" />
                Edit Portfolio (Skills &amp; Projects)
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleResumeDownload();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-700 bg-dark-900 text-xs font-medium text-slate-200"
                >
                  <Download className="w-4 h-4 text-brand-cyan" />
                  Resume
                </button>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-brand-cyan text-dark-950 text-xs font-semibold"
                >
                  Let's Talk
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
