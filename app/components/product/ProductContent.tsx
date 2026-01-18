import { IoCheckmarkCircle } from "react-icons/io5";

interface ProductContentProps {
    longDescription?: string;
    benefits?: string[];
    productDetails?: { label: string; value: string }[];
    moreDetails?: string[];
}

export default function ProductContent({
    longDescription,
    benefits,
    productDetails,
    moreDetails
}: ProductContentProps) {
    return (
        <div className="space-y-10">
            {/* Description */}
            {longDescription && (
                <section>
                    <h3 className="text-xl font-bold font-big text-black-100 mb-4">Product Description</h3>
                    <p className="text-shade-06 leading-relaxed">
                        {longDescription}
                    </p>
                </section>
            )}

            {/* Benefits */}
            {benefits && benefits.length > 0 && (
                <section>
                    <h2 className="text-xl font-bold font-big text-black-100 mb-4">Benefits</h2>
                    <ul className="space-y-3">
                        {benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <IoCheckmarkCircle className="text-brown mt-1 shrink-0" size={20} aria-hidden="true" />
                                <span className="text-shade-06">{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Product Details */}
            {productDetails && productDetails.length > 0 && (
                <section>
                    <h2 className="text-xl font-bold font-big text-black-100 mb-4">Product Details</h2>
                    <ul className="space-y-3">
                        {productDetails.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <IoCheckmarkCircle className="text-brown mt-1 shrink-0" size={20} aria-hidden="true" />
                                <span className="text-shade-06">
                                    <strong className="text-black-100">{detail.label}:</strong> {detail.value}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* More Details */}
            {moreDetails && moreDetails.length > 0 && (
                <section>
                    <h2 className="text-xl font-bold font-big text-black-100 mb-4">More Details</h2>
                    <ul className="space-y-3">
                        {moreDetails.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <IoCheckmarkCircle className="text-brown mt-1 shrink-0" size={20} aria-hidden="true" />
                                <span className="text-shade-06">{detail}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
}
