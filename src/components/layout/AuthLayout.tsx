import Link from "next/link";
import { Sparkles, ShieldCheck, Users, Zap } from "lucide-react";

const atouts = [
  { icon: ShieldCheck, texte: "Paiement 100% sécurisé via Mobile Money" },
  { icon: Users, texte: "+2 500 freelances vérifiés" },
  { icon: Zap, texte: "Des services livrés rapidement" },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Panneau branding — masqué sur mobile */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-12 text-primary-foreground lg:flex">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="h-7 w-7 text-accent" strokeWidth={2.5} />
          <div>
            <span className="block text-2xl font-extrabold leading-none">Kori</span>
            <span className="block text-xs leading-none text-primary-foreground/70">
              Ton talent, ta réussite.
            </span>
          </div>
        </Link>

        <div className="max-w-sm">
          <h2 className="text-3xl font-bold leading-snug">
            Le talent local au service de tous.
          </h2>
          <ul className="mt-8 space-y-4">
            {atouts.map((atout) => (
              <li key={atout.texte} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <atout.icon className="h-4 w-4 text-accent" />
                </span>
                <span className="text-sm text-primary-foreground/90">{atout.texte}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} Kori — Tous droits réservés.
        </p>

        <svg
          className="pointer-events-none absolute -right-16 -bottom-16 h-72 w-72 text-white/5"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <circle cx="100" cy="100" r="100" />
        </svg>
      </div>

      {/* Panneau formulaire */}
      <div className="flex items-center justify-center bg-cream px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Logo visible seulement sur mobile */}
          <Link href="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <Sparkles className="h-6 w-6 text-primary" strokeWidth={2.5} />
            <span className="text-xl font-extrabold text-primary">Kori</span>
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
