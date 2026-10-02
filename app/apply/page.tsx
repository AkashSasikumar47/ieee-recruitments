import type { Metadata } from "next";
import { ApplyForm } from "@/components/apply-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Apply | Recruitments | IEEE SRMIST",
};

export default async function ApplyPage({ searchParams }: PageProps<"/apply">) {
  const { domain } = await searchParams;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <ApplyForm
          preselect={typeof domain === "string" ? domain : undefined}
        />
      </main>
      <SiteFooter />
    </>
  );
}
