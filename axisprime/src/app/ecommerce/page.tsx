import { ShoppingBag, CreditCard, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function EcommercePage() {
    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-24 space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-sm font-medium text-blue-400 border-blue-500/30">
                        <ShoppingBag className="w-4 h-4" />
                        <span>eCommerce Platform</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight">
                        Sell <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Anything, Anywhere.</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-white/60">
                        Launch your online store with native payment processing, multi-channel syncing, and powerful POS integrations.
                    </p>
                    <Link href="/pricing" className="inline-flex px-8 py-4 rounded-full bg-blue-500 text-white font-medium hover:bg-blue-400 transition-colors">
                        Start Selling Today
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="glass-panel p-8 rounded-3xl border-blue-500/20 hover:border-blue-500/50 transition-colors">
                        <CreditCard className="w-10 h-10 text-blue-400 mb-6" />
                        <h3 className="text-xl font-bold text-white mb-4">Native Payments</h3>
                        <p className="text-white/60">Accept credit cards, Apple Pay, Google Pay, and Crypto natively using AxisPay with zero setup required.</p>
                    </div>
                    <div className="glass-panel p-8 rounded-3xl border-indigo-500/20 hover:border-indigo-500/50 transition-colors">
                        <ShoppingBag className="w-10 h-10 text-indigo-400 mb-6" />
                        <h3 className="text-xl font-bold text-white mb-4">Omnichannel</h3>
                        <p className="text-white/60">Sync your inventory automatically across your website, social media shops, Amazon, and eBay.</p>
                    </div>
                    <div className="glass-panel p-8 rounded-3xl border-purple-500/20 hover:border-purple-500/50 transition-colors">
                        <RefreshCw className="w-10 h-10 text-purple-400 mb-6" />
                        <h3 className="text-xl font-bold text-white mb-4">Dropshipping Sync</h3>
                        <p className="text-white/60">Connect to Printful, Spocket, and AliExpress to automate fulfillment without carrying inventory.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
