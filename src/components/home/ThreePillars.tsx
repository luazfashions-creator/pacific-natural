'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { SectionReveal, StaggerReveal, StaggerItem } from '@/lib/animations';

const pillars = [
    {
        icon: 'pill',
        title: 'Supplements',
        description: 'Scientifically backed, natural, and personalized formulations for cellular rejuvenation.',
        cta: 'Explore Collection',
        href: '/products',
    },
    {
        icon: 'self_improvement',
        title: 'Coaching',
        description: 'Holistic guidance and data-driven recommendations tailored to your unique biology.',
        cta: 'Book a Session',
        href: '/quiz',
    },
    {
        icon: 'face_3',
        title: 'Cosmetics',
        description: 'Clean beauty and anti-aging treatments that honor your skin\'s natural resilience.',
        cta: 'View Skincare',
        href: '/products',
    },
];

export function ThreePillars() {
    return (
        <section id="coaching" className="py-24 lg:py-32 bg-surface-2/55">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <SectionReveal className="text-center max-w-2xl mx-auto mb-20">
                    <h2 className="text-4xl lg:text-5xl font-semibold text-text-primary mb-6">
                        The Three Pillars of Longevity
                    </h2>
                    <p className="text-text-secondary">
                        Our holistic ecosystem addresses wellness from every angle: internal biology, personalized
                        guidance, and external resilience.
                    </p>
                </SectionReveal>

                <StaggerReveal className="grid md:grid-cols-3 gap-8" threshold={0.1}>
                    {pillars.map((pillar) => (
                        <StaggerItem
                            key={pillar.title}
                            className="group bg-surface p-8 rounded-xl border border-border hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="w-16 h-16 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform duration-300">
                                <Icon name={pillar.icon} className="text-4xl" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{pillar.title}</h3>
                            <p className="text-text-secondary mb-8 leading-relaxed">{pillar.description}</p>
                            <Link
                                href={pillar.href}
                                className="inline-flex items-center text-accent-blue font-bold gap-2 group-hover:gap-4 hover:underline transition-all"
                            >
                                {pillar.cta} <Icon name="arrow_forward" />
                            </Link>
                        </StaggerItem>
                    ))}
                </StaggerReveal>
            </div>
        </section>
    );
}
