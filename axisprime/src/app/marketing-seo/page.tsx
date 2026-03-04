import { BarChart3, Search, Megaphone } from "lucide-react";
import Link from "next/link";

export default function MarketingSeoPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="absolute left-0 top-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-24 space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-sm font-medium text-emerald-400 border-emerald-500/30">
                        <Megaphone className="w-4 h-4" />
                        <span>Marketing & SEO</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight">
                        Get Found. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Grow Faster.</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-white/60">
                        Drive traffic and maximize conversions with built-in advanced SEO tools, email marketing, and real-time analytics.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <div className="glass-panel p-10 rounded-3xl border-emerald-500/20 relative overflow-hidden group">
                        <Search className="w-12 h-12 text-emerald-400 mb-6 group-hover:scale-110 transition-transform" />
                        <h3 className="text-2xl font-bold text-white mb-4">Advanced SEO Setup</h3>
                        <ul className="space-y-3 text-white/60">
                            <li>• Automated XML sitemaps generation</li>
                            <li>• Custom meta tags and rich snippets</li>
                            <li>• Image optimization and lazy loading</li>
                            <li>• Immediate Google indexing API integration</li>
                        </ul>
                    </div>
                    <div className="glass-panel p-10 rounded-3xl border-teal-500/20 relative overflow-hidden group">
                        <BarChart3 className="w-12 h-12 text-teal-400 mb-6 group-hover:scale-110 transition-transform" />
                        <h3 className="text-2xl font-bold text-white mb-4">Actionable Analytics</h3>
                        <ul className="space-y-3 text-white/60">
                            <li>• Real-time visitor tracking and funnels</li>
                            <li>• Built-in A/B split testing</li>
                            <li>• Native Google Analytics 4 integration</li>
                            <li>• Heatmaps and user session recordings</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
