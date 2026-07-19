"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { categoriesAccueil, toutesLesCategories } from "@/lib/data-demo";

export default function Categories() {
  const router = useRouter();
  const [categorie, setCategorie] = useState("");
  const [q, setQ] = useState("");

  function lancerRecherche(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (categorie) params.set("categorie", categorie);
    if (q.trim()) params.set("q", q.trim());
    router.push(`/services${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">Parcourir par catégories</h2>
        <a href="/categories" className="text-sm font-semibold text-accent hover:underline">
          Voir toutes les catégories →
        </a>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
        {categoriesAccueil.map((cat) => (
          <a
            key={cat.id}
            href={`/services?categorie=${cat.id}`}
            className="flex flex-col items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-elegant"
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{ backgroundColor: cat.couleur }}
            >
              <cat.icon className="h-6 w-6 text-primary" strokeWidth={2} />
            </span>
            <span className="text-sm font-medium text-foreground/80">{cat.nom}</span>
          </a>
        ))}
      </div>

      <form
        onSubmit={lancerRecherche}
        className="mt-8 flex items-center gap-2 rounded-2xl border-2 border-primary bg-white p-2 shadow-elegant"
      >
        <select
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
          className="rounded-xl bg-muted px-4 py-3 text-sm font-medium text-foreground/70 outline-none"
        >
          <option value="">Toutes catégories</option>
          {toutesLesCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nom}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Que cherchez-vous ? (ex : CV, traduction, affiche...)"
          className="flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-foreground/40"
        />
        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:bg-accent-dark"
        >
          <Search className="h-4 w-4" />
          Rechercher
        </button>
      </form>
    </section>
  );
}
