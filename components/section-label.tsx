import { Reveal } from "@/components/motion/reveal";

export function SectionLabel({
  children,
  tone = "light",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "light" | "blue";
  className?: string;
}) {
  return (
    <Reveal
      as="p"
      y={8}
      className={`text-xs font-semibold tracking-wide uppercase ${
        tone === "blue" ? "text-primary-faint" : "text-primary-soft"
      } ${className}`}
    >
      ↳ {children}
    </Reveal>
  );
}
