import { Icon } from '@/components/ui/Icon';
import { testimonials } from '@/data/testimonials';

export function Testimonials() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-semibold text-slate-900">Trusted by Longevity Experts</h2>
            </div>
            <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-3 gap-8">
                {testimonials.map((t) => (
                    <div
                        key={t.id}
                        className="p-8 rounded-xl bg-background-light border border-slate-100"
                    >
                        <div className="flex gap-1 text-primary mb-4">
                            {Array.from({ length: t.rating }, (_, i) => (
                                <Icon key={i} name="star" filled />
                            ))}
                        </div>
                        <p className="italic text-slate-600 mb-6">&ldquo;{t.content}&rdquo;</p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                                {t.author.charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold">{t.author}</p>
                                <p className="text-xs text-slate-500">{t.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
