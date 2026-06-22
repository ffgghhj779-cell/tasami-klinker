import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { WhyTasami } from '@/components/WhyTasami';
import { MarketStatus } from '@/components/MarketStatus';
import { ProductSpecs } from '@/components/ProductSpecs';
import { Logistics } from '@/components/Logistics';
import { HowWeWork } from '@/components/HowWeWork';
import { FAQ } from '@/components/FAQ';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <WhyTasami />
        <MarketStatus />
        <ProductSpecs />
        <Logistics />
        <HowWeWork />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
