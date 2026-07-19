import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = { title: "Conditions d'utilisation" };

export default function ConditionsPage() {
  return (
    <>
      <Header />
      <main className="bg-cream">
        <section className="mx-auto max-w-3xl px-6 py-12">
          <h1 className="text-3xl font-bold text-primary">Conditions d&apos;utilisation</h1>
          <p className="mt-2 text-sm text-foreground/50">Dernière mise à jour : à compléter</p>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground/70">
            <p>
              ⚠️ Ceci est un contenu générique de démonstration. Avant le lancement public de
              Kori, ce texte doit être remplacé par de vraies conditions d&apos;utilisation,
              idéalement relues par un professionnel du droit adapté à votre pays.
            </p>
            <section>
              <h2 className="font-semibold text-foreground">1. Objet</h2>
              <p className="mt-1">
                Kori est une plateforme mettant en relation des clients et des freelances pour
                la réalisation de prestations de services.
              </p>
            </section>
            <section>
              <h2 className="font-semibold text-foreground">2. Comptes utilisateurs</h2>
              <p className="mt-1">
                Chaque utilisateur est responsable de la confidentialité de ses identifiants de
                connexion et des activités réalisées depuis son compte.
              </p>
            </section>
            <section>
              <h2 className="font-semibold text-foreground">3. Paiements et commissions</h2>
              <p className="mt-1">
                Les paiements transitent par la plateforme, qui prélève une commission sur
                chaque transaction avant de reverser les fonds au freelance.
              </p>
            </section>
            <section>
              <h2 className="font-semibold text-foreground">4. Responsabilités</h2>
              <p className="mt-1">
                Kori agit en tant qu&apos;intermédiaire et ne saurait être tenu responsable de la
                qualité des prestations fournies par les freelances.
              </p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
