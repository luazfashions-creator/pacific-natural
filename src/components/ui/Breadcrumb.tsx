import Link from 'next/link';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="flex text-sm text-text-secondary mb-4 gap-2">
            {items.map((item, idx) => (
                <span key={item.label} className="flex items-center gap-2">
                    {idx > 0 && <span>/</span>}
                    {item.href ? (
                        <Link href={item.href} className="text-accent-blue hover:text-primary hover:underline transition-colors">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-primary font-medium">{item.label}</span>
                    )}
                </span>
            ))}
        </nav>
    );
}
