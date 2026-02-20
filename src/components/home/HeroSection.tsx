'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT } from '@/lib/animations';

export function HeroSection() {
    const prefersReduced = useReducedMotion();

    const container = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
        },
    };

    const fadeUp = {
        hidden: prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: EASE_OUT },
        },
    };

    const fadeUpButtons = {
        hidden: prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: EASE_OUT, delay: 0.4 },
        },
    };

    return (
        <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
            {/* Video background — extra height + object-top to crop watermark from bottom */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-[115%] object-cover object-top pointer-events-none"
            >
                <source src="/videos/hero.mp4" type="video/mp4" />
            </video>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/75" />

            {/* Content */}
            <motion.div
                className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                <motion.span
                    variants={fadeUp}
                    className="uppercase tracking-[0.35em] text-white/70 text-xs sm:text-sm font-medium mb-6"
                >
                    Supplements · AI Wellness · Cosmetics
                </motion.span>

                <motion.h1
                    variants={fadeUp}
                    className="font-serif text-4xl sm:text-6xl lg:text-8xl font-light text-white leading-[1.08] tracking-tight"
                >
                    Your Body Deserves
                    <br />
                    <span className="italic font-normal">Better Science</span>
                </motion.h1>

                <motion.p
                    variants={fadeUp}
                    className="mt-6 text-base sm:text-lg text-white/75 max-w-2xl leading-relaxed font-light"
                >
                    Take our AI-powered quiz to discover exactly what your body needs — then
                    get premium, clinically-backed supplements &amp; cosmetics delivered to your
                    door.
                </motion.p>

                <motion.div
                    variants={fadeUpButtons}
                    className="mt-10 flex flex-col sm:flex-row gap-4"
                >
                    <Link
                        href="/quiz"
                        className="btn-primary bg-white text-slate-900 px-10 py-4 rounded-full font-semibold text-sm sm:text-base uppercase tracking-wide"
                    >
                        Take the Quiz
                    </Link>
                    <Link
                        href="/products"
                        className="btn-secondary border border-white/40 text-white px-10 py-4 rounded-full font-semibold text-sm sm:text-base uppercase tracking-wide"
                    >
                        Shop All
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
