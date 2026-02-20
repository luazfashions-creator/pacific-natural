'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { NAV_LINKS, BRAND } from '@/data/siteConfig';

export function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">
                {/* Logo + Nav */}
                <div className="flex items-center gap-8 lg:gap-12">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="text-primary">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    clipRule="evenodd"
                                    d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                />
                            </svg>
                        </div>
                        <span className="font-serif text-xl font-semibold tracking-tight text-primary">{BRAND.name}</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <Link key={link.label} href={link.href} className="text-sm font-semibold text-text-secondary hover:text-text-primary hover:no-underline transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4 sm:gap-6">
              

                    <Link
                        href="/products"
                        className="bg-primary text-white px-5 py-2.5 rounded-lg font-bold text-sm tracking-wide hover:bg-primary-hover hover:no-underline transition-all shadow-md shadow-primary/15 hidden sm:block"
                    >
                        Shop Now
                    </Link>

                    <Link
                        href="/checkout"
                        className="relative w-10 h-10 rounded-full bg-surface-2 border border-border flex items-center justify-center hover:no-underline"
                    >
                        <Icon name="shopping_bag" className="text-primary" />
                        <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                            0
                        </span>
                    </Link>

                    {/* Mobile menu button */}
                    <button className="md:hidden p-2 hover:bg-surface-2 rounded-full transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
                        <Icon name={mobileOpen ? 'close' : 'menu'} />
                    </button>
                </div>
            </div>

            {/* Mobile nav */}
            {mobileOpen && (
                <div className="md:hidden border-t border-primary/10 bg-surface px-6 pb-6 pt-4 space-y-4">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                        className="block text-sm font-semibold text-text-secondary hover:text-text-primary hover:no-underline transition-colors py-2"
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/products"
                        className="block bg-primary text-white px-5 py-3 rounded-lg font-bold text-sm text-center hover:bg-primary-hover hover:no-underline"
                        onClick={() => setMobileOpen(false)}
                    >
                        Shop Now
                    </Link>
                </div>
            )}
        </header>
    );
}
