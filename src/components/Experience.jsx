import React, { useState, useRef } from 'react';
import { 
  Terminal, Briefcase, GraduationCap, Award, Calendar, CheckCircle2, 
  ChevronRight, Sparkles, FileText, Download, Upload, Trash2, Check, ExternalLink 
} from 'lucide-react';

export default function Experience({ 
  experience = [], 
  education = [], 
  certifications = [], 
  personalInfo = {}, 
  onUpdateResume 
}) {
  const [activeTab, setActiveTab] = useState('experience'); // 'experience' | 'education' | 'resume'
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState('');
  const resumeInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      if (onUpdateResume) {
        onUpdateResume(base64, file.name, file.type || 'application/octet-stream');
      }
      setUploadSuccessMsg(`Successfully uploaded "${file.name}"!`);
      setTimeout(() => setUploadSuccessMsg(''), 4000);
    };
    reader.readAsDataURL(file);
  };

  const handleDownloadResume = () => {
    if (personalInfo?.resumeUrl) {
      const a = document.createElement('a');
      a.href = personalInfo.resumeUrl;
      a.download = personalInfo.resumeFileName || `${(personalInfo.name || 'Bijayalaxmi_Lenka').replace(/\s+/g, '_')}_Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    // Default markdown/text download
    const resumeContent = `# ${personalInfo?.name || 'Bijayalaxmi Lenka'} - ${personalInfo?.role || 'Full-Stack Developer'}
Email: ${personalInfo?.email || 'bijayalaxmilenka48@gmail.com'}
GitHub: ${personalInfo?.github || 'https://github.com/bijayalaxmilenka2002'}
LinkedIn: ${personalInfo?.linkedin || ''}

## Education
- MCA: Indira Gandhi Institute of Technology (2024 - 2026), 9.5 CGPA
- BCA: NIIS Group of Institutions (2021 - 2024), 8.5 CGPA (Best Student Award)
- Apna College MERN Stack Development Certification

## Experience
- Backend Developer Intern @ Thryvoo Pvt. Ltd. (Aug 2026 - Present)

## Core Stack
MongoDB, Express.js, React.js, Node.js, REST APIs, WebSockets, JWT Authentication
`;
    const blob = new Blob([resumeContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(personalInfo?.name || 'Bijayalaxmi_Lenka').replace(/\s+/g, '_')}_Resume.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRemoveResume = () => {
    if (onUpdateResume) {
      onUpdateResume(null, null, null);
      setUploadSuccessMsg('Custom resume removed. Default resume restored.');
      setTimeout(() => setUploadSuccessMsg(''), 4000);
    }
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-10 w-80 h-80 radial-glow-cyan pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 radial-glow-purple pointer-events-none -z-10"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-xs font-mono text-cyan-400 mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>04. CAREER TRAJECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Experience &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">Background</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl text-sm sm:text-base">
            My track record of shipping production-grade full-stack web applications, educational credentials, and downloadable resume.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-dark-900/80 border border-white/10 backdrop-blur-md gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('experience')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'experience'
                  ? 'bg-gradient-to-r from-brand-cyan to-brand-blue text-dark-950 shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Work Experience</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'education'
                  ? 'bg-gradient-to-r from-brand-cyan to-brand-blue text-dark-950 shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Education &amp; Credentials</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('resume')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'resume'
                  ? 'bg-gradient-to-r from-brand-cyan to-brand-blue text-dark-950 shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Resume &amp; CV</span>
              {personalInfo?.resumeFileName && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              )}
            </button>
          </div>
        </div>

        {/* Content View */}
        {activeTab === 'experience' ? (
          experience.length === 1 ? (
            <div className="max-w-3xl mx-auto">
              {experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-brand-cyan/40 shadow-xl transition-all relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple"></div>

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-md bg-brand-cyan/10 border border-brand-cyan/25 text-brand-cyan font-mono text-xs flex items-center gap-1.5">
                      {exp.period.includes('Present') && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      )}
                      {exp.period}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                      {exp.type}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-brand-cyan transition-colors">
                    {exp.role}
                  </h3>
                  <div className="text-base font-medium text-slate-300 mb-6">
                    {exp.company}
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-3 mb-6">
                    {exp.highlights.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                    {exp.technologies.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md bg-slate-900 border border-white/5 text-[11px] font-mono text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6 relative before:absolute before:inset-0 before:left-6 md:before:left-1/2 before:w-0.5 before:-ml-px before:bg-gradient-to-b before:from-brand-cyan before:via-brand-blue before:to-transparent">
              {experience.map((exp, idx) => (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row items-start ${
                    idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                  } gap-6 group`}
                >
                  {/* Timeline center node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-dark-950 border-2 border-brand-cyan group-hover:bg-brand-cyan shadow-[0_0_10px_rgba(0,242,254,0.6)] z-10 transition-colors"></div>

                  {/* Content Card */}
                  <div className="ml-12 md:ml-0 md:w-1/2 pl-0 md:px-8 w-full">
                    <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-brand-cyan/30 transition-all">
                      
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-brand-cyan/10 border border-brand-cyan/25 text-brand-cyan font-mono text-xs flex items-center gap-1.5">
                          {exp.period.includes('Present') && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          )}
                          {exp.period}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {exp.type}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-medium text-slate-300 mb-4">
                        {exp.company}
                      </div>

                      {/* Highlights */}
                      <ul className="space-y-2 mb-4">
                        {exp.highlights.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-1 pt-3 border-t border-white/5">
                        {exp.technologies.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded bg-slate-900 border border-white/5 text-[10px] font-mono text-slate-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="space-y-8">
            {/* Education Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="glass-card p-6 rounded-2xl border border-white/5 hover:border-brand-cyan/40 flex flex-col justify-between group transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-md bg-brand-cyan/10 border border-brand-cyan/25 text-brand-cyan font-mono text-xs">
                        {edu.period}
                      </span>
                      {edu.badge && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold shadow-[0_0_10px_rgba(52,211,153,0.15)]">
                          <Sparkles className="w-3 h-3 text-emerald-400" />
                          {edu.badge}
                        </span>
                      )}
                      <GraduationCap className="w-5 h-5 text-slate-400 group-hover:text-brand-cyan transition-colors ml-auto" />
                    </div>

                    <h3 className="text-base font-bold text-white mb-1 group-hover:text-brand-cyan transition-colors">
                      {edu.degree}
                    </h3>
                    <div className="text-xs font-medium text-slate-300 mb-3">
                      {edu.institution}
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {edu.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-medium">
                    <Award className="w-4 h-4 shrink-0 text-amber-400" />
                    <span className="truncate">{edu.honors}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications Badge Grid */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
              <h3 className="text-sm font-mono text-brand-cyan uppercase tracking-wider mb-4 flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Verified Professional Certifications</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {certifications.map((cert, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-4 rounded-xl bg-dark-900/90 border border-white/5 hover:border-brand-cyan/30 transition-colors"
                  >
                    <div className="text-xs font-bold text-white mb-1">
                      {cert.name}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {cert.issuer} &bull; {cert.year}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content View: RESUME & CV TAB */}
        {activeTab === 'resume' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Success alert message */}
            {uploadSuccessMsg && (
              <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-medium flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{uploadSuccessMsg}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setUploadSuccessMsg('')}
                  className="text-emerald-400 hover:text-white text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Column: Active Resume File Card */}
              <div className="md:col-span-6 glass-card p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple"></div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-md bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan font-mono text-xs flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      {personalInfo?.resumeFileName ? 'Active Custom Resume' : 'Verified Developer Resume'}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Ready to Download
                    </span>
                  </div>

                  <div className="flex items-start gap-4 pt-2">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${
                      personalInfo?.resumeFileName?.toLowerCase().endsWith('.docx') || personalInfo?.resumeFileName?.toLowerCase().endsWith('.doc')
                        ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                    }`}>
                      <FileText className="w-7 h-7" />
                    </div>

                    <div className="overflow-hidden">
                      <h3 className="text-base sm:text-lg font-bold text-white truncate group-hover:text-brand-cyan transition-colors" title={personalInfo?.resumeFileName || `${personalInfo?.name || 'Bijayalaxmi_Lenka'}_MERN_Developer_Resume.pdf`}>
                        {personalInfo?.resumeFileName || `${personalInfo?.name || 'Bijayalaxmi_Lenka'}_MERN_Developer_Resume.pdf`}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 font-mono">
                        {personalInfo?.resumeFileName?.toLowerCase().endsWith('.docx') || personalInfo?.resumeFileName?.toLowerCase().endsWith('.doc')
                          ? 'Microsoft Word Document (.docx / .doc)'
                          : personalInfo?.resumeFileName?.toLowerCase().endsWith('.pdf')
                          ? 'Adobe PDF Document (.pdf)'
                          : personalInfo?.resumeFileName
                          ? 'Custom Uploaded Document'
                          : 'Standard PDF / Markdown Resume'}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
                    {personalInfo?.bio || 'Full-stack MERN engineer specialized in scalable Node.js/Express architectures, MongoDB database modeling, and React interfaces.'}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleDownloadResume}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-dark-950 font-bold text-xs sm:text-sm hover:shadow-[0_0_20px_rgba(0,242,254,0.35)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Current Resume</span>
                  </button>

                  {personalInfo?.resumeFileName && (
                    <button
                      type="button"
                      onClick={handleRemoveResume}
                      className="px-3.5 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-all cursor-pointer"
                      title="Remove custom resume and restore default"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Right Column: In-Section File Upload Dropzone */}
              <div className="md:col-span-6 glass-panel p-6 sm:p-8 rounded-2xl border-2 border-dashed border-white/15 hover:border-brand-cyan/40 transition-all flex flex-col justify-between space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-xs font-mono text-cyan-400 mb-3">
                    <Upload className="w-3.5 h-3.5" />
                    <span>DIRECT FILE UPLOAD</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Upload Your Resume (PDF, Word, or any file)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Upload your own resume in PDF (<code className="text-brand-cyan">.pdf</code>), Word (<code className="text-brand-cyan">.docx</code>, <code className="text-brand-cyan">.doc</code>), RTF, or text file format. It is immediately linked across the website and stored in your browser.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-dark-900/80 border border-white/5 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white">Select any resume file</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">PDF, DOC, DOCX, TXT, RTF up to 25MB</p>
                  </div>

                  <input
                    type="file"
                    ref={resumeInputRef}
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.rtf,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => resumeInputRef.current?.click()}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-cyan hover:bg-cyan-300 text-dark-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(0,242,254,0.25)] cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{personalInfo?.resumeFileName ? 'Replace with New File' : 'Browse & Upload Resume'}</span>
                  </button>
                </div>

                <div className="text-[11px] text-slate-400 font-mono flex items-center justify-between">
                  <span>Auto-saved to localStorage</span>
                  <span>Direct site-wide link</span>
                </div>
              </div>
            </div>

            {/* Bottom Card: Resume Summary Profile Snapshot */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10">
              <h3 className="text-sm font-mono text-brand-cyan uppercase tracking-wider mb-5 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Resume Key Credentials Snapshot</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-dark-900/90 border border-white/5">
                  <div className="text-[11px] text-brand-cyan font-mono mb-1">Current Role</div>
                  <div className="text-xs font-bold text-white">Backend Developer Intern</div>
                  <div className="text-[11px] text-slate-400 mt-1">Thryvoo Pvt. Ltd. &bull; Aug 2026 - Present</div>
                </div>

                <div className="p-4 rounded-xl bg-dark-900/90 border border-white/5">
                  <div className="text-[11px] text-purple-400 font-mono mb-1">Postgraduate Degree</div>
                  <div className="text-xs font-bold text-white">MCA (2024 - 2026)</div>
                  <div className="text-[11px] text-slate-400 mt-1">Indira Gandhi Inst. of Tech. &bull; 9.5 CGPA</div>
                </div>

                <div className="p-4 rounded-xl bg-dark-900/90 border border-white/5">
                  <div className="text-[11px] text-emerald-400 font-mono mb-1">Undergraduate Honors</div>
                  <div className="text-xs font-bold text-white">BCA (2021 - 2024)</div>
                  <div className="text-[11px] text-slate-400 mt-1">NIIS Group &bull; 8.5 CGPA &bull; Best Student Award</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
