import { Users, Briefcase, ShoppingCart, Wallet } from "lucide-react";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import { prisma } from "@/lib/prisma";

function formatFCFA(montant: number) {
  return new Intl.NumberFormat("fr-FR").format(montant) + " FCFA";
}

export default async function AdminDashboardPage() {
  const [nbUtilisateurs, nbFreelances, nbClients, nbServices, nbCommandes, paiements] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: "FREELANCE" } }),
    prisma.user.count({ where: { role: "CLIENT" } }),
    prisma.service.count(),
    prisma.commande.count(),
    prisma.paiement.findMany({ select: { montant: true, commission: true, statut: true } }),
  ]);

  const volumeTotal = paiements.reduce((total, p) => total + p.montant, 0);
  const commissionsGagnees = paiements
    .filter((p) => p.statut === "LIBERE")
    .reduce((total, p) => total + p.commission, 0);

  const chiffres = [
    { icon: Users, label: "Utilisateurs", valeur: nbUtilisateurs, detail: `${nbFreelances} freelances · ${nbClients} clients` },
    { icon: Briefcase, label: "Services publiés", valeur: nbServices, detail: "Toutes catégories confondues" },
    { icon: ShoppingCart, label: "Commandes passées", valeur: nbCommandes, detail: "Depuis le lancement" },
    { icon: Wallet, label: "Volume total transigé", valeur: formatFCFA(volumeTotal), detail: `${formatFCFA(commissionsGagnees)} de commissions perçues` },
  ];

  return (
    <>
      <DashboardTopbar titre="Vue d'ensemble" />

      <div className="p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {chiffres.map((c) => (
            <div key={c.label} className="rounded-2xl border border-black/5 bg-white p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light">
                <c.icon className="h-5 w-5 text-primary" />
              </span>
              <p className="mt-3 text-2xl font-extrabold text-foreground">{c.valeur}</p>
              <p className="text-sm text-foreground/60">{c.label}</p>
              <p className="mt-1 text-xs font-medium text-accent">{c.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <a
            href="/admin/utilisateurs"
            className="rounded-2xl border border-black/5 bg-white p-6 transition hover:shadow-elegant"
          >
            <h3 className="font-bold text-foreground">Gérer les utilisateurs</h3>
            <p className="mt-1 text-sm text-foreground/60">Voir tous les comptes clients et freelances.</p>
          </a>
          <a
            href="/admin/services"
            className="rounded-2xl border border-black/5 bg-white p-6 transition hover:shadow-elegant"
          >
            <h3 className="font-bold text-foreground">Modérer les services</h3>
            <p className="mt-1 text-sm text-foreground/60">Voir tous les services publiés sur la plateforme.</p>
          </a>
        </div>
      </div>
    </>
  );
}
