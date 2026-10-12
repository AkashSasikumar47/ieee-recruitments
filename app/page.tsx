import { AboutIeeeSection } from "@/components/about-ieee-section";
import { ClosingSection } from "@/components/closing-section";
import { DomainsSection } from "@/components/domains-section";
import { FaqSection } from "@/components/faq-section";
import { HeroSection } from "@/components/hero-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDrive } from "@/lib/auth";

export default async function HomePage() {
  const drive = await getDrive();

  return (
    <>
      <SiteHeader overlay />
      <main className="flex-1">
        <HeroSection drive={drive} />
        <AboutIeeeSection />
        <DomainsSection />
        <HowItWorksSection />
        <FaqSection />
        <ClosingSection drive={drive} />
      </main>
      <SiteFooter />
    </>
  );
}
