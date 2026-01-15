import { IoCheckmark } from 'react-icons/io5';

interface CheckboxProps {
    id: string;
    label: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    className?: string;
}

export default function Checkbox({ id, label, checked, onChange, className = '' }: CheckboxProps) {
    return (
        <div className={`flex items-center space-x-3 group cursor-pointer ${className}`} onClick={() => onChange?.(!checked)}>
            <div className="relative flex items-center justify-center">
                <input
                    type="checkbox"
                    id={id}
                    checked={checked}
                    onChange={(e) => onChange?.(e.target.checked)}
                    className="sr-only"
                />
                <div className={`w-5 h-5 border rounded transition-all duration-200 flex items-center justify-center ${checked
                    ? 'bg-brown border-brown'
                    : 'bg-white border-shade-10 group-hover:border-brown'
                    }`}>
                    {checked && <IoCheckmark className="text-white" size={16} />}
                </div>
            </div>
            <label
                htmlFor={id}
                className="text-sm text-shade-05 font-inter cursor-pointer group-hover:text-black-100 transition-colors"
                onClick={(e) => e.stopPropagation()}
            >
                {label}
            </label>
        </div>
    );
}
