import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CloudRain, Droplets, Thermometer, Wind, Calendar, MapPin, Loader2, AlertTriangle } from "lucide-react";
import { getRainfallForecast } from "../services/gemini.ts";

export default function RainfallForecast({ user }: { user: any }) {
  const [loading, setLoading] = useState(true);
  const [forecast, setForecast] = useState<any[]>([]);
  const [location, setLocation] = useState(`${user.district}, ${user.state}`);

  useEffect(() => {
    fetchForecast();
  }, []);

  const fetchForecast = async () => {
    setLoading(true);
    try {
      const data = await getRainfallForecast(location);
      setForecast(data);
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
          <h1 className="text-4xl font-bold text-slate-100 tracking-tight mb-2">Rainfall Forecast</h1>
          <p className="text-slate-400 font-medium">Hyper-local weather insights for your farm planning.</p>
        </div>
        <div className="flex items-center gap-3 glass-card px-6 py-3 border-sky-500/20 shadow-[0_0_20px_rgba(14,165,233,0.1)]">
          <MapPin className="w-5 h-5 text-sky-400" />
          <input 
            type="text" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onBlur={fetchForecast}
            className="bg-transparent border-none focus:ring-0 text-sm font-bold text-slate-100 w-40 placeholder:text-slate-600"
          />
        </div>
      </div>

      {loading ? (
        <div className="h-96 flex flex-col items-center justify-center">
          <Loader2 className="w-16 h-16 text-sky-500 animate-spin mb-6" />
          <p className="text-slate-400 font-bold uppercase tracking-widest animate-pulse">Fetching hyper-local data...</p>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Main Forecast Card */}
          <div className="glass-card p-12 border-white/5 depth-shadow relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent pointer-events-none"></div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="px-5 py-2 bg-sky-500/10 border border-sky-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-sky-400">Today's Outlook</div>
                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">March 4, 2026</span>
                </div>
                <div className="flex items-center gap-10 mb-10">
                  <div className="w-28 h-28 bg-sky-500/20 rounded-[32px] flex items-center justify-center shadow-inner border border-sky-500/20">
                    <CloudRain className="w-14 h-14 text-sky-400" />
                  </div>
                  <div>
                    <h2 className="text-7xl font-bold text-slate-100 tracking-tighter mb-1">{forecast[0]?.temp}°C</h2>
                    <p className="text-2xl text-slate-400 font-bold">{forecast[0]?.intensity} Rain Likely</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-8">
                  <WeatherStat icon={Droplets} label="Probability" value={`${forecast[0]?.probability}%`} />
                  <WeatherStat icon={Wind} label="Wind Speed" value="12 km/h" />
                  <WeatherStat icon={Thermometer} label="Humidity" value="65%" />
                </div>
              </div>

              <div className="glass-card p-10 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-xl font-bold text-slate-100 mb-8 flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                  </div>
                  Farmer's Advisory
                </h3>
                <div className="space-y-8">
                  <AdvisoryItem 
                    title="Best Sowing Window" 
                    desc="Next 3-5 days are optimal for sowing as moderate rain is expected."
                    status="Optimal"
                  />
                  <AdvisoryItem 
                    title="Irrigation Alert" 
                    desc="Delay planned irrigation for tomorrow as rain probability is high."
                    status="Delay"
                  />
                  <AdvisoryItem 
                    title="Fertilizer Application" 
                    desc="Avoid top-dressing nitrogen today to prevent leaching due to rain."
                    status="Avoid"
                  />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl group-hover:bg-sky-500/10 transition-colors"></div>
          </div>

          {/* 7-Day Forecast Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5">
            {forecast.map((day, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className={cn(
                  "glass-card p-8 border-white/5 text-center transition-all glass-card-hover group",
                  i === 0 && "border-sky-500/30 shadow-[0_0_20px_rgba(14,165,233,0.1)]"
                )}
              >
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">{day.day}</p>
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-sky-500/20 transition-colors">
                  <CloudRain className={cn(
                    "w-7 h-7",
                    day.probability > 50 ? "text-sky-400" : "text-slate-600"
                  )} />
                </div>
                <p className="text-2xl font-bold text-slate-100 mb-1">{day.temp}°</p>
                <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest mb-3">{day.probability}% Rain</p>
                <div className="h-1 w-10 bg-white/5 mx-auto rounded-full"></div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function WeatherStat({ icon: Icon, label, value }: any) {
  return (
    <div>
      <div className="flex items-center gap-2 text-slate-500 mb-2">
        <Icon className="w-4 h-4" />
        <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-xl font-bold text-slate-100">{value}</p>
    </div>
  );
}

function AdvisoryItem({ title, desc, status }: any) {
  return (
    <div className="flex gap-5">
      <div className="w-1 h-14 bg-white/10 rounded-full shrink-0"></div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-bold text-slate-100">{title}</h4>
          <span className={cn(
            "text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest",
            status === "Optimal" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
          )}>{status}</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
