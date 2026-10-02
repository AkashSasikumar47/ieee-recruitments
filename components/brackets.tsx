const CORNERS = [
  {
    glyph: "↱",
    className: "top-0 left-0 -translate-x-full -translate-y-full",
  },
  {
    glyph: "↰",
    className: "top-0 right-0 translate-x-full -translate-y-full",
  },
  {
    glyph: "↳",
    className: "bottom-0 left-0 -translate-x-full translate-y-full",
  },
  {
    glyph: "↲",
    className: "right-0 bottom-0 translate-x-full translate-y-full",
  },
];

export function Brackets({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`relative ${className}`}>
      {CORNERS.map((corner) => (
        <span
          key={corner.glyph}
          aria-hidden="true"
          className={`absolute text-base leading-none ${corner.className}`}
        >
          {corner.glyph}
        </span>
      ))}
      {children}
    </div>
  );
}
