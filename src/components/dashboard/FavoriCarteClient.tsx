"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Star } from "lucide-react";

interface FavoriCarte {
  serviceId: string;
  titre: string;
  freelanceNom: string;
  prixDepart: number;
  note: number;
}

function formatFCFA(montant: number) {
  return new Intl.NumberFormat("fr-FR").format(montant) + " FCFA";
}

export default function FavoriCarteClient({ favori }: { favori: FavoriCarte }) {
  const router = useRouter();
  const [retire, setRetire] = useState(false);

  async function retirer() {
    const reponse = await fetch("/api/favoris", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceId: favori.serviceId }),
    });
    if (reponse.ok) {
      setRetire(true);
      router.refresh();
    }
  }

  if (retire) return null;

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5">
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-2xl">🛠️</span>
        <button onClick={retirer} aria-label="Retirer des favoris">
          <Heart className="h-5 w-5 fill-accent text-accent" />
        </button>
      </div>

      <h3 className="mt-3 font-semibold text-foreground">{favori.titre}</h3>
      <p className="text-xs text-foreground/50">Par {favori.freelanceNom}</p>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm text-foreground/60">
          À partir de <span className="font-bold text-primary">{formatFCFA(favori.prixDepart)}</span>
        </span>
        {favori.note > 0 && (
          <span className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-accent text-accent" />
            {favori.note.toFixed(1)}
          </span>
        )}
      </div>

      <a
        href={`/services/${favori.serviceId}`}
        className="mt-4 block rounded-xl bg-primary py-2 text-center text-sm font-semibold text-primary-foreground transition hover:bg-primary-dark"
      >
        Voir le service
      </a>
    </div>
  );
}
