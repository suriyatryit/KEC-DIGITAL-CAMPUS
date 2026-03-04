import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-500/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 text-center space-y-8 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-sm font-medium text-white/90 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Sparkles className="w-4 h-4 text-brand-400" />
                    <span>Introducing AxisPrime AI Website Builder</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both">
                    Limitless Creation. <br />
                    <span className="text-gradient">Unbound Potential.</span>
                </h1>

                <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/70 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
                    From simple ideas to robust enterprise platforms, AxisPrime gives you the ultimate ecosystem to build, manage, and scale your online presence—faster than ever.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500 fill-mode-both">
                    <Link
                        href="/pricing"
                        className="group relative inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-8 font-medium text-background transition-all hover:bg-white/90 focus:outline-none w-full sm:w-auto text-lg"
                    >
                        <span>Get Started Free</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 rounded-full bg-white blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                    </Link>

                    <Link
                        href="/ai-generator"
                        className="inline-flex h-14 items-center justify-center gap-2 rounded-full glass-panel px-8 font-medium text-white transition-all hover:bg-white/5 w-full sm:w-auto text-lg hover:border-white/20"
                    >
                        <Sparkles className="w-5 h-5 text-brand-400" />
                        <span>Generate with AI</span>
                    </Link>
                </div>

                {/* Dashboard Preview Graphic */}
                <div className="mt-20 relative max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700 fill-mode-both">
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10 rounded-2xl" />
                    <div className="glass-panel p-2 rounded-2xl border-white/10 shadow-2xl relative overflow-hidden">
                        {/* Decorative Window Controls */}
                        <div className="absolute top-4 left-4 flex gap-2 z-20">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        {/* Mock Content */}
                        <div className="aspect-[16/9] md:aspect-[21/9] bg-gradient-to-br from-[#121214] to-[#0A0A0B] rounded-xl flex items-center justify-center overflow-hidden relative">
                            {/* Abstract UI elements mimicking an editor */}
                            <div className="absolute left-0 top-0 bottom-0 w-64 border-r border-white/5 p-6 space-y-4 hidden md:block">
                                <div className="h-8 w-3/4 rounded bg-white/5" />
                                <div className="h-4 w-full rounded bg-white/5 mt-8" />
                                <div className="h-4 w-5/6 rounded bg-white/5" />
                                <div className="h-4 w-4/6 rounded bg-white/5" />
                            </div>
                            <div className="absolute inset-0 md:left-64 flex items-center justify-center p-8">
                                <div className="w-full h-full max-w-3xl rounded-lg border border-white/10 bg-black/50 overflow-hidden shadow-2xl">
                                    <div className="h-12 border-b border-white/10 flex items-center px-4">
                                        <div className="w-1/3 h-4 rounded bg-white/10" />
                                    </div>
                                    <div className="p-8 space-y-6">
                                        <div className="w-3/4 h-12 mx-auto rounded-lg bg-gradient-to-r from-brand-500/20 to-indigo-500/20" />
                                        <div className="w-1/2 h-6 mx-auto rounded bg-white/5" />
                                        <div className="w-full h-32 mt-12 rounded-lg bg-white/5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
