"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Star, MoreVertical } from "lucide-react";

interface ServiceCarte {
  id: string;
  titre: string;
  prixDepart: number;
  statut: "ACTIF" | "EN_PAUSE" | "BROUILLON";
  note: number;
  nombreAvis: number;
  vues: number;
  commandesEnCours: number;
}

function formatFCFA(montant: number) {
  return new Intl.NumberFormat("fr-FR").format(montant) + " FCFA";
}

const statutStyles: Record<ServiceCarte["statut"], string> = {
  ACTIF: "bg-primary-light text-primary",
  EN_PAUSE: "bg-yellow-100 text-yellow-700",
  BROUILLON: "bg-muted text-foreground/50",
};

const statutLabel: Record<ServiceCarte["statut"], string> = {
  ACTIF: "Actif",
  EN_PAUSE: "En pause",
  BROUILLON: "Brouillon",
};

export default function ServiceCardFreelance({ service }: { service: ServiceCarte }) {
  const router = useRouter();
  const [statut, setStatut] = useState(service.statut);
  const [chargement, setChargement] = useState(false);

  async function basculerPause() {
    const nouveauStatut = statut === "ACTIF" ? "EN_PAUSE" : "ACTIF";
    setChargement(true);
    const reponse = await fetch(`/api/services/${service.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ statut: nouveauStatut }),
    });
    if (reponse.ok) {
      setStatut(nouveauStatut);
      router.refresh();
    }
    setChargement(false);
  }

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5">
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-2xl">
          🛠️
        </span>
        <button className="rounded-lg p-1.5 text-foreground/40 hover:bg-muted" aria-label="Options">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      <a href={`/services/${service.id}`} className="mt-3 block font-semibold text-foreground hover:text-primary">
        {service.titre}
      </a>
      <p className="mt-1 text-sm text-foreground/60">
        À partir de <span className="font-bold text-primary">{formatFCFA(service.prixDepart)}</span>
      </p>

      <div className="mt-3 flex items-center gap-4 text-xs text-foreground/50">
        {service.note > 0 && (
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            {service.note.toFixed(1)} ({service.nombreAvis})
          </span>
        )}
        <span className="flex items-center gap-1">
          <Eye className="h-3.5 w-3.5" />
          {service.vues} vues
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statutStyles[statut]}`}>
          {statutLabel[statut]}
        </span>

        {statut !== "BROUILLON" && (
          <button
            onClick={basculerPause}
            disabled={chargement}
            className="text-xs font-semibold text-accent hover:underline disabled:opacity-50"
          >
            {statut === "ACTIF" ? "Mettre en pause" : "Réactiver"}
          </button>
        )}
      </div>

      {service.commandesEnCours > 0 && (
        <p className="mt-2 text-xs text-foreground/50">
          {service.commandesEnCours} commande{service.commandesEnCours > 1 ? "s" : ""} en cours
        </p>
      )}
    </div>
  );
}
