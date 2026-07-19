import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import { prisma } from "@/lib/prisma";

export default async function AdminUtilisateursPage() {
  const utilisateurs = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    select: {
      id: true,
      prenom: true,
      nom: true,
      email: true,
      role: true,
      niveauVendeur: true,
      createdAt: true,
    },
  });

  const roleStyles: Record<string, string> = {
    CLIENT: "bg-blue-100 text-blue-700",
    FREELANCE: "bg-primary-light text-primary",
    ADMIN: "bg-accent-light text-accent-dark",
  };

  return (
    <>
      <DashboardTopbar titre="Utilisateurs" />

      <div className="p-6">
        <div className="rounded-2xl border border-black/5 bg-white p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-foreground/50">
                  <th className="pb-3 font-medium">Nom</th>
                  <th className="pb-3 font-medium">E-mail</th>
                  <th className="pb-3 font-medium">Rôle</th>
                  <th className="pb-3 font-medium">Inscrit le</th>
                </tr>
              </thead>
              <tbody>
                {utilisateurs.map((u) => (
                  <tr key={u.id} className="border-b border-border/60 last:border-0">
                    <td className="py-3 font-medium text-foreground">
                      {u.prenom} {u.nom}
                    </td>
                    <td className="py-3 text-foreground/70">{u.email}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${roleStyles[u.role]}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 text-foreground/60">
                      {new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(u.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {utilisateurs.length === 0 && (
            <p className="py-8 text-center text-foreground/50">Aucun utilisateur pour le moment.</p>
          )}
        </div>
      </div>
    </>
  );
}
