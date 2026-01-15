import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import type { Route } from "./+types/root";
import { CheckoutProvider } from "./context/CheckoutContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import CartDrawer from "./components/cart/CartDrawer";
import LoginDrawer from "./components/auth/LoginDrawer";
import WelcomePopup from "./components/common/WelcomePopup";
import Preloader from "./components/ui/Preloader";
import WishlistDrawer from "./components/wishlist/WishlistDrawer";
import { ToastContainer } from 'react-toastify';
import toastStyles from 'react-toastify/dist/ReactToastify.css?url';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap",
  },
  { rel: "stylesheet", href: toastStyles },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CheckoutProvider>
      <AuthProvider>
        <WishlistProvider>
          <AnimatePresence mode="wait">
            {isLoading && <Preloader key="preloader" />}
          </AnimatePresence>
          <CartDrawer />
          <LoginDrawer />
          <WishlistDrawer />
          <WelcomePopup />
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
          <Outlet />
        </WishlistProvider>
      </AuthProvider>
    </CheckoutProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
