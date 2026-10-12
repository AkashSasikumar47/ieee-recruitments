import type { Metadata } from "next";
import { WaitlistForm } from "@/components/waitlist-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDrive } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Join | Recruitments | IEEE SRMIST",
};

export default async function WaitlistPage({
  searchParams,
}: PageProps<"/waitlist">) {
  const [{ domain }, drive] = await Promise.all([searchParams, getDrive()]);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <WaitlistForm
          drive={drive}
          preselect={typeof domain === "string" ? domain : undefined}
        />
      </main>
      <SiteFooter />
    </>
  );
}
