import Image from 'next/image';

interface PhilosophyCardProps {
    image: string;
    title: string;
    description: string;
    reverse?: boolean;
}

export function PhilosophyCard({ image, title, description, reverse = false }: PhilosophyCardProps) {
    return (
        <div
            className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 lg:gap-16 items-center`}
        >
            {/* Image */}
            <div className="w-full md:w-1/2">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
            </div>

            {/* Text */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h3 className="text-3xl lg:text-4xl font-medium text-slate-900 mb-6 tracking-tight">
                    {title}
                </h3>
                <p className="text-slate-600 leading-[1.85] text-base lg:text-[17px]">
                    {description}
                </p>
            </div>
        </div>
    );
}
