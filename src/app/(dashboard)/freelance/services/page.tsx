import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import ServiceCardFreelance from "@/components/dashboard/ServiceCardFreelance";

export default async function MesServicesPage() {
  const session = await getServerSession(authOptions);

  const services = session
    ? await prisma.service.findMany({
        where: { freelanceId: session.user.id },
        include: {
          packages: { orderBy: { prix: "asc" }, take: 1 },
          _count: { select: { commandes: { where: { statut: { in: ["EN_ATTENTE", "ACCEPTEE", "EN_COURS"] } } } } },
        },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <>
      <DashboardTopbar titre="Mes services" actionLabel="Créer un service" actionHref="/freelance/services/nouveau" />

      <div className="p-6">
        {services.length === 0 ? (
          <div className="mb-6 rounded-2xl border border-dashed border-border bg-white p-10 text-center">
            <p className="font-medium text-foreground">Vous n&apos;avez pas encore de service.</p>
            <p className="mt-1 text-sm text-foreground/50">
              Créez votre premier service pour commencer à recevoir des commandes.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCardFreelance
                key={service.id}
                service={{
                  id: service.id,
                  titre: service.titre,
                  prixDepart: service.packages[0]?.prix ?? 0,
                  statut: service.statut,
                  note: service.noteMoyenne,
                  nombreAvis: service.nombreAvis,
                  vues: service.vues,
                  commandesEnCours: service._count.commandes,
                }}
              />
            ))}

            <a
              href="/freelance/services/nouveau"
              className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-white/50 text-center transition hover:border-primary hover:bg-primary-light/40"
            >
              <span className="text-3xl">➕</span>
              <span className="text-sm font-semibold text-foreground/70">Créer un nouveau service</span>
            </a>
          </div>
        )}
      </div>
    </>
  );
}
