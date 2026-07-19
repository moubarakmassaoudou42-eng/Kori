"use client";

import { useState } from "react";
import { Wallet, ArrowDownToLine, Clock } from "lucide-react";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

function formatFCFA(montant: number) {
  return new Intl.NumberFormat("fr-FR").format(montant) + " FCFA";
}

const historiqueRetraits = [
  { id: "RET-004", montant: 40000, date: "28 juin 2026", statut: "Payé" },
  { id: "RET-003", montant: 25000, date: "14 juin 2026", statut: "Payé" },
  { id: "RET-002", montant: 60000, date: "30 mai 2026", statut: "Payé" },
];

export default function RevenusPage() {
  const [montant, setMontant] = useState("");
  const [demandeEnvoyee, setDemandeEnvoyee] = useState(false);
  const soldeDisponible = 87000;

  function handleRetrait(e: React.FormEvent) {
    e.preventDefault();
    // Le vrai traitement (validation + intégration Stripe/Mobile Money)
    // sera branché à l'étape "Paiements"
    setDemandeEnvoyee(true);
    setMontant("");
    setTimeout(() => setDemandeEnvoyee(false), 3000);
  }

  return (
    <>
      <DashboardTopbar titre="Revenus" />

      <div className="p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-black/5 bg-primary p-5 text-primary-foreground">
            <Wallet className="h-6 w-6 text-accent" />
            <p className="mt-3 text-2xl font-extrabold">{formatFCFA(soldeDisponible)}</p>
            <p className="text-sm text-primary-foreground/80">Solde disponible</p>
          </div>
          <div className="rounded-2xl border border-black/5 bg-white p-5">
            <Clock className="h-6 w-6 text-accent" />
            <p className="mt-3 text-2xl font-extrabold text-foreground">{formatFCFA(12000)}</p>
            <p className="text-sm text-foreground/60">En attente de livraison validée</p>
          </div>
          <div className="rounded-2xl border border-black/5 bg-white p-5">
            <ArrowDownToLine className="h-6 w-6 text-accent" />
            <p className="mt-3 text-2xl font-extrabold text-foreground">{formatFCFA(125000)}</p>
            <p className="text-sm text-foreground/60">Total retiré depuis le début</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.4fr]">
          {/* Demande de retrait */}
          <div className="rounded-2xl border border-black/5 bg-white p-6">
            <h2 className="font-bold text-foreground">Demander un retrait</h2>
            <p className="mt-1 text-sm text-foreground/60">
              Retrait via Mobile Money (Airtel Money, Orange Money) ou virement bancaire.
            </p>

            <form onSubmit={handleRetrait} className="mt-4 space-y-4">
              <div>
                <label htmlFor="montant" className="mb-1.5 block text-sm font-medium text-foreground">
                  Montant à retirer
                </label>
                <input
                  id="montant"
                  type="number"
                  required
                  min={1000}
                  max={soldeDisponible}
                  value={montant}
                  onChange={(e) => setMontant(e.target.value)}
                  placeholder={`Max ${formatFCFA(soldeDisponible)}`}
                  className="w-full rounded-xl border border-border bg-white px-3 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label htmlFor="methode" className="mb-1.5 block text-sm font-medium text-foreground">
                  Moyen de retrait
                </label>
                <select
                  id="methode"
                  className="w-full rounded-xl border border-border bg-white px-3 py-3 text-sm outline-none"
                >
                  <option>Airtel Money</option>
                  <option>Orange Money</option>
                  <option>Virement bancaire</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-accent py-3 text-sm font-semibold text-accent-foreground shadow-elegant transition hover:bg-accent-dark"
              >
                Envoyer la demande
              </button>

              {demandeEnvoyee && (
                <p className="rounded-lg bg-primary-light px-3 py-2 text-sm text-primary">
                  ✓ Demande envoyée ! Elle sera traitée sous 24 à 48h.
                </p>
              )}
            </form>
          </div>

          {/* Historique */}
          <div className="rounded-2xl border border-black/5 bg-white p-6">
            <h2 className="font-bold text-foreground">Historique des retraits</h2>
            <div className="mt-4 space-y-3">
              {historiqueRetraits.map((r) => (
                <div key={r.id} className="flex items-center justify-between border-b border-border/60 pb-3 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{r.id}</p>
                    <p className="text-xs text-foreground/50">{r.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{formatFCFA(r.montant)}</p>
                    <span className="text-xs font-medium text-primary">{r.statut}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
