import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

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
        <section id="coaching" className="py-24 lg:py-32 bg-background-alt/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <h2 className="text-4xl lg:text-5xl font-semibold text-slate-900 mb-6">
                        The Three Pillars of Longevity
                    </h2>
                    <p className="text-slate-600">
                        Our holistic ecosystem addresses wellness from every angle: internal biology, personalized
                        guidance, and external resilience.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {pillars.map((pillar) => (
                        <div
                            key={pillar.title}
                            className="group bg-white p-8 rounded-xl border border-slate-100 hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="w-16 h-16 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                                <Icon name={pillar.icon} className="text-4xl" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{pillar.title}</h3>
                            <p className="text-slate-600 mb-8 leading-relaxed">{pillar.description}</p>
                            <Link
                                href={pillar.href}
                                className="inline-flex items-center text-primary font-bold gap-2 group-hover:gap-4 transition-all"
                            >
                                {pillar.cta} <Icon name="arrow_forward" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
