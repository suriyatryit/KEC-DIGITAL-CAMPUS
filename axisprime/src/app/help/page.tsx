import { Search, Book, User, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function HelpPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-rose-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="max-w-4xl mx-auto px-6 text-center space-y-12">

                <div className="space-y-6">
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-white">
                        How can we <span className="text-gradient">help you?</span>
                    </h1>
                </div>

                <div className="relative max-w-2xl mx-auto">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/40" />
                    <input
                        type="text"
                        placeholder="Search for articles, guides, and tutorials..."
                        className="w-full h-16 pl-16 pr-6 rounded-full glass-panel border border-white/20 bg-black/50 text-white placeholder:text-white/40 focus:outline-none focus:border-rose-500/50 text-lg transition-colors"
                    />
                </div>

                <div className="grid md:grid-cols-3 gap-6 pt-12">
                    <Link href="#" className="glass-panel p-8 rounded-3xl text-center hover:border-rose-500/30 hover:-translate-y-1 transition-all group">
                        <div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-rose-500/20 transition-colors">
                            <Book className="w-8 h-8 text-rose-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Knowledge Base</h3>
                        <p className="text-white/50 text-sm">Read comprehensive guides on everything related to AxisPrime.</p>
                    </Link>
                    <Link href="#" className="glass-panel p-8 rounded-3xl text-center hover:border-indigo-500/30 hover:-translate-y-1 transition-all group">
                        <div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
                            <MessageCircle className="w-8 h-8 text-indigo-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Community Forum</h3>
                        <p className="text-white/50 text-sm">Join the discussion with millions of other AxisPrime creators.</p>
                    </Link>
                    <Link href="#" className="glass-panel p-8 rounded-3xl text-center hover:border-brand-500/30 hover:-translate-y-1 transition-all group">
                        <div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-brand-500/20 transition-colors">
                            <User className="w-8 h-8 text-brand-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Hire an Expert</h3>
                        <p className="text-white/50 text-sm">Need professional help? Connect with certified freelancers or agencies.</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
