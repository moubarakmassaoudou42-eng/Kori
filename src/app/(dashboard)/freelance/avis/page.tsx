import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import RepondreAvisForm from "@/components/dashboard/RepondreAvisForm";
import { Star } from "lucide-react";

export default async function AvisFreelancePage() {
  const session = await getServerSession(authOptions);

  const avis = session
    ? await prisma.avis.findMany({
        where: { freelanceId: session.user.id },
        include: { client: true, service: true },
        orderBy: { createdAt: "desc" },
      })
    : [];

  const noteMoyenne = avis.length > 0 ? avis.reduce((total, a) => total + a.note, 0) / avis.length : 0;

  return (
    <>
      <DashboardTopbar titre="Avis reçus" />

      <div className="p-6">
        {avis.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center text-foreground/50">
            Vous n&apos;avez pas encore reçu d&apos;avis. Ils apparaîtront ici dès qu&apos;un
            client validera une commande.
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-6">
              <div className="text-center">
                <p className="text-3xl font-extrabold text-primary">{noteMoyenne.toFixed(1)}</p>
                <div className="mt-1 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      className={`h-4 w-4 ${n <= Math.round(noteMoyenne) ? "fill-accent text-accent" : "text-border"}`}
                    />
                  ))}
                </div>
              </div>
              <div className="h-12 w-px bg-border" />
              <p className="text-sm text-foreground/60">
                Basé sur <span className="font-semibold text-foreground">{avis.length} avis</span>
              </p>
            </div>

            <div className="space-y-4">
              {avis.map((a) => (
                <div key={a.id} className="rounded-2xl border border-black/5 bg-white p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground/70">
                        {a.client.prenom[0]}
                        {a.client.nom[0]}
                      </span>
                      <div>
                        <p className="font-semibold text-foreground">
                          {a.client.prenom} {a.client.nom}
                        </p>
                        <p className="text-xs text-foreground/50">{a.service.titre}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star key={n} className={`h-3.5 w-3.5 ${n <= a.note ? "fill-accent text-accent" : "text-border"}`} />
                      ))}
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-foreground/80">{a.commentaire}</p>

                  {a.reponse ? (
                    <div className="mt-3 rounded-xl bg-muted p-3 text-sm text-foreground/70">
                      <span className="font-semibold text-foreground">Votre réponse : </span>
                      {a.reponse}
                    </div>
                  ) : (
                    <RepondreAvisForm avisId={a.id} />
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
