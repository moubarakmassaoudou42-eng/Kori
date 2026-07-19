import { Star } from "lucide-react";
import { servicesPopulaires, toutesLesCategories } from "@/lib/data-demo";

function formatFCFA(montant: number) {
  return new Intl.NumberFormat("fr-FR").format(montant) + " FCFA";
}

function nomCategorie(id: string) {
  return toutesLesCategories.find((c) => c.id === id)?.nom ?? "";
}

export default function PopularServices() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">Services populaires 🔥</h2>
        <a href="/services" className="text-sm font-semibold text-accent hover:underline">
          Voir tous les services →
        </a>
      </div>
      <p className="mt-1 text-sm text-foreground/60">
        Les prestations les plus demandées, pour trouver rapidement ce dont vous avez besoin.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {servicesPopulaires.map((service) => (
          <a
            key={service.id}
            href={`/services/${service.id}`}
            className="group flex flex-col rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-elegant"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-2xl">
              {service.emoji}
            </span>
            <h3 className="mt-3 font-semibold leading-snug text-foreground group-hover:text-primary">
              {service.titre}
            </h3>
            <p className="mt-1 text-xs text-foreground/50">{nomCategorie(service.categorie)}</p>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-foreground/60">
                À partir de{" "}
                <span className="font-bold text-primary">
                  {formatFCFA(service.prixDepart)}
                </span>
              </span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-medium">{service.note}</span>
              <span className="text-foreground/40">({service.nombreAvis})</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
