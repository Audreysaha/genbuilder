// src/pages/Landing.jsx
import Header from '../components/Header';
import Hero from '../components/Hero';
import { HowItWorks } from '../components/HowitWorks';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import CTA from '../components/CTA';
import Footer from '../components/Footer';


export default function Landing() {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Header /> 
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}