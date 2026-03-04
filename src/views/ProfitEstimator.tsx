import React, { useState } from "react";
import { motion } from "motion/react";
import { Calculator, TrendingUp, Coins, Wheat, Loader2, ArrowRight, Info, Wallet } from "lucide-react";
import { estimateProfit } from "../services/gemini.ts";

export default function ProfitEstimator({ user }: { user: any }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    cropType: "Wheat",
    landSize: user.farmSize || 5,
    fertilizerCost: 5000,
    laborCost: 2000,
    seedCost: 1500
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const estimation = await estimateProfit(formData);
      setResult(estimation);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-100 tracking-tight mb-2">Profit Estimator Tool</h1>
          <p className="text-slate-400 font-medium">Calculate your potential earnings including carbon bonuses.</p>
        </div>
        <div className="flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
          <Wallet className="w-5 h-5 text-emerald-400" />
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Financial Planning</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Input Form */}
        <div className="glass-card p-10 border-white/5 depth-shadow">
          <h3 className="text-2xl font-bold text-slate-100 mb-10 tracking-tight">Estimation Parameters</h3>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Crop Type</label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-100 outline-none appearance-none cursor-pointer hover:bg-white/10"
                value={formData.cropType}
                onChange={e => setFormData({ ...formData, cropType: e.target.value })}
              >
                <option className="bg-slate-900">Wheat</option>
                <option className="bg-slate-900">Rice</option>
                <option className="bg-slate-900">Mustard</option>
                <option className="bg-slate-900">Sugarcane</option>
                <option className="bg-slate-900">Cotton</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Land Size (Acres)</label>
              <input 
                type="number"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-100 outline-none placeholder:text-slate-600"
                value={formData.landSize}
                onChange={e => setFormData({ ...formData, landSize: parseFloat(e.target.value) })}
              />
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Fertilizer Cost (₹)</label>
                <input 
                  type="number"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-100 outline-none placeholder:text-slate-600"
                  value={formData.fertilizerCost}
                  onChange={e => setFormData({ ...formData, fertilizerCost: parseFloat(e.target.value) })}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Labor Cost (₹)</label>
                <input 
                  type="number"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-100 outline-none placeholder:text-slate-600"
                  value={formData.laborCost}
                  onChange={e => setFormData({ ...formData, laborCost: parseFloat(e.target.value) })}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="neo-button w-full py-5 text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  Calculate Estimated Profit <Calculator className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                </>
              )}
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
              {/* Total Profit Card */}
              <div className="glass-card p-12 border-emerald-500/10 depth-shadow relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none"></div>
                <div className="relative z-10">
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Total Estimated Profit</p>
                  <h2 className="text-7xl font-bold text-slate-100 tracking-tighter mb-12 glow-text">{result.totalProfit}</h2>
                  
                  <div className="grid grid-cols-2 gap-10 pt-10 border-t border-white/5">
                    <div>
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">Estimated Yield</p>
                      <p className="text-2xl font-bold text-slate-100 tracking-tight">{result.estimatedYield}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">Expected Income</p>
                      <p className="text-2xl font-bold text-slate-100 tracking-tight">{result.expectedIncome}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors"></div>
              </div>

              {/* Carbon Bonus Card */}
              <div className="glass-card p-10 border-white/5 depth-shadow flex items-center justify-between group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/20 shadow-inner">
                    <Coins className="w-8 h-8 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Carbon Bonus Earnings</p>
                    <p className="text-3xl font-bold text-emerald-400 glow-text tracking-tight">{result.carbonBonus}</p>
                  </div>
                </div>
                <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20 shadow-lg group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>

              {/* Info Banner */}
              <div className="glass-card p-10 border-white/5 flex gap-6 bg-white/2">
                <div className="shrink-0 mt-1">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                    <Info className="w-6 h-6 text-slate-100" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-100 mb-2 tracking-tight">How is this calculated?</h4>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">
                    Estimations are based on current market rates in your district, historical yield data for <span className="text-slate-100 font-bold">{formData.cropType}</span>, and your farm's carbon sequestration potential.
                  </p>
                </div>
              </div>

              <button className="w-full py-5 bg-white/5 hover:bg-white/10 text-slate-100 rounded-[32px] font-bold flex items-center justify-center gap-3 transition-all border border-white/10 group">
                Export Financial Report <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-white/5 rounded-[56px] glass-card bg-transparent">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 shadow-inner border border-white/5">
                <Calculator className="text-slate-600 w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-slate-100 mb-4 tracking-tight">Ready to Calculate</h3>
              <p className="text-slate-500 max-w-xs font-medium leading-relaxed">Enter your farm details to see a comprehensive profit breakdown.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
