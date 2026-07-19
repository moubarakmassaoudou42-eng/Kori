import { ShoppingCart, Wallet, Laptop, BadgeCheck } from "lucide-react";

const etapes = [
  {
    numero: 1,
    icon: ShoppingCart,
    titre: "Choisissez un service",
    description: "Trouvez le service qu'il vous faut parmi des centaines d'offres.",
  },
  {
    numero: 2,
    icon: Wallet,
    titre: "Passez commande",
    description: "Payez en toute sécurité via Mobile Money ou carte bancaire.",
  },
  {
    numero: 3,
    icon: Laptop,
    titre: "Le freelance travaille",
    description: "Il réalise la mission et vous livre dans les délais convenus.",
  },
  {
    numero: 4,
    icon: BadgeCheck,
    titre: "Vous validez et payez",
    description: "Vous validez le travail et le paiement est libéré au freelance.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h2 className="text-2xl font-bold text-primary">Comment ça marche ?</h2>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {etapes.map((etape) => (
          <div key={etape.numero} className="relative rounded-2xl border border-black/5 bg-white p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {etape.numero}
            </span>
            <etape.icon className="mt-4 h-7 w-7 text-accent" />
            <h3 className="mt-3 font-semibold text-foreground">{etape.titre}</h3>
            <p className="mt-1 text-sm text-foreground/60">{etape.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
