import { cn } from '@/lib/utils';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'outline' | 'light';
    className?: string;
}

export function Badge({ children, variant = 'primary', className }: BadgeProps) {
    const variants = {
        primary: 'bg-primary text-white',
        outline: 'bg-primary/10 text-primary border border-primary/20',
        light: 'bg-white/90 text-primary',
    };

    return (
        <span
            className={cn(
                'px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest',
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
}
