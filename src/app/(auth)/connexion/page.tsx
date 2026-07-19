"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, getSession } from "next-auth/react";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";
import { GoogleIcon, FacebookIcon } from "@/components/auth/OAuthIcons";

export default function ConnexionPage() {
  const router = useRouter();
  const [afficherMotDePasse, setAfficherMotDePasse] = useState(false);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErreur(null);
    setChargement(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const resultat = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (resultat?.error) {
      setErreur("Adresse e-mail ou mot de passe incorrect.");
      setChargement(false);
      return;
    }

    const session = await getSession();
    router.push(session?.user?.role === "FREELANCE" ? "/freelance" : "/client");
  }

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold text-foreground">Content de vous revoir 👋</h1>
      <p className="mt-1 text-sm text-foreground/60">
        Connectez-vous pour accéder à votre espace Kori.
      </p>

      {erreur && (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {erreur}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            Adresse e-mail
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="vous@exemple.com"
              className="w-full rounded-xl border border-border bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-foreground">
              Mot de passe
            </label>
            <Link href="/mot-de-passe-oublie" className="text-xs font-medium text-accent hover:underline">
              Mot de passe oublié ?
            </Link>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
            <input
              id="password"
              name="password"
              type={afficherMotDePasse ? "text" : "password"}
              required
              placeholder="••••••••"
              className="w-full rounded-xl border border-border bg-white py-3 pl-10 pr-10 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="button"
              onClick={() => setAfficherMotDePasse((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/70"
              aria-label={afficherMotDePasse ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              {afficherMotDePasse ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={chargement}
          className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:bg-primary-dark disabled:opacity-60"
        >
          {chargement ? "Connexion..." : "Se connecter"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-foreground/40">ou continuer avec</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 rounded-xl border border-border bg-white py-2.5 text-sm font-medium text-foreground transition hover:bg-muted">
          <GoogleIcon />
          Google
        </button>
        <button className="flex items-center justify-center gap-2 rounded-xl border border-border bg-white py-2.5 text-sm font-medium text-foreground transition hover:bg-muted">
          <FacebookIcon />
          Facebook
        </button>
      </div>

      <p className="mt-8 text-center text-sm text-foreground/60">
        Pas encore de compte ?{" "}
        <Link href="/inscription" className="font-semibold text-accent hover:underline">
          Inscrivez-vous
        </Link>
      </p>
    </AuthLayout>
  );
}
