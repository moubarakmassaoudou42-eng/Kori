"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";

export default function MotDePasseOubliePage() {
  const [envoye, setEnvoye] = useState(false);
  const [chargement, setChargement] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setChargement(true);
    // L'envoi réel du lien de réinitialisation (via Resend) sera branché
    // à l'étape "Authentification"
    setTimeout(() => {
      setChargement(false);
      setEnvoye(true);
    }, 800);
  }

  return (
    <AuthLayout>
      <Link
        href="/connexion"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60 hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à la connexion
      </Link>

      {!envoye ? (
        <>
          <h1 className="text-2xl font-bold text-foreground">Mot de passe oublié ?</h1>
          <p className="mt-1 text-sm text-foreground/60">
            Indiquez votre e-mail, nous vous enverrons un lien pour le réinitialiser.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                Adresse e-mail
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="vous@exemple.com"
                  className="w-full rounded-xl border border-border bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={chargement}
              className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:bg-primary-dark disabled:opacity-60"
            >
              {chargement ? "Envoi..." : "Envoyer le lien de réinitialisation"}
            </button>
          </form>
        </>
      ) : (
        <div className="text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-xl font-bold text-foreground">E-mail envoyé !</h1>
          <p className="mt-2 text-sm text-foreground/60">
            Si un compte existe avec cette adresse, vous recevrez un lien pour
            réinitialiser votre mot de passe d&apos;ici quelques minutes.
          </p>
        </div>
      )}
    </AuthLayout>
  );
}
