import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-[#050505] pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-16 relative z-10">

                <div className="col-span-2 lg:col-span-2 space-y-6">
                    <Link href="/" className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                            <span className="font-display font-bold text-white leading-none">A</span>
                        </div>
                        <span className="font-display font-bold text-xl tracking-tight text-white">AxisPrime</span>
                    </Link>
                    <p className="text-sm text-white/50 max-w-xs leading-relaxed">
                        Limitless creation for anyone building their online presence. We give you the tools, infrastructure, and freedom to succeed.
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="font-medium text-white">Product</h4>
                    <ul className="space-y-3">
                        <li><Link href="/classic-editor" className="text-sm text-white/50 hover:text-white transition-colors">Classic Editor</Link></li>
                        <li><Link href="/ai-generator" className="text-sm text-white/50 hover:text-brand-400 transition-colors">AI Builder <span className="text-[10px] uppercase ml-1 bg-brand-500/20 text-brand-400 px-1.5 py-0.5 rounded-full">New</span></Link></li>
                        <li><Link href="/pro" className="text-sm text-white/50 hover:text-white transition-colors">Professional Platform</Link></li>
                        <li><Link href="/app-market" className="text-sm text-white/50 hover:text-white transition-colors">App Market</Link></li>
                        <li><Link href="/pricing" className="text-sm text-white/50 hover:text-white transition-colors">Pricing</Link></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="font-medium text-white">Solutions</h4>
                    <ul className="space-y-3">
                        <li><Link href="/ecommerce" className="text-sm text-white/50 hover:text-white transition-colors">Online Stores</Link></li>
                        <li><Link href="/marketing-seo" className="text-sm text-white/50 hover:text-white transition-colors">Marketing & SEO</Link></li>
                        <li><Link href="/apps-and-dev" className="text-sm text-white/50 hover:text-white transition-colors">Apps & Dev</Link></li>
                        <li><Link href="/blog" className="text-sm text-white/50 hover:text-white transition-colors">Blog</Link></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="font-medium text-white">Resources</h4>
                    <ul className="space-y-3">
                        <li><Link href="/logo-maker" className="text-sm text-white/50 hover:text-white transition-colors">Free Logo Maker</Link></li>
                        <li><Link href="/business-name" className="text-sm text-white/50 hover:text-white transition-colors">Business Name Generator</Link></li>
                        <li><Link href="/blog" className="text-sm text-white/50 hover:text-white transition-colors">Inspiration Blog</Link></li>
                        <li><Link href="/templates" className="text-sm text-white/50 hover:text-white transition-colors">900+ Templates</Link></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="font-medium text-white">Support</h4>
                    <ul className="space-y-3">
                        <li><Link href="/help" className="text-sm text-white/50 hover:text-white transition-colors">Help Center</Link></li>
                        <li><Link href="/expert-marketplace" className="text-sm text-white/50 hover:text-white transition-colors">Hire an Expert</Link></li>
                        <li><Link href="/contact" className="text-sm text-white/50 hover:text-white transition-colors">Contact Us</Link></li>
                        <li><Link href="/status" className="text-sm text-white/50 hover:text-white transition-colors">System Status</Link></li>
                    </ul>
                </div>

            </div>

            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5 relative z-10">
                <p className="text-sm text-white/40">
                    © {new Date().getFullYear()} AxisPrime Inc. All rights reserved.
                </p>
                <div className="flex gap-6">
                    <Link href="/legal/terms" className="text-sm text-white/40 hover:text-white transition-colors">Terms of Service</Link>
                    <Link href="/legal/privacy" className="text-sm text-white/40 hover:text-white transition-colors">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
}
