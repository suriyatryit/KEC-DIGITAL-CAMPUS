import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
    const plans = [
        { name: "Free", price: "$0", desc: "For individuals", features: ["1 Website", "Basic Editor", "Community Support", "AxisPrime Domain"] },
        { name: "Basic", price: "$12", desc: "For personal projects", features: ["Custom Domain", "Remove Ads", "24/7 Support", "10GB Storage"] },
        { name: "Pro", price: "$24", desc: "For professionals", features: ["Advanced Editor", "Unlimited Storage", "Analytics", "Priority Support"], popular: true },
        { name: "Business", price: "$49", desc: "For small teams", features: ["Team Collaboration", "eCommerce Features", "API Access", "Custom Integrations"] },
        { name: "Enterprise", price: "Custom", desc: "For large orgs", features: ["Dedicated Account Manager", "SLA Guarantee", "Advanced Security", "Unlimited Everything"] }
    ];

    return (
        <div className="pt-32 pb-24 min-h-screen relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white">
                        Simple, transparent <span className="text-gradient">pricing</span>
                    </h1>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto">
                        Start for free, then upgrade as you grow. No hidden fees.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-6">
                    {plans.map((plan, i) => (
                        <div key={i} className={`glass-panel p-6 rounded-3xl relative flex flex-col ${plan.popular ? 'border-brand-500/50 transform md:-translate-y-4' : 'border-white/10'}`}>
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    MOST POPULAR
                                </div>
                            )}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                <p className="text-white/50 text-sm mb-4 h-10">{plan.desc}</p>
                                <div className="text-4xl font-display font-bold text-white">
                                    {plan.price}<span className="text-lg text-white/50 font-normal">{plan.price !== "Custom" ? "/mo" : ""}</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature, j) => (
                                    <li key={j} className="flex items-start gap-3 text-sm text-white/80">
                                        <Check className="w-5 h-5 text-brand-400 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link href="/register" className={`w-full py-3 rounded-full font-medium text-center transition-colors ${plan.popular ? 'bg-brand-500 hover:bg-brand-400 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                                Choose {plan.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
