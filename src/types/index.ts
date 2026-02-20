export interface Product {
    id: string;
    slug: string;
    name: string;
    subtitle: string;
    description: string;
    longDescription: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: 'supplements' | 'skincare' | 'aromatherapy';
    tags: string[];
    rating: number;
    reviewCount: number;
    badge?: string;
    ingredients: Ingredient[];
    benefits: string[];
    reviews: Review[];
    inStock: boolean;
}

export interface Ingredient {
    name: string;
    icon: string;
    description: string;
}

export interface Review {
    id: string;
    title: string;
    rating: number;
    content: string;
    author: string;
    date: string;
    verified: boolean;
}

export interface CartItem {
    product: Product;
    quantity: number;
    purchaseType: 'subscribe' | 'once';
}

export interface Testimonial {
    id: string;
    content: string;
    author: string;
    role: string;
    rating: number;
}

export interface NavLink {
    label: string;
    href: string;
}

export interface FooterSection {
    title: string;
    links: NavLink[];
}
