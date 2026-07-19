import { ShoppingCart, Wallet, Laptop, BadgeCheck, UserPlus, Briefcase } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = { title: "Comment ça marche" };

const etapesClient = [
  { icon: ShoppingCart, titre: "Choisissez un service", description: "Parcourez les catégories ou utilisez la recherche pour trouver le service qu'il vous faut." },
  { icon: Wallet, titre: "Passez commande", description: "Sélectionnez un package et validez votre commande en toute sécurité." },
  { icon: Laptop, titre: "Le freelance travaille", description: "Il réalise la mission dans le délai annoncé et vous livre le résultat." },
  { icon: BadgeCheck, titre: "Vous validez", description: "Vous validez le travail (ou demandez une révision), et le paiement est libéré au freelance." },
];

const etapesFreelance = [
  { icon: UserPlus, titre: "Créez votre compte", description: "Inscrivez-vous en tant que freelance en quelques secondes." },
  { icon: Briefcase, titre: "Publiez vos services", description: "Décrivez ce que vous proposez et fixez vos propres prix, avec 3 formules." },
  { icon: ShoppingCart, titre: "Recevez des commandes", description: "Les clients vous découvrent et commandent directement vos services." },
  { icon: Wallet, titre: "Soyez payé", description: "Une fois le travail validé, retirez vos gains via Mobile Money." },
];

export default function CommentCaMarchePage() {
  return (
    <>
      <Header />
      <main className="bg-cream">
        <section className="mx-auto max-w-5xl px-6 py-12">
          <h1 className="text-3xl font-bold text-primary">Comment ça marche ?</h1>
          <p className="mt-2 text-foreground/60">
            Que vous cherchiez un service ou que vous souhaitiez vendre vos compétences,
            voici comment fonctionne Kori.
          </p>

          <h2 className="mt-10 text-xl font-bold text-foreground">Vous cherchez un service</h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {etapesClient.map((e, i) => (
              <div key={e.titre} className="rounded-2xl border border-black/5 bg-white p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <e.icon className="mt-4 h-6 w-6 text-accent" />
                <h3 className="mt-3 font-semibold text-foreground">{e.titre}</h3>
                <p className="mt-1 text-sm text-foreground/60">{e.description}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-12 text-xl font-bold text-foreground">Vous voulez vendre vos services</h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {etapesFreelance.map((e, i) => (
              <div key={e.titre} className="rounded-2xl border border-black/5 bg-white p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                  {i + 1}
                </span>
                <e.icon className="mt-4 h-6 w-6 text-primary" />
                <h3 className="mt-3 font-semibold text-foreground">{e.titre}</h3>
                <p className="mt-1 text-sm text-foreground/60">{e.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-primary-light p-8 text-center">
            <p className="font-semibold text-primary">Prêt à commencer ?</p>
            <div className="mt-4 flex justify-center gap-3">
              <a href="/inscription" className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-dark">
                Créer un compte
              </a>
              <a href="/services" className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-primary hover:bg-muted">
                Parcourir les services
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
