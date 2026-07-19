import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = { title: "Politique de confidentialité" };

export default function ConfidentialitePage() {
  return (
    <>
      <Header />
      <main className="bg-cream">
        <section className="mx-auto max-w-3xl px-6 py-12">
          <h1 className="text-3xl font-bold text-primary">Politique de confidentialité</h1>
          <p className="mt-2 text-sm text-foreground/50">Dernière mise à jour : à compléter</p>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground/70">
            <p>
              ⚠️ Ceci est un contenu générique de démonstration, à remplacer par une vraie
              politique de confidentialité avant tout lancement public.
            </p>
            <section>
              <h2 className="font-semibold text-foreground">1. Données collectées</h2>
              <p className="mt-1">
                Nom, prénom, adresse e-mail, et informations liées à l&apos;utilisation de la
                plateforme (commandes, messages, avis).
              </p>
            </section>
            <section>
              <h2 className="font-semibold text-foreground">2. Utilisation des données</h2>
              <p className="mt-1">
                Vos données sont utilisées pour faire fonctionner la plateforme (comptes,
                commandes, messagerie) et ne sont jamais vendues à des tiers.
              </p>
            </section>
            <section>
              <h2 className="font-semibold text-foreground">3. Sécurité</h2>
              <p className="mt-1">
                Les mots de passe sont chiffrés et jamais stockés en clair. Les paiements
                transitent par des prestataires sécurisés.
              </p>
            </section>
            <section>
              <h2 className="font-semibold text-foreground">4. Vos droits</h2>
              <p className="mt-1">
                Vous pouvez demander la suppression de votre compte et de vos données à tout
                moment en contactant le support.
              </p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
