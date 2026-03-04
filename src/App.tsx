import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Sprout, 
  CloudRain, 
  Wheat, 
  Coins, 
  TrendingUp, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Bell,
  Stethoscope,
  ChevronRight,
  Leaf,
  Satellite,
  Calculator,
  Gavel,
  Users,
  FileText,
  Settings,
  Mic,
  Languages,
  Send
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Components
import LandingPage from "./views/LandingPage.tsx";
import AuthPage from "./views/AuthPage.tsx";
import DashboardOverview from "./views/DashboardOverview.tsx";
import SoilFertility from "./views/SoilFertility.tsx";
import RainfallForecast from "./views/RainfallForecast.tsx";
import CropRecommendation from "./views/CropRecommendation.tsx";
import CarbonCredits from "./views/CarbonCredits.tsx";
import MarketPrices from "./views/MarketPrices.tsx";
import DiseaseDetection from "./views/DiseaseDetection.tsx";
import SatelliteMonitoring from "./views/SatelliteMonitoring.tsx";
import ProfitEstimator from "./views/ProfitEstimator.tsx";
import GovernmentSchemes from "./views/GovernmentSchemes.tsx";
import CommunityForum from "./views/CommunityForum.tsx";
import FarmRecords from "./views/FarmRecords.tsx";
import { getAIResponse } from "./services/gemini.ts";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [lang, setLang] = useState<"EN" | "HI">("EN");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-emerald-500/30 selection:text-white">
        <div className="fixed inset-0 bg-mesh pointer-events-none opacity-50"></div>
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
            <Route path="/auth" element={user ? <Navigate to="/dashboard" /> : <AuthPage onLogin={setUser} />} />
            
            <Route 
              path="/dashboard/*" 
              element={
                user ? (
                  <DashboardLayout user={user} onLogout={handleLogout} lang={lang} setLang={setLang}>
                    <Routes>
                      <Route index element={<DashboardOverview user={user} />} />
                      <Route path="soil" element={<SoilFertility user={user} />} />
                      <Route path="rainfall" element={<RainfallForecast user={user} />} />
                      <Route path="crops" element={<CropRecommendation user={user} />} />
                      <Route path="carbon" element={<CarbonCredits user={user} />} />
                      <Route path="market" element={<MarketPrices user={user} />} />
                      <Route path="disease" element={<DiseaseDetection user={user} />} />
                      <Route path="satellite" element={<SatelliteMonitoring user={user} />} />
                      <Route path="profit" element={<ProfitEstimator user={user} />} />
                      <Route path="schemes" element={<GovernmentSchemes user={user} />} />
                      <Route path="community" element={<CommunityForum user={user} />} />
                      <Route path="records" element={<FarmRecords user={user} />} />
                    </Routes>
                    <AIAssistant user={user} lang={lang} />
                  </DashboardLayout>
                ) : (
                  <Navigate to="/auth" />
                )
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function DashboardLayout({ children, user, onLogout, lang, setLang }: { children: React.ReactNode, user: any, onLogout: () => void, lang: string, setLang: (l: any) => void }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { name: "Soil Fertility", path: "/dashboard/soil", icon: Sprout },
    { name: "Rainfall Forecast", path: "/dashboard/rainfall", icon: CloudRain },
    { name: "Crop AI", path: "/dashboard/crops", icon: Wheat },
    { name: "Carbon Tracker", path: "/dashboard/carbon", icon: Coins },
    { name: "Market Prices", path: "/dashboard/market", icon: TrendingUp },
    { name: "Satellite View", path: "/dashboard/satellite", icon: Satellite },
    { name: "Profit Estimator", path: "/dashboard/profit", icon: Calculator },
    { name: "Govt Schemes", path: "/dashboard/schemes", icon: Gavel },
    { name: "Community", path: "/dashboard/community", icon: Users },
    { name: "Farm Records", path: "/dashboard/records", icon: FileText },
    { name: "Disease Detection", path: "/dashboard/disease", icon: Stethoscope },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#020617]">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-slate-950/50 backdrop-blur-2xl border-r border-white/5 transition-all duration-500 ease-in-out z-50 shrink-0 relative",
          isSidebarOpen ? "w-72" : "w-24"
        )}
      >
        <div className="p-8 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Leaf className="text-slate-950 w-7 h-7" />
          </div>
          {isSidebarOpen && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-bold text-2xl tracking-tight whitespace-nowrap glow-text"
            >
              Krishi Carbon
            </motion.span>
          )}
        </div>

        <nav className="mt-8 px-4 space-y-2 overflow-y-auto max-h-[calc(100vh-250px)] custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                  isActive 
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]" 
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
                )}
              >
                <item.icon className={cn("w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110", isActive && "text-emerald-400")} />
                {isSidebarOpen && <span className="font-semibold text-sm tracking-wide">{item.name}</span>}
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute left-0 w-1 h-6 bg-emerald-500 rounded-r-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-8 left-0 w-full px-4 space-y-3">
          <button className="flex items-center gap-4 p-4 w-full rounded-2xl text-slate-400 hover:bg-white/5 hover:text-slate-100 transition-all group">
            <Settings className="w-5 h-5 shrink-0 group-hover:rotate-90 transition-transform duration-500" />
            {isSidebarOpen && <span className="font-semibold text-sm">Settings</span>}
          </button>
          <button 
            onClick={onLogout}
            className="flex items-center gap-4 p-4 w-full rounded-2xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all group"
          >
            <LogOut className="w-5 h-5 shrink-0 group-hover:-translate-x-1 transition-transform" />
            {isSidebarOpen && <span className="font-semibold text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Navbar */}
        <header className="bg-slate-950/30 backdrop-blur-md border-b border-white/5 h-20 flex items-center justify-between px-10 shrink-0 z-40">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-3 hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/10"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-8">
            {/* Language Toggle */}
            <button 
              onClick={() => setLang(lang === "EN" ? "HI" : "EN")}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-emerald-400 hover:bg-white/10 transition-all shadow-inner"
            >
              <Languages className="w-4 h-4" />
              {lang}
            </button>

            <button className="relative p-3 hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/10">
              <Bell className="w-5 h-5" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-emerald-500 rounded-full border-2 border-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
            </button>
            
            <div className="flex items-center gap-4 border-l border-white/10 pl-8">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-100">{user.fullName}</p>
                <p className="text-xs text-slate-500 font-medium">{user.district}, {user.state}</p>
              </div>
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-inner group cursor-pointer hover:border-emerald-500/30 transition-all">
                <User className="w-6 h-6 text-slate-400 group-hover:text-emerald-400 transition-colors" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function AIAssistant({ user, lang }: { user: any, lang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<any[]>([
    { role: "ai", text: lang === "EN" ? "Hello! How can I help you today?" : "नमस्ते! मैं आज आपकी कैसे मदद कर सकता हूँ?" }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim()) return;
    const userMsg = { role: "user", text: query };
    setMessages([...messages, userMsg]);
    setQuery("");
    setLoading(true);

    try {
      const response = await getAIResponse(query, { user });
      setMessages(prev => [...prev, { role: "ai", text: response.text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "ai", text: "Sorry, I encountered an error." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40, rotate: 5 }}
            className="glass-card w-96 h-[500px] flex flex-col mb-6 overflow-hidden depth-shadow border-emerald-500/20"
          >
            <div className="bg-emerald-500/20 backdrop-blur-md p-6 text-white flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                  <Mic className="w-5 h-5 text-slate-950" />
                </div>
                <div>
                  <span className="font-bold text-sm block">Krishi Assistant</span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Online</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-all"><X className="w-4 h-4" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-950/20">
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: msg.role === "ai" ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={cn(
                    "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                    msg.role === "ai" 
                      ? "bg-white/5 text-slate-200 self-start border border-white/5" 
                      : "bg-emerald-500 text-slate-950 font-medium self-end ml-auto shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                  )}
                >
                  {msg.text}
                </motion.div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold animate-pulse">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  Assistant is thinking...
                </div>
              )}
            </div>

            <div className="p-6 bg-slate-950/40 border-t border-white/10 flex gap-3">
              <input 
                type="text" 
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyPress={e => e.key === "Enter" && handleSend()}
                placeholder="Ask anything..."
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-emerald-500/50 transition-all outline-none placeholder:text-slate-600"
              />
              <button 
                onClick={handleSend}
                className="p-3 bg-emerald-500 text-slate-950 rounded-2xl hover:scale-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-emerald-500 text-slate-950 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <Mic className="w-7 h-7 group-hover:animate-pulse relative z-10" />
      </button>
    </div>
  );
}
