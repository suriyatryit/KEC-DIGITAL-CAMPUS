import { Code2, MonitorSmartphone, Database, Layout } from "lucide-react";
import Link from "next/link";

export default function ProfessionalPlatformPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="absolute -left-1/4 top-1/4 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
            <div className="absolute -right-1/4 bottom-1/4 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-sm font-medium text-indigo-400 border-indigo-500/30">
                            <Code2 className="w-4 h-4" />
                            <span>Pro Platform</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight">
                            Engineered for <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-brand-400">Agencies & Devs</span>
                        </h1>
                        <p className="text-xl text-white/60">
                            Build scalable, highly customized applications with advanced responsive design, native APIs, and an integrated IDE.
                        </p>
                        <div className="flex gap-4">
                            <Link href="/pricing" className="px-8 py-4 rounded-full bg-indigo-500 text-white font-medium hover:bg-indigo-400 transition-colors">
                                Explore Pro
                            </Link>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="glass-panel p-2 rounded-2xl border-white/10 shadow-2xl relative overflow-hidden border-indigo-500/20">
                            {/* IDE Mock */}
                            <div className="h-10 border-b border-white/10 flex items-center px-4 bg-[#050505]">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-white/20" />
                                    <div className="w-3 h-3 rounded-full bg-white/20" />
                                    <div className="w-3 h-3 rounded-full bg-white/20" />
                                </div>
                                <div className="text-xs text-white/40 ml-4 font-mono">App.tsx</div>
                            </div>
                            <div className="bg-[#0a0a0a] p-6 font-mono text-sm text-white/70 overflow-x-auto min-h-[350px]">
                                <div className="text-purple-400">import <span className="text-white">{"{"} useState {"}"}</span> from <span className="text-emerald-400">'react'</span>;</div>
                                <div className="text-purple-400 mt-2">export default function <span className="text-blue-400">CustomComponent</span>{"() {"}</div>
                                <div className="ml-4 text-white/50">const [data, setData] = useState(null);</div>
                                <div className="ml-4 mt-4 text-purple-400">return (</div>
                                <div className="ml-8 text-blue-300">{"<div"} <span className="text-indigo-300">className</span>=<span className="text-emerald-400">"grid gap-4"</span>{">"}</div>
                                <div className="ml-12 text-blue-300">{"<AxisProvider"} <span className="text-indigo-300">apiKey</span>=<span className="text-emerald-400">"pk_live_..."</span>{">"}</div>
                                <div className="ml-16 text-white/40">{`{/* Fully extensible component tree */}`}</div>
                                <div className="ml-16 text-blue-300">{"<DataGrid"} <span className="text-indigo-300">source</span>=<span className="text-white">{`{data}`}</span> {"/>"}</div>
                                <div className="ml-12 text-blue-300">{"</AxisProvider>"}</div>
                                <div className="ml-8 text-blue-300">{"</div>"}</div>
                                <div className="ml-4 text-purple-400">{")"}</div>
                                <div className="text-purple-400">{"}"}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group">
                        <Layout className="w-8 h-8 text-indigo-400 mb-6 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold text-white mb-3">Advanced Layouts</h3>
                        <p className="text-white/60 text-sm">Use CSS Grid and Flexbox visually to create complex, fluid layouts that adapt to any screen size.</p>
                    </div>
                    <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group">
                        <Database className="w-8 h-8 text-indigo-400 mb-6 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold text-white mb-3">Custom Databases</h3>
                        <p className="text-white/60 text-sm">Build custom content models, connect external APIs, and create dynamic pages instantly.</p>
                    </div>
                    <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group">
                        <MonitorSmartphone className="w-8 h-8 text-indigo-400 mb-6 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold text-white mb-3">Client Handoff</h3>
                        <p className="text-white/60 text-sm">Manage roles, set granular permissions, and provide clients with a simplified editing experience.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
