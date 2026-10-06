"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Brackets } from "@/components/brackets";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/section-label";
import { TwoTone } from "@/components/two-tone";
import { STEPS } from "@/lib/content";

export function HowItWorksSection() {
  const media = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: media,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section
      id="how-it-works"
      className="bg-primary px-gutter pt-20 pb-4 text-primary-foreground md:pt-32 md:pb-8"
    >
      <div className="grid gap-8 md:grid-cols-12">
        <SectionLabel tone="blue" className="md:col-span-3">
          How it works
        </SectionLabel>
        <TwoTone
          tone="blue"
          text="Four *simple* steps from your *application* to your first domain *meeting.*"
          className="text-[clamp(1.9rem,4.4vw,4.25rem)] leading-[0.95] md:col-span-9"
        />
      </div>

      <div
        ref={media}
        className="relative mt-16 overflow-hidden md:mt-24 md:min-h-[44rem]"
      >
        <motion.div
          className="absolute inset-0 hidden md:block"
          style={{ scale }}
        >
          <ImagePlaceholder label="Interview day" tone="dark" />
        </motion.div>
        <motion.div
          style={{ y }}
          className="relative md:flex md:min-h-[44rem] md:items-center md:justify-center md:py-24"
        >
          <Brackets className="text-primary-faint md:w-[26rem]">
            <ol className="flex flex-col gap-7 bg-primary p-6 md:p-8">
              {STEPS.map((step, index) => (
                <Reveal as="li" key={step.title} delay={index * 0.1} y={14}>
                  <p className="flex items-baseline justify-between gap-4">
                    <span className="font-heading text-lg font-bold uppercase">
                      0{index + 1}. {step.title}
                    </span>
                    <span className="text-primary-faint text-xs font-semibold uppercase">
                      {step.date}
                    </span>
                  </p>
                  <p className="text-primary-faint mt-1 text-sm leading-snug">
                    {step.description}
                  </p>
                </Reveal>
              ))}
            </ol>
          </Brackets>
        </motion.div>
      </div>
    </section>
  );
}
