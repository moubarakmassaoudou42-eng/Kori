import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import { prisma } from "@/lib/prisma";

function formatFCFA(montant: number) {
  return new Intl.NumberFormat("fr-FR").format(montant) + " FCFA";
}

const statutStyles: Record<string, string> = {
  EN_ATTENTE: "bg-yellow-100 text-yellow-700",
  ACCEPTEE: "bg-blue-100 text-blue-700",
  EN_COURS: "bg-blue-100 text-blue-700",
  LIVREE: "bg-primary-light text-primary",
  REVISION_DEMANDEE: "bg-orange-100 text-orange-700",
  TERMINEE: "bg-muted text-foreground/60",
  ANNULEE: "bg-red-100 text-red-600",
};

export default async function AdminCommandesPage() {
  const commandes = await prisma.commande.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      service: { select: { titre: true } },
      client: { select: { prenom: true, nom: true } },
      freelance: { select: { prenom: true, nom: true } },
    },
  });

  return (
    <>
      <DashboardTopbar titre="Commandes" />

      <div className="p-6">
        <div className="rounded-2xl border border-black/5 bg-white p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-foreground/50">
                  <th className="pb-3 font-medium">Référence</th>
                  <th className="pb-3 font-medium">Service</th>
                  <th className="pb-3 font-medium">Client</th>
                  <th className="pb-3 font-medium">Freelance</th>
                  <th className="pb-3 font-medium">Prix</th>
                  <th className="pb-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {commandes.map((c) => (
                  <tr key={c.id} className="border-b border-border/60 last:border-0">
                    <td className="py-3 font-medium text-foreground">{c.reference}</td>
                    <td className="py-3 text-foreground/70">{c.service.titre}</td>
                    <td className="py-3 text-foreground/60">
                      {c.client.prenom} {c.client.nom}
                    </td>
                    <td className="py-3 text-foreground/60">
                      {c.freelance.prenom} {c.freelance.nom}
                    </td>
                    <td className="py-3 font-semibold text-primary">{formatFCFA(c.prix)}</td>
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
          {commandes.length === 0 && (
            <p className="py-8 text-center text-foreground/50">Aucune commande pour le moment.</p>
          )}
        </div>
      </div>
    </>
  );
}
