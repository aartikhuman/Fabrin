interface BadgeProps {
    children: React.ReactNode;
    variant?: 'new' | 'sale' | 'bestseller' | 'outofstock';
    className?: string;
}

export default function Badge({ children, variant = 'new', className = '' }: BadgeProps) {
    const variantStyles = {
        new: 'bg-primary-500 text-white',
        sale: 'bg-red-500 text-white',
        bestseller: 'bg-accent-600 text-white',
        outofstock: 'bg-gray-400 text-white',
    };

    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${variantStyles[variant]} ${className}`}
        >
            {children}
        </span>
    );
}
