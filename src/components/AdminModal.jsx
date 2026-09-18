import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  User,
  Cpu,
  FolderGit2,
  FileText,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Check,
  ExternalLink,
  Sparkles,
  Download,
  AlertCircle
} from 'lucide-react';

export default function AdminModal({ isOpen, onClose, data, onUpdateData, onResetData }) {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'skills' | 'projects' | 'backup'
  const [saveNotification, setSaveNotification] = useState('');
  
  // Image and resume file input refs
  const photoInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  // New Skill form state
  const [newSkill, setNewSkill] = useState({
    category: 'frontend',
    name: '',
    level: 90,
    tags: ''
  });

  // New Project form state
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'fullstack',
    shortDesc: '',
    techStack: '',
    githubUrl: '',
    demoUrl: ''
  });

  if (!isOpen) return null;

  const showSaveNotice = (msg) => {
    setSaveNotification(msg);
    setTimeout(() => setSaveNotification(''), 3000);
  };

  // --- Profile handlers ---
  const handleProfileChange = (field, value) => {
    const updated = {
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    };
    onUpdateData(updated);
    showSaveNotice('Profile updated!');
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      handleProfileChange('avatarUrl', base64);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    handleProfileChange('avatarUrl', null);
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Supports PDF, Word (.doc, .docx), RTF, TXT, or any resume file type
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      const updated = {
        ...data,
        personalInfo: {
          ...data.personalInfo,
          resumeUrl: base64,
          resumeFileName: file.name,
          resumeFileType: file.type || 'application/octet-stream'
        }
      };
      onUpdateData(updated);
      showSaveNotice(`Resume (${file.name}) uploaded successfully!`);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveResume = () => {
    const updated = {
      ...data,
      personalInfo: {
        ...data.personalInfo,
        resumeUrl: null,
        resumeFileName: null,
        resumeFileType: null
      }
    };
    onUpdateData(updated);
    showSaveNotice('Custom resume removed.');
  };

  // --- Skills handlers ---
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.name.trim()) return;

    const catKey = newSkill.category;
    const currentList = data.skills[catKey] || [];
    
    const skillObj = {
      name: newSkill.name.trim(),
      level: Number(newSkill.level),
      icon: 'FileCode',
      tags: newSkill.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    const updated = {
      ...data,
      skills: {
        ...data.skills,
        [catKey]: [...currentList, skillObj]
      }
    };

    onUpdateData(updated);
    setNewSkill({ category: newSkill.category, name: '', level: 90, tags: '' });
    showSaveNotice(`Added ${skillObj.name} to skills!`);
  };

  const handleDeleteSkill = (catKey, index) => {
    const updatedCatList = data.skills[catKey].filter((_, i) => i !== index);
    const updated = {
      ...data,
      skills: {
        ...data.skills,
        [catKey]: updatedCatList
      }
    };
    onUpdateData(updated);
    showSaveNotice('Skill removed.');
  };

  // --- Projects handlers ---
  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;

    const id = newProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const categoryLabels = {
      fullstack: 'Full-Stack MERN',
      frontend: 'React / Frontend',
      backend: 'Node & APIs'
    };

    const projectObj = {
      id,
      title: newProject.title.trim(),
      category: newProject.category,
      categoryLabel: categoryLabels[newProject.category] || 'Full-Stack',
      shortDesc: newProject.shortDesc.trim() || 'A modern full-stack web application.',
      techStack: newProject.techStack.split(',').map(t => t.trim()).filter(Boolean),
      githubUrl: newProject.githubUrl.trim() || data.personalInfo.github,
      demoUrl: newProject.demoUrl.trim() || null,
      featured: false,
      metrics: {
        stars: newProject.demoUrl ? 'Live App' : 'Open Source',
        perf: 'Optimized',
        users: 'Full Stack'
      },
      caseStudy: {
        problem: 'Engineering challenges addressed by this application.',
        solution: newProject.shortDesc.trim() || 'Modern full-stack web solution.',
        architecture: 'Modular architecture built with clean code and modern frameworks.',
        features: [
          'High performance and responsive user interface',
          'Modular state management and clean controller logic',
          'Production-ready code architecture'
        ],
        contribution: 'Designed and developed full application lifecycle.',
        outcome: 'Reliable, scalable application meeting requirements.'
      }
    };

    const updated = {
      ...data,
      projects: [projectObj, ...data.projects]
    };

    onUpdateData(updated);
    setNewProject({
      title: '',
      category: 'fullstack',
      shortDesc: '',
      techStack: '',
      githubUrl: '',
      demoUrl: ''
    });
    showSaveNotice(`Added ${projectObj.title}!`);
  };

  const handleDeleteProject = (projectId) => {
    const updated = {
      ...data,
      projects: data.projects.filter(p => p.id !== projectId)
    };
    onUpdateData(updated);
    showSaveNotice('Project deleted.');
  };

  // --- Export handler ---
  const handleDownloadBackup = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-dark-950/80 backdrop-blur-md animate-fadeIn">
      {/* Modal Window */}
      <div className="relative w-full max-w-4xl bg-dark-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-dark-950/80 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-blue flex items-center justify-center text-dark-950 font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Portfolio Management Dashboard
              </h2>
              <p className="text-xs text-slate-400">
                Live Dynamic Editor &bull; Updates save instantly in your browser
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Close Dashboard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Save feedback indicator */}
        {saveNotification && (
          <div className="px-6 py-2 bg-emerald-500/15 border-b border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4" />
            <span>{saveNotification}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 py-3 bg-dark-950/50 border-b border-white/5 overflow-x-auto text-xs font-mono">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
              activeTab === 'profile'
                ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile &amp; Documents</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
              activeTab === 'skills'
                ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Skills Manager</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
              activeTab === 'projects'
                ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Projects Manager</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ml-auto ${
              activeTab === 'backup'
                ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Backup &amp; Reset</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-200">
          
          {/* TAB 1: PROFILE & DOCUMENTS */}
          {activeTab === 'profile' && (
            <div className="space-y-8">
              
              {/* Photo & Resume Upload Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Profile Photo Card */}
                <div className="p-5 rounded-2xl bg-dark-950/60 border border-white/10 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="text-xs font-mono uppercase text-brand-cyan tracking-wider mb-1 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Profile Photo
                    </h4>
                    <p className="text-xs text-slate-400">
                      Upload your professional picture. Displays prominently on the Hero showcase.
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-brand-cyan/40 overflow-hidden flex items-center justify-center shrink-0">
                      {data.personalInfo.avatarUrl ? (
                        <img
                          src={data.personalInfo.avatarUrl}
                          alt="Profile Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-slate-500" />
                      )}
                    </div>

                    <div className="space-y-2">
                      <input
                        type="file"
                        ref={photoInputRef}
                        onChange={handlePhotoUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        onClick={() => photoInputRef.current?.click()}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-cyan/15 hover:bg-brand-cyan text-brand-cyan hover:text-dark-950 border border-brand-cyan/30 text-xs font-semibold transition-all"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo</span>
                      </button>

                      {data.personalInfo.avatarUrl && (
                        <button
                          onClick={handleRemovePhoto}
                          className="block text-xs text-rose-400 hover:text-rose-300 font-mono underline"
                        >
                          Remove custom photo
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Resume Upload Card */}
                <div className="p-5 rounded-2xl bg-dark-950/60 border border-white/10 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="text-xs font-mono uppercase text-brand-cyan tracking-wider mb-1 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Resume Upload (PDF / Word / Any File)
                    </h4>
                    <p className="text-xs text-slate-400">
                      Upload your resume in PDF, Word (.doc, .docx), RTF, or text format. Clicking "Resume" anywhere on the portfolio will download this file directly.
                    </p>
                  </div>

                  <div>
                    <input
                      type="file"
                      ref={resumeInputRef}
                      onChange={handleResumeUpload}
                      accept=".pdf,.doc,.docx,.rtf,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className="hidden"
                    />
                    
                    {data.personalInfo.resumeFileName ? (
                      <div className="space-y-2">
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center justify-between gap-2">
                          <span className="truncate">{data.personalInfo.resumeFileName}</span>
                          <Check className="w-4 h-4 shrink-0" />
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => resumeInputRef.current?.click()}
                            className="text-xs text-brand-cyan hover:underline font-mono cursor-pointer"
                          >
                            Replace File
                          </button>
                          <button
                            type="button"
                            onClick={handleRemoveResume}
                            className="text-xs text-rose-400 hover:underline font-mono cursor-pointer"
                          >
                            Remove Custom File
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => resumeInputRef.current?.click()}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-blue text-dark-950 text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,242,254,0.2)] cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Resume (PDF / Word)</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>

              {/* Personal Details Form */}
              <div className="p-5 rounded-2xl bg-dark-950/60 border border-white/10 space-y-4">
                <h4 className="text-xs font-mono uppercase text-brand-cyan tracking-wider">
                  Personal Details &amp; Links
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={data.personalInfo.name}
                      onChange={(e) => handleProfileChange('name', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-white/10 text-xs text-white focus:border-brand-cyan focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Primary Role</label>
                    <input
                      type="text"
                      value={data.personalInfo.role}
                      onChange={(e) => handleProfileChange('role', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-white/10 text-xs text-white focus:border-brand-cyan focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Email</label>
                    <input
                      type="email"
                      value={data.personalInfo.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-white/10 text-xs text-white focus:border-brand-cyan focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">GitHub Profile URL</label>
                    <input
                      type="url"
                      value={data.personalInfo.github}
                      onChange={(e) => handleProfileChange('github', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-white/10 text-xs text-white focus:border-brand-cyan focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono text-slate-400 mb-1">LinkedIn Profile URL</label>
                    <input
                      type="url"
                      value={data.personalInfo.linkedin}
                      onChange={(e) => handleProfileChange('linkedin', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-white/10 text-xs text-white focus:border-brand-cyan focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono text-slate-400 mb-1">Hero Tagline</label>
                    <textarea
                      rows="2"
                      value={data.personalInfo.tagline}
                      onChange={(e) => handleProfileChange('tagline', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-white/10 text-xs text-white focus:border-brand-cyan focus:outline-none resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: SKILLS MANAGER */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              
              {/* Add New Skill Card */}
              <form onSubmit={handleAddSkill} className="p-5 rounded-2xl bg-dark-950/60 border border-brand-cyan/20 space-y-4">
                <h4 className="text-xs font-mono uppercase text-brand-cyan tracking-wider flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add New Skill
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Skill Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Next.js / GraphQL"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-xs text-white focus:border-brand-cyan focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Category</label>
                    <select
                      value={newSkill.category}
                      onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-xs text-white focus:border-brand-cyan focus:outline-none"
                    >
                      <option value="frontend">Frontend</option>
                      <option value="backend">Backend</option>
                      <option value="database">Database</option>
                      <option value="tools">Tools &amp; DevOps</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Proficiency: {newSkill.level}%
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={newSkill.level}
                      onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                      className="w-full accent-cyan-400 mt-2"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. SSR, App Router, Hooks"
                      value={newSkill.tags}
                      onChange={(e) => setNewSkill({ ...newSkill, tags: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-xs text-white focus:border-brand-cyan focus:outline-none"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full py-2 px-4 rounded-xl bg-brand-cyan text-dark-950 font-bold text-xs hover:bg-cyan-400 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Skill</span>
                    </button>
                  </div>
                </div>
              </form>

              {/* Current Skills List by Category */}
              {['frontend', 'backend', 'database', 'tools'].map((catKey) => {
                const list = data.skills[catKey] || [];
                return (
                  <div key={catKey} className="p-4 rounded-2xl bg-dark-950/40 border border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase text-slate-400 tracking-wider font-bold">
                        {catKey} ({list.length})
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {list.map((skill, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-dark-900 border border-white/5 group hover:border-white/15 transition-all"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{skill.name}</span>
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                              {skill.level}%
                            </span>
                          </div>

                          <button
                            onClick={() => handleDeleteSkill(catKey, sIdx)}
                            className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                            title="Remove Skill"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

            </div>
          )}

          {/* TAB 3: PROJECTS MANAGER */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              
              {/* Add New Project Form */}
              <form onSubmit={handleAddProject} className="p-5 rounded-2xl bg-dark-950/60 border border-brand-cyan/20 space-y-4">
                <h4 className="text-xs font-mono uppercase text-brand-cyan tracking-wider flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add New Project
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Project Title</label>
                    <input
                      type="text"
                      placeholder="e.g. AI Content Studio"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-xs text-white focus:border-brand-cyan focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Category</label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-xs text-white focus:border-brand-cyan focus:outline-none"
                    >
                      <option value="fullstack">Full-Stack MERN</option>
                      <option value="frontend">React / Frontend</option>
                      <option value="backend">Node &amp; APIs</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Short Description
                    </label>
                    <input
                      type="text"
                      placeholder="Brief overview of what this project does..."
                      value={newProject.shortDesc}
                      onChange={(e) => setNewProject({ ...newProject, shortDesc: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-xs text-white focus:border-brand-cyan focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Tech Stack (comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="React, Node.js, MongoDB, Tailwind"
                      value={newProject.techStack}
                      onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-xs text-white focus:border-brand-cyan focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">GitHub Repo URL</label>
                    <input
                      type="url"
                      placeholder="https://github.com/bijayalaxmilenka2002/..."
                      value={newProject.githubUrl}
                      onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-xs text-white focus:border-brand-cyan focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Live Demo URL (Leave blank if normal GitHub project)
                    </label>
                    <input
                      type="url"
                      placeholder="https://your-app.vercel.app (optional)"
                      value={newProject.demoUrl}
                      onChange={(e) => setNewProject({ ...newProject, demoUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-xs text-white focus:border-brand-cyan focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2 pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-dark-950 font-bold text-xs hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Project to Portfolio</span>
                    </button>
                  </div>
                </div>
              </form>

              {/* Current Projects List */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase text-slate-400 tracking-wider font-bold">
                  Existing Projects ({data.projects.length})
                </span>

                <div className="space-y-2">
                  {data.projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-dark-950 border border-white/5 group hover:border-white/15 transition-all"
                    >
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{proj.title}</span>
                          {proj.demoUrl ? (
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                              Live Deployed
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                              GitHub Only
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {proj.techStack?.join(' • ')}
                        </span>
                      </div>

                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="text-slate-500 hover:text-rose-400 p-1.5 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: BACKUP & RESET */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-dark-950/60 border border-white/10 space-y-3">
                <h4 className="text-xs font-mono uppercase text-brand-cyan tracking-wider flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export &amp; Backup
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  All updates you make are automatically saved in your browser's local storage. You can download a complete JSON backup anytime to keep a permanent archive.
                </p>
                <button
                  onClick={handleDownloadBackup}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-white/10 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download JSON Backup</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-3">
                <h4 className="text-xs font-mono uppercase text-rose-400 tracking-wider flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Reset to Code Defaults
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Want to clear all custom changes and restore the original code data from portfolioData.js? This will reset your custom skills, projects, and uploaded photo.
                </p>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to reset all data to default?')) {
                      onResetData();
                      showSaveNotice('Reset to defaults.');
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All to Defaults</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-dark-950/80 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono text-[11px] text-slate-500">
            Changes auto-saved to localStorage
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-dark-950 font-bold text-xs hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all"
          >
            Done Editing
          </button>
        </div>

      </div>
    </div>
  );
}
