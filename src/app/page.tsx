import { HeroSection } from '@/components/home/HeroSection';
import { TrustStrip } from '@/components/home/TrustStrip';
import { ThreePillars } from '@/components/home/ThreePillars';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { Philosophy } from '@/components/home/Philosophy';
import { ScienceSection } from '@/components/home/ScienceSection';
import { Newsletter } from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <ThreePillars />
      <FeaturedProducts />
      <Philosophy />
      <ScienceSection />
      <Newsletter />
    </>
  );
}
