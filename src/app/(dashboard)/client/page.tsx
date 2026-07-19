import { ShoppingCart, Heart, MessageSquare, Receipt } from "lucide-react";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import { commandesClient } from "@/lib/data-dashboard-client";

function formatFCFA(montant: number) {
  return new Intl.NumberFormat("fr-FR").format(montant) + " FCFA";
}

const chiffres = [
  { icon: ShoppingCart, label: "Commandes en cours", valeur: "1", tendance: "1 livraison en attente de validation" },
  { icon: Heart, label: "Services favoris", valeur: "3", tendance: "Retrouvez-les rapidement" },
  { icon: MessageSquare, label: "Messages non lus", valeur: "1", tendance: "Aïcha M. vous a écrit" },
  { icon: Receipt, label: "Dépensé ce mois-ci", valeur: formatFCFA(5000), tendance: "3 commandes ce mois" },
];

const statutStyles: Record<string, string> = {
  "En attente": "bg-yellow-100 text-yellow-700",
  "En cours": "bg-blue-100 text-blue-700",
  "Livrée": "bg-primary-light text-primary",
  "Terminée": "bg-muted text-foreground/60",
  "Annulée": "bg-red-100 text-red-600",
};

export default function ClientDashboardPage() {
  const commandesRecentes = commandesClient.slice(0, 5);

  return (
    <>
      <DashboardTopbar titre="Tableau de bord" actionLabel="Trouver un service" actionHref="/services" />

      <div className="p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {chiffres.map((c) => (
            <div key={c.label} className="rounded-2xl border border-black/5 bg-white p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light">
                <c.icon className="h-5 w-5 text-primary" />
              </span>
              <p className="mt-3 text-2xl font-extrabold text-foreground">{c.valeur}</p>
              <p className="text-sm text-foreground/60">{c.label}</p>
              <p className="mt-1 text-xs font-medium text-accent">{c.tendance}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-black/5 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-foreground">Commandes récentes</h2>
            <a href="/client/commandes" className="text-sm font-semibold text-accent hover:underline">
              Voir toutes les commandes
            </a>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-foreground/50">
                  <th className="pb-3 font-medium">Commande</th>
                  <th className="pb-3 font-medium">Freelance</th>
                  <th className="pb-3 font-medium">Prix</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {commandesRecentes.map((c) => (
                  <tr key={c.id} className="border-b border-border/60 last:border-0">
                    <td className="py-3">
                      <p className="font-medium text-foreground">{c.service}</p>
                      <p className="text-xs text-foreground/40">{c.id}</p>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground/70">
                          {c.freelanceInitiales}
                        </span>
                        {c.freelance}
                      </div>
                    </td>
                    <td className="py-3 font-semibold text-primary">{formatFCFA(c.prix)}</td>
                    <td className="py-3 text-foreground/60">{c.date}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statutStyles[c.statut]}`}>
                        {c.statut}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
