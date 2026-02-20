'use client';

import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';
import { SectionReveal, Parallax, StaggerReveal, StaggerItem } from '@/lib/animations';

export function ScienceSection() {
    return (
        <section id="science" className="py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-20 items-center">
                {/* Image grid */}
                <SectionReveal className="order-2 lg:order-1 relative">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl" />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4 pt-12 relative z-10">
                            <Parallax offset={6}>
                                <div className="rounded-xl overflow-hidden shadow-lg aspect-square">
                                    <Image
                                        src="/products/image7.webp"
                                        alt="Astaxanthin — antioxidant science"
                                        fill={false}
                                        width={300}
                                        height={300}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </Parallax>
                            <div className="bg-primary p-6 rounded-xl text-white">
                                <span className="text-3xl font-extrabold">98%</span>
                                <p className="text-xs uppercase tracking-widest mt-2">Bio-Availability</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-primary/5 p-6 rounded-xl text-primary">
                                <span className="text-3xl font-extrabold">12+</span>
                                <p className="text-xs uppercase tracking-widest mt-2">Patented Blends</p>
                            </div>
                            <Parallax offset={8}>
                                <div className="rounded-xl overflow-hidden shadow-lg aspect-[4/5]">
                                    <Image
                                        src="/products/image3.webp"
                                        alt="Omega 3 — research backed"
                                        fill={false}
                                        width={300}
                                        height={375}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </Parallax>
                        </div>
                    </div>
                </SectionReveal>

                {/* Text content */}
                <SectionReveal className="order-1 lg:order-2 space-y-8">
                    <h2 className="text-4xl lg:text-5xl font-semibold text-slate-900 leading-tight">
                        Science Meets{' '}
                        <span className="text-primary italic font-light">Transparency</span>
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        We don&apos;t believe in &quot;secret blends.&quot; Our team of longevity researchers,
                        pharmacists, and herbalists publish the clinical backing for every ingredient we use.
                    </p>
                    <StaggerReveal>
                        <ul className="space-y-6">
                            <StaggerItem>
                                <li className="flex gap-4">
                                    <Icon
                                        name="verified"
                                        className="text-primary bg-primary/5 p-2 rounded-full h-fit"
                                    />
                                    <div>
                                        <h4 className="font-bold">Third-Party Verification</h4>
                                        <p className="text-sm text-slate-500">
                                            Every batch is tested by ISO-certified labs for heavy metals and purity.
                                        </p>
                                    </div>
                                </li>
                            </StaggerItem>
                            <StaggerItem>
                                <li className="flex gap-4">
                                    <Icon
                                        name="biotech"
                                        className="text-primary bg-primary/5 p-2 rounded-full h-fit"
                                    />
                                    <div>
                                        <h4 className="font-bold">Cellular Synergy</h4>
                                        <p className="text-sm text-slate-500">
                                            Formulations designed to maximize mitochondrial function and DNA resilience.
                                        </p>
                                    </div>
                                </li>
                            </StaggerItem>
                        </ul>
                    </StaggerReveal>
                </SectionReveal>
            </div>
        </section>
    );
}
