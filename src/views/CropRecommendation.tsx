import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Wheat, TrendingUp, Coins, Sprout, Loader2, ChevronRight, Info, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { getCropRecommendations } from "../services/gemini.ts";

export default function CropRecommendation({ user }: { user: any }) {
  const [loading, setLoading] = useState(false);
  const [crops, setCrops] = useState<any[]>([]);
  const [soilData, setSoilData] = useState<any>(null);

  useEffect(() => {
    // Fetch latest soil data for context
    fetch(`/api/dashboard/${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.soil) {
          setSoilData(data.soil);
          handleGetRecommendations(data.soil);
        }
      });
  }, [user.id]);

  const handleGetRecommendations = async (soil: any) => {
    setLoading(true);
    try {
      const recs = await getCropRecommendations(soil, `${user.district}, ${user.state}`);
      setCrops(recs);
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
          <h1 className="text-4xl font-bold text-slate-100 tracking-tight mb-2">Smart Crop Recommendation</h1>
          <p className="text-slate-400 font-medium">AI-driven suggestions based on your soil health and climate.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-2xl border border-white/10 shadow-inner">
            <MapPin className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold text-slate-200 tracking-wide">{user.district}, {user.state}</span>
          </div>
          <button 
            onClick={() => soilData && handleGetRecommendations(soilData)}
            disabled={loading || !soilData}
            className="neo-button px-8 py-3.5 text-sm flex items-center gap-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <TrendingUp className="w-5 h-5" />}
            Refresh Suggestions
          </button>
        </div>
      </div>

      {!soilData ? (
        <div className="glass-card p-16 border-white/5 text-center depth-shadow">
          <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-white/5">
            <Sprout className="text-slate-600 w-12 h-12" />
          </div>
          <h3 className="text-2xl font-bold text-slate-100 mb-4 tracking-tight">No Soil Data Found</h3>
          <p className="text-slate-400 max-w-sm mx-auto mb-10 font-medium leading-relaxed">Please complete your soil fertility analysis first to get personalized crop recommendations.</p>
          <Link to="/dashboard/soil" className="neo-button inline-flex items-center gap-3 px-10 py-4">
            Go to Soil Analysis <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      ) : loading ? (
        <div className="h-96 flex flex-col items-center justify-center glass-card border-white/5">
          <Loader2 className="w-16 h-16 text-emerald-400 animate-spin mb-6" />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Analyzing soil & climate data...</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">
          {crops.map((crop, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card border-white/5 depth-shadow overflow-hidden flex flex-col group hover:bg-white/5 transition-all"
            >
              <div className="h-56 relative overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/${crop.name}/600/400`} 
                  alt={crop.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 px-5 py-2 bg-emerald-500 text-slate-950 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-2xl">
                  Top Choice #{i+1}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
              </div>
              
              <div className="p-10 flex-1 flex flex-col relative">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl font-bold text-slate-100 tracking-tight group-hover:text-emerald-400 transition-colors">{crop.name}</h3>
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/20 transition-all">
                    <Wheat className="w-6 h-6 text-slate-400 group-hover:text-emerald-400" />
                  </div>
                </div>

                <p className="text-base text-slate-400 leading-relaxed mb-10 flex-1 italic font-medium">
                  "{crop.reason}"
                </p>

                <div className="space-y-5 mb-10">
                  <CropStat icon={TrendingUp} label="Est. Yield" value={crop.yield} color="emerald" />
                  <CropStat icon={Coins} label="Est. Income" value={crop.income} color="amber" />
                  <CropStat icon={Sprout} label="Carbon Potential" value={crop.carbonPotential} color="blue" />
                </div>

                <button className="w-full py-5 bg-white/5 hover:bg-white/10 text-slate-100 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all border border-white/10 group/btn">
                  View Cultivation Guide <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Info Banner */}
      <div className="glass-card p-12 border-emerald-500/10 depth-shadow relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-3xl flex items-center justify-center shrink-0 border border-emerald-500/20 shadow-inner">
            <Info className="w-10 h-10 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-100 mb-3 tracking-tight">Why these recommendations?</h4>
            <p className="text-slate-400 text-base leading-relaxed font-medium">
              Our AI engine analyzes your soil's NPK levels, pH balance, and the upcoming 7-day rainfall forecast for <span className="text-slate-100 font-bold">{user.district}</span> to suggest crops that offer the best balance of yield, income, and carbon sequestration.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-emerald-500/10 transition-colors"></div>
      </div>
    </div>
  );
}

function CropStat({ icon: Icon, label, value, color }: any) {
  const colors: any = {
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/2 border border-white/5 group/stat hover:bg-white/5 transition-all">
      <div className="flex items-center gap-4">
        <div className={cn("p-2.5 rounded-xl border shadow-inner transition-transform group-hover/stat:scale-110", colors[color])}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
      </div>
      <span className="text-sm font-bold text-slate-100 tracking-tight">{value}</span>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
