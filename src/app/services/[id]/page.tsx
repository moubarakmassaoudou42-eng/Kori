import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { Star } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CommanderPanel from "@/components/services/CommanderPanel";
import ContacterFreelanceButton from "@/components/services/ContacterFreelanceButton";
import FavoriButton from "@/components/services/FavoriButton";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await prisma.service.findUnique({
    where: { id },
    select: { titre: true, description: true },
  });

  if (!service) return { title: "Service introuvable" };

  const descriptionCourte = service.description.slice(0, 155);

  return {
    title: service.titre,
    description: descriptionCourte,
    openGraph: {
      title: `${service.titre} | Kori`,
      description: descriptionCourte,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const service = await prisma.service.findUnique({
    where: { id },
    include: {
      freelance: true,
      categorie: true,
      packages: { orderBy: { prix: "asc" } },
      avis: { include: { client: true }, orderBy: { createdAt: "desc" }, take: 10 },
    },
  });

  if (!service || service.statut !== "ACTIF") {
    notFound();
  }

  const session = await getServerSession(authOptions);
  const favoriExistant =
    session?.user.role === "CLIENT"
      ? await prisma.favori.findUnique({
          where: { clientId_serviceId: { clientId: session.user.id, serviceId: id } },
        })
      : null;

  return (
    <>
      <Header />
      <main className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-sm text-foreground/50">{service.categorie.nom}</p>
          <h1 className="mt-1 text-3xl font-bold text-foreground">{service.titre}</h1>

          <div className="mt-3 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary">
              {service.freelance.prenom[0]}
              {service.freelance.nom[0]}
            </span>
            <span className="text-sm text-foreground/70">
              {service.freelance.prenom} {service.freelance.nom}
            </span>
            {service.nombreAvis > 0 && (
              <span className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-accent text-accent" />
                {service.noteMoyenne.toFixed(1)} ({service.nombreAvis})
              </span>
            )}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
            <div>
              <div className="rounded-2xl border border-black/5 bg-white p-6">
                <h2 className="font-bold text-foreground">Description</h2>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/70">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-black/5 bg-white p-6">
                <h2 className="font-bold text-foreground">
                  Avis ({service.nombreAvis})
                </h2>
                {service.avis.length === 0 ? (
                  <p className="mt-2 text-sm text-foreground/50">
                    Ce service n&apos;a pas encore reçu d&apos;avis.
                  </p>
                ) : (
                  <div className="mt-4 space-y-4">
                    {service.avis.map((avis) => (
                      <div key={avis.id} className="border-b border-border/60 pb-4 last:border-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-foreground">
                            {avis.client.prenom} {avis.client.nom[0]}.
                          </p>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <Star
                                key={n}
                                className={`h-3.5 w-3.5 ${n <= avis.note ? "fill-accent text-accent" : "text-border"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-foreground/60">{avis.commentaire}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <CommanderPanel
                packages={service.packages.map((p) => ({
                  id: p.id,
                  type: p.type,
                  nom: p.nom,
                  description: p.description,
                  prix: p.prix,
                  delaiJours: p.delaiJours,
                  revisions: p.revisions,
                }))}
              />
              <div className="mt-3 space-y-2">
                <ContacterFreelanceButton freelanceId={service.freelanceId} />
                <FavoriButton serviceId={service.id} estFavoriInitial={!!favoriExistant} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
