'use client';

import { SectionReveal } from '@/lib/animations';

export function Newsletter() {
    return (
        <section className="py-24 max-w-7xl mx-auto px-6 lg:px-10">
            <SectionReveal>
                <div className="bg-primary rounded-2xl p-12 lg:p-20 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                    <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                        <h2 className="text-4xl lg:text-5xl font-semibold leading-tight">
                            Join the Longevity Circle
                        </h2>
                        <p className="text-white/80 text-lg">
                            Receive our curated research on cellular health, longevity habits, and exclusive early
                            access to new formulations.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-4">
                            <input
                                className="flex-1 px-6 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                                placeholder="Your email address"
                                type="email"
                            />
                            <button
                                type="button"
                                className="btn-primary bg-white text-primary px-8 py-4 rounded-lg font-bold transition-all shadow-xl"
                            >
                                Subscribe Now
                            </button>
                        </form>
                        <p className="text-xs text-white/50">
                            By subscribing, you agree to our Privacy Policy and Terms of Service.
                        </p>
                    </div>
                </div>
            </SectionReveal>
        </section>
    );
}
