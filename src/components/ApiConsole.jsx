import React, { useState } from 'react';
import { Terminal, Send, Copy, Check, Play, Activity, Server, Database, Globe } from 'lucide-react';

export default function ApiConsole({ apiSimulations }) {
  const endpoints = Object.keys(apiSimulations);
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeResponse, setActiveResponse] = useState(apiSimulations[endpoints[0]]);
  const [copied, setCopied] = useState(false);

  const handleSendRequest = (endpoint) => {
    setIsLoading(true);
    setSelectedEndpoint(endpoint);
    setTimeout(() => {
      setActiveResponse(apiSimulations[endpoint]);
      setIsLoading(false);
    }, 280);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(activeResponse.data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="api-console" className="py-24 relative overflow-hidden bg-dark-950/70">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 radial-glow-emerald pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono text-emerald-400 mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>04. INTERACTIVE BACKEND SANDBOX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Live MERN <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-brand-cyan">API Tester</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
            Experience my backend architecture firsthand. Trigger real-time simulated RESTful endpoints to test payload structure, status codes, and latency.
          </p>
        </div>

        {/* API Console Window */}
        <div className="glass-panel rounded-2xl border border-white/10 shadow-2xl overflow-hidden max-w-5xl mx-auto">
          
          {/* Top Bar / Navigation */}
          <div className="p-4 bg-dark-900/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              <span className="ml-2 font-mono text-xs text-slate-400">
                https://api.developer.dev/v1
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Node.js Service Online
              </span>
            </div>
          </div>

          {/* Endpoint Selection Buttons */}
          <div className="p-4 bg-dark-950/80 border-b border-white/5 flex flex-wrap gap-2">
            {endpoints.map((ep) => {
              const [method, path] = ep.split(' ');
              const isSelected = selectedEndpoint === ep;
              return (
                <button
                  key={ep}
                  onClick={() => handleSendRequest(ep)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all ${
                    isSelected
                      ? 'bg-slate-800 text-white border border-brand-cyan/40 shadow-[0_0_12px_rgba(0,242,254,0.15)]'
                      : 'bg-dark-900/90 text-slate-400 hover:text-slate-200 border border-white/5 hover:border-white/10'
                  }`}
                >
                  <span
                    className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
                      method === 'GET'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-brand-cyan/20 text-brand-cyan'
                    }`}
                  >
                    {method}
                  </span>
                  <span>{path}</span>
                </button>
              );
            })}
          </div>

          {/* Request / Response Details Bar */}
          <div className="px-6 py-3 bg-dark-900/40 border-b border-white/5 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Status:</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30">
                  {activeResponse.status} {activeResponse.statusText}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-400">
                <Activity className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Latency: <strong className="text-white">{activeResponse.latency}</strong></span>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
                <span>Type: <span className="text-slate-300">application/json</span></span>
              </div>
            </div>

            <button
              onClick={handleCopyJson}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              title="Copy JSON Response"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
            </button>
          </div>

          {/* JSON Body Display */}
          <div className="p-6 bg-dark-950 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto min-h-[260px] max-h-[380px]">
            {isLoading ? (
              <div className="flex items-center justify-center h-48 text-slate-400 gap-2">
                <div className="w-4 h-4 border-2 border-brand-cyan border-t-transparent rounded-full animate-spin"></div>
                <span>Executing Node.js pipeline & querying MongoDB...</span>
              </div>
            ) : (
              <pre className="text-slate-300">
                {JSON.stringify(activeResponse.data, null, 2)}
              </pre>
            )}
          </div>

          {/* Bottom quick action */}
          <div className="p-4 bg-dark-900/60 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <span>Simulated Express controller with Mongoose & Redis cache layer</span>
            <a
              href="#contact"
              className="text-brand-cyan hover:underline font-medium"
            >
              Want custom REST APIs built for your project? Contact me &rarr;
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
