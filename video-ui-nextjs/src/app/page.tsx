"use client";

import { useState } from 'react';
import { UploadCloud, Play, Settings, AlignLeft, Globe, FileText, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [duration, setDuration] = useState('60');
  const [voice, setVoice] = useState('female');
  const [subtitles, setSubtitles] = useState('english');
  const [textInput, setTextInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setProgress(0);
    setError(null);
    setResultUrl(null);

    // Initial progress simulation (Preparing)
    const progInterval = setInterval(() => {
      setProgress((prev) => (prev < 30 ? prev + 2 : prev));
    }, 500);

    try {
      const response = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: "Excellence Links Video",
          description: textInput || "Generated from UI Dashboard",
          keyPoints: ["Generated via Excellence Links Engine"],
          videoType: "product-overview",
          duration: parseInt(duration),
          voiceover: {
            enabled: true,
            voice: voice // Sends 'male' or 'female'
          },
          subtitles: {
            language: subtitles
          },
          useAI: true,
          branding: {
            name: "Excellence Links",
            website: "excellencelinks.com",
            primaryColor: "#facc15"
          }
        }),
      });

      clearInterval(progInterval);
      setProgress(50);

      const data = await response.json();
      
      if (!data.success) throw new Error(data.error || 'Generation failed');

      // Final progress stretch
      setProgress(100);
      setResultUrl(data.url);
      setTimeout(() => setIsGenerating(false), 500);
    } catch (err: any) {
      clearInterval(progInterval);
      setError(err.message);
      setIsGenerating(false);
      console.error('Generation failed:', err);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black text-slate-200 p-8 sm:p-12 font-sans relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-yellow/10 blur-[120px] rounded-full pointer-events-none opacity-50" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <header className="mb-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2 flex items-center justify-center md:justify-start gap-4">
              <img src="/logo.jpg" alt="Excellence Links Logo" className="h-12 w-12 object-contain rounded-full border-2 border-brand-yellow/50" />
              <span>Excellence <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-amber-500">Links</span></span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-medium">Deterministic Video Generation Engine</p>
          </div>
          
          <div className="px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center gap-3 shadow-lg">
             <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
             <span className="text-sm font-semibold text-slate-300 tracking-wide">SYSTEM READY</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-panel p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-brand-yellow" />
                Parameters
              </h2>

              <div className="space-y-3 mb-6">
                <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  Duration
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['30', '60', '120'].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setDuration(val)}
                      className={"py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border " + 
                        (duration === val 
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                          : 'bg-slate-800/40 text-slate-400 border-slate-700/50 hover:border-slate-500 hover:bg-slate-700/40')}
                    >
                      {val}s
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  Voiceover
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['female', 'male'].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setVoice(val)}
                      className={"py-2.5 rounded-xl text-sm font-bold capitalize transition-all duration-300 border " + 
                        (voice === val 
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                          : 'bg-slate-800/40 text-slate-400 border-slate-700/50 hover:border-slate-500 hover:bg-slate-700/40')}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

               <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Subtitles
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['english', 'urdu'].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setSubtitles(val)}
                      className={"py-2.5 rounded-xl text-sm font-bold capitalize transition-all duration-300 border " + 
                        (subtitles === val 
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                          : 'bg-slate-800/40 text-slate-400 border-slate-700/50 hover:border-slate-500 hover:bg-slate-700/40')}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel p-6 sm:p-8 relative">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <AlignLeft className="w-6 h-6 text-brand-yellow" />
                Source Content
              </h2>
              
              <div className="space-y-6">
                <div>
                   <label className="block text-sm font-semibold text-slate-300 mb-2">Company Profile / Script</label>
                   <textarea 
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Enter the company profile, achievement description, or exact script here..."
                    className="w-full h-40 bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all resize-none"
                   />
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-px bg-slate-700 flex-1"/>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">OR</span>
                  <div className="h-px bg-slate-700 flex-1"/>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Upload Document (PDF/TXT)</label>
                  <div className="border-2 border-dashed border-slate-700 hover:border-brand-yellow/50 rounded-xl bg-slate-900/30 p-8 flex flex-col items-center justify-center transition-colors group cursor-pointer relative overflow-hidden">
                    <input 
                      type="file" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      accept=".pdf,.txt"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    {file ? (
                      <div className="flex items-center gap-3 text-brand-yellow bg-brand-yellow/10 px-4 py-2 rounded-lg">
                        <FileText className="w-5 h-5" />
                        <span className="font-medium">{file.name}</span>
                        <CheckCircle2 className="w-4 h-4 ml-2" />
                      </div>
                    ) : (
                      <>
                        <UploadCloud className="w-10 h-10 text-slate-500 group-hover:text-brand-yellow mb-3 transition-colors" />
                        <p className="text-slate-400 font-medium text-center">Drag and drop your file here, or click to browse</p>
                        <p className="text-slate-600 text-sm mt-1">Supports .pdf and .txt</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-800">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || (!textInput && !file)}
                  className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 bg-brand-yellow text-slate-900 hover:bg-amber-400 hover:shadow-[0_0_25px_rgba(250,204,21,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Rendering Video... {progress}%
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-current" />
                      Generate Video
                    </>
                  )}
                </button>
                
                {isGenerating && (
                  <div className="mt-4 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-slate-900" 
                      style={{ width: '100%' }}
                    >
                      <div 
                        className="h-full bg-brand-yellow transition-all duration-200"
                        style={{ width: progress + '%' }}
                      />
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-400 text-sm font-medium">
                    Error: {error}
                  </div>
                )}

                {resultUrl && (
                  <div className="mt-6 p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-emerald-500/20">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-white font-bold">Video Generated!</p>
                        <p className="text-emerald-400/70 text-sm">Your trial video is ready.</p>
                      </div>
                    </div>
                    <a 
                      href={resultUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-6 py-2 rounded-lg bg-emerald-500 text-slate-900 font-bold hover:bg-emerald-400 transition-colors flex items-center gap-2"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      Watch Now
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

