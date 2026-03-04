import React, { useState } from "react";
import { motion } from "motion/react";
import { Sprout, AlertCircle, CheckCircle2, Info, ArrowRight, Loader2, Upload } from "lucide-react";
import { analyzeSoil } from "../services/gemini.ts";

export default function SoilFertility({ user }: { user: any }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    soilType: "Alluvial",
    pH: 7.0,
    nitrogen: 150,
    phosphorus: 40,
    potassium: 200
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const analysis = await analyzeSoil(formData);
      setResult(analysis);
      // Save to DB
      await fetch("/api/soil/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, ...formData, score: analysis.score })
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-100 tracking-tight mb-2">Soil Fertility Analysis</h1>
          <p className="text-slate-400 font-medium">Analyze your soil health and get personalized recommendations.</p>
        </div>
        <button className="neo-button px-8 py-4 flex items-center gap-3 group">
          <Upload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          Upload Report
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Input Form */}
        <div className="glass-card p-10 border-white/5 depth-shadow">
          <h3 className="text-2xl font-bold text-slate-100 mb-8 tracking-tight">Enter Soil Parameters</h3>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Soil Type</label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-100"
                value={formData.soilType}
                onChange={e => setFormData({ ...formData, soilType: e.target.value })}
              >
                <option className="bg-slate-900">Alluvial</option>
                <option className="bg-slate-900">Black Soil</option>
                <option className="bg-slate-900">Red Soil</option>
                <option className="bg-slate-900">Laterite</option>
                <option className="bg-slate-900">Arid/Desert</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">pH Value</label>
                <input 
                  type="number" step="0.1"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-100 placeholder:text-slate-600"
                  value={formData.pH}
                  onChange={e => setFormData({ ...formData, pH: parseFloat(e.target.value) })}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Nitrogen (N)</label>
                <input 
                  type="number"
                  placeholder="kg/ha"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-100 placeholder:text-slate-600"
                  value={formData.nitrogen}
                  onChange={e => setFormData({ ...formData, nitrogen: parseFloat(e.target.value) })}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Phosphorus (P)</label>
                <input 
                  type="number"
                  placeholder="kg/ha"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-100 placeholder:text-slate-600"
                  value={formData.phosphorus}
                  onChange={e => setFormData({ ...formData, phosphorus: parseFloat(e.target.value) })}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Potassium (K)</label>
                <input 
                  type="number"
                  placeholder="kg/ha"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-100 placeholder:text-slate-600"
                  value={formData.potassium}
                  onChange={e => setFormData({ ...formData, potassium: parseFloat(e.target.value) })}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full neo-button py-5 text-lg flex items-center justify-center gap-3"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Analyze Soil Health"}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="space-y-10">
          {result ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-10"
            >
              {/* Score Meter */}
              <div className="glass-card p-10 border-white/5 depth-shadow text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none"></div>
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-10">Soil Health Score</h3>
                <div className="relative w-56 h-56 mx-auto mb-10">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="112" cy="112" r="100" stroke="rgba(255,255,255,0.05)" strokeWidth="16" fill="transparent" />
                    <circle 
                      cx="112" cy="112" r="100" stroke="#10b981" strokeWidth="16" fill="transparent" 
                      strokeDasharray={628.3}
                      strokeDashoffset={628.3 * (1 - result.score / 100)}
                      strokeLinecap="round"
                      className="transition-all duration-1500 ease-out shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-6xl font-bold text-slate-100 glow-text">{result.score}</span>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mt-2">Optimal</span>
                  </div>
                </div>
                <p className="text-base text-slate-400 font-medium leading-relaxed max-w-xs mx-auto">
                  {result.score > 80 ? "Your soil is in excellent condition for the current season." : "Your soil requires attention to reach optimal health."}
                </p>
              </div>

              {/* Alerts */}
              <div className="glass-card p-10 border-white/5 depth-shadow">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-8">Nutrient Status</h3>
                <div className="space-y-5">
                  {result.alerts.map((alert: string, i: number) => (
                    <div key={i} className="flex gap-5 p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                      <AlertCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-sm font-bold text-amber-200 leading-relaxed">{alert}</p>
                    </div>
                  ))}
                  {result.alerts.length === 0 && (
                    <div className="flex gap-5 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-sm font-bold text-emerald-200 leading-relaxed">All nutrients are within optimal range.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Advice */}
              <div className="glass-card p-10 border-emerald-500/10 depth-shadow relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                      <Info className="w-6 h-6 text-emerald-400" />
                    </div>
                    Expert Advice
                  </h3>
                  <p className="text-slate-400 text-base leading-relaxed mb-10 font-medium">
                    {result.advice}
                  </p>
                  <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Carbon Potential</p>
                      <p className="text-2xl font-bold text-emerald-400 glow-text">{result.carbonPotential}</p>
                    </div>
                    <button className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all border border-white/10 group">
                      <ArrowRight className="w-6 h-6 text-slate-100 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-emerald-500/10 transition-colors"></div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-16 border-2 border-dashed border-white/5 rounded-[48px] bg-white/2 backdrop-blur-sm">
              <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mb-8 shadow-inner border border-white/5">
                <Sprout className="text-slate-700 w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-slate-100 mb-4 tracking-tight">No Analysis Yet</h3>
              <p className="text-slate-500 max-w-xs font-medium leading-relaxed">Fill in your soil parameters to get a detailed health report and AI-driven advice.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
