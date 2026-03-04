import { ShoppingBag, CalendarDays, Palette, FileText, Tent } from "lucide-react";
import Link from "next/link";

const solutions = [
    {
        title: "eCommerce",
        description: "Launch online stores with native payment processing, dropshipping syncing, and POS.",
        icon: ShoppingBag,
        color: "from-blue-500/20 to-blue-600/5",
        iconColor: "text-blue-400",
        href: "/ecommerce",
    },
    {
        title: "Marketing & SEO",
        description: "Advanced booking systems for service businesses and consultancies.",
        icon: CalendarDays,
        color: "from-emerald-500/20 to-emerald-600/5",
        iconColor: "text-emerald-400",
        href: "/marketing-seo",
    },
    {
        title: "Apps & Dev",
        description: "Stunning, visual-first templates for creative professionals.",
        icon: Palette,
        color: "from-purple-500/20 to-purple-600/5",
        iconColor: "text-purple-400",
        href: "/apps-and-dev",
    },
    {
        title: "Blog",
        description: "Powerful content management for articles, news, and SEO growth.",
        icon: FileText,
        color: "from-amber-500/20 to-amber-600/5",
        iconColor: "text-amber-400",
        href: "#",
    },
    {
        title: "Events",
        description: "Sell tickets, manage RSVPs, and promote your offline & online events.",
        icon: Tent,
        color: "from-rose-500/20 to-rose-600/5",
        iconColor: "text-rose-400",
        href: "#",
    },
];

export function SolutionsGrid() {
    return (
        <section className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="space-y-4 max-w-2xl">
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
                            Built for <span className="text-white/50">every industry</span>
                        </h2>
                        <p className="text-lg text-white/60">
                            AxisPrime isn't just a website builder. It provides customized, deep-domain solutions for your specific business vertical.
                        </p>
                    </div>
                    <Link href="/solutions" className="text-brand-400 font-medium hover:text-brand-300 transition-colors shrink-0">
                        View all solutions &rarr;
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {solutions.map((s, i) => (
                        <Link
                            key={s.title}
                            href={s.href}
                            className={`group glass-panel p-8 rounded-3xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full bg-gradient-to-br ${s.color} border-white/5 hover:border-white/10`}
                        >
                            <div className="flex-1 space-y-6">
                                <s.icon className={`w-10 h-10 ${s.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-display font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
                                        {s.title}
                                    </h3>
                                    <p className="text-white/60 leading-relaxed">
                                        {s.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {/* See All Card */}
                    <Link
                        href="/solutions"
                        className="group glass-panel p-8 rounded-3xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center h-full min-h-[250px] border-dashed border-white/20 hover:border-brand-500/50 hover:bg-white/[0.02]"
                    >
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-brand-500/20 transition-colors">
                            <span className="text-2xl text-white/50 group-hover:text-brand-400">+</span>
                        </div>
                        <h3 className="text-xl font-display font-medium text-white/80 group-hover:text-white transition-colors">
                            Explore 40+ Solutions
                        </h3>
                    </Link>
                </div>
            </div>
        </section>
    );
}
