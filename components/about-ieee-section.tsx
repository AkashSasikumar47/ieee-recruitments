import { ABOUT_IEEE } from "@ieee/ui/content/about-ieee";
import { Brackets } from "@/components/brackets";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/section-label";
import { TwoTone } from "@/components/two-tone";

const STATEMENT =
  "A student branch of *IEEE,* the world's largest technical *professional* organisation, building *technology* and the people behind it.";

export function AboutIeeeSection() {
  return (
    <section id="about-ieee" className="px-site-4 py-20 md:px-site-8 md:py-32">
      <div className="grid gap-8 md:grid-cols-12">
        <SectionLabel className="md:col-span-3">About IEEE</SectionLabel>
        <div className="flex flex-col gap-10 md:col-span-9">
          <TwoTone
            text={STATEMENT}
            className="max-w-5xl text-[clamp(1.9rem,4.4vw,4.25rem)] leading-[0.95]"
          />
          <div className="grid gap-8 md:grid-cols-9">
            <Reveal className="md:col-span-4">
              <p className="text-primary-soft max-w-md text-sm leading-relaxed md:text-base">
                {ABOUT_IEEE.statement}
              </p>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-5">
              <Brackets className="text-primary-soft">
                <div className="aspect-[16/10]">
                  <ImagePlaceholder label="IEEE SRMIST team photo" />
                </div>
              </Brackets>
            </Reveal>
          </div>
        </div>
      </div>
      <ul className="mt-16 grid border-t md:mt-24 md:grid-cols-3">
        {ABOUT_IEEE.points.map((point, index) => (
          <Reveal
            as="li"
            key={point.title}
            delay={index * 0.08}
            className="flex flex-col gap-3 border-b py-6 md:border-r md:border-b-0 md:px-6 md:py-8 md:first:pl-0 md:last:border-r-0"
          >
            <span className="text-primary-soft text-xs font-semibold">
              0{index + 1}
            </span>
            <h3 className="font-heading text-xl font-bold tracking-[-0.02em] uppercase">
              {point.title}
            </h3>
            <p className="text-primary-soft text-sm leading-relaxed">
              {point.description}
            </p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
