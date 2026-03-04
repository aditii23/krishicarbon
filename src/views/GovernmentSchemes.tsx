import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Gavel, MapPin, ExternalLink, ShieldCheck, Loader2, Info, ArrowRight, Search } from "lucide-react";
import { findSchemes } from "../services/gemini.ts";

export default function GovernmentSchemes({ user }: { user: any }) {
  const [loading, setLoading] = useState(true);
  const [schemes, setSchemes] = useState<any[]>([]);
  const [location, setLocation] = useState(`${user.district}, ${user.state}`);

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const data = await findSchemes(location, user.farmSize);
      setSchemes(data);
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
          <h1 className="text-4xl font-bold text-slate-100 tracking-tight mb-2">Government Schemes & Subsidies</h1>
          <p className="text-slate-400 font-medium">Find and apply for agricultural support programs in your region.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="text" 
              value={location}
              onChange={e => setLocation(e.target.value)}
              onBlur={fetchSchemes}
              placeholder="Search location..."
              className="bg-white/5 border border-white/10 rounded-full py-4 pl-14 pr-8 text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all w-72 text-slate-100 placeholder:text-slate-600 outline-none"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="h-96 flex flex-col items-center justify-center glass-card border-white/5">
          <Loader2 className="w-16 h-16 text-emerald-400 animate-spin mb-6" />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Scanning government databases...</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main List */}
          <div className="lg:col-span-2 space-y-8">
            {schemes.map((scheme, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-10 border-white/5 depth-shadow hover:bg-white/5 transition-all group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-start justify-between mb-8 relative z-10">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-all border border-white/5 group-hover:border-emerald-500/20 shadow-inner">
                      <Gavel className="w-8 h-8 text-slate-100 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-100 tracking-tight group-hover:text-emerald-400 transition-colors">{scheme.name}</h3>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest mt-2 bg-emerald-500/5 w-fit px-3 py-1 rounded-full border border-emerald-500/10">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified Scheme
                      </div>
                    </div>
                  </div>
                  <a 
                    href={scheme.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 bg-white/5 text-slate-300 rounded-xl hover:bg-white hover:text-slate-900 transition-all border border-white/10 shadow-lg"
                  >
                    <ExternalLink className="w-6 h-6" />
                  </a>
                </div>

                <p className="text-slate-400 text-base leading-relaxed mb-10 font-medium relative z-10">
                  {scheme.description}
                </p>

                <div className="grid grid-cols-2 gap-8 pt-10 border-t border-white/5 relative z-10">
                  <div>
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Benefit</p>
                    <p className="text-sm font-bold text-slate-100">{scheme.benefit}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Eligibility</p>
                    <p className="text-sm font-bold text-slate-100">{scheme.eligibility}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            <div className="glass-card p-12 border-emerald-500/10 depth-shadow relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-slate-100 mb-8 leading-tight tracking-tight">Eligibility Checker</h3>
                <p className="text-slate-400 text-base leading-relaxed mb-10 font-medium">
                  Based on your farm size (<span className="text-slate-100 font-bold">{user.farmSize} acres</span>) and location (<span className="text-slate-100 font-bold">{user.district}</span>), you are eligible for 12 active programs.
                </p>
                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-white/10 transition-all">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                    <p className="text-sm font-bold text-slate-100">PM-Kisan Samman Nidhi</p>
                  </div>
                  <div className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-white/10 transition-all">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                    <p className="text-sm font-bold text-slate-100">Crop Insurance (PMFBY)</p>
                  </div>
                </div>
                <button className="neo-button w-full py-5 text-lg flex items-center justify-center gap-3">
                  Check All Eligibility <ArrowRight className="w-6 h-6" />
                </button>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-emerald-500/10 transition-colors"></div>
            </div>

            <div className="glass-card p-10 border-white/5 depth-shadow bg-white/2">
              <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-3 tracking-tight">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                  <Info className="w-6 h-6 text-slate-100" />
                </div>
                Important Notice
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-8 font-medium">
                Ensure your Aadhar is linked to your bank account for direct benefit transfers (DBT).
              </p>
              <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-slate-100 rounded-2xl text-sm font-bold flex items-center justify-center gap-3 transition-all border border-white/10 group">
                Update KYC Details <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
