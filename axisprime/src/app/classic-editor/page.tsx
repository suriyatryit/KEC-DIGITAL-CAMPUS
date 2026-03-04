import { MousePointer2, LayoutTemplate, Layers } from "lucide-react";
import Link from "next/link";

export default function ClassicEditorPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-500/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-sm font-medium text-brand-400">
                            <MousePointer2 className="w-4 h-4" />
                            <span>Classic Editor</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight">
                            Total drag & drop <br className="hidden md:block" /> <span className="text-gradient">freedom</span>
                        </h1>
                        <p className="text-xl text-white/60">
                            Build your website exactly how you want it. Move any text, image, or button to exact, pixel-perfect coordinates. No coding required.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/pricing" className="px-8 py-4 rounded-full bg-white text-background font-medium hover:bg-white/90 transition-colors text-center">
                                Start Creating
                            </Link>
                            <Link href="#" className="px-8 py-4 rounded-full glass-panel text-white font-medium hover:bg-white/5 transition-colors text-center border-white/10">
                                Browse Templates
                            </Link>
                        </div>
                    </div>
                    <div className="relative w-full aspect-square md:aspect-auto">
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-600/30 to-indigo-500/30 rounded-3xl p-4 md:p-8 transform rotate-3 shadow-2xl backdrop-blur-3xl border border-white/10 min-h-[500px]">
                            <div className="w-full h-full glass-panel rounded-2xl overflow-hidden relative shadow-2xl">
                                {/* Editor mock UI */}
                                <div className="h-12 border-b border-white/10 flex items-center justify-between px-4 bg-black/40">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                    <div className="text-xs text-white/50 font-mono">index.html</div>
                                </div>
                                <div className="p-8 h-full bg-[#0a0a0a] relative">
                                    <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-brand-500/50 border-dashed rounded flex flex-col items-center justify-center text-brand-500 bg-brand-500/10 cursor-move">
                                        <LayoutTemplate className="w-8 h-8 opacity-50 mb-2" />
                                        <span className="text-xs font-semibold">Image Block</span>
                                    </div>
                                    <div className="absolute top-1/2 left-1/2 w-48 h-16 border-2 border-indigo-500 border-solid rounded flex flex-col items-center justify-center text-white bg-indigo-500/20 cursor-move shadow-lg">
                                        <span className="text-sm font-semibold">Hero Heading</span>
                                        <div className="absolute -top-3 -right-3 w-6 h-6 bg-white text-black rounded-full flex items-center justify-center shadow">
                                            <Layers className="w-3 h-3" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
