import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Coins, ShieldCheck, TrendingUp, History, ArrowUpRight, Info, Wallet, Download } from "lucide-react";

export default function CarbonCredits({ user }: { user: any }) {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/dashboard/${user.id}`)
      .then(res => res.json())
      .then(data => setStats(data));
  }, [user.id]);

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-100 tracking-tight mb-2">Carbon Credit Tracker</h1>
          <p className="text-slate-400 font-medium">Monitor your carbon sequestration and manage your earnings.</p>
        </div>
        <button className="neo-button px-8 py-4 flex items-center gap-3 group">
          <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          Download Certificate
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Wallet Card */}
        <div className="lg:col-span-2 glass-card p-12 text-white relative overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)] border-emerald-500/10 group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-16">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center shadow-inner border border-emerald-500/20">
                  <Wallet className="w-7 h-7 text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Farmer Wallet</p>
                  <p className="text-lg font-bold text-slate-100">Verified Balance</p>
                </div>
              </div>
              <div className="px-5 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                Active Account
              </div>
            </div>

            <div className="mb-16">
              <p className="text-slate-500 text-sm font-bold uppercase tracking-[0.2em] mb-4">Total Earnings Generated</p>
              <h2 className="text-7xl font-bold text-slate-100 tracking-tighter glow-text">₹{stats?.carbon?.totalValue ? stats.carbon.totalValue.toLocaleString() : "0"}</h2>
            </div>

            <div className="grid grid-cols-2 gap-10 pt-10 border-t border-white/5">
              <div>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">Carbon Stored</p>
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-bold text-slate-100">{stats?.carbon?.totalTons ? stats.carbon.totalTons.toFixed(2) : "0.00"}</span>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1.5">Tons CO₂</span>
                </div>
              </div>
              <div>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">Current Rate</p>
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-bold text-slate-100">₹1,500</span>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1.5">/ Ton</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors"></div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-8">
          <div className="glass-card p-10 border-white/5 depth-shadow">
            <h3 className="text-2xl font-bold text-slate-100 mb-10 tracking-tight">Verification Status</h3>
            <div className="space-y-8">
              <StatusStep 
                icon={ShieldCheck} 
                title="Soil Sampling" 
                desc="Completed on Feb 28" 
                status="done" 
              />
              <StatusStep 
                icon={TrendingUp} 
                title="AI Verification" 
                desc="In progress (85%)" 
                status="active" 
              />
              <StatusStep 
                icon={Coins} 
                title="Credit Issuance" 
                desc="Expected by March 10" 
                status="pending" 
              />
            </div>
          </div>

          <div className="glass-card p-10 border-emerald-500/10 depth-shadow relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <Info className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="font-bold text-slate-100">Next Payout</h4>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
                Your next verified payout of <span className="text-emerald-400 font-bold">₹4,800</span> is scheduled for processing on March 15, 2026.
              </p>
              <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-slate-100 rounded-2xl font-bold text-sm transition-all border border-white/10">
                View Payout Details
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="glass-card border-white/5 depth-shadow overflow-hidden">
        <div className="p-10 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
              <History className="w-6 h-6 text-slate-100" />
            </div>
            <h3 className="text-2xl font-bold text-slate-100 tracking-tight">Earning History</h3>
          </div>
          <button className="text-sm font-bold text-emerald-400 hover:glow-text transition-all">View All Transactions</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/2">
                <th className="px-10 py-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Date</th>
                <th className="px-10 py-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Description</th>
                <th className="px-10 py-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Carbon (Tons)</th>
                <th className="px-10 py-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Amount</th>
                <th className="px-10 py-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { date: "Feb 28, 2026", desc: "Q1 Sequestration Reward", tons: 1.2, amount: "₹1,800", status: "Verified" },
                { date: "Jan 15, 2026", desc: "Soil Health Bonus", tons: 0.8, amount: "₹1,200", status: "Verified" },
                { date: "Dec 10, 2025", desc: "Sustainable Practice Credit", tons: 1.5, amount: "₹2,250", status: "Verified" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/5 transition-all group cursor-pointer">
                  <td className="px-10 py-8 text-sm font-bold text-slate-500">{row.date}</td>
                  <td className="px-10 py-8 text-sm font-bold text-slate-100">{row.desc}</td>
                  <td className="px-10 py-8 text-sm font-bold text-slate-400">{row.tons} t</td>
                  <td className="px-10 py-8 text-sm font-bold text-emerald-400">{row.amount}</td>
                  <td className="px-10 py-8">
                    <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusStep({ icon: Icon, title, desc, status }: any) {
  return (
    <div className="flex gap-6">
      <div className="relative flex flex-col items-center">
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center relative z-10 border shadow-lg",
          status === "done" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/20" : 
          status === "active" ? "bg-slate-100 text-slate-900 border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] animate-pulse" : 
          "bg-white/5 text-slate-700 border-white/5"
        )}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="w-0.5 h-full bg-white/5 absolute top-12"></div>
      </div>
      <div className="pb-10">
        <h4 className={cn(
          "text-base font-bold mb-1 tracking-tight",
          status === "pending" ? "text-slate-700" : "text-slate-100"
        )}>{title}</h4>
        <p className="text-xs text-slate-500 font-medium">{desc}</p>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
