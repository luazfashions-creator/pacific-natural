'use client';

import { Icon } from '@/components/ui/Icon';
import { TRUST_BADGES } from '@/data/siteConfig';
import { StaggerReveal, StaggerItem } from '@/lib/animations';

export function TrustStrip() {
    return (
        <section className="bg-surface py-12 border-y border-border">
            <StaggerReveal className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-wrap justify-between gap-8 md:gap-12" threshold={0.3}>
                {TRUST_BADGES.map((badge) => (
                    <StaggerItem key={badge.title} className="flex items-center gap-4 flex-1 min-w-[200px]">
                        <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                            <Icon name={badge.icon} className="text-3xl" />
                        </div>
                        <div>
                            <h3 className="font-bold text-text-primary">{badge.title}</h3>
                            <p className="text-sm text-text-secondary">{badge.description}</p>
                        </div>
                    </StaggerItem>
                ))}
            </StaggerReveal>
        </section>
    );
}
