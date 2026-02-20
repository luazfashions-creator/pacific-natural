import { Icon } from '@/components/ui/Icon';

interface StarRatingProps {
    rating: number;
    size?: 'sm' | 'md';
    showCount?: boolean;
    count?: number;
}

export function StarRating({ rating, size = 'sm', showCount, count }: StarRatingProps) {
    const sizeClass = size === 'sm' ? 'text-xs' : 'text-sm';
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;

    return (
        <div className="flex items-center gap-1">
            <div className="flex text-accent-warm">
                {Array.from({ length: fullStars }, (_, i) => (
                    <Icon key={`full-${i}`} name="star" className={sizeClass} filled />
                ))}
                {hasHalf && <Icon name="star_half" className={sizeClass} filled />}
                {Array.from({ length: 5 - fullStars - (hasHalf ? 1 : 0) }, (_, i) => (
                    <Icon key={`empty-${i}`} name="star" className={sizeClass} />
                ))}
            </div>
            {showCount && count !== undefined && (
                <span className="text-[10px] font-bold text-muted">({count})</span>
            )}
        </div>
    );
}
