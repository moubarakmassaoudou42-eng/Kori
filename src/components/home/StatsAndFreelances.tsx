import { Users, CheckCircle2, Smile, ShieldCheck, Star } from "lucide-react";
import { topFreelances } from "@/lib/data-demo";

const chiffres = [
  { icon: Users, valeur: "+2 500", label: "Freelances actifs" },
  { icon: CheckCircle2, valeur: "+10 000", label: "Services réalisés" },
  { icon: Smile, valeur: "+5 000", label: "Clients satisfaits" },
  { icon: ShieldCheck, valeur: "100%", label: "Paiement sécurisé" },
];

export default function StatsAndFreelances() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-4">
      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        {/* Kori en chiffres */}
        <div className="rounded-2xl bg-primary-light p-6">
          <h3 className="text-lg font-bold text-primary">Kori en chiffres</h3>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {chiffres.map((c) => (
              <div key={c.label} className="rounded-xl bg-white p-4 text-center shadow-sm">
                <c.icon className="mx-auto h-5 w-5 text-primary" />
                <p className="mt-2 text-lg font-extrabold text-primary">{c.valeur}</p>
                <p className="text-xs text-foreground/60">{c.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top freelances */}
        <div className="rounded-2xl bg-accent-light p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-accent-dark">Top freelances</h3>
            <a href="/freelances" className="text-xs font-semibold text-accent-dark hover:underline">
              Voir le classement
            </a>
          </div>
          <ul className="mt-4 space-y-3">
            {topFreelances.map((f, i) => (
              <li key={f.id} className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
                <span className="w-5 text-center text-sm font-bold text-accent">{i + 1}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary">
                  {f.initiales}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{f.nom}</p>
                  <p className="text-xs text-foreground/50">{f.specialite}</p>
                </div>
                <span className="flex items-center gap-1 text-sm font-medium">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  {f.note}
                </span>
              </li>
            ))}
          </ul>
          <a
            href="/freelances"
            className="mt-4 block rounded-full bg-accent py-2.5 text-center text-sm font-semibold text-accent-foreground transition hover:bg-accent-dark"
          >
            Voir tous les freelances
          </a>
        </div>
      </div>
    </section>
  );
}
