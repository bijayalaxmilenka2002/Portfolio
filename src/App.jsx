import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ProjectModal from './components/ProjectModal';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminModal from './components/AdminModal';
import { portfolioData } from './data/portfolioData';

export default function App() {
  const [portfolio, setPortfolio] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_user_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...portfolioData,
          ...parsed,
          personalInfo: {
            ...portfolioData.personalInfo,
            ...(parsed.personalInfo || {})
          },
          skills: {
            ...portfolioData.skills,
            ...(parsed.skills || {})
          },
          projects: Array.isArray(parsed.projects) ? parsed.projects : portfolioData.projects
        };
      }
    } catch (e) {
      console.error('Error loading saved portfolio data:', e);
    }
    return portfolioData;
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleUpdateData = (newData) => {
    setPortfolio(newData);
    try {
      localStorage.setItem('portfolio_user_data', JSON.stringify(newData));
    } catch (e) {
      console.error('Error saving portfolio data to localStorage:', e);
    }
  };

  const handleUpdatePhoto = (avatarUrl) => {
    const updated = {
      ...portfolio,
      personalInfo: {
        ...portfolio.personalInfo,
        avatarUrl
      }
    };
    handleUpdateData(updated);
  };

  const handleUpdateResume = (resumeUrl, resumeFileName, resumeFileType) => {
    const updated = {
      ...portfolio,
      personalInfo: {
        ...portfolio.personalInfo,
        resumeUrl,
        resumeFileName,
        resumeFileType
      }
    };
    handleUpdateData(updated);
  };

  const handleResetData = () => {
    try {
      localStorage.removeItem('portfolio_user_data');
    } catch (e) {
      console.error('Error clearing localStorage:', e);
    }
    setPortfolio(portfolioData);
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 selection:bg-brand-cyan/20 selection:text-brand-cyan relative">
      {/* Sticky Navigation */}
      <Navbar 
        personalInfo={portfolio.personalInfo} 
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main>
        {/* Hero Section */}
        <Hero 
          personalInfo={portfolio.personalInfo} 
          onUpdatePhoto={handleUpdatePhoto}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* About Section */}
        <About 
          personalInfo={portfolio.personalInfo}
          philosophy={portfolio.philosophy}
        />

        {/* Skills Section */}
        <Skills 
          skills={portfolio.skills} 
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Featured Projects with Case Study triggers */}
        <Projects 
          projects={portfolio.projects}
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Career Experience, Education & Resume */}
        <Experience 
          experience={portfolio.experience}
          education={portfolio.education}
          certifications={portfolio.certifications}
          personalInfo={portfolio.personalInfo}
          onUpdateResume={handleUpdateResume}
        />

        {/* Contact Section */}
        <Contact personalInfo={portfolio.personalInfo} />
      </main>

      {/* Footer */}
      <Footer personalInfo={portfolio.personalInfo} />

      {/* Case Study Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Dynamic Content Admin Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        data={portfolio}
        onUpdateData={handleUpdateData}
        onResetData={handleResetData}
      />

      {/* Floating Quick Edit Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAdminOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-dark-900/90 hover:bg-slate-800 border border-brand-cyan/40 text-brand-cyan hover:text-white text-xs font-semibold shadow-[0_4px_20px_rgba(0,242,254,0.25)] hover:shadow-[0_4px_25px_rgba(0,242,254,0.4)] backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer group"
          title="Open Portfolio Editor (Skills, Projects, Resume, Photo)"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
          </span>
          <Settings className="w-4 h-4 text-brand-cyan group-hover:rotate-90 transition-transform duration-300" />
          <span className="font-mono">Edit Portfolio</span>
        </button>
      </div>
    </div>
  );
}
