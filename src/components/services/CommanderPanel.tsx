"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Check, AlertCircle } from "lucide-react";

interface PackageAffiche {
  id: string;
  type: string;
  nom: string;
  description: string;
  prix: number;
  delaiJours: number;
  revisions: number;
}

function formatFCFA(montant: number) {
  return new Intl.NumberFormat("fr-FR").format(montant) + " FCFA";
}

export default function CommanderPanel({ packages }: { packages: PackageAffiche[] }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [packageActifId, setPackageActifId] = useState(packages[1]?.id ?? packages[0]?.id);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  const packageActif = packages.find((p) => p.id === packageActifId) ?? packages[0];

  async function commander() {
    setErreur(null);

    if (status !== "authenticated") {
      router.push("/connexion");
      return;
    }
    if (session.user.role !== "CLIENT") {
      setErreur("Seul un compte client peut passer commande. Utilisez un compte client pour commander.");
      return;
    }

    setChargement(true);
    try {
      const reponse = await fetch("/api/commandes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: packageActif.id }),
      });
      const donnees = await reponse.json();

      if (!reponse.ok) {
        setErreur(donnees.erreur ?? "Une erreur est survenue.");
        setChargement(false);
        return;
      }

      router.push("/client/commandes");
    } catch {
      setErreur("Impossible de contacter le serveur.");
      setChargement(false);
    }
  }

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-elegant">
      <div className="flex gap-1 rounded-xl bg-muted p-1">
        {packages.map((p) => (
          <button
            key={p.id}
            onClick={() => setPackageActifId(p.id)}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold transition ${
              p.id === packageActifId ? "bg-white text-primary shadow-sm" : "text-foreground/50"
            }`}
          >
            {p.type}
          </button>
        ))}
      </div>

      {packageActif && (
        <div className="mt-4">
          <div className="flex items-baseline justify-between">
            <h3 className="font-bold text-foreground">{packageActif.nom}</h3>
            <span className="text-xl font-extrabold text-primary">{formatFCFA(packageActif.prix)}</span>
          </div>
          <p className="mt-2 text-sm text-foreground/60">{packageActif.description}</p>

          <ul className="mt-4 space-y-2 text-sm text-foreground/70">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              Livraison en {packageActif.delaiJours} jour{packageActif.delaiJours > 1 ? "s" : ""}
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              {packageActif.revisions} révision{packageActif.revisions > 1 ? "s" : ""}
            </li>
          </ul>

          {erreur && (
            <div className="mt-3 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-xs text-red-700">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {erreur}
            </div>
          )}

          <button
            onClick={commander}
            disabled={chargement}
            className="mt-4 w-full rounded-xl bg-accent py-3 text-sm font-semibold text-accent-foreground shadow-sm transition hover:bg-accent-dark disabled:opacity-60"
          >
            {chargement ? "Commande en cours..." : `Commander (${formatFCFA(packageActif.prix)})`}
          </button>
        </div>
      )}
    </div>
  );
}
