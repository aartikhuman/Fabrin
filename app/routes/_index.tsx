import type { Route } from "./+types/_index";
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import StyleDescription from '../components/home/StyleDescription';
import Categories from '../components/home/Categories';
import ElevateBanner from '../components/home/ElevateBanner';
import SeasonsTrends from '../components/home/SeasonsTrends';
import BestSeller from '../components/home/BestSeller';
import Testimonials from '../components/home/Testimonials';
import JoinUs from '../components/home/JoinUs';
import InstagramGallery from '../components/home/InstagramGallery';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Fabrin - Timeless Fashion for Refined Lifestyle" },
        { name: "description", content: "Discover quality fashion designed for every occasion. Shop our curated collection of timeless pieces." },
    ];
}

export default function Home() {
    return (
        <Layout>
            <Hero />
            <StyleDescription />
            <Categories />
            <ElevateBanner />
            <SeasonsTrends />
            <BestSeller />
            <Testimonials />
            <JoinUs />
            <InstagramGallery />
        </Layout>
    );
}
