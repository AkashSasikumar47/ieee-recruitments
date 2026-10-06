import { externalLinkProps } from "@ieee/ui/lib/external-link";
import Link from "next/link";
import { footerLinks } from "@ieee/ui/content/footer-links";
import { copyrightLine } from "@ieee/ui/layout/app-footer";
import { Wordmark } from "@/components/wordmark";
import { SITE_LINKS } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="mt-auto px-gutter pt-16 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:pt-24">
      <nav className="grid grid-cols-2 gap-x-6 gap-y-10 text-xs font-semibold uppercase md:grid-cols-12">
        {footerLinks({ title: "Recruitments", links: SITE_LINKS }).map(
          (group, index) => (
            <div
              key={group.title}
              className={`flex flex-col gap-3 md:col-span-3 ${index === 0 ? "md:col-start-1" : ""}`}
            >
              <p className="text-primary-soft">↳ {group.title}</p>
              <ul className="flex flex-col gap-1.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith("/") ? (
                      <Link href={link.href} className="hover:opacity-60">
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        {...externalLinkProps(link.href)}
                        className="hover:opacity-60"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ),
        )}
      </nav>
      <div aria-hidden="true" className="@container mt-16 md:mt-24">
        <Wordmark className="-ml-[0.04em] block text-[length:calc(100cqw/4.4)]" />
      </div>
      <p className="mt-6 border-t pt-5 text-xs font-semibold uppercase">
        {copyrightLine()}
      </p>
    </footer>
  );
}
