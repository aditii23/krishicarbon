import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { FileText, Plus, Download, Trash2, Search, Filter, Loader2, Calendar, Tag, IndianRupee, X } from "lucide-react";

export default function FarmRecords({ user }: { user: any }) {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newRecord, setNewRecord] = useState({
    type: "fertilizer",
    details: "",
    amount: "",
    date: new Date().toISOString().split("T")[0]
  });

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/records/${user.id}`);
      const data = await res.json();
      setRecords(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/records/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          ...newRecord,
          amount: parseFloat(newRecord.amount) || 0
        })
      });
      setIsAdding(false);
      setNewRecord({ type: "fertilizer", details: "", amount: "", date: new Date().toISOString().split("T")[0] });
      fetchRecords();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-100 tracking-tight mb-2">Farm Record Management</h1>
          <p className="text-slate-400 font-medium">Keep track of your expenses, fertilizer usage, and crop history.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsAdding(true)}
            className="neo-button flex items-center gap-3 px-8 py-3.5 text-sm"
          >
            <Plus className="w-5 h-5" />
            Add Record
          </button>
          <button className="p-3.5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all shadow-inner group">
            <Download className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
          </button>
        </div>
      </div>

      {isAdding && (
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="glass-card p-10 border-emerald-500/20 depth-shadow relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none"></div>
          <div className="flex items-center justify-between mb-10 relative z-10">
            <h3 className="text-2xl font-bold text-slate-100 tracking-tight">New Farm Record</h3>
            <button onClick={() => setIsAdding(false)} className="p-3 hover:bg-white/10 rounded-xl transition-all border border-white/5">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
          <form onSubmit={handleAdd} className="grid md:grid-cols-4 gap-8 relative z-10">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Type</label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-100 outline-none appearance-none cursor-pointer hover:bg-white/10"
                value={newRecord.type}
                onChange={e => setNewRecord({ ...newRecord, type: e.target.value })}
              >
                <option value="fertilizer" className="bg-slate-900">Fertilizer</option>
                <option value="crop" className="bg-slate-900">Crop History</option>
                <option value="expense" className="bg-slate-900">Expense</option>
              </select>
            </div>
            <div className="space-y-3 md:col-span-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Details</label>
              <input 
                type="text" 
                placeholder="e.g., Urea 50kg, Wheat Sowing"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-100 outline-none placeholder:text-slate-600"
                value={newRecord.details}
                onChange={e => setNewRecord({ ...newRecord, details: e.target.value })}
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Amount (₹)</label>
              <input 
                type="number" 
                placeholder="0.00"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-100 outline-none placeholder:text-slate-600"
                value={newRecord.amount}
                onChange={e => setNewRecord({ ...newRecord, amount: e.target.value })}
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Date</label>
              <input 
                type="date" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-100 outline-none"
                value={newRecord.date}
                onChange={e => setNewRecord({ ...newRecord, date: e.target.value })}
              />
            </div>
            <div className="md:col-span-4 flex justify-end pt-4">
              <button 
                type="submit"
                className="neo-button px-16 py-4 text-base"
              >
                Save Record
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="glass-card border-white/5 depth-shadow overflow-hidden">
        <div className="p-10 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
              <FileText className="w-6 h-6 text-slate-100" />
            </div>
            <h3 className="text-2xl font-bold text-slate-100 tracking-tight">Record History</h3>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search records..." 
                className="bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-xs focus:ring-2 focus:ring-emerald-500/20 transition-all w-64 text-slate-100 outline-none placeholder:text-slate-600"
              />
            </div>
            <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group">
              <Filter className="w-5 h-5 text-slate-500 group-hover:text-slate-100" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/2">
                <th className="px-10 py-6 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Date</th>
                <th className="px-10 py-6 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Type</th>
                <th className="px-10 py-6 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Details</th>
                <th className="px-10 py-6 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] text-right">Amount</th>
                <th className="px-10 py-6 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-10 py-20 text-center">
                    <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mx-auto" />
                  </td>
                </tr>
              ) : records.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-10 py-20 text-center text-slate-500 font-bold uppercase tracking-widest text-xs">
                    No records found. Start by adding your first farm record.
                  </td>
                </tr>
              ) : (
                records.map((record, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-all group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-3 text-sm font-bold text-slate-400">
                        <Calendar className="w-4 h-4 text-slate-600" />
                        {new Date(record.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className={cn(
                        "inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border shadow-inner",
                        record.type === "fertilizer" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : 
                        record.type === "crop" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : 
                        "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      )}>
                        <Tag className="w-3.5 h-3.5" />
                        {record.type}
                      </div>
                    </td>
                    <td className="px-10 py-8 text-base font-bold text-slate-100 tracking-tight">{record.details}</td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex items-center justify-end gap-1.5 text-lg font-bold text-slate-100 tracking-tight">
                        <IndianRupee className="w-4 h-4 text-slate-500" />
                        {record.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <button className="p-3 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all border border-transparent hover:border-red-400/20">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
