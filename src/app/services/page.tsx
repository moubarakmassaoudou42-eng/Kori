import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServicesExplorer, { type ServiceReel } from "@/components/services/ServicesExplorer";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Rechercher un service",
};

const labelNiveau: Record<string, ServiceReel["niveauVendeur"]> = {
  NOUVEAU: "Nouveau",
  CONFIRME: "Vendeur confirmé",
  TOP_VENDEUR: "Top vendeur",
};

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string; q?: string }>;
}) {
  const params = await searchParams;

  const servicesBruts = await prisma.service.findMany({
    where: { statut: "ACTIF" },
    include: {
      freelance: { select: { niveauVendeur: true } },
      packages: { orderBy: { prix: "asc" }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
  });

  const services: ServiceReel[] = servicesBruts
    .filter((s) => s.packages.length > 0)
    .map((s) => ({
      id: s.id,
      titre: s.titre,
      categorie: s.categorieId,
      prixDepart: s.packages[0].prix,
      note: s.noteMoyenne,
      nombreAvis: s.nombreAvis,
      delaiJours: s.delaiJours,
      niveauVendeur: labelNiveau[s.freelance.niveauVendeur] ?? "Nouveau",
    }));

  return (
    <>
      <Header />
      <main className="bg-cream">
        <section className="mx-auto max-w-7xl px-6 py-12">
          <h1 className="text-3xl font-bold text-primary">Rechercher un service</h1>
          <p className="mt-2 text-foreground/60">
            Filtrez par catégorie, prix, note ou délai pour trouver le
            freelance qu&apos;il vous faut.
          </p>

          <div className="mt-8">
            {services.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center text-foreground/50">
                Aucun service publié pour le moment. Revenez bientôt !
              </div>
            ) : (
              <ServicesExplorer
                services={services}
                categorieInitiale={params.categorie}
                rechercheInitiale={params.q}
              />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
