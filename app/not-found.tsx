import Link from "next/link";
import { Button } from "@ieee/ui/components/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col items-start gap-6 px-gutter py-24 md:py-32">
        <p className="text-primary-soft text-xs font-semibold tracking-wide uppercase">
          ↳ 404
        </p>
        <h1 className="font-display text-[clamp(4.5rem,14vw,12rem)] leading-[0.82] uppercase">
          Page not found
        </h1>
        <Button size="lg" className="h-12 font-bold uppercase" asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </main>
      <SiteFooter />
    </>
  );
}
