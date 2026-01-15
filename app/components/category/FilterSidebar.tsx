import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { IoChevronDown, IoCheckmark, IoFilterOutline } from 'react-icons/io5';
import type { FilterState, DressStyle, Color, Size } from '../../types/product';

interface FilterSidebarProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    showDressStyle?: boolean;
}

export default function FilterSidebar({ filters, onFilterChange, showDressStyle = true }: FilterSidebarProps) {
    const location = useLocation();
    const [openSections, setOpenSections] = useState({
        category: true,
        dressStyle: true,
        price: true,
        colors: true,
        size: true
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const colors: { name: Color; hex: string }[] = [
        { name: 'beige', hex: '#D4B896' },
        { name: 'tan', hex: '#D2B48C' },
        { name: 'cream', hex: '#FFFDD0' },
        { name: 'blue', hex: '#A3C1DA' },
        { name: 'gray', hex: '#B0B0B0' }
    ];

    const sizes: Size[] = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'];

    const dressStyles: DressStyle[] = ['casual', 'formal', 'party'];

    const handleCategoryToggle = (category: string) => {
        const newCategories = filters.categories.includes(category)
            ? filters.categories.filter(c => c !== category)
            : [...filters.categories, category];
        onFilterChange({ ...filters, categories: newCategories });
    };

    const handleDressStyleToggle = (style: DressStyle) => {
        const newStyles = filters.dressStyles.includes(style)
            ? filters.dressStyles.filter(s => s !== style)
            : [...filters.dressStyles, style];
        onFilterChange({ ...filters, dressStyles: newStyles });
    };

    const handleColorToggle = (color: Color) => {
        const newColors = filters.colors.includes(color)
            ? filters.colors.filter(c => c !== color)
            : [...filters.colors, color];
        onFilterChange({ ...filters, colors: newColors });
    };

    const handleSizeToggle = (size: Size) => {
        const newSizes = filters.sizes.includes(size)
            ? filters.sizes.filter(s => s !== size)
            : [...filters.sizes, size];
        onFilterChange({ ...filters, sizes: newSizes });
    };

    const handlePriceChange = (value: number, isMax: boolean) => {
        const newRange: [number, number] = isMax
            ? [filters.priceRange[0], value]
            : [value, filters.priceRange[1]];
        onFilterChange({ ...filters, priceRange: newRange });
    };

    const resetFilters = () => {
        onFilterChange({
            categories: [],
            dressStyles: [],
            priceRange: [0, 200],
            colors: [],
            sizes: []
        });
    };

    const hasActiveFilters = filters.categories.length > 0 || filters.dressStyles.length > 0 ||
        filters.colors.length > 0 || filters.sizes.length > 0 ||
        filters.priceRange[0] !== 0 || filters.priceRange[1] !== 200;

    const categories = [
        { name: 'Women', path: '/women' },
        { name: 'Men', path: '/men' },
        { name: 'Jewelry', path: '/jewelry' }
    ];

    return (
        <div className="bg-white rounded-lg">
            <div className="flex items-center justify-between mb-8">
                <div className='flex items-center gap-2 text-black-100'>
                    <IoFilterOutline size={24} />
                    <h3 className="text-2xl font-bold font-big">Filters</h3>
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={resetFilters}
                        className="text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                        title="Reset filters"
                    >
                        Reset
                    </button>
                )}
            </div>

            {/* Category Navigation */}
            <div className="mb-6 pb-6 border-b border-shade-10">
                <button
                    onClick={() => toggleSection('category')}
                    className="w-full flex items-center justify-between mb-4 cursor-pointer"
                >
                    <h4 className="text-lg font-semibold text-black-100">Category</h4>
                    <IoChevronDown
                        className={`transition-transform text-black-100 ${openSections.category ? 'rotate-180' : ''}`}
                        size={16}
                    />
                </button>
                {openSections.category && (
                    <div className="space-y-2">
                        {categories.map((category) => {
                            const isActive = location.pathname === category.path;
                            return (
                                <Link
                                    key={category.path}
                                    to={category.path}
                                    className={`block w-full text-left transition-colors ${isActive
                                        ? 'text-black-100 font-semibold'
                                        : 'text-shade-06 hover:text-black-100'
                                        }`}
                                >
                                    {category.name}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Dress Style Filter */}
            {showDressStyle && (
                <div className="mb-6 pb-6 border-b border-shade-10">
                    <button
                        onClick={() => toggleSection('dressStyle')}
                        className="w-full flex items-center justify-between mb-4 cursor-pointer"
                    >
                        <h4 className="text-lg font-semibold text-black-100">Dress Style</h4>
                        <IoChevronDown
                            className={`transition-transform text-black-100 ${openSections.dressStyle ? 'rotate-180' : ''}`}
                            size={16}
                        />
                    </button>
                    {openSections.dressStyle && (
                        <div className="space-y-3">
                            {dressStyles.map((style) => {
                                const isChecked = filters.dressStyles.includes(style);
                                return (
                                    <label key={style} className="flex items-center gap-3 cursor-pointer group select-none">
                                        <div className={`
                                            w-5 h-5 rounded border flex items-center justify-center transition-all duration-200
                                            ${isChecked
                                                ? 'bg-brown border-brown'
                                                : 'bg-white border-shade-04 group-hover:border-brown'
                                            }
                                        `}>
                                            <IoCheckmark
                                                className={`text-white transition-opacity duration-200 ${isChecked ? 'opacity-100' : 'opacity-0'}`}
                                                size={14}
                                            />
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => handleDressStyleToggle(style)}
                                            className="hidden"
                                        />
                                        <span className={`transition-colors capitalize ${isChecked ? 'text-black-100 font-medium' : 'text-shade-06 group-hover:text-black-100'}`}>
                                            {style}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* Price Filter */}
            <div className="mb-6 pb-6 border-b border-shade-10">
                <button
                    onClick={() => toggleSection('price')}
                    className="w-full flex items-center justify-between mb-4 cursor-pointer"
                >
                    <h4 className="text-lg font-semibold text-black-100">Price</h4>
                    <IoChevronDown
                        className={`transition-transform text-black-100 ${openSections.price ? 'rotate-180' : ''}`}
                        size={16}
                    />
                </button>
                {openSections.price && (
                    <div>
                        <div className="mb-2 relative">
                            <input
                                type="range"
                                min="0"
                                max="200"
                                value={filters.priceRange[1]}
                                onChange={(e) => handlePriceChange(Number(e.target.value), true)}
                                className="custom-range"
                                style={{
                                    background: `linear-gradient(to right, var(--color-black) ${(filters.priceRange[1] / 200) * 100}%, var(--color-shade-10) ${(filters.priceRange[1] / 200) * 100}%)`
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between text-base">
                            <span className="text-black-100">${filters.priceRange[0]}</span>
                            <span className="text-black-100">${filters.priceRange[1]}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Colors Filter */}
            <div className="mb-6 pb-6 border-b border-shade-10">
                <button
                    onClick={() => toggleSection('colors')}
                    className="w-full flex items-center justify-between mb-4 cursor-pointer"
                >
                    <h4 className="text-lg font-semibold text-black-100">Colors</h4>
                    <IoChevronDown
                        className={`transition-transform text-black-100 ${openSections.colors ? 'rotate-180' : ''}`}
                        size={16}
                    />
                </button>
                {openSections.colors && (
                    <div className="flex flex-wrap gap-3">
                        {colors.map((color) => (
                            <button
                                key={color.name}
                                onClick={() => handleColorToggle(color.name)}
                                className={`w-10 h-10 rounded-full border-2 transition-all cursor-pointer ${filters.colors.includes(color.name)
                                    ? 'border-brown scale-110'
                                    : 'border-shade-10 hover:border-shade-06'
                                    }`}
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Size Filter */}
            <div className="mb-6 pb-6 border-b border-shade-10">
                <button
                    onClick={() => toggleSection('size')}
                    className="w-full flex items-center justify-between mb-4"
                >
                    <h4 className="text-lg font-semibold text-black-100">Size</h4>
                    <IoChevronDown
                        className={`transition-transform text-black-100 ${openSections.size ? 'rotate-180' : ''}`}
                        size={16}
                    />
                </button>
                {openSections.size && (
                    <div className="grid grid-cols-3 gap-2">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => handleSizeToggle(size)}
                                className={`px-3 py-2 text-sm border transition-colors cursor-pointer ${filters.sizes.includes(size)
                                    ? 'bg-brown text-white border-brown'
                                    : 'bg-shade-01 text-shade-06 border-shade-01 hover:border-brown hover:text-brown'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Apply Button */}
            <button className="w-full bg-brown text-white py-3 font-semibold hover:bg-dark-brown transition-colors">
                Apply Now
            </button>
        </div>
    );
}
