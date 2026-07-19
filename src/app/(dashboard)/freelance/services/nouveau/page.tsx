"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import { toutesLesCategories, servicesPopulaires } from "@/lib/data-demo";
import { AlertCircle, Sparkles } from "lucide-react";

type TypePackage = "BASIQUE" | "STANDARD" | "PREMIUM";

interface PackageForm {
  type: TypePackage;
  nom: string;
  description: string;
  prix: string;
  delaiJours: string;
  revisions: string;
}

function packagesParDefaut(prixBase = 1000): PackageForm[] {
  return [
    { type: "BASIQUE", nom: "Basique", description: "", prix: String(prixBase), delaiJours: "2", revisions: "1" },
    { type: "STANDARD", nom: "Standard", description: "", prix: String(Math.round(prixBase * 2.2)), delaiJours: "3", revisions: "2" },
    { type: "PREMIUM", nom: "Premium", description: "", prix: String(Math.round(prixBase * 4)), delaiJours: "5", revisions: "3" },
  ];
}

export default function NouveauServicePage() {
  const router = useRouter();
  const [modeleChoisiId, setModeleChoisiId] = useState<string | null>(null);
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [categorieId, setCategorieId] = useState(toutesLesCategories[0].id);
  const [packages, setPackages] = useState(packagesParDefaut());
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  function choisirModele(modeleId: string) {
    const modele = servicesPopulaires.find((s) => s.id === modeleId);
    if (!modele) return;
    setModeleChoisiId(modeleId);
    setTitre(modele.titre);
    setCategorieId(modele.categorie);
    setDescription(`Je réalise : ${modele.titre.toLowerCase()}. Décrivez ici votre expérience, ce qui est inclus, et pourquoi choisir votre service.`);
    setPackages(packagesParDefaut(modele.prixDepart));
  }

  function repartirDeZero() {
    setModeleChoisiId(null);
    setTitre("");
    setDescription("");
    setCategorieId(toutesLesCategories[0].id);
    setPackages(packagesParDefaut());
  }

  function mettreAJourPackage(index: number, champ: keyof PackageForm, valeur: string) {
    setPackages((prev) => prev.map((p, i) => (i === index ? { ...p, [champ]: valeur } : p)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErreur(null);
    setChargement(true);

    try {
      const reponse = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titre,
          description,
          categorieId,
          delaiJours: packages[0].delaiJours,
          revisions: packages[0].revisions,
          packages,
        }),
      });

      const donnees = await reponse.json();
      if (!reponse.ok) {
        setErreur(donnees.erreur ?? "Une erreur est survenue.");
        setChargement(false);
        return;
      }

      router.push("/freelance/services");
      router.refresh();
    } catch {
      setErreur("Impossible de contacter le serveur.");
      setChargement(false);
    }
  }

  return (
    <>
      <DashboardTopbar titre="Créer un service" />

      <div className="p-6">
        <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
          {erreur && (
            <div className="flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {erreur}
            </div>
          )}

          <div className="rounded-2xl border border-black/5 bg-white p-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <h2 className="font-bold text-foreground">Partir d&apos;un modèle (optionnel)</h2>
            </div>
            <p className="mt-1 text-sm text-foreground/60">
              Choisissez un service déjà populaire sur Kori pour pré-remplir le titre et la
              catégorie — vous pourrez ensuite tout modifier, notamment le prix.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {servicesPopulaires.map((modele) => (
                <button
                  key={modele.id}
                  type="button"
                  onClick={() => choisirModele(modele.id)}
                  className={`flex items-center gap-2 rounded-xl border-2 p-2.5 text-left text-xs font-medium transition ${
                    modeleChoisiId === modele.id
                      ? "border-primary bg-primary-light text-primary"
                      : "border-border bg-white text-foreground/70 hover:border-primary/40"
                  }`}
                >
                  <span className="text-base">{modele.emoji}</span>
                  <span className="truncate">{modele.titre}</span>
                </button>
              ))}
            </div>

            {modeleChoisiId && (
              <button
                type="button"
                onClick={repartirDeZero}
                className="mt-3 text-xs font-semibold text-foreground/50 hover:text-foreground"
              >
                ✕ Repartir d&apos;une page vierge
              </button>
            )}
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-6">
            <h2 className="font-bold text-foreground">Informations générales</h2>

            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-foreground">Titre du service</label>
              <input
                required
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                placeholder="Ex : Je vais créer votre CV professionnel"
                className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-foreground">Description</label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez ce que vous proposez, votre expérience, ce qui est inclus..."
                className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-foreground">Catégorie</label>
              <select
                value={categorieId}
                onChange={(e) => setCategorieId(e.target.value)}
                className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none"
              >
                {toutesLesCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nom}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-6">
            <h2 className="font-bold text-foreground">Packages</h2>
            <p className="mt-1 text-sm text-foreground/60">
              Ajustez librement les prix de vos 3 formules — c&apos;est vous qui décidez.
            </p>

            <div className="mt-4 space-y-5">
              {packages.map((pack, index) => (
                <div key={pack.type} className="rounded-xl border border-border p-4">
                  <p className="mb-3 text-sm font-bold text-primary">{pack.type}</p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <input
                      required
                      placeholder="Nom du package"
                      value={pack.nom}
                      onChange={(e) => mettreAJourPackage(index, "nom", e.target.value)}
                      className="rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                    <input
                      required
                      type="number"
                      min={500}
                      placeholder="Prix (FCFA)"
                      value={pack.prix}
                      onChange={(e) => mettreAJourPackage(index, "prix", e.target.value)}
                      className="rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                    <input
                      required
                      type="number"
                      min={1}
                      placeholder="Délai (jours)"
                      value={pack.delaiJours}
                      onChange={(e) => mettreAJourPackage(index, "delaiJours", e.target.value)}
                      className="rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  </div>
                  <textarea
                    required
                    rows={2}
                    placeholder="Ce qui est inclus dans ce package"
                    value={pack.description}
                    onChange={(e) => mettreAJourPackage(index, "description", e.target.value)}
                    className="mt-3 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={chargement}
            className="w-full rounded-xl bg-accent py-3 text-sm font-semibold text-accent-foreground shadow-elegant transition hover:bg-accent-dark disabled:opacity-60"
          >
            {chargement ? "Publication..." : "Publier le service"}
          </button>
        </form>
      </div>
    </>
  );
}
