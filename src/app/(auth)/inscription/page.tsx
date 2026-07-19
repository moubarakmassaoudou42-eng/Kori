"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Mail, Lock, User, Eye, EyeOff, ShoppingBag, Briefcase, AlertCircle } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";
import { GoogleIcon, FacebookIcon } from "@/components/auth/OAuthIcons";

type Role = "CLIENT" | "FREELANCE";

export default function InscriptionPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("CLIENT");
  const [afficherMotDePasse, setAfficherMotDePasse] = useState(false);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErreur(null);
    setChargement(true);

    const formData = new FormData(e.currentTarget);
    const prenom = formData.get("prenom") as string;
    const nom = formData.get("nom") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const reponse = await fetch("/api/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prenom, nom, email, password, role }),
      });

      const donnees = await reponse.json();

      if (!reponse.ok) {
        setErreur(donnees.erreur ?? "Une erreur est survenue.");
        setChargement(false);
        return;
      }

      // Compte créé avec succès → on connecte directement la personne
      const resultat = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (resultat?.error) {
        // Compte créé mais connexion auto échouée : on renvoie vers la connexion manuelle
        router.push("/connexion");
        return;
      }

      router.push(role === "FREELANCE" ? "/freelance" : "/client");
    } catch {
      setErreur("Impossible de contacter le serveur. Réessayez.");
      setChargement(false);
    }
  }

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold text-foreground">Créer un compte</h1>
      <p className="mt-1 text-sm text-foreground/60">
        Rejoignez Kori en quelques secondes.
      </p>

      {/* Choix du rôle */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setRole("CLIENT")}
          className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition ${
            role === "CLIENT"
              ? "border-primary bg-primary-light"
              : "border-border bg-white hover:border-primary/40"
          }`}
        >
          <ShoppingBag className={`h-5 w-5 ${role === "CLIENT" ? "text-primary" : "text-foreground/50"}`} />
          <span className="text-sm font-semibold text-foreground">Je cherche un service</span>
        </button>
        <button
          type="button"
          onClick={() => setRole("FREELANCE")}
          className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition ${
            role === "FREELANCE"
              ? "border-accent bg-accent-light"
              : "border-border bg-white hover:border-accent/40"
          }`}
        >
          <Briefcase className={`h-5 w-5 ${role === "FREELANCE" ? "text-accent" : "text-foreground/50"}`} />
          <span className="text-sm font-semibold text-foreground">Je propose mes services</span>
        </button>
      </div>

      {erreur && (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {erreur}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="prenom" className="mb-1.5 block text-sm font-medium text-foreground">
              Prénom
            </label>
            <input
              id="prenom"
              name="prenom"
              type="text"
              required
              placeholder="Aïcha"
              className="w-full rounded-xl border border-border bg-white px-3 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label htmlFor="nom" className="mb-1.5 block text-sm font-medium text-foreground">
              Nom
            </label>
            <input
              id="nom"
              name="nom"
              type="text"
              required
              placeholder="Moussa"
              className="w-full rounded-xl border border-border bg-white px-3 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

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
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-foreground">
            Mot de passe
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
            <input
              id="password"
              name="password"
              type={afficherMotDePasse ? "text" : "password"}
              required
              minLength={8}
              placeholder="8 caractères minimum"
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

        <label className="flex items-start gap-2 text-xs text-foreground/60">
          <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-border text-primary" />
          <span>
            J&apos;accepte les{" "}
            <Link href="/conditions" className="font-medium text-accent hover:underline">
              Conditions d&apos;utilisation
            </Link>{" "}
            et la{" "}
            <Link href="/confidentialite" className="font-medium text-accent hover:underline">
              Politique de confidentialité
            </Link>
            .
          </span>
        </label>

        <button
          type="submit"
          disabled={chargement}
          className="w-full rounded-xl bg-accent py-3 text-sm font-semibold text-accent-foreground shadow-elegant transition hover:bg-accent-dark disabled:opacity-60"
        >
          {chargement ? "Création..." : "Créer mon compte"}
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
        Déjà un compte ?{" "}
        <Link href="/connexion" className="font-semibold text-accent hover:underline">
          Connectez-vous
        </Link>
      </p>
    </AuthLayout>
  );
}
