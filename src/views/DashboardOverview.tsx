import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Sprout, 
  CloudRain, 
  Coins, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  AlertCircle,
  CheckCircle2,
  FileText,
  Satellite
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { Link } from "react-router-dom";

const data = [
  { name: "Jan", carbon: 1.2 },
  { name: "Feb", carbon: 1.8 },
  { name: "Mar", carbon: 2.1 },
  { name: "Apr", carbon: 2.8 },
  { name: "May", carbon: 3.2 },
];

export default function DashboardOverview({ user }: { user: any }) {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/dashboard/${user.id}`)
      .then(res => res.json())
      .then(data => setStats(data));
  }, [user.id]);

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-100 tracking-tight mb-2">
            Good morning, <span className="glow-text">{user.fullName.split(" ")[0]}!</span>
          </h1>
          <p className="text-slate-400 font-medium">Here's what's happening on your farm today.</p>
        </div>
        <div className="flex items-center gap-3 glass-card px-6 py-3 border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
          <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">System Status: Optimal</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/dashboard/soil">
          <StatCard 
            title="Soil Health" 
            value={stats?.soil?.score ? `${stats.soil.score}%` : "N/A"} 
            sub="Based on last report"
            icon={Sprout}
            color="emerald"
            trend="+2.4%"
            isUp={true}
          />
        </Link>
        <Link to="/dashboard/carbon">
          <StatCard 
            title="Carbon Stored" 
            value={stats?.carbon?.totalTons ? `${stats.carbon.totalTons.toFixed(1)} Tons` : "0.0 Tons"} 
            sub="Lifetime sequestration"
            icon={Coins}
            color="amber"
            trend="+0.4t"
            isUp={true}
          />
        </Link>
        <Link to="/dashboard/market">
          <StatCard 
            title="Earnings" 
            value={stats?.carbon?.totalValue ? `₹${stats.carbon.totalValue.toLocaleString()}` : "₹0"} 
            sub="Carbon credit payouts"
            icon={TrendingUp}
            color="blue"
            trend="₹1,200"
            isUp={true}
          />
        </Link>
        <Link to="/dashboard/rainfall">
          <StatCard 
            title="Rain Probability" 
            value="75%" 
            sub="Next 24 hours"
            icon={CloudRain}
            color="sky"
            trend="-10%"
            isUp={false}
          />
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-card p-10 border-white/5 depth-shadow">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-bold text-slate-100 tracking-tight mb-1">Carbon Sequestration Trend</h3>
              <p className="text-sm text-slate-400 font-medium">Monthly tons of CO₂ stored in soil</p>
            </div>
            <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm font-bold text-slate-300 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none">
              <option className="bg-slate-900">Last 6 Months</option>
              <option className="bg-slate-900">Last Year</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff08" />
                <XAxis 
                  dataKey="name" 
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
                  dataKey="carbon" 
                  stroke="#10b981" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorCarbon)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Records */}
        <div className="glass-card p-10 border-white/5 depth-shadow">
          <h3 className="text-2xl font-bold text-slate-100 tracking-tight mb-8">Recent Farm Records</h3>
          <div className="space-y-6">
            {stats?.recentRecords?.length > 0 ? (
              stats.recentRecords.map((record: any, i: number) => (
                <div key={i} className="flex items-center gap-5 p-5 rounded-2xl hover:bg-white/5 transition-all group cursor-pointer border border-transparent hover:border-white/10">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg",
                    record.type === "fertilizer" ? "bg-blue-500/20 text-blue-400" : 
                    record.type === "crop" ? "bg-emerald-500/20 text-emerald-400" : 
                    "bg-amber-500/20 text-amber-400"
                  )}>
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="text-sm font-bold text-slate-100">{record.details}</h5>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{new Date(record.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium">₹{record.amount.toLocaleString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 italic p-4 text-center">No recent records found.</p>
            )}
          </div>
          <Link to="/dashboard/records" className="w-full mt-10 py-4 text-sm font-bold text-slate-300 hover:text-emerald-400 glass-card border-white/5 rounded-2xl transition-all flex items-center justify-center gap-3 group">
            View All Records <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Satellite Insight Card */}
        <div className="glass-card p-12 text-white depth-shadow relative overflow-hidden border-emerald-500/10 group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center shadow-inner border border-emerald-500/20">
                <Satellite className="w-7 h-7 text-emerald-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Satellite Monitoring</p>
                <p className="text-lg font-bold text-slate-100">Vegetation Health Index</p>
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-6 leading-tight text-slate-100">Your farm health is <span className="text-emerald-400">12% higher</span> than the district average.</h3>
            <p className="text-slate-400 text-base leading-relaxed mb-10 font-medium">
              NDVI analysis shows optimal chlorophyll levels in the northern quadrant. Water stress is minimal.
            </p>
            <Link to="/dashboard/satellite" className="inline-flex items-center gap-3 text-base font-bold text-emerald-400 hover:gap-5 transition-all group">
              View Satellite Map <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors"></div>
        </div>

        {/* Carbon Marketplace Card */}
        <div className="glass-card p-12 border-white/5 depth-shadow flex flex-col justify-between group">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-amber-500/20 rounded-2xl flex items-center justify-center shadow-inner border border-amber-500/20">
                <Coins className="w-7 h-7 text-amber-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Carbon Marketplace</p>
                <p className="text-lg font-bold text-slate-100">Live Credit Price</p>
              </div>
            </div>
            <div className="flex items-end gap-3 mb-6">
              <h3 className="text-5xl font-bold text-slate-100 tracking-tight">₹1,500</h3>
              <p className="text-base font-bold text-emerald-400 mb-1.5">+₹120 (8.2%)</p>
            </div>
            <p className="text-base text-slate-400 leading-relaxed mb-10 font-medium">
              Global demand for sustainable agriculture credits is rising. Now is a great time to verify your storage.
            </p>
          </div>
          <Link to="/dashboard/carbon" className="neo-button w-full py-5 text-lg flex items-center justify-center gap-3 group">
            Sell Credits <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, sub, icon: Icon, color, trend, isUp }: any) {
  const colors: any = {
    emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/20 text-amber-400 border-amber-500/20",
    blue: "bg-blue-500/20 text-blue-400 border-blue-500/20",
    sky: "bg-sky-500/20 text-sky-400 border-sky-500/20",
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card p-8 border-white/5 depth-shadow glass-card-hover"
    >
      <div className="flex items-start justify-between mb-6">
        <div className={cn("p-4 rounded-2xl border shadow-inner", colors[color])}>
          <Icon className="w-7 h-7" />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest",
          isUp ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
        )}>
          {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend}
        </div>
      </div>
      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{title}</h4>
      <p className="text-3xl font-bold text-slate-100 mb-2 tracking-tight">{value}</p>
      <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{sub}</p>
    </motion.div>
  );
}

function AlertItem({ type, title, desc, time }: any) {
  const icons: any = {
    warning: <AlertCircle className="w-5 h-5 text-amber-500" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    info: <AlertCircle className="w-5 h-5 text-blue-500" />,
  };

  return (
    <div className="flex gap-4 p-4 rounded-2xl hover:bg-[#F5F2ED] transition-colors group cursor-pointer">
      <div className="shrink-0 mt-1">{icons[type]}</div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <h5 className="text-sm font-bold text-[#0A2E1F]">{title}</h5>
          <span className="text-[10px] font-bold text-black/20 uppercase tracking-wider">{time}</span>
        </div>
        <p className="text-xs text-black/60 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
