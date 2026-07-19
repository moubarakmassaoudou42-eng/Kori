"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Briefcase, ShoppingCart, Sparkles } from "lucide-react";

const liens = [
  { href: "/admin", label: "Vue d'ensemble", icon: LayoutDashboard },
  { href: "/admin/utilisateurs", label: "Utilisateurs", icon: Users },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/commandes", label: "Commandes", icon: ShoppingCart },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-black/5 bg-white lg:flex">
      <Link href="/" className="flex items-center gap-2 px-6 py-5">
        <Sparkles className="h-6 w-6 text-primary" strokeWidth={2.5} />
        <div>
          <span className="block text-lg font-extrabold leading-none text-primary">Kori</span>
          <span className="block text-[11px] leading-none text-muted-foreground">Administration</span>
        </div>
      </Link>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {liens.map((lien) => {
          const actif = pathname === lien.href;
          return (
            <Link
              key={lien.href}
              href={lien.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                actif ? "bg-primary-light text-primary" : "text-foreground/70 hover:bg-muted"
              }`}
            >
              <lien.icon className="h-4.5 w-4.5" />
              {lien.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
