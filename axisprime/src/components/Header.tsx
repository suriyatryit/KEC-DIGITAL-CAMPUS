import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";

export function Header() {
    return (
        <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300 backdrop-blur-md bg-background/80 border-b border-border/40">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-400 flex items-center justify-center">
                        <span className="font-display font-bold text-white text-xl leading-none">A</span>
                    </div>
                    <span className="font-display font-bold text-xl tracking-tight text-white">AxisPrime</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8">
                    <div className="group relative">
                        <button className="flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors py-2">
                            Product <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
                        </button>
                        <div className="absolute top-full left-0 mt-2 w-48 bg-[#111] border border-white/10 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col p-2">
                            <Link href="/classic-editor" className="text-sm text-white/70 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors">Classic Editor</Link>
                            <Link href="/ai-generator" className="text-sm text-white/70 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors">AI Builder</Link>
                            <Link href="/pro" className="text-sm text-white/70 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors">AxisPrime Pro</Link>
                        </div>
                    </div>
                    <div className="group relative">
                        <button className="flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors py-2">
                            Solutions <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
                        </button>
                        <div className="absolute top-full left-0 mt-2 w-48 bg-[#111] border border-white/10 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col p-2">
                            <Link href="/ecommerce" className="text-sm text-white/70 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors">Ecommerce</Link>
                            <Link href="/marketing-seo" className="text-sm text-white/70 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors">Marketing & SEO</Link>
                            <Link href="/apps-and-dev" className="text-sm text-white/70 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors">Apps & Dev</Link>
                        </div>
                    </div>
                    <Link href="/pricing" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                        Pricing
                    </Link>
                    <Link href="/help" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                        Help
                    </Link>
                </nav>

                {/* CTA Buttons */}
                <div className="hidden lg:flex items-center gap-4">
                    <Link href="#" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                        Log In
                    </Link>
                    <Link href="/pricing" className="relative group inline-flex h-10 items-center justify-center rounded-full bg-white px-6 font-medium text-background transition-all hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-background">
                        <span>Get Started</span>
                        <div className="absolute inset-0 rounded-full bg-white blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    </Link>
                </div>

                {/* Mobile menu toggle */}
                <button className="lg:hidden p-2 text-white/80 hover:text-white">
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </header>
    );
}
