"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Heart } from "lucide-react";

export default function FavoriButton({
  serviceId,
  estFavoriInitial,
}: {
  serviceId: string;
  estFavoriInitial: boolean;
}) {
  const router = useRouter();
  const { status } = useSession();
  const [estFavori, setEstFavori] = useState(estFavoriInitial);
  const [chargement, setChargement] = useState(false);

  async function basculer() {
    if (status !== "authenticated") {
      router.push("/connexion");
      return;
    }
    setChargement(true);
    const reponse = await fetch("/api/favoris", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceId }),
    });
    if (reponse.ok) {
      const { favori } = await reponse.json();
      setEstFavori(favori);
      router.refresh();
    }
    setChargement(false);
  }

  return (
    <button
      onClick={basculer}
      disabled={chargement}
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted disabled:opacity-50"
    >
      <Heart className={`h-4 w-4 ${estFavori ? "fill-accent text-accent" : ""}`} />
      {estFavori ? "Dans vos favoris" : "Ajouter aux favoris"}
    </button>
  );
}
