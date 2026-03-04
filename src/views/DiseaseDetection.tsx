import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { Stethoscope, Upload, Loader2, AlertCircle, CheckCircle2, Info, ArrowRight, Camera, X } from "lucide-react";
import { detectDisease } from "../services/gemini.ts";

export default function DiseaseDetection({ user }: { user: any }) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const base64 = image.split(",")[1];
      const analysis = await detectDisease(base64);
      setResult(analysis);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setImage(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-100 tracking-tight mb-2">Plant Disease Detection</h1>
          <p className="text-slate-400 font-medium">Upload a photo of your crop to identify diseases and get treatment advice.</p>
        </div>
        <div className="flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">AI Engine Active</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Upload Section */}
        <div className="glass-card p-10 border-white/5 depth-shadow flex flex-col">
          <h3 className="text-2xl font-bold text-slate-100 mb-8 tracking-tight">Upload Crop Image</h3>
          
          <div className="flex-1 flex flex-col">
            {image ? (
              <div className="relative aspect-square rounded-[40px] overflow-hidden group border border-white/10 shadow-2xl">
                <img src={image} alt="Crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-6 backdrop-blur-sm">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="p-5 bg-white text-slate-900 rounded-full hover:scale-110 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                  >
                    <Camera className="w-7 h-7" />
                  </button>
                  <button 
                    onClick={clearImage}
                    className="p-5 bg-red-500 text-white rounded-full hover:scale-110 transition-transform shadow-[0_0_30px_rgba(239,68,68,0.3)]"
                  >
                    <X className="w-7 h-7" />
                  </button>
                </div>
              </div>
            ) : (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 border-2 border-dashed border-white/5 rounded-[40px] flex flex-col items-center justify-center p-12 text-center cursor-pointer hover:bg-white/5 hover:border-emerald-500/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500 border border-white/5 group-hover:border-emerald-500/30 shadow-inner">
                  <Upload className="text-slate-500 w-10 h-10 group-hover:text-emerald-400 transition-colors" />
                </div>
                <h4 className="text-xl font-bold text-slate-100 mb-3 tracking-tight">Click to Upload or Drag & Drop</h4>
                <p className="text-sm text-slate-500 max-w-[240px] mx-auto font-medium">Support for JPG, PNG. Max size 5MB.</p>
              </div>
            )}
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              className="hidden" 
            />

            <button 
              onClick={handleAnalyze}
              disabled={!image || loading}
              className="neo-button w-full mt-10 py-5 text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  Identify Disease <Stethoscope className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-10">
          {result ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              {/* Disease Name */}
              <div className="glass-card p-10 border-emerald-500/10 depth-shadow relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="p-4 bg-emerald-500/20 rounded-2xl border border-emerald-500/20 shadow-inner">
                      <Stethoscope className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Diagnosis Result</p>
                      <h3 className="text-3xl font-bold text-slate-100 tracking-tight">{result.diseaseName}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-emerald-400 text-sm font-bold bg-emerald-500/5 w-fit px-4 py-2 rounded-full border border-emerald-500/10">
                    <CheckCircle2 className="w-5 h-5" />
                    98% Confidence Level
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-emerald-500/10 transition-colors"></div>
              </div>

              {/* Treatment */}
              <div className="glass-card p-10 border-white/5 depth-shadow">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-8">Recommended Treatment</h3>
                <div className="flex gap-6 p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/10">
                  <div className="shrink-0 mt-1">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                  </div>
                  <p className="text-base font-medium text-slate-300 leading-relaxed">
                    {result.treatment}
                  </p>
                </div>
              </div>

              {/* Prevention */}
              <div className="glass-card p-10 border-white/5 depth-shadow">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-8">Prevention Tips</h3>
                <div className="flex gap-6 p-8 rounded-3xl bg-sky-500/5 border border-sky-500/10">
                  <div className="shrink-0 mt-1">
                    <div className="w-10 h-10 bg-sky-500/20 rounded-xl flex items-center justify-center">
                      <Info className="w-6 h-6 text-sky-400" />
                    </div>
                  </div>
                  <p className="text-base font-medium text-slate-300 leading-relaxed">
                    {result.prevention}
                  </p>
                </div>
              </div>

              <button className="w-full py-5 bg-white/5 hover:bg-white/10 text-slate-100 rounded-[32px] font-bold flex items-center justify-center gap-3 transition-all border border-white/10 group">
                Download Full Report <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-white/5 rounded-[56px] glass-card bg-transparent">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 shadow-inner border border-white/5">
                <AlertCircle className="text-slate-600 w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-slate-100 mb-4 tracking-tight">Awaiting Diagnosis</h3>
              <p className="text-slate-500 max-w-xs mx-auto font-medium leading-relaxed">Upload a clear photo of the affected crop area to start the AI analysis.</p>
              <div className="mt-12 grid grid-cols-2 gap-6 w-full">
                <div className="p-6 glass-card border-white/5 text-left bg-white/2">
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Step 1</p>
                  <p className="text-sm font-bold text-slate-100">Take a clear photo</p>
                </div>
                <div className="p-6 glass-card border-white/5 text-left bg-white/2">
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Step 2</p>
                  <p className="text-sm font-bold text-slate-100">Upload for analysis</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
