"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Bell, Menu, Plus, LogOut, ChevronDown } from "lucide-react";

function initiales(nom?: string | null) {
  if (!nom) return "?";
  const parties = nom.trim().split(" ");
  return parties
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export default function DashboardTopbar({
  titre,
  actionLabel,
  actionHref,
}: {
  titre: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  const { data: session } = useSession();
  const [menuOuvert, setMenuOuvert] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-black/5 bg-white/95 px-6 py-4 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <button className="rounded-lg p-1.5 hover:bg-muted lg:hidden" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-bold text-foreground">{titre}</h1>
      </div>

      <div className="flex items-center gap-3">
        {actionLabel && (
          <a
            href={actionHref ?? "#"}
            className="hidden items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition hover:bg-accent-dark sm:flex"
          >
            <Plus className="h-4 w-4" />
            {actionLabel}
          </a>
        )}
        <button className="relative rounded-full p-2 hover:bg-muted" aria-label="Notifications">
          <Bell className="h-5 w-5 text-foreground/70" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOuvert((v) => !v)}
            className="flex items-center gap-1.5 rounded-full p-1 hover:bg-muted"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary">
              {initiales(session?.user?.name)}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-foreground/40" />
          </button>

          {menuOuvert && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOuvert(false)} />
              <div className="absolute right-0 z-20 mt-2 w-56 rounded-xl border border-black/5 bg-white p-2 shadow-elegant">
                <div className="border-b border-border px-3 py-2">
                  <p className="truncate text-sm font-semibold text-foreground">{session?.user?.name}</p>
                  <p className="truncate text-xs text-foreground/50">{session?.user?.email}</p>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Se déconnecter
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
