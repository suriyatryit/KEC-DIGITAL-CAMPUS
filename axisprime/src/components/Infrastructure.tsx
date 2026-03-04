import { Server, ShieldCheck, Zap } from "lucide-react";

export function Infrastructure() {
    return (
        <section className="py-24 relative overflow-hidden bg-brand-500/5">
            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />
            <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
                        Built on <span className="text-gradient">Enterprise Grade</span> Infrastructure
                    </h2>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto">
                        Your business deserves the most reliable, secure, and performant foundation. We handle the complex backend so you can focus on growth.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">

                    <div className="relative group p-8 rounded-3xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors">
                        <div className="absolute top-0 right-8 -mt-6">
                            <div className="w-12 h-12 shadow-[0_0_30px_rgba(59,130,246,0.5)] rounded-2xl bg-gradient-to-br from-brand-600 to-indigo-600 flex items-center justify-center border border-white/20">
                                <Server className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="pt-6 space-y-4">
                            <h3 className="text-2xl font-display font-bold text-white">99.99% Uptime</h3>
                            <p className="text-white/60 leading-relaxed text-sm">
                                Deployed across multi-cloud regions globally. Intelligent load-balancing ensures your site stays online through huge traffic spikes without breaking a sweat.
                            </p>
                        </div>
                    </div>

                    <div className="relative group p-8 rounded-3xl bg-black/40 border border-white/5 hover:border-emerald-500/30 transition-colors">
                        <div className="absolute top-0 right-8 -mt-6">
                            <div className="w-12 h-12 shadow-[0_0_30px_rgba(16,185,129,0.5)] rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center border border-white/20">
                                <ShieldCheck className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="pt-6 space-y-4">
                            <h3 className="text-2xl font-display font-bold text-white">Enterprise Security</h3>
                            <p className="text-white/60 leading-relaxed text-sm">
                                24/7 expert threat-hunting, DDoS protection, automatic SSL, and fully managed compliance (PCI, HIPAA, SOC 2). We protect you and your users.
                            </p>
                        </div>
                    </div>

                    <div className="relative group p-8 rounded-3xl bg-black/40 border border-white/5 hover:border-amber-500/30 transition-colors">
                        <div className="absolute top-0 right-8 -mt-6">
                            <div className="w-12 h-12 shadow-[0_0_30px_rgba(245,158,11,0.5)] rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center border border-white/20">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="pt-6 space-y-4">
                            <h3 className="text-2xl font-display font-bold text-white">Lightning Fast</h3>
                            <p className="text-white/60 leading-relaxed text-sm">
                                Optimized images, automatic WebP format, aggressive caching, and edge-deployments mean your site loads instantly, boosting SEO and conversion rates.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
