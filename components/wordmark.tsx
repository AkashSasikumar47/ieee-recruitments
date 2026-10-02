export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display leading-[0.82] tracking-[-0.01em] uppercase ${className}`}
    >
      Recruitments
    </span>
  );
}
