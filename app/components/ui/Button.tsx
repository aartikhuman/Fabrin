import { Link } from 'react-router';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    to?: string;
    href?: string;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    to,
    href,
    onClick,
    className = '',
    type = 'button',
    disabled = false,
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center font-Inter transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-inter';

    const variantStyles = {
        primary: 'bg-brown text-white hover:bg-dark-brown focus:ring-brown',
        secondary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500',
        outline: 'border border-brown text-brown hover:bg-brown hover:text-white',
        ghost: 'text-accent-700 hover:bg-accent-50 focus:ring-accent-500',
    };

    const sizeStyles = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-8 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (to) {
        return (
            <Link to={to} className={classes}>
                {children}
            </Link>
        );
    }

    if (href) {
        return (
            <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        );
    }

    return (
        <button type={type} onClick={onClick} className={classes} disabled={disabled}>
            {children}
        </button>
    );
}
