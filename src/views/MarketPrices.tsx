import React, { useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown, MapPin, Search, Filter, ArrowUpRight, ArrowDownRight, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const priceTrend = [
  { day: "Mon", price: 2100 },
  { day: "Tue", price: 2150 },
  { day: "Wed", price: 2120 },
  { day: "Thu", price: 2200 },
  { day: "Fri", price: 2250 },
  { day: "Sat", price: 2230 },
  { day: "Sun", price: 2300 },
];

export default function MarketPrices({ user }: { user: any }) {
  const [selectedCrop, setSelectedCrop] = useState("Wheat");

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-100 tracking-tight mb-2">Market Prices (Mandi)</h1>
          <p className="text-slate-400 font-medium">Real-time commodity prices from your nearest mandis.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search crop..." 
              className="bg-white/5 border border-white/10 rounded-full py-4 pl-14 pr-8 text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all w-72 text-slate-100 placeholder:text-slate-600 outline-none"
            />
          </div>
          <button className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all group">
            <Filter className="w-6 h-6 text-slate-300 group-hover:text-emerald-400" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Price Trend Chart */}
        <div className="lg:col-span-2 glass-card p-10 border-white/5 depth-shadow">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-2xl font-bold text-slate-100 tracking-tight mb-1">{selectedCrop} Price Trend</h3>
              <p className="text-sm text-slate-400 font-medium">Average price per quintal (INR)</p>
            </div>
            <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5">
              {["Wheat", "Mustard", "Rice"].map(crop => (
                <button 
                  key={crop}
                  onClick={() => setSelectedCrop(crop)}
                  className={cn(
                    "px-6 py-2.5 rounded-xl text-xs font-bold transition-all",
                    selectedCrop === crop ? "bg-white text-slate-900 shadow-lg" : "text-slate-500 hover:text-slate-100"
                  )}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff08" />
                <XAxis 
                  dataKey="day" 
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
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#10b981" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#10b981', strokeWidth: 3, stroke: '#020617' }}
                  activeDot={{ r: 8, strokeWidth: 0, fill: '#10b981' }}
                  animationDuration={2000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Market Advisory */}
        <div className="glass-card p-12 border-emerald-500/10 depth-shadow relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-10 shadow-inner border border-emerald-500/20">
              <TrendingUp className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-3xl font-bold text-slate-100 mb-6 tracking-tight">Market Advisory</h3>
            <p className="text-slate-400 text-base leading-relaxed mb-10 font-medium">
              Wheat prices are currently at a 3-month high in <span className="text-slate-100 font-bold">{user.district}</span>. Our AI predicts a slight correction next week.
            </p>
            <div className="glass-card p-8 border-white/10 bg-white/5 backdrop-blur-xl mb-10">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Recommendation</p>
              <p className="text-2xl font-bold text-emerald-400 glow-text">Best time to sell: NOW</p>
            </div>
            <button className="neo-button w-full py-5 text-lg flex items-center justify-center gap-3 group">
              Find Nearest Mandi <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-emerald-500/10 transition-colors"></div>
        </div>
      </div>

      {/* Mandi List */}
      <div className="glass-card border-white/5 depth-shadow overflow-hidden">
        <div className="p-10 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-slate-100" />
            </div>
            <h3 className="text-2xl font-bold text-slate-100 tracking-tight">Nearby Mandis</h3>
          </div>
          <div className="flex items-center gap-3 text-sm font-bold text-slate-500 uppercase tracking-widest">
            <Calendar className="w-5 h-5" />
            Updated: 2 hours ago
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 divide-x divide-y divide-white/5">
          {[
            { name: "Azadpur Mandi", dist: "12km", price: "₹2,340", trend: "up", change: "+₹45" },
            { name: "Narela Mandi", dist: "18km", price: "₹2,310", trend: "down", change: "-₹12" },
            { name: "Najafgarh Mandi", dist: "24km", price: "₹2,355", trend: "up", change: "+₹60" },
            { name: "Ghazipur Mandi", dist: "32km", price: "₹2,290", trend: "stable", change: "₹0" },
            { name: "Okhla Mandi", dist: "38km", price: "₹2,325", trend: "up", change: "+₹15" },
            { name: "Keshopur Mandi", dist: "45km", price: "₹2,305", trend: "down", change: "-₹5" },
          ].map((mandi, i) => (
            <div key={i} className="p-10 hover:bg-white/5 transition-all group cursor-pointer border-transparent border hover:border-white/10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h4 className="text-lg font-bold text-slate-100 group-hover:text-emerald-400 transition-colors tracking-tight">{mandi.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{mandi.dist} from your location</p>
                </div>
                <div className={cn(
                  "p-3 rounded-xl border shadow-lg",
                  mandi.trend === "up" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : 
                  mandi.trend === "down" ? "bg-red-500/10 text-red-400 border-red-500/20" : 
                  "bg-slate-500/10 text-slate-400 border-slate-500/20"
                )}>
                  {mandi.trend === "up" ? <ArrowUpRight className="w-5 h-5" /> : 
                   mandi.trend === "down" ? <ArrowDownRight className="w-5 h-5" /> : 
                   <TrendingUp className="w-5 h-5" />}
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Current Price</p>
                  <p className="text-3xl font-bold text-slate-100 tracking-tight">{mandi.price}</p>
                </div>
                <p className={cn(
                  "text-sm font-bold px-3 py-1 rounded-full uppercase tracking-widest",
                  mandi.trend === "up" ? "text-emerald-400 bg-emerald-500/5" : 
                  mandi.trend === "down" ? "text-red-400 bg-red-500/5" : 
                  "text-slate-500 bg-slate-500/5"
                )}>
                  {mandi.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
