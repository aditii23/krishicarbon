import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MessageSquare, Heart, Share2, Plus, Search, User, Loader2, Send, Clock, Users } from "lucide-react";

export default function CommunityForum({ user }: { user: any }) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/community/posts");
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;
    setIsPosting(true);
    try {
      await fetch("/api/community/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          authorName: user.fullName,
          title: newPost.title,
          content: newPost.content
        })
      });
      setNewPost({ title: "", content: "" });
      fetchPosts();
    } catch (error) {
      console.error(error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-100 tracking-tight mb-2">Farmer Community</h1>
          <p className="text-slate-400 font-medium">Connect, share experiences, and learn from fellow climate-smart farmers.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search discussions..." 
              className="bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-xs focus:ring-2 focus:ring-emerald-500/20 transition-all w-64 text-slate-100 outline-none placeholder:text-slate-600"
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Discussion List */}
        <div className="lg:col-span-2 space-y-10">
          {/* Create Post */}
          <div className="glass-card p-10 border-white/5 depth-shadow relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none"></div>
            <h3 className="text-2xl font-bold text-slate-100 mb-8 flex items-center gap-3 relative z-10">
              <Plus className="w-6 h-6 text-emerald-400" />
              Start a Discussion
            </h3>
            <form onSubmit={handlePost} className="space-y-6 relative z-10">
              <input 
                type="text" 
                placeholder="Topic Title"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-100 outline-none placeholder:text-slate-600"
                value={newPost.title}
                onChange={e => setNewPost({ ...newPost, title: e.target.value })}
              />
              <textarea 
                placeholder="What's on your mind?"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all min-h-[150px] text-slate-100 outline-none placeholder:text-slate-600 resize-none"
                value={newPost.content}
                onChange={e => setNewPost({ ...newPost, content: e.target.value })}
              />
              <div className="flex justify-end pt-2">
                <button 
                  type="submit"
                  disabled={isPosting}
                  className="neo-button px-10 py-4 flex items-center gap-3 disabled:opacity-50"
                >
                  {isPosting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  Post to Community
                </button>
              </div>
            </form>
          </div>

          {loading ? (
            <div className="py-20 text-center glass-card border-white/5">
              <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mx-auto mb-6" />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading community posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="glass-card p-20 text-center border-white/5">
              <MessageSquare className="w-16 h-16 text-slate-700 mx-auto mb-6" />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No posts yet. Be the first to share!</p>
            </div>
          ) : (
            posts.map((post, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-10 border-white/5 depth-shadow hover:bg-white/5 transition-all group"
              >
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
                    <User className="w-7 h-7 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-100 tracking-tight group-hover:text-emerald-400 transition-colors">{post.authorName}</h4>
                    <div className="flex items-center gap-3 text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(post.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-100 mb-4 tracking-tight leading-tight">{post.title}</h3>
                <p className="text-slate-400 text-base leading-relaxed mb-10 font-medium">
                  {post.content}
                </p>

                <div className="flex items-center gap-8 pt-8 border-t border-white/5">
                  <button className="flex items-center gap-3 text-slate-500 hover:text-emerald-400 transition-colors font-bold text-sm group/btn">
                    <Heart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    <span>24 Likes</span>
                  </button>
                  <button className="flex items-center gap-3 text-slate-500 hover:text-emerald-400 transition-colors font-bold text-sm group/btn">
                    <MessageSquare className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    <span>8 Comments</span>
                  </button>
                  <button className="flex items-center gap-3 text-slate-500 hover:text-emerald-400 transition-colors font-bold text-sm ml-auto group/btn">
                    <Share2 className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    <span>Share</span>
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-10">
          <div className="glass-card p-10 border-emerald-500/10 depth-shadow relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-slate-100 mb-8 tracking-tight">Success Stories</h3>
              <div className="space-y-8">
                <div className="p-6 bg-white/2 rounded-2xl border border-white/5 hover:bg-white/5 transition-all">
                  <p className="text-sm font-bold text-emerald-400 mb-3">Rajesh from Punjab</p>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    "Switched to Krishi Carbon last year. My soil health score went from 45 to 82, and I earned ₹12,000 in carbon credits!"
                  </p>
                </div>
                <div className="p-6 bg-white/2 rounded-2xl border border-white/5 hover:bg-white/5 transition-all">
                  <p className="text-sm font-bold text-emerald-400 mb-3">Sunita from Maharashtra</p>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    "The rainfall forecast saved my cotton crop from unseasonal rains. Highly recommend the AI assistant."
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-emerald-500/10 transition-colors"></div>
          </div>

          <div className="glass-card p-10 border-white/5 depth-shadow">
            <h3 className="text-2xl font-bold text-slate-100 mb-8 flex items-center gap-3 tracking-tight">
              <Users className="w-7 h-7 text-slate-500" />
              Online Experts
            </h3>
            <div className="space-y-6">
              {[
                { name: "Dr. Amit Sharma", role: "Soil Scientist" },
                { name: "Er. Priya Patel", role: "Agri-Tech Expert" },
                { name: "Karan Singh", role: "Carbon Auditor" },
              ].map((expert, i) => (
                <div key={i} className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-white/5 group">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10 group-hover:border-emerald-500/20 transition-all">
                    <User className="w-6 h-6 text-slate-600 group-hover:text-emerald-400" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">{expert.name}</h5>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{expert.role}</p>
                  </div>
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full ml-auto shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
