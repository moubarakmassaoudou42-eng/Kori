"use client";

import { useMemo, useState } from "react";
import { Search, Star, SlidersHorizontal, X } from "lucide-react";
import { toutesLesCategories } from "@/lib/data-demo";

function formatFCFA(montant: number) {
  return new Intl.NumberFormat("fr-FR").format(montant) + " FCFA";
}

type Tri = "pertinence" | "prix-asc" | "prix-desc" | "note";

export interface ServiceReel {
  id: string;
  titre: string;
  categorie: string;
  prixDepart: number;
  note: number;
  nombreAvis: number;
  delaiJours: number;
  niveauVendeur: "Nouveau" | "Vendeur confirmé" | "Top vendeur";
}

export default function ServicesExplorer({
  services,
  categorieInitiale,
  rechercheInitiale,
}: {
  services: ServiceReel[];
  categorieInitiale?: string;
  rechercheInitiale?: string;
}) {
  const [recherche, setRecherche] = useState(rechercheInitiale ?? "");
  const [categorie, setCategorie] = useState(categorieInitiale ?? "");
  const [prixMax, setPrixMax] = useState(30000);
  const [noteMin, setNoteMin] = useState(0);
  const [topVendeurSeulement, setTopVendeurSeulement] = useState(false);
  const [tri, setTri] = useState<Tri>("pertinence");
  const [filtresOuverts, setFiltresOuverts] = useState(false);

  const resultats = useMemo(() => {
    let liste = services.filter((s) => {
      if (categorie && s.categorie !== categorie) return false;
      if (s.prixDepart > prixMax) return false;
      if (s.note < noteMin) return false;
      if (topVendeurSeulement && s.niveauVendeur !== "Top vendeur") return false;
      if (recherche.trim()) {
        const q = recherche.toLowerCase();
        if (!s.titre.toLowerCase().includes(q)) return false;
      }
      return true;
    });

    if (tri === "prix-asc") liste = [...liste].sort((a, b) => a.prixDepart - b.prixDepart);
    if (tri === "prix-desc") liste = [...liste].sort((a, b) => b.prixDepart - a.prixDepart);
    if (tri === "note") liste = [...liste].sort((a, b) => b.note - a.note);

    return liste;
  }, [services, recherche, categorie, prixMax, noteMin, topVendeurSeulement, tri]);

  function reinitialiser() {
    setRecherche("");
    setCategorie("");
    setPrixMax(30000);
    setNoteMin(0);
    setTopVendeurSeulement(false);
    setTri("pertinence");
  }

  return (
    <div>
      {/* Barre de recherche */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
          <input
            type="text"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher un service (ex : logo, CV, traduction...)"
            className="w-full rounded-xl border border-border bg-white py-3 pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <button
          onClick={() => setFiltresOuverts((v) => !v)}
          className="flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-foreground sm:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtres
        </button>
        <select
          value={tri}
          onChange={(e) => setTri(e.target.value as Tri)}
          className="rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-foreground/80 outline-none"
        >
          <option value="pertinence">Pertinence</option>
          <option value="prix-asc">Prix croissant</option>
          <option value="prix-desc">Prix décroissant</option>
          <option value="note">Mieux notés</option>
        </select>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        {/* Filtres */}
        <aside className={`${filtresOuverts ? "block" : "hidden"} lg:block`}>
          <div className="rounded-2xl border border-black/5 bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Filtres</h3>
              <button onClick={reinitialiser} className="text-xs font-medium text-accent hover:underline">
                Réinitialiser
              </button>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-sm font-medium text-foreground">Catégorie</p>
              <select
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none"
              >
                <option value="">Toutes catégories</option>
                {toutesLesCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nom}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-sm font-medium text-foreground">
                Prix maximum : <span className="text-primary">{formatFCFA(prixMax)}</span>
              </p>
              <input
                type="range"
                min={1000}
                max={30000}
                step={500}
                value={prixMax}
                onChange={(e) => setPrixMax(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div className="mt-5">
              <p className="mb-2 text-sm font-medium text-foreground">Note minimum</p>
              <div className="flex gap-2">
                {[0, 4, 4.5, 4.8].map((n) => (
                  <button
                    key={n}
                    onClick={() => setNoteMin(n)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                      noteMin === n
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground/70 hover:bg-primary-light"
                    }`}
                  >
                    {n === 0 ? "Toutes" : `${n}+`}
                  </button>
                ))}
              </div>
            </div>

            <label className="mt-5 flex items-center gap-2 text-sm text-foreground/80">
              <input
                type="checkbox"
                checked={topVendeurSeulement}
                onChange={(e) => setTopVendeurSeulement(e.target.checked)}
                className="h-4 w-4 rounded border-border text-primary"
              />
              Top vendeurs uniquement
            </label>
          </div>
        </aside>

        {/* Résultats */}
        <div>
          <p className="mb-4 text-sm text-foreground/60">
            {resultats.length} service{resultats.length > 1 ? "s" : ""} trouvé{resultats.length > 1 ? "s" : ""}
          </p>

          {resultats.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center">
              <p className="font-medium text-foreground">Aucun service ne correspond à ces critères.</p>
              <button onClick={reinitialiser} className="mt-3 flex items-center gap-1 mx-auto text-sm font-semibold text-accent hover:underline">
                <X className="h-4 w-4" />
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {resultats.map((service) => (
                <a
                  key={service.id}
                  href={`/services/${service.id}`}
                  className="group flex flex-col rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-elegant"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-2xl">
                      🛠️
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        service.niveauVendeur === "Top vendeur"
                          ? "bg-accent-light text-accent-dark"
                          : service.niveauVendeur === "Nouveau"
                          ? "bg-primary-light text-primary"
                          : "bg-muted text-foreground/60"
                      }`}
                    >
                      {service.niveauVendeur}
                    </span>
                  </div>

                  <h3 className="mt-3 font-semibold leading-snug text-foreground group-hover:text-primary">
                    {service.titre}
                  </h3>
                  <p className="mt-1 text-xs text-foreground/50">
                    Livraison en {service.delaiJours} jour{service.delaiJours > 1 ? "s" : ""}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-foreground/60">
                      À partir de{" "}
                      <span className="font-bold text-primary">{formatFCFA(service.prixDepart)}</span>
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
          )}
        </div>
      </div>
    </div>
  );
}
