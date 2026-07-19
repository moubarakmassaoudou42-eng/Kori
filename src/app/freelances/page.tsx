import { Star } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Nos freelances",
};

const labelNiveau: Record<string, string> = {
  NOUVEAU: "Nouveau",
  CONFIRME: "Vendeur confirmé",
  TOP_VENDEUR: "Top vendeur",
};

export default async function FreelancesPage() {
  const freelances = await prisma.user.findMany({
    where: { role: "FREELANCE", services: { some: { statut: "ACTIF" } } },
    include: {
      services: {
        where: { statut: "ACTIF" },
        include: { packages: { orderBy: { prix: "asc" }, take: 1 } },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Header />
      <main className="bg-cream">
        <section className="mx-auto max-w-7xl px-6 py-12">
          <h1 className="text-3xl font-bold text-primary">Nos freelances</h1>
          <p className="mt-2 text-foreground/60">
            Découvrez les talents qui proposent leurs services sur Kori.
          </p>

          {freelances.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-border bg-white p-12 text-center text-foreground/50">
              Aucun freelance actif pour le moment. Revenez bientôt !
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {freelances.map((f) => {
                const meilleurService = f.services[0];
                const noteMoyenne =
                  f.services.reduce((total, s) => total + s.noteMoyenne, 0) / (f.services.length || 1);

                return (
                  <div key={f.id} className="rounded-2xl border border-black/5 bg-white p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary">
                        {f.prenom[0]}
                        {f.nom[0]}
                      </span>
                      <div>
                        <p className="font-semibold text-foreground">
                          {f.prenom} {f.nom}
                        </p>
                        <p className="text-xs text-foreground/50">
                          {f.titreProfessionnel || labelNiveau[f.niveauVendeur]}
                        </p>
                      </div>
                    </div>

                    {f.description && (
                      <p className="mt-3 line-clamp-2 text-sm text-foreground/60">{f.description}</p>
                    )}

                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-foreground/50">
                        {f.services.length} service{f.services.length > 1 ? "s" : ""}
                      </span>
                      {noteMoyenne > 0 && (
                        <span className="flex items-center gap-1 font-medium">
                          <Star className="h-4 w-4 fill-accent text-accent" />
                          {noteMoyenne.toFixed(1)}
                        </span>
                      )}
                    </div>

                    {meilleurService && (
                      <a
                        href={`/services/${meilleurService.id}`}
                        className="mt-4 block rounded-xl bg-primary py-2 text-center text-sm font-semibold text-primary-foreground transition hover:bg-primary-dark"
                      >
                        Voir ses services
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
