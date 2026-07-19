import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import { prisma } from "@/lib/prisma";

function formatFCFA(montant: number) {
  return new Intl.NumberFormat("fr-FR").format(montant) + " FCFA";
}

const statutStyles: Record<string, string> = {
  ACTIF: "bg-primary-light text-primary",
  EN_PAUSE: "bg-yellow-100 text-yellow-700",
  BROUILLON: "bg-muted text-foreground/50",
};

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      freelance: { select: { prenom: true, nom: true } },
      categorie: { select: { nom: true } },
      packages: { orderBy: { prix: "asc" }, take: 1 },
    },
  });

  return (
    <>
      <DashboardTopbar titre="Services" />

      <div className="p-6">
        <div className="rounded-2xl border border-black/5 bg-white p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-foreground/50">
                  <th className="pb-3 font-medium">Service</th>
                  <th className="pb-3 font-medium">Freelance</th>
                  <th className="pb-3 font-medium">Catégorie</th>
                  <th className="pb-3 font-medium">Prix min.</th>
                  <th className="pb-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.id} className="border-b border-border/60 last:border-0">
                    <td className="py-3">
                      <a href={`/services/${s.id}`} className="font-medium text-foreground hover:text-primary">
                        {s.titre}
                      </a>
                    </td>
                    <td className="py-3 text-foreground/70">
                      {s.freelance.prenom} {s.freelance.nom}
                    </td>
                    <td className="py-3 text-foreground/60">{s.categorie.nom}</td>
                    <td className="py-3 font-semibold text-primary">
                      {s.packages[0] ? formatFCFA(s.packages[0].prix) : "—"}
                    </td>
                    <td className="py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statutStyles[s.statut]}`}>
                        {s.statut}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {services.length === 0 && (
            <p className="py-8 text-center text-foreground/50">Aucun service publié pour le moment.</p>
          )}
        </div>
      </div>
    </>
  );
}
