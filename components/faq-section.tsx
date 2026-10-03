import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ieee/ui/components/accordion";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/section-label";
import { TwoTone } from "@/components/two-tone";
import { FAQS } from "@/lib/content";

export function FaqSection() {
  return (
    <section id="faq" className="px-site-4 py-20 md:px-site-8 md:py-32">
      <div className="grid gap-8 md:grid-cols-12">
        <SectionLabel className="md:col-span-3">FAQ</SectionLabel>
        <div className="flex flex-col gap-12 md:col-span-9">
          <TwoTone
            text="Questions, *answered.*"
            className="text-[clamp(1.9rem,4.4vw,4.25rem)] leading-[0.95]"
          />
          <Accordion
            type="single"
            collapsible
            defaultValue="faq-0"
            className="border-t"
          >
            {FAQS.map((faq, index) => (
              <Reveal
                key={faq.question}
                delay={Math.min(index, 5) * 0.05}
                y={14}
              >
                <AccordionItem
                  value={`faq-${index}`}
                  className="border-b last:border-b"
                >
                  <AccordionTrigger className="items-center gap-6 py-6 hover:no-underline [&>svg]:size-5 [&>svg]:text-primary">
                    <span className="flex items-baseline gap-6">
                      <span className="text-primary-soft text-xs font-semibold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-heading text-lg font-bold tracking-[-0.02em] uppercase md:text-2xl">
                        {faq.question}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-primary-soft max-w-2xl pb-6 pl-11 text-sm leading-relaxed md:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </Reveal>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
