import { HandHeart, Tag, Users, Truck, ShieldCheck } from "lucide-react";

const valeurs = [
  { icon: Tag, label: "Des prix accessibles" },
  { icon: Users, label: "Des talents locaux" },
  { icon: Truck, label: "Service rapide et fiable" },
  { icon: ShieldCheck, label: "Satisfaction garantie" },
];

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <HandHeart className="h-8 w-8 text-accent" />
          <div>
            <p className="font-bold">Fait par nous, pour nous.</p>
            <p className="text-sm text-primary-foreground/80">
              Soutenons le talent local ! 🧡
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          {valeurs.map((valeur) => (
            <div key={valeur.label} className="flex items-center gap-2 text-sm">
              <valeur.icon className="h-4 w-4 text-accent" />
              <span>{valeur.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-4 text-sm text-primary-foreground/70 sm:flex-row">
          <p>Paiement 100% sécurisé via Mobile Money et carte bancaire.</p>
          <p>© {new Date().getFullYear()} Kori — Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
