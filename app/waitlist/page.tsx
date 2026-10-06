import type { Metadata } from "next";
import { WaitlistForm } from "@/components/waitlist-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Waitlist | Recruitments | IEEE SRMIST",
};

export default async function WaitlistPage({
  searchParams,
}: PageProps<"/waitlist">) {
  const { domain } = await searchParams;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <WaitlistForm
          preselect={typeof domain === "string" ? domain : undefined}
        />
      </main>
      <SiteFooter />
    </>
  );
}
