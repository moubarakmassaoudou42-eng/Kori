import { Wallet, Clock, ShieldCheck, TrendingUp } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = { title: "Devenir freelance" };

const atouts = [
  { icon: Wallet, titre: "Fixez vos prix", description: "Vous décidez du tarif de chacun de vos services, sans intermédiaire imposé." },
  { icon: Clock, titre: "Travaillez à votre rythme", description: "Acceptez les commandes quand vous le souhaitez, depuis chez vous." },
  { icon: ShieldCheck, titre: "Paiement sécurisé", description: "Les fonds sont retenus jusqu'à validation du client, puis versés directement à vous." },
  { icon: TrendingUp, titre: "Développez votre clientèle", description: "Construisez votre réputation grâce aux avis et gagnez en visibilité." },
];

export default function DevenirFreelancePage() {
  return (
    <>
      <Header />
      <main className="bg-cream">
        <section className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h1 className="text-4xl font-extrabold text-primary">
            Transformez vos compétences en revenus
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-foreground/60">
            Rejoignez des milliers de personnes qui vivent déjà de leur talent sur Kori :
            design, rédaction, développement, traduction, marketing et bien plus.
          </p>
          <a
            href="/inscription"
            className="mt-6 inline-block rounded-full bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground shadow-elegant transition hover:bg-accent-dark"
          >
            Devenir freelance dès maintenant
          </a>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {atouts.map((a) => (
              <div key={a.titre} className="rounded-2xl border border-black/5 bg-white p-6">
                <a.icon className="h-7 w-7 text-accent" />
                <h3 className="mt-3 font-semibold text-foreground">{a.titre}</h3>
                <p className="mt-1 text-sm text-foreground/60">{a.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
