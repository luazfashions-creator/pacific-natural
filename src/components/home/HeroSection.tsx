import Link from 'next/link';

export function HeroSection() {
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
            <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
                <span className="uppercase tracking-[0.35em] text-white/70 text-xs sm:text-sm font-medium mb-6">
                    Supplements · AI Wellness · Cosmetics
                </span>

                <h1 className="font-serif text-4xl sm:text-6xl lg:text-8xl font-light text-white leading-[1.08] tracking-tight">
                    Your Body Deserves
                    <br />
                    <span className="italic font-normal">Better Science</span>
                </h1>

                <p className="mt-6 text-base sm:text-lg text-white/75 max-w-2xl leading-relaxed font-light">
                    Take our AI-powered quiz to discover exactly what your body needs — then
                    get premium, clinically-backed supplements &amp; cosmetics delivered to your
                    door.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/quiz"
                        className="bg-white text-slate-900 px-10 py-4 rounded-full font-semibold text-sm sm:text-base uppercase tracking-wide hover:bg-white/90 transition-all"
                    >
                        Take the Quiz
                    </Link>
                    <Link
                        href="/products"
                        className="border border-white/40 text-white px-10 py-4 rounded-full font-semibold text-sm sm:text-base uppercase tracking-wide hover:bg-white/10 transition-all"
                    >
                        Shop All
                    </Link>
                </div>

                {/* Scroll indicator */}
                {/* <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
                    <span className="block w-px h-8 bg-white/40" />
                    <span className="text-white/50 text-[10px] uppercase tracking-widest">Scroll</span>
                </div> */}
            </div>
        </section>
    );
}
