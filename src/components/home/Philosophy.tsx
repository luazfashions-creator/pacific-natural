import { PhilosophyCard } from '@/components/ui/PhilosophyCard';

const philosophyItems = [
    {
        image: '/philosophy/image1.png',
        title: 'Longevity First',
        description:
            'We design every Pacific Naturals formula with long-term vitality at its core. Our approach focuses on supporting healthy aging from within, rather than chasing quick, temporary results. By prioritizing balance, resilience, and sustained energy, we help your body perform at its best over time. Because true wellness is measured in years of feeling well — not moments of short-lived improvement.',
    },
    {
        image: '/philosophy/image2.png',
        title: 'Science-Guided Nature',
        description:
            'Nature provides the foundation, and science helps us refine it with precision. Each ingredient is carefully evaluated through modern research and traditional knowledge before it earns a place in our formulas. This thoughtful balance allows us to deliver solutions that are both gentle and effective. The result is wellness you can trust, backed by evidence and inspired by nature.',
    },
    {
        image: '/philosophy/image3.png',
        title: 'Conscious Craftsmanship',
        description:
            'Every detail of our process is handled with care and intention. From responsible sourcing to meticulous formulation standards, we focus on quality at every step. We believe transparency, sustainability, and consistency are essential to products you rely on daily. It\'s our way of ensuring that what we create supports both your health and the world around you.',
    },
];

export function Philosophy() {
    return (
        <section className="py-24 lg:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                {/* Section header */}
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <span className="uppercase tracking-[0.3em] text-primary text-xs font-medium mb-4 block">
                        Our Philosophy
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-medium text-slate-900 tracking-tight">
                        What We Stand For
                    </h2>
                </div>

                {/* Philosophy cards — alternating layout */}
                <div className="flex flex-col gap-20 lg:gap-28">
                    {philosophyItems.map((item, index) => (
                        <PhilosophyCard
                            key={item.title}
                            image={item.image}
                            title={item.title}
                            description={item.description}
                            reverse={index % 2 !== 0}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
