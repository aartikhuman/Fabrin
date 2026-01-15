export type Category = 'women' | 'men' | 'jewelry';

export type DressStyle = 'casual' | 'formal' | 'party' | 'gym';

export type Size = 'XX-Small' | 'X-Small' | 'Small' | 'Medium' | 'Large' | 'X-Large' | 'XX-Large' | '3X-Large' | '4X-Large';

export type Color = 'beige' | 'tan' | 'cream' | 'blue' | 'gray' | 'black' | 'white' | 'brown' | 'green' | 'red' | 'yellow' | 'gold';

export interface Product {
    id: string;
    name: string;
    category: Category;
    subcategory: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    rating: number;
    image: string;
    images?: string[]; // Gallery images
    colors: Color[];
    sizes?: Size[];
    dressStyle?: DressStyle;
    description?: string; // Short description/Intro
    longDescription?: string; // "Product Description" section
    benefits?: string[];
    productDetails?: { label: string; value: string }[]; // "Product Details" section
    moreDetails?: string[]; // "More Details" section
    reviewCount?: number;
}

export interface FilterState {
    categories: string[];
    dressStyles: DressStyle[];
    priceRange: [number, number];
    colors: Color[];
    sizes: Size[];
}
