import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Satellite, Map as MapIcon, Droplets, Leaf, Info, AlertTriangle, Loader2 } from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";

const ndviData = [
  { month: "Jan", value: 0.45 },
  { month: "Feb", value: 0.52 },
  { month: "Mar", value: 0.68 },
  { month: "Apr", value: 0.75 },
  { month: "May", value: 0.82 },
];

const healthMetrics = [
  { subject: 'Nitrogen', A: 80, fullMark: 100 },
  { subject: 'Moisture', A: 65, fullMark: 100 },
  { subject: 'Density', A: 90, fullMark: 100 },
  { subject: 'Chlorophyll', A: 75, fullMark: 100 },
  { subject: 'Vigor', A: 85, fullMark: 100 },
];

export default function SatelliteMonitoring({ user }: { user: any }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-100 tracking-tight mb-2">Satellite Farm Monitoring</h1>
          <p className="text-slate-400 font-medium">Real-time crop health and vegetation indices via satellite imagery.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-5 py-2.5 bg-emerald-500/10 text-emerald-400 rounded-2xl text-xs font-bold border border-emerald-500/20 flex items-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            Live Satellite Feed
          </div>
        </div>
      </div>

      {loading ? (
        <div className="h-96 flex flex-col items-center justify-center glass-card border-white/5">
          <Loader2 className="w-16 h-16 text-emerald-400 animate-spin mb-6" />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Connecting to satellite network...</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Map View Simulation */}
          <div className="lg:col-span-2 glass-card border-white/5 depth-shadow overflow-hidden flex flex-col group">
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/2">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                  <MapIcon className="w-5 h-5 text-slate-100" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 tracking-tight">Farm Vegetation Map (NDVI)</h3>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2 bg-white text-slate-900 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg">NDVI</button>
                <button className="px-5 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold text-slate-500 uppercase tracking-widest transition-all border border-white/5">Moisture</button>
              </div>
            </div>
            <div className="flex-1 relative min-h-[450px] bg-slate-950">
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200" 
                alt="Satellite View" 
                className="w-full h-full object-cover opacity-60 mix-blend-luminosity grayscale group-hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              {/* Simulated NDVI Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 via-yellow-500/20 to-red-500/20 mix-blend-overlay"></div>
              
              {/* Map Controls */}
              <div className="absolute bottom-8 right-8 flex flex-col gap-3">
                <button className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl text-slate-100 hover:bg-white/20 transition-all flex items-center justify-center font-bold text-xl">+</button>
                <button className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl text-slate-100 hover:bg-white/20 transition-all flex items-center justify-center font-bold text-xl">-</button>
              </div>

              {/* Legend */}
              <div className="absolute bottom-8 left-8 glass-card p-6 border-white/10 shadow-2xl">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">NDVI Index</p>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2.5 bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500 rounded-full shadow-inner"></div>
                  <span className="text-[10px] font-bold text-slate-100 tracking-widest">0.0 - 1.0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Sidebar */}
          <div className="space-y-10">
            <div className="glass-card p-10 border-white/5 depth-shadow">
              <h3 className="text-2xl font-bold text-slate-100 mb-10 tracking-tight">Crop Health Index</h3>
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={healthMetrics}>
                    <PolarGrid stroke="#ffffff10" />
                    <PolarAngleAxis dataKey="subject" tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 600}} />
                    <Radar
                      name="Health"
                      dataKey="A"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.15}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-6">
                <div className="p-6 bg-white/2 rounded-3xl border border-white/5">
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">NDVI Score</p>
                  <p className="text-3xl font-bold text-emerald-400 glow-text tracking-tight">0.82</p>
                </div>
                <div className="p-6 bg-white/2 rounded-3xl border border-white/5">
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Water Stress</p>
                  <p className="text-3xl font-bold text-amber-500 tracking-tight">Low</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-10 border-emerald-500/10 depth-shadow relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3 tracking-tight">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <Info className="w-6 h-6 text-emerald-400" />
                  </div>
                  Satellite Insight
                </h3>
                <p className="text-slate-400 text-base leading-relaxed mb-8 font-medium">
                  Vegetation vigor has increased by <span className="text-emerald-400 font-bold">12%</span> in the northern quadrant of your farm over the last 14 days.
                </p>
                <button className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-sm font-bold transition-all border border-white/10 text-slate-100">
                  View Full Report
                </button>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-emerald-500/10 transition-colors"></div>
            </div>
          </div>
        </div>
      )}

      {/* NDVI Trend Chart */}
      <div className="glass-card p-10 border-white/5 depth-shadow">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h3 className="text-2xl font-bold text-slate-100 tracking-tight mb-1">Vegetation Health Trend</h3>
            <p className="text-sm text-slate-400 font-medium">Historical NDVI values for your farm</p>
          </div>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ndviData}>
              <defs>
                <linearGradient id="colorNdvi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff08" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
                dy={15} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  borderRadius: '16px', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' 
                }}
                itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#10b981" 
                strokeWidth={4} 
                fillOpacity={1} 
                fill="url(#colorNdvi)" 
                animationDuration={2500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
