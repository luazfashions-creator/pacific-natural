import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { BRAND, FOOTER_SECTIONS } from '@/data/siteConfig';

export function Footer() {
    return (
        <footer className="bg-surface text-text-secondary py-20 border-t border-border">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
                    {/* Brand */}
                    <div className="col-span-2 lg:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center gap-3 text-primary hover:no-underline">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    clipRule="evenodd"
                                    d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                />
                            </svg>
                            <span className="font-serif text-2xl font-semibold tracking-tight">{BRAND.name}</span>
                        </Link>
                        <p className="max-w-xs text-muted">{BRAND.description}</p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-surface-2 border border-border flex items-center justify-center hover:bg-primary hover:no-underline transition-all text-primary hover:text-white">
                                <Icon name="share" className="text-xl" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-surface-2 border border-border flex items-center justify-center hover:bg-primary hover:no-underline transition-all text-primary hover:text-white">
                                <Icon name="public" className="text-xl" />
                            </a>
                        </div>
                    </div>

                    {/* Link Sections */}
                    {FOOTER_SECTIONS.map((section) => (
                        <div key={section.title}>
                            <h5 className="font-bold text-text-primary mb-6 uppercase tracking-widest text-xs">{section.title}</h5>
                            <ul className="space-y-4 text-sm">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-accent-blue hover:text-primary hover:underline transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="border-t border-border pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-text-secondary uppercase tracking-widest">
                    <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="text-accent-blue hover:text-primary hover:underline transition-colors">Privacy Policy</a>
                        <a href="#" className="text-accent-blue hover:text-primary hover:underline transition-colors">Terms of Service</a>
                        <a href="#" className="text-accent-blue hover:text-primary hover:underline transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
