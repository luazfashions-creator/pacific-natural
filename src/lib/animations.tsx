'use client';

import { useRef } from 'react';
import {
    motion,
    useInView,
    useScroll,
    useTransform,
    useReducedMotion,
    type Variants,
    type HTMLMotionProps,
} from 'framer-motion';

/* ─── Premium easing ─── */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

/* ─── Shared variant presets ─── */
export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: EASE_OUT },
    },
};

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.7, ease: EASE_OUT },
    },
};

export const scaleUp: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, ease: EASE_OUT },
    },
};

export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
};

/* ─── Section Reveal wrapper ──────────────────────── */
interface SectionRevealProps extends HTMLMotionProps<'div'> {
    children: React.ReactNode;
    className?: string;
    /** viewport trigger threshold (default 0.15) */
    threshold?: number;
}

export function SectionReveal({
    children,
    className,
    threshold = 0.15,
    ...rest
}: SectionRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: threshold });
    const prefersReduced = useReducedMotion();

    return (
        <motion.div
            ref={ref}
            initial={prefersReduced ? 'visible' : 'hidden'}
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className={className}
            {...rest}
        >
            {children}
        </motion.div>
    );
}

/* ─── Stagger-children wrapper ─────────────────────── */
interface StaggerRevealProps extends HTMLMotionProps<'div'> {
    children: React.ReactNode;
    className?: string;
    threshold?: number;
}

export function StaggerReveal({
    children,
    className,
    threshold = 0.15,
    ...rest
}: StaggerRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: threshold });
    const prefersReduced = useReducedMotion();

    return (
        <motion.div
            ref={ref}
            initial={prefersReduced ? 'visible' : 'hidden'}
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className={className}
            {...rest}
        >
            {children}
        </motion.div>
    );
}

/* ─── Single stagger child ─────────────────────────── */
export function StaggerItem({
    children,
    className,
    ...rest
}: HTMLMotionProps<'div'> & { children: React.ReactNode }) {
    return (
        <motion.div variants={scaleUp} className={className} {...rest}>
            {children}
        </motion.div>
    );
}

/* ─── Parallax image wrapper ───────────────────────── */
interface ParallaxProps {
    children: React.ReactNode;
    className?: string;
    /** Y-axis offset range in percent (default 8) */
    offset?: number;
}

export function Parallax({ children, className, offset = 8 }: ParallaxProps) {
    const ref = useRef<HTMLDivElement>(null);
    const prefersReduced = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });
    const y = useTransform(scrollYProgress, [0, 1], [`-${offset}%`, `${offset}%`]);

    if (prefersReduced) {
        return <div className={className}>{children}</div>;
    }

    return (
        <div ref={ref} className={`overflow-hidden ${className ?? ''}`}>
            <motion.div style={{ y }} className="will-change-transform">
                {children}
            </motion.div>
        </div>
    );
}

/* ─── Premium Button with micro-interactions ──────── */
interface PremiumButtonProps extends HTMLMotionProps<'button'> {
    children: React.ReactNode;
    className?: string;
    as?: 'button';
}

export function PremiumButton({
    children,
    className,
    ...rest
}: PremiumButtonProps) {
    const prefersReduced = useReducedMotion();

    return (
        <motion.button
            whileHover={prefersReduced ? {} : { y: -2, boxShadow: '0 8px 30px rgba(42, 91, 91, 0.18)' }}
            whileTap={prefersReduced ? {} : { scale: 0.97 }}
            transition={{ duration: 0.2, ease: EASE_SMOOTH }}
            className={className}
            {...rest}
        >
            {children}
        </motion.button>
    );
}

/* Re-export motion for convenience */
export { motion, useInView, useScroll, useTransform, useReducedMotion };
