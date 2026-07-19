import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import CommandeLigneFreelance from "@/components/dashboard/CommandeLigneFreelance";

export default async function CommandesFreelancePage({
  searchParams,
}: {
  searchParams: Promise<{ statut?: string }>;
}) {
  const session = await getServerSession(authOptions);
  const { statut } = await searchParams;

  const commandes = session
    ? await prisma.commande.findMany({
        where: {
          freelanceId: session.user.id,
          ...(statut ? { statut: statut as never } : {}),
        },
        include: { service: true, client: true },
        orderBy: { createdAt: "desc" },
      })
    : [];

  const onglets = [
    { label: "Toutes", valeur: "" },
    { label: "En attente", valeur: "EN_ATTENTE" },
    { label: "En cours", valeur: "EN_COURS" },
    { label: "Livrées", valeur: "LIVREE" },
    { label: "Terminées", valeur: "TERMINEE" },
    { label: "Annulées", valeur: "ANNULEE" },
  ];

  return (
    <>
      <DashboardTopbar titre="Commandes" />

      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {onglets.map((onglet) => (
            <a
              key={onglet.valeur}
              href={onglet.valeur ? `/freelance/commandes?statut=${onglet.valeur}` : "/freelance/commandes"}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                (statut ?? "") === onglet.valeur
                  ? "bg-primary text-primary-foreground"
                  : "bg-white text-foreground/70 hover:bg-muted"
              }`}
            >
              {onglet.label}
            </a>
          ))}
        </div>

        <div className="mt-5 space-y-3">
          {commandes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center text-foreground/50">
              Aucune commande dans cette catégorie.
            </div>
          ) : (
            commandes.map((c) => (
              <CommandeLigneFreelance
                key={c.id}
                commande={{
                  id: c.id,
                  reference: c.reference,
                  serviceTitre: c.service.titre,
                  clientNom: `${c.client.prenom} ${c.client.nom}`,
                  clientInitiales: `${c.client.prenom[0]}${c.client.nom[0]}`,
                  prix: c.prix,
                  statut: c.statut,
                  dateEcheance: new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long" }).format(c.dateEcheance),
                }}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
