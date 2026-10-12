"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@ieee/ui/components/alert-dialog";
import { Button } from "@ieee/ui/components/button";
import { Input } from "@ieee/ui/components/input";
import { Label } from "@ieee/ui/components/label";
import { Choice } from "@/components/choice";
import type { Drive } from "@/lib/recruitments";

type Confirm = "new" | "open" | "close" | null;

export function RoundBar({
  drives,
  current,
}: {
  drives: Drive[];
  current: string | null;
}) {
  const router = useRouter();
  const [confirm, setConfirm] = useState<Confirm>(null);
  const [name, setName] = useState("");
  const [pending, setPending] = useState(false);
  const open = drives.find((drive) => drive.is_open) ?? null;
  const selected = drives.find((drive) => drive.id === current) ?? null;

  async function run(method: "POST" | "PATCH", body?: object) {
    setPending(true);
    const response = await fetch("/api/admin/drives", {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    }).catch(() => null);
    const data = (await response?.json().catch(() => null)) as {
      id?: string;
      error?: string;
    } | null;
    setPending(false);
    setConfirm(null);
    if (!response?.ok) {
      toast.error(data?.error ?? "Something went wrong.");
      return;
    }
    toast.success(method === "PATCH" ? "Round closed" : "Round opened");
    setName("");
    if (data?.id) router.push(`/admin?round=${data.id}`);
    router.refresh();
  }

  const dialog = {
    new: {
      title: "Open a new round?",
      body: `Applications open on the site right away${open ? `, ${open.name} closes,` : ""} and everyone on the waitlist moves into the new round.`,
      action: "Open round",
      run: () => run("POST", { name }),
    },
    open: {
      title: `Reopen ${selected?.name ?? "this round"}?`,
      body: `Applications open on the site again${open && open.id !== selected?.id ? `, ${open.name} closes,` : ""} and everyone on the waitlist moves into this round.`,
      action: "Reopen",
      run: () => run("POST", { drive_id: selected?.id }),
    },
    close: {
      title: `Close ${open?.name ?? "the round"}?`,
      body: "The site goes back to the waitlist. Applications already in stay in the round.",
      action: "Close round",
      run: () => run("PATCH"),
    },
  };
  const active = confirm ? dialog[confirm] : null;

  return (
    <section className="flex flex-col gap-6 border-b px-gutter pt-8 pb-6 md:pt-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-primary-soft text-xs font-semibold tracking-wide uppercase">
            ↳{" "}
            {open
              ? `${open.name} is open`
              : "Recruitment closed · Waitlist open"}
          </p>
          <h1 className="font-display text-[clamp(3.5rem,9vw,7rem)] leading-[0.85] uppercase">
            {selected?.name ?? "Waitlist"}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Choice
            value={current ?? "waitlist"}
            onChange={(value) => router.push(`/admin?round=${value}`)}
            label="Round"
            className="h-9 w-auto min-w-44 font-semibold uppercase"
            options={[
              { value: "waitlist", label: "Waitlist" },
              ...drives.map((drive) => ({
                value: drive.id,
                label: `${drive.name}${drive.is_open ? " · open" : ""}`,
              })),
            ]}
          />
          {selected?.is_open ? (
            <Button
              variant="outline"
              className="font-semibold uppercase"
              onClick={() => setConfirm("close")}
            >
              Close round
            </Button>
          ) : (
            selected && (
              <Button
                variant="outline"
                className="font-semibold uppercase"
                onClick={() => setConfirm("open")}
              >
                Reopen round
              </Button>
            )
          )}
        </div>
      </div>
      <form
        className="flex flex-wrap items-end gap-2 border-t pt-5"
        onSubmit={(event) => {
          event.preventDefault();
          if (name.trim()) setConfirm("new");
        }}
      >
        <div className="flex min-w-60 flex-1 flex-col gap-2 sm:max-w-sm">
          <Label
            htmlFor="round-name"
            className="text-xs font-semibold tracking-wide uppercase"
          >
            New round
          </Label>
          <Input
            id="round-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={80}
            placeholder="Recruitment 2026"
            className="h-9 bg-card"
          />
        </div>
        <Button
          type="submit"
          disabled={!name.trim()}
          className="font-semibold uppercase"
        >
          <Plus /> Open new round
        </Button>
      </form>

      <AlertDialog
        open={active !== null}
        onOpenChange={(next) => !next && setConfirm(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{active?.title}</AlertDialogTitle>
            <AlertDialogDescription>{active?.body}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={pending}
              onClick={(event) => {
                event.preventDefault();
                void active?.run();
              }}
            >
              {active?.action}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
