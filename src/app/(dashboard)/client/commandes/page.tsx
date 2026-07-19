import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import CommandeLigneClient from "@/components/dashboard/CommandeLigneClient";

export default async function CommandesClientPage({
  searchParams,
}: {
  searchParams: Promise<{ statut?: string }>;
}) {
  const session = await getServerSession(authOptions);
  const { statut } = await searchParams;

  const commandes = session
    ? await prisma.commande.findMany({
        where: {
          clientId: session.user.id,
          ...(statut ? { statut: statut as never } : {}),
        },
        include: { service: true, freelance: true, avis: true },
        orderBy: { createdAt: "desc" },
      })
    : [];

  const onglets = [
    { label: "Toutes", valeur: "" },
    { label: "En cours", valeur: "EN_COURS" },
    { label: "Livrées", valeur: "LIVREE" },
    { label: "Terminées", valeur: "TERMINEE" },
    { label: "Annulées", valeur: "ANNULEE" },
  ];

  return (
    <>
      <DashboardTopbar titre="Mes commandes" />

      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {onglets.map((onglet) => (
            <a
              key={onglet.valeur}
              href={onglet.valeur ? `/client/commandes?statut=${onglet.valeur}` : "/client/commandes"}
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
            <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center">
              <p className="text-foreground/50">Aucune commande dans cette catégorie.</p>
              <a href="/services" className="mt-2 inline-block text-sm font-semibold text-accent hover:underline">
                Parcourir les services
              </a>
            </div>
          ) : (
            commandes.map((c) => (
              <CommandeLigneClient
                key={c.id}
                commande={{
                  id: c.id,
                  reference: c.reference,
                  serviceTitre: c.service.titre,
                  freelanceNom: `${c.freelance.prenom} ${c.freelance.nom}`,
                  freelanceInitiales: `${c.freelance.prenom[0]}${c.freelance.nom[0]}`,
                  prix: c.prix,
                  statut: c.statut,
                  date: new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(c.createdAt),
                  aDejaUnAvis: !!c.avis,
                }}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
