import { Sparkles, Wand2, Zap, Rocket } from "lucide-react";
import Link from "next/link";

export default function AIGeneratorPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-brand-500/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
                <div className="space-y-6 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm font-medium text-white/90 border-brand-500/30">
                        <Sparkles className="w-4 h-4 text-brand-400" />
                        <span>AxisPrime AI Builder</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight">
                        Generate a complete site in <span className="text-gradient">seconds</span>
                    </h1>
                    <p className="text-xl text-white/60">
                        Describe your business, and our advanced AI will instantly design a fully responsive website with copy, images, and layout tailored to your needs.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto glass-panel p-2 rounded-2xl border-white/10 shadow-2xl relative">
                    <div className="flex bg-[#0a0a0a] rounded-xl overflow-hidden p-2 items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0">
                            <Wand2 className="w-5 h-5 text-brand-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="e.g. A modern portfolio for a freelance photographer in New York..."
                            className="w-full bg-transparent border-none text-white focus:outline-none focus:ring-0 text-lg placeholder:text-white/30 truncate"
                            disabled
                        />
                        <Link href="/pricing" className="px-6 py-3 bg-brand-500 hover:bg-brand-400 text-white font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2">
                            Generate <Sparkles className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 pt-12">
                    <div className="glass-panel p-8 rounded-3xl text-left hover:border-brand-500/30 transition-colors">
                        <div className="w-12 h-12 rounded-2xl bg-brand-500/20 flex items-center justify-center mb-6 text-brand-400">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Instant Generation</h3>
                        <p className="text-white/60 leading-relaxed">No more staring at a blank canvas. Get a fully working draft instantly.</p>
                    </div>
                    <div className="glass-panel p-8 rounded-3xl text-left hover:border-brand-500/30 transition-colors border-brand-500/20 relative">
                        <div className="absolute -top-3 right-6 bg-brand-500 text-xs font-bold px-3 py-1 rounded-full text-white">MAGIC</div>
                        <div className="w-12 h-12 rounded-2xl bg-brand-500/20 flex items-center justify-center mb-6 text-brand-400">
                            <Wand2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Smart Context</h3>
                        <p className="text-white/60 leading-relaxed">The AI writes compelling copy and selects fitting imagery based on your prompt.</p>
                    </div>
                    <div className="glass-panel p-8 rounded-3xl text-left hover:border-brand-500/30 transition-colors">
                        <div className="w-12 h-12 rounded-2xl bg-brand-500/20 flex items-center justify-center mb-6 text-brand-400">
                            <Rocket className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Ready to Publish</h3>
                        <p className="text-white/60 leading-relaxed">Customize the generated result in the Classic Editor, or publish it right away.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
