import { NavLink, FooterSection } from '@/types';

export const BRAND = {
    name: 'Pacific Naturals',
    tagline: 'Science-Backed Longevity',
    description:
        'Premium, science-backed longevity tools for the modern high-performer. Bridging the gap between clinical research and daily ritual.',
    philosophy:
        'Pacific Naturals is an integrated longevity brand offering both supplements and cosmetics. We position holistic, expert-driven solutions for aging gracefully — combining AI-powered coaching with the purest natural formulations.',
} as const;

export const NAV_LINKS: NavLink[] = [
    { label: 'Shop All', href: '/products' },
    { label: 'Supplements', href: '/products' },
    { label: 'Coaching', href: '/#coaching' },
    { label: 'Our Science', href: '/#science' },
];

export const FOOTER_SECTIONS: FooterSection[] = [
    {
        title: 'Products',
        links: [
            { label: 'Supplements', href: '/products' },
            { label: 'Skincare', href: '/products' },
            { label: 'Wellness Kits', href: '/products' },
            { label: 'Gift Cards', href: '#' },
        ],
    },
    {
        title: 'Science',
        links: [
            { label: 'Our Science', href: '#' },
            { label: 'Ingredient Library', href: '#' },
            { label: 'Sustainability', href: '#' },
            { label: 'Clinical Trials', href: '#' },
        ],
    },
    {
        title: 'Support',
        links: [
            { label: 'Help Center', href: '#' },
            { label: 'Shipping', href: '#' },
            { label: 'Contact Us', href: '#' },
            { label: 'Returns', href: '#' },
        ],
    },
];

export const TRUST_BADGES = [
    {
        icon: 'biotech',
        title: 'Science-Backed',
        description: 'Clinical data led design',
    },
    {
        icon: 'psychiatry',
        title: 'Natural Ingredients',
        description: 'Pure botanical extracts',
    },
    {
        icon: 'compost',
        title: 'Sustainable',
        description: 'Eco-conscious packaging',
    },
] as const;

export const WELLNESS_GOALS = [
    'Energy',
    'Sleep',
    'Immunity',
    'Focus',
    'Detox',
    'Anti-Aging',
    'Heart Health',
    'Joint Health',
] as const;

export const CATEGORIES = [
    'Supplements',
    'Skincare',
    'Aromatherapy',
    'Gifts & Sets',
] as const;
