import Link from "next/link";
import { MousePointer2, LayoutTemplate, Layers, Code2, MonitorSmartphone } from "lucide-react";

export function CreationPaths() {
    return (
        <section className="py-24 relative overflow-hidden bg-white/[0.02]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
                        Choose your <span className="text-gradient-brand">Creation Path</span>
                    </h2>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto">
                        Whether you need the simple freedom of drag-and-drop or the advanced control of a professional workspace.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">

                    {/* Classic Editor Path */}
                    <div className="glass-panel p-8 md:p-12 group hover:border-brand-500/30 transition-all duration-500 relative overflow-hidden rounded-3xl">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <MousePointer2 className="w-32 h-32" />
                        </div>

                        <div className="relative z-10 space-y-8">
                            <div className="w-14 h-14 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center border border-brand-500/30">
                                <LayoutTemplate className="w-7 h-7" />
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-3xl font-display font-bold text-white">The Classic Editor</h3>
                                <p className="text-white/70 text-lg leading-relaxed">
                                    Tailored for DIY users. Experience total drag-and-drop freedom. Move any text, image, or button to exact, pixel-perfect coordinates.
                                </p>
                            </div>

                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-white/80">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                                    <span>900+ Designer-made templates</span>
                                </li>
                                <li className="flex items-center gap-3 text-white/80">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                                    <span>Dedicated mobile layout optimizer</span>
                                </li>
                                <li className="flex items-center gap-3 text-white/80">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                                    <span>Pixel-perfect absolute positioning</span>
                                </li>
                            </ul>

                            <Link href="/classic-editor" className="inline-flex items-center gap-2 text-brand-400 font-medium hover:text-brand-300 transition-colors">
                                Explore Classic Editor <MousePointer2 className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Professional Platform Path */}
                    <div className="glass-panel p-8 md:p-12 group hover:border-indigo-500/30 transition-all duration-500 relative overflow-hidden rounded-3xl">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Code2 className="w-32 h-32" />
                        </div>

                        <div className="relative z-10 space-y-8">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                                <Layers className="w-7 h-7" />
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-3xl font-display font-bold text-white">The Professional Platform</h3>
                                <p className="text-white/70 text-lg leading-relaxed">
                                    Engineered for agencies and freelancers. Build with advanced responsive design where elements scale fluidly across every screen.
                                </p>
                            </div>

                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-white/80">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                    <span>Advanced responsive scaling</span>
                                </li>
                                <li className="flex items-center gap-3 text-white/80">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                    <span>Real-time team collaboration</span>
                                </li>
                                <li className="flex items-center gap-3 text-white/80">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                    <span>Native IDE integration for Custom CSS/JS</span>
                                </li>
                            </ul>

                            <Link href="/pro" className="inline-flex items-center gap-2 text-indigo-400 font-medium hover:text-indigo-300 transition-colors">
                                Discover Pro Platform <MonitorSmartphone className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
