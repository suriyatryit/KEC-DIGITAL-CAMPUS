import { Blocks, Settings, Terminal } from "lucide-react";
import Link from "next/link";

export default function AppsDevPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="absolute right-1/4 top-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-sm font-medium text-amber-400 border-amber-500/30">
                            <Blocks className="w-4 h-4" />
                            <span>Apps & API</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight">
                            Extend with <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Power</span>
                        </h1>
                        <p className="text-xl text-white/60">
                            Access the App Market to install one-click plugins, or dive deep into the Velo API to write custom JavaScript logic.
                        </p>
                        <div className="flex gap-4">
                            <Link href="/pricing" className="px-8 py-4 rounded-full bg-amber-500 text-black font-medium hover:bg-amber-400 transition-colors">
                                Go to App Market
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-rows-2 gap-6">
                        <div className="glass-panel p-8 rounded-3xl border-white/10 flex items-start gap-6 hover:border-amber-500/30 transition-colors">
                            <Terminal className="w-10 h-10 text-amber-400 shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Velo Node.js Environment</h3>
                                <p className="text-white/60">Execute server-side and client-side code directly within the builder interface using a secured instance of Node.js.</p>
                            </div>
                        </div>
                        <div className="glass-panel p-8 rounded-3xl border-white/10 flex items-start gap-6 hover:border-amber-500/30 transition-colors">
                            <Settings className="w-10 h-10 text-orange-400 shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">App Market Extensions</h3>
                                <p className="text-white/60">One-click install from over 300+ verified apps. Integrate Mailchimp, QuickBooks, HubSpot, and Zapier seamlessly.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
