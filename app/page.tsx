import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { WhyTasami } from '@/components/WhyTasami';
import { About } from '@/components/About';
import { SocialProof } from '@/components/SocialProof';
import { MarketStatus } from '@/components/MarketStatus';
import { ProductSpecs } from '@/components/ProductSpecs';
import { Logistics } from '@/components/Logistics';
import { HowWeWork } from '@/components/HowWeWork';
import { FAQ } from '@/components/FAQ';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';
import { StickyMobileCta } from '@/components/StickyMobileCta';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main-content">
        <Hero />
        <WhyTasami />
        <About />
        <SocialProof />
        <MarketStatus />
        <ProductSpecs />
        <Logistics />
        <HowWeWork />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
