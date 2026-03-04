import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Leaf, ArrowRight, ShieldCheck, Sprout, CloudRain, Coins, Wheat } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 overflow-x-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-8 max-w-7xl mx-auto relative z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <Leaf className="text-slate-950 w-6 h-6" />
          </div>
          <span className="font-bold text-2xl tracking-tight glow-text">Krishi Carbon</span>
        </div>
        <div className="flex items-center gap-8">
          <Link to="/auth" className="text-sm font-bold text-slate-400 hover:text-emerald-400 transition-colors">Login</Link>
          <Link to="/auth?mode=signup" className="neo-button text-sm py-2.5">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 py-20 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-8"
          >
            Smart Climate Agriculture
          </motion.span>
          <h1 className="text-6xl lg:text-8xl font-bold text-slate-100 leading-[1.05] mb-8 tracking-tight">
            Empowering Farmers with <span className="glow-text">Soil Intelligence</span> & Carbon Income
          </h1>
          <p className="text-lg text-slate-400 mb-12 max-w-lg leading-relaxed font-medium">
            Analyze soil fertility, predict rainfall, optimize crops, and earn carbon credits — all in one immersive platform. From Soil Health to Carbon Wealth.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link to="/auth?mode=signup" className="neo-button px-10 py-5 text-lg flex items-center justify-center gap-3 group">
              Start Your Journey <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link to="/auth" className="glass-card px-10 py-5 text-lg font-bold flex items-center justify-center hover:bg-white/10 transition-all border-white/10">
              Farmer Login
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="relative"
        >
          <div className="aspect-square rounded-[64px] overflow-hidden depth-shadow border border-white/10 relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent mix-blend-overlay z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000" 
              alt="Lush green farm" 
              className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Floating Glass Stats */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-10 -left-10 glass-card p-8 flex items-center gap-5 border-emerald-500/20 shadow-[0_20px_50px_rgba(16,185,129,0.1)]"
          >
            <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              <Sprout className="text-slate-950 w-7 h-7" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Soil Health</p>
              <p className="text-2xl font-bold text-slate-100">82% <span className="text-emerald-400 text-sm">Optimal</span></p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="absolute -top-10 -right-10 glass-card p-8 flex items-center gap-5 border-blue-500/20 shadow-[0_20px_50px_rgba(59,130,246,0.1)]"
          >
            <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)]">
              <CloudRain className="text-slate-950 w-7 h-7" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Rain Forecast</p>
              <p className="text-2xl font-bold text-slate-100">75% <span className="text-blue-400 text-sm">Prob.</span></p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-bold text-slate-100 mb-6 tracking-tight">Everything you need to thrive</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">Advanced tools designed specifically for the modern climate-conscious farmer.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Sprout, title: "Soil Analysis", desc: "Get deep insights into NPK levels and pH balance.", color: "emerald" },
              { icon: CloudRain, title: "Rain Prediction", desc: "7-day hyper-local weather forecasts for your farm.", color: "blue" },
              { icon: Wheat, title: "Crop Advice", desc: "AI-driven recommendations for maximum yield.", color: "amber" },
              { icon: Coins, title: "Carbon Credits", desc: "Turn your sustainable practices into real income.", color: "teal" }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="glass-card p-10 glass-card-hover border-white/5"
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg",
                  feature.color === "emerald" ? "bg-emerald-500/20 text-emerald-400" :
                  feature.color === "blue" ? "bg-blue-500/20 text-blue-400" :
                  feature.color === "amber" ? "bg-amber-500/20 text-amber-400" :
                  "bg-teal-500/20 text-teal-400"
                )}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-100 mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="glass-card p-16 lg:p-24 flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative border-emerald-500/10 depth-shadow">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none"></div>
          <div className="relative z-10 flex-1">
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight text-slate-100">Join thousands of farmers making the switch to smart agriculture.</h2>
            <p className="text-slate-400 text-xl mb-12 font-medium">Start monitoring your farm's health and earning carbon credits today.</p>
            <Link to="/auth?mode=signup" className="neo-button px-12 py-5 text-lg">
              Create Free Account
            </Link>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-6 relative z-10">
            {[
              { val: "50k+", label: "Active Farmers" },
              { val: "120k", label: "Tons CO₂ Stored" },
              { val: "₹12Cr", label: "Earnings Paid" },
              { val: "98%", label: "Accuracy Rate" }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md p-8 rounded-[32px] border border-white/10 shadow-inner">
                <p className="text-4xl font-bold mb-2 glow-text">{stat.val}</p>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-white/5 text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Leaf className="text-emerald-500 w-6 h-6" />
          <span className="font-bold text-xl tracking-tight text-slate-100">Krishi Carbon</span>
        </div>
        <p className="text-slate-500 text-sm font-medium">© 2026 Krishi Carbon. All rights reserved. Built for the future of farming.</p>
      </footer>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
