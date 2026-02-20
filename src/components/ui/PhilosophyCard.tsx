'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Parallax, scaleUp, EASE_OUT } from '@/lib/animations';

interface PhilosophyCardProps {
    image: string;
    title: string;
    description: string;
    reverse?: boolean;
    index?: number;
}

export function PhilosophyCard({ image, title, description, reverse = false, index = 0 }: PhilosophyCardProps) {
    return (
        <motion.div
            variants={scaleUp}
            className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 lg:gap-16 items-center`}
        >
            {/* Image with parallax */}
            <div className="w-full md:w-1/2">
                <Parallax offset={10}>
                    <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </Parallax>
            </div>

            {/* Text */}
            <motion.div
                className="w-full md:w-1/2 flex flex-col justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 }}
            >
                <h3 className="text-3xl lg:text-4xl font-medium text-text-primary mb-6 tracking-tight">
                    {title}
                </h3>
                <p className="text-text-secondary leading-[1.85] text-base lg:text-[17px]">
                    {description}
                </p>
            </motion.div>
        </motion.div>
    );
}
