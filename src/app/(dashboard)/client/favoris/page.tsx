import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import FavoriCarteClient from "@/components/dashboard/FavoriCarteClient";
import { Heart } from "lucide-react";

export default async function FavorisPage() {
  const session = await getServerSession(authOptions);

  const favoris = session
    ? await prisma.favori.findMany({
        where: { clientId: session.user.id },
        include: {
          service: {
            include: {
              freelance: { select: { prenom: true, nom: true } },
              packages: { orderBy: { prix: "asc" }, take: 1 },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <>
      <DashboardTopbar titre="Mes favoris" />

      <div className="p-6">
        {favoris.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center">
            <Heart className="mx-auto h-8 w-8 text-foreground/30" />
            <p className="mt-3 font-medium text-foreground">Aucun favori pour le moment.</p>
            <a href="/services" className="mt-2 inline-block text-sm font-semibold text-accent hover:underline">
              Parcourir les services
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {favoris
              .filter((f) => f.service.packages.length > 0)
              .map((f) => (
                <FavoriCarteClient
                  key={f.id}
                  favori={{
                    serviceId: f.service.id,
                    titre: f.service.titre,
                    freelanceNom: `${f.service.freelance.prenom} ${f.service.freelance.nom}`,
                    prixDepart: f.service.packages[0].prix,
                    note: f.service.noteMoyenne,
                  }}
                />
              ))}
          </div>
        )}
      </div>
    </>
  );
}
