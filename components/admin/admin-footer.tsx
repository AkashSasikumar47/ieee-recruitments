import { copyrightLine } from "@ieee/ui/layout/app-footer";

export function AdminFooter() {
  return (
    <footer className="mt-auto flex items-center justify-between gap-4 border-t px-gutter pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-xs font-semibold uppercase">
      <p>{copyrightLine()}</p>
      <p className="text-primary-soft">Admins only</p>
    </footer>
  );
}
