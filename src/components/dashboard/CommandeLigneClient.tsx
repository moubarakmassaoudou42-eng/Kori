"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LaisserAvisModal from "@/components/avis/LaisserAvisModal";

type Statut = "EN_ATTENTE" | "ACCEPTEE" | "EN_COURS" | "LIVREE" | "REVISION_DEMANDEE" | "TERMINEE" | "ANNULEE";

interface CommandeLigne {
  id: string;
  reference: string;
  serviceTitre: string;
  freelanceNom: string;
  freelanceInitiales: string;
  prix: number;
  statut: Statut;
  date: string;
  aDejaUnAvis: boolean;
}

function formatFCFA(montant: number) {
  return new Intl.NumberFormat("fr-FR").format(montant) + " FCFA";
}

const statutStyles: Record<Statut, string> = {
  EN_ATTENTE: "bg-yellow-100 text-yellow-700",
  ACCEPTEE: "bg-blue-100 text-blue-700",
  EN_COURS: "bg-blue-100 text-blue-700",
  LIVREE: "bg-primary-light text-primary",
  REVISION_DEMANDEE: "bg-orange-100 text-orange-700",
  TERMINEE: "bg-muted text-foreground/60",
  ANNULEE: "bg-red-100 text-red-600",
};

const statutLabel: Record<Statut, string> = {
  EN_ATTENTE: "En attente",
  ACCEPTEE: "Acceptée",
  EN_COURS: "En cours",
  LIVREE: "Livrée",
  REVISION_DEMANDEE: "Révision demandée",
  TERMINEE: "Terminée",
  ANNULEE: "Annulée",
};

export default function CommandeLigneClient({ commande }: { commande: CommandeLigne }) {
  const router = useRouter();
  const [statut, setStatut] = useState(commande.statut);
  const [chargement, setChargement] = useState(false);
  const [modaleAvisOuverte, setModaleAvisOuverte] = useState(false);

  async function envoyerAction(action: string) {
    setChargement(true);
    const reponse = await fetch(`/api/commandes/${commande.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    if (reponse.ok) {
      const { commande: maj } = await reponse.json();
      setStatut(maj.statut);
      router.refresh();
    }
    setChargement(false);
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-black/5 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground/70">
          {commande.freelanceInitiales}
        </span>
        <div>
          <p className="font-semibold text-foreground">{commande.serviceTitre}</p>
          <p className="text-xs text-foreground/50">
            {commande.reference} · Freelance : {commande.freelanceNom} · {commande.date}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-bold text-primary">{formatFCFA(commande.prix)}</span>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statutStyles[statut]}`}>
          {statutLabel[statut]}
        </span>

        {statut === "LIVREE" && (
          <div className="flex gap-2">
            <button
              onClick={() => envoyerAction("valider")}
              disabled={chargement}
              className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary-dark disabled:opacity-50"
            >
              Valider la livraison
            </button>
            <button
              onClick={() => envoyerAction("demander_revision")}
              disabled={chargement}
              className="rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-foreground/70 hover:bg-yellow-100 hover:text-yellow-700 disabled:opacity-50"
            >
              Demander une révision
            </button>
          </div>
        )}
        {statut === "TERMINEE" && !commande.aDejaUnAvis && (
          <button
            onClick={() => setModaleAvisOuverte(true)}
            className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground hover:bg-accent-dark"
          >
            Laisser un avis
          </button>
        )}
      </div>

      {modaleAvisOuverte && (
        <LaisserAvisModal commandeId={commande.id} onClose={() => setModaleAvisOuverte(false)} />
      )}
    </div>
  );
}
