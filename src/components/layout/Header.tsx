"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Search, Sparkles } from "lucide-react";

const liensNav = [
  { label: "Accueil", href: "/" },
  { label: "Catégories", href: "/categories" },
  { label: "Comment ça marche", href: "/comment-ca-marche" },
  { label: "Devenir freelance", href: "/devenir-freelance" },
];

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Sparkles className="h-6 w-6 text-primary" strokeWidth={2.5} />
          <div>
            <span className="block text-xl font-extrabold leading-none text-primary">
              Kori
            </span>
            <span className="block text-[11px] leading-none text-muted-foreground">
              Ton talent, ta réussite.
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {liensNav.map((lien, i) => (
            <Link
              key={lien.href}
              href={lien.href}
              className={
                i === 0
                  ? "border-b-2 border-accent pb-1 text-sm font-medium text-accent"
                  : "text-sm font-medium text-foreground/80 transition hover:text-primary"
              }
            >
              {lien.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            aria-label="Rechercher"
            className="hidden rounded-full p-2 text-foreground/70 transition hover:bg-muted sm:block"
          >
            <Search className="h-5 w-5" />
          </button>

          {status === "authenticated" ? (
            <>
              <Link
                href={session.user.role === "FREELANCE" ? "/freelance" : "/client"}
                className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-dark"
              >
                Mon tableau de bord
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="hidden text-sm font-medium text-foreground/60 hover:text-foreground sm:block"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                href="/connexion"
                className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-dark"
              >
                Se connecter
              </Link>
              <Link
                href="/inscription"
                className="hidden rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground shadow-sm transition hover:bg-accent-dark sm:block"
              >
                S&apos;inscrire
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
