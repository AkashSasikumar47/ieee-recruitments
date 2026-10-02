import { AboutIeeeSection } from "@/components/about-ieee-section";
import { ClosingSection } from "@/components/closing-section";
import { DomainsSection } from "@/components/domains-section";
import { FaqSection } from "@/components/faq-section";
import { HeroSection } from "@/components/hero-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <>
      <SiteHeader overlay />
      <main className="flex-1">
        <HeroSection />
        <AboutIeeeSection />
        <DomainsSection />
        <HowItWorksSection />
        <FaqSection />
        <ClosingSection />
      </main>
      <SiteFooter />
    </>
  );
}
