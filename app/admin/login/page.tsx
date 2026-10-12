import type { Metadata } from "next";
import { AdminFooter } from "@/components/admin/admin-footer";
import { AdminHeader } from "@/components/admin/admin-header";
import { LoginForm } from "@/components/admin/login-form";
import { Reveal } from "@/components/motion/reveal";
import { TwoTone } from "@/components/two-tone";

export const metadata: Metadata = {
  title: "Sign in | Recruitments admin",
  robots: { index: false },
};

export default async function LoginPage({
  searchParams,
}: PageProps<"/admin/login">) {
  const { error } = await searchParams;

  return (
    <>
      <AdminHeader signedIn={false} />
      <main className="grid flex-1 gap-10 px-gutter py-14 md:grid-cols-12 md:py-24">
        <div className="flex flex-col gap-4 md:col-span-5">
          <Reveal trigger="mount" y={8}>
            <p className="text-primary-soft text-xs font-semibold tracking-wide uppercase">
              ↳ Admins only
            </p>
          </Reveal>
          <TwoTone
            as="h1"
            trigger="mount"
            delay={0.1}
            text="Sign *in*"
            className="text-[clamp(3rem,7vw,6rem)] leading-[0.9]"
          />
        </div>
        <Reveal
          trigger="mount"
          delay={0.2}
          y={16}
          className="md:col-span-5 md:col-start-8"
        >
          <LoginForm error={typeof error === "string" ? error : undefined} />
        </Reveal>
      </main>
      <AdminFooter />
    </>
  );
}
