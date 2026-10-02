export function ImagePlaceholder({
  label,
  tone = "light",
}: {
  label: string;
  tone?: "light" | "dark";
}) {
  const tones = {
    light: "bg-muted text-primary-soft",
    dark: "bg-primary-deep text-primary-faint",
  };
  return (
    <div
      className={`relative flex size-full items-end overflow-hidden p-3 text-[0.65rem] font-semibold tracking-wide uppercase ${tones[tone]}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full opacity-25"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.25"
        vectorEffect="non-scaling-stroke"
      >
        <path
          d="M0 0 L100 100 M100 0 L0 100"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className="relative">{label}</span>
    </div>
  );
}
