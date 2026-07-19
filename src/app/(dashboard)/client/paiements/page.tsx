import { Download, CreditCard } from "lucide-react";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import { facturesClient } from "@/lib/data-dashboard-client";

function formatFCFA(montant: number) {
  return new Intl.NumberFormat("fr-FR").format(montant) + " FCFA";
}

export default function PaiementsPage() {
  const totalDepense = facturesClient.reduce((total, f) => total + f.montant, 0);

  return (
    <>
      <DashboardTopbar titre="Paiements & factures" />

      <div className="p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-black/5 bg-primary p-5 text-primary-foreground">
            <CreditCard className="h-6 w-6 text-accent" />
            <p className="mt-3 text-2xl font-extrabold">{formatFCFA(totalDepense)}</p>
            <p className="text-sm text-primary-foreground/80">Total dépensé sur Kori</p>
          </div>
          <div className="rounded-2xl border border-black/5 bg-white p-5">
            <p className="text-sm font-medium text-foreground">Moyen de paiement</p>
            <p className="mt-2 text-sm text-foreground/60">Airtel Money •••• 4821</p>
            <button className="mt-3 text-sm font-semibold text-accent hover:underline">
              Modifier le moyen de paiement
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-black/5 bg-white p-6">
          <h2 className="font-bold text-foreground">Historique des factures</h2>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-foreground/50">
                  <th className="pb-3 font-medium">Facture</th>
                  <th className="pb-3 font-medium">Commande</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Montant</th>
                  <th className="pb-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {facturesClient.map((f) => (
                  <tr key={f.id} className="border-b border-border/60 last:border-0">
                    <td className="py-3 font-medium text-foreground">{f.id}</td>
                    <td className="py-3 text-foreground/70">{f.commande}</td>
                    <td className="py-3 text-foreground/60">{f.date}</td>
                    <td className="py-3 font-semibold text-primary">{formatFCFA(f.montant)}</td>
                    <td className="py-3 text-right">
                      <button className="flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">
                        <Download className="h-4 w-4" />
                        Télécharger
                      </button>
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
