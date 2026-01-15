import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    index("routes/_index.tsx"),
    route("contact", "routes/contact.tsx"),
    route("cart", "routes/cart.tsx"),
    route("women", "routes/women.tsx"),
    route("men", "routes/men.tsx"),
    route("jewelry", "routes/jewelry.tsx"),
    route("shop", "routes/shop.tsx"),
    route("product/:id", "routes/product.$id.tsx"),

    // Checkout Flow
    route("checkout", "routes/checkout.tsx", [
        index("routes/checkout.shipping.tsx"),
        route("payment", "routes/checkout.payment.tsx"),
        route("review", "routes/checkout.review.tsx"),
    ]),

    route("order-confirmation", "routes/order-confirmation.tsx"),
] satisfies RouteConfig;
