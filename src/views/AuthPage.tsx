import React, { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Leaf, Mail, Lock, User, Phone, MapPin, Ruler, ArrowLeft } from "lucide-react";

export default function AuthPage({ onLogin }: { onLogin: (user: any) => void }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isSignUp = searchParams.get("mode") === "signup";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    state: "",
    district: "",
    farmSize: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const endpoint = isSignUp ? "/api/auth/signup" : "/api/auth/signin";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        onLogin(data);
        navigate("/dashboard");
      } else {
        setError(data.error || "Authentication failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#020617] relative overflow-hidden">
      <div className="fixed inset-0 bg-mesh pointer-events-none opacity-30"></div>
      
      {/* Left Side - Image/Branding */}
      <div className="hidden lg:flex lg:w-1/2 p-16 flex-col justify-between relative z-10">
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 text-white mb-24 group">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform">
              <Leaf className="text-slate-950 w-6 h-6" />
            </div>
            <span className="font-bold text-2xl tracking-tight glow-text">Krishi Carbon</span>
          </Link>
          <h2 className="text-6xl font-bold text-slate-100 leading-[1.1] mb-8 tracking-tight">
            Join the future of <span className="text-emerald-400">sustainable farming</span>.
          </h2>
          <p className="text-slate-400 text-xl max-w-md font-medium leading-relaxed">
            Unlock AI-powered insights for your farm and start earning from your carbon sequestration efforts.
          </p>
        </div>
        
        <div className="relative z-10 flex items-center gap-8">
          <div className="flex -space-x-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-14 h-14 rounded-2xl border-2 border-slate-900 bg-white/5 backdrop-blur-sm overflow-hidden shadow-xl">
                <img src={`https://picsum.photos/seed/farmer${i}/100/100`} alt="Farmer" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Trusted by 50,000+ farmers</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card w-full max-w-xl p-12 border-white/5 depth-shadow"
        >
          <Link to="/" className="lg:hidden flex items-center gap-2 text-emerald-400 mb-12 font-bold">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>

          <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-100 mb-4 tracking-tight">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h1>
            <p className="text-slate-400 font-medium">
              {isSignUp ? "Start your journey to carbon wealth today." : "Login to manage your farm's health."}
            </p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 p-5 rounded-2xl mb-8 text-sm font-bold"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div className="space-y-6">
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-emerald-400 transition-colors" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all text-slate-100 placeholder:text-slate-600"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                <div className="relative group">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-emerald-400 transition-colors" />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all text-slate-100 placeholder:text-slate-600"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative group">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-emerald-400 transition-colors" />
                    <input
                      type="text"
                      placeholder="State"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all text-slate-100 placeholder:text-slate-600"
                      value={formData.state}
                      onChange={e => setFormData({ ...formData, state: e.target.value })}
                    />
                  </div>
                  <div className="relative group">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-emerald-400 transition-colors" />
                    <input
                      type="text"
                      placeholder="District"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all text-slate-100 placeholder:text-slate-600"
                      value={formData.district}
                      onChange={e => setFormData({ ...formData, district: e.target.value })}
                    />
                  </div>
                </div>
                <div className="relative group">
                  <Ruler className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-emerald-400 transition-colors" />
                  <input
                    type="number"
                    placeholder="Farm Size (Acres)"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all text-slate-100 placeholder:text-slate-600"
                    value={formData.farmSize}
                    onChange={e => setFormData({ ...formData, farmSize: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-emerald-400 transition-colors" />
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all text-slate-100 placeholder:text-slate-600"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-emerald-400 transition-colors" />
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all text-slate-100 placeholder:text-slate-600"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full neo-button py-5 text-lg"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin"></div>
              ) : (
                isSignUp ? "Create Account" : "Sign In"
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-slate-500 font-bold text-sm">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <Link 
                to={isSignUp ? "/auth" : "/auth?mode=signup"} 
                className="text-emerald-400 hover:underline"
              >
                {isSignUp ? "Sign In" : "Create Account"}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
