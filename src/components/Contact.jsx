import React, { useState } from 'react';
import { Terminal, Mail, Copy, Check, Send, MessageSquare, MapPin, Sparkles, Phone, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Contact({ personalInfo }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Full-Stack MERN Application',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activationRequired, setActivationRequired] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage('');
    setActivationRequired(false);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          collaborationType: formData.projectType,
          message: formData.message,
          _subject: `New Portfolio Inquiry from ${formData.name} (${formData.projectType})`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const data = await response.json();

      // Check if FormSubmit requires one-time email activation
      if (
        data.message &&
        (data.message.toLowerCase().includes('activation') ||
          data.message.toLowerCase().includes('activate'))
      ) {
        setActivationRequired(true);
        setFormData({
          name: '',
          email: '',
          projectType: 'Full-Stack MERN Application',
          message: ''
        });
        return;
      }

      if (response.ok && (data.success === 'true' || data.success === true)) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          projectType: 'Full-Stack MERN Application',
          message: ''
        });
        setTimeout(() => setSubmitted(false), 8000);
      } else {
        throw new Error(data.message || 'Failed to dispatch message.');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setErrorMessage(
        'Could not send message automatically. Please email me directly at ' + personalInfo.email
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-dark-950/80">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 radial-glow-cyan pointer-events-none -z-10"></div>
      <div className="absolute top-10 left-10 w-96 h-96 radial-glow-purple pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-xs font-mono text-cyan-400 mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>05. CONNECT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple">Exceptional</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
            Whether you have an upcoming project, are looking to hire a dedicated full-stack engineer, or want to discuss MERN architecture, my inbox is open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Open for Opportunities
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  I'm actively seeking full-time MERN software developer roles, high-impact contract work, and innovative technical collaborations.
                </p>
              </div>

              {/* Email Card with Copy Button */}
              <div className="p-4 rounded-xl bg-dark-900/90 border border-white/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 flex items-center justify-center text-brand-cyan shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <div className="text-[11px] font-mono text-slate-400">Direct Email</div>
                    <div className="text-xs sm:text-sm font-semibold text-white truncate font-mono">
                      {personalInfo.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/5 transition-all shrink-0"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <span className="flex items-center gap-1 text-emerald-400 text-xs font-mono font-medium">
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied</span>
                    </span>
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Location Card */}
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] font-mono">Location &amp; Availability</span>
                  <span className="font-medium text-white">{personalInfo.location} &bull; Remote Worldwide</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/5 space-y-3">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Professional Profiles
                </span>
                
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-dark-900 border border-white/5 hover:border-brand-cyan/30 text-slate-300 hover:text-white transition-all text-xs font-medium"
                  >
                    <GithubIcon className="w-4 h-4 text-brand-cyan" />
                    <span>GitHub Profile</span>
                  </a>

                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-dark-900 border border-white/5 hover:border-brand-cyan/30 text-slate-300 hover:text-white transition-all text-xs font-medium"
                  >
                    <LinkedinIcon className="w-4 h-4 text-brand-cyan" />
                    <span>LinkedIn Network</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Interactive Message Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10">
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Send Direct Message</h3>
                  <p className="text-xs text-slate-400 mt-1">Dispatches directly to my notification channel.</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              </div>

              {activationRequired && (
                <div className="mb-6 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm flex items-start gap-3.5 animate-fadeIn shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1.5">
                    <strong className="block font-bold text-amber-300 text-sm">
                      Action Required: Activate Your Form in Gmail!
                    </strong>
                    <p className="text-slate-200 leading-relaxed text-xs">
                      FormSubmit has received your message and sent a one-time verification email to <strong className="text-white underline">{personalInfo.email}</strong>.
                    </p>
                    <p className="text-slate-300 text-xs">
                      Please open your Gmail inbox (or Spam folder) and click the <strong>"Activate Form"</strong> button. Once clicked, this form will deliver all messages directly to your inbox automatically!
                    </p>
                  </div>
                </div>
              )}

              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-start gap-3 animate-fadeIn">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-emerald-400">Message Delivered Successfully!</strong>
                    <span>Thank you for reaching out. Your note has been dispatched directly to my inbox ({personalInfo.email}) and I'll get back to you shortly.</span>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-start gap-3 animate-fadeIn">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-rose-400">Unable to Dispatch Message</strong>
                    <span>
                      {errorMessage}{' '}
                      <a
                        href={`mailto:${personalInfo.email}?subject=Collaboration%20Inquiry`}
                        className="underline font-semibold hover:text-white"
                      >
                        Click here to send an email directly
                      </a>.
                    </span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Name <span className="text-brand-cyan">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/10 focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan text-sm text-white placeholder:text-slate-500 transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Email <span className="text-brand-cyan">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/10 focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan text-sm text-white placeholder:text-slate-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Collaboration Type
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/10 focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan text-sm text-white transition-colors"
                  >
                    <option value="Full-Stack MERN Application">Full-Stack MERN Application</option>
                    <option value="Frontend Development (React.js)">Frontend Development (React.js / Next.js)</option>
                    <option value="Backend REST / GraphQL API">Backend REST / GraphQL API (Node / Express)</option>
                    <option value="Full-Time Engineering Role">Full-Time Software Engineer Role</option>
                    <option value="Contract / Freelance Project">Contract / Freelance Project</option>
                  </select>
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Message Details <span className="text-brand-cyan">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, timeline, or engineering role..."
                    className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/10 focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan text-sm text-white placeholder:text-slate-500 transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue hover:from-cyan-400 hover:to-blue-500 text-dark-950 font-bold text-sm shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_30px_rgba(0,242,254,0.5)] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-dark-950 border-t-transparent rounded-full animate-spin"></div>
                      <span>Dispatching Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
