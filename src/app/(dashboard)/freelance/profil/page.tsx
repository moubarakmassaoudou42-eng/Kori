"use client";

import { useState } from "react";
import { Camera } from "lucide-react";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

export default function ProfilFreelancePage() {
  const [competences, setCompetences] = useState(["Canva", "Design graphique", "Rédaction"]);
  const [nouvelleCompetence, setNouvelleCompetence] = useState("");

  function ajouterCompetence(e: React.FormEvent) {
    e.preventDefault();
    if (nouvelleCompetence.trim() && !competences.includes(nouvelleCompetence.trim())) {
      setCompetences([...competences, nouvelleCompetence.trim()]);
      setNouvelleCompetence("");
    }
  }

  return (
    <>
      <DashboardTopbar titre="Mon profil" />

      <div className="p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr]">
          {/* Photo de profil */}
          <div className="rounded-2xl border border-black/5 bg-white p-6 text-center">
            <div className="relative mx-auto h-28 w-28">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary-light text-3xl font-bold text-primary">
                MB
              </div>
              <button
                className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-elegant hover:bg-accent-dark"
                aria-label="Changer la photo"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-4 font-semibold text-foreground">Moubarak B.</p>
            <p className="text-sm text-foreground/50">Design & Canva</p>
          </div>

          {/* Formulaire d'informations */}
          <div className="rounded-2xl border border-black/5 bg-white p-6">
            <h2 className="font-bold text-foreground">Informations professionnelles</h2>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Prénom</label>
                <input
                  defaultValue="Moubarak"
                  className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Nom</label>
                <input
                  defaultValue="B."
                  className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-foreground">Titre professionnel</label>
              <input
                defaultValue="Designer graphique & spécialiste Canva"
                className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-foreground">Description</label>
              <textarea
                rows={4}
                defaultValue="Designer passionné avec 3 ans d'expérience dans la création de logos, affiches et supports visuels pour les entreprises locales."
                className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-foreground">Compétences</label>
              <div className="flex flex-wrap gap-2">
                {competences.map((c) => (
                  <span
                    key={c}
                    className="flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1.5 text-xs font-medium text-primary"
                  >
                    {c}
                    <button
                      onClick={() => setCompetences(competences.filter((x) => x !== c))}
                      className="text-primary/50 hover:text-primary"
                      aria-label={`Retirer ${c}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <form onSubmit={ajouterCompetence} className="mt-2 flex gap-2">
                <input
                  value={nouvelleCompetence}
                  onChange={(e) => setNouvelleCompetence(e.target.value)}
                  placeholder="Ajouter une compétence"
                  className="flex-1 rounded-xl border border-border bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-muted px-4 py-2 text-sm font-medium text-foreground/70 hover:bg-primary-light hover:text-primary"
                >
                  Ajouter
                </button>
              </form>
            </div>

            <button className="mt-6 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:bg-primary-dark">
              Enregistrer les modifications
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
