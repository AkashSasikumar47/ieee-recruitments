import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { Button } from "@ieee/ui/components/button";
import { Wordmark } from "@/components/wordmark";

export function AdminHeader({ signedIn = true }: { signedIn?: boolean }) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b bg-background px-gutter pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 text-primary">
      <Link href="/admin" className="flex items-baseline gap-3">
        <Wordmark className="text-[2rem]" />
        <span className="text-primary-soft text-xs font-semibold tracking-wide uppercase">
          Admin
        </span>
      </Link>
      <div className="flex items-center gap-3">
        {signedIn && (
          <>
            <Button
              variant="outline"
              size="sm"
              className="hidden font-semibold uppercase sm:inline-flex"
              asChild
            >
              <Link href="/" target="_blank">
                View site
              </Link>
            </Button>
            <form action="/api/auth/logout" method="post">
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="font-semibold uppercase"
              >
                <LogOut /> Sign out
              </Button>
            </form>
          </>
        )}
        <Image
          src="/logos/ieee-srmist-logo.png"
          alt="IEEE SRMIST"
          width={32}
          height={32}
          preload
        />
      </div>
    </header>
  );
}
