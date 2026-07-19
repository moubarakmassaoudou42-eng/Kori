"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RepondreAvisForm({ avisId }: { avisId: string }) {
  const router = useRouter();
  const [ouvert, setOuvert] = useState(false);
  const [reponse, setReponse] = useState("");
  const [chargement, setChargement] = useState(false);

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    setChargement(true);
    const res = await fetch(`/api/avis/${avisId}/reponse`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reponse }),
    });
    if (res.ok) {
      router.refresh();
    }
    setChargement(false);
  }

  if (!ouvert) {
    return (
      <button onClick={() => setOuvert(true)} className="mt-3 text-sm font-semibold text-accent hover:underline">
        Répondre à cet avis
      </button>
    );
  }

  return (
    <form onSubmit={envoyer} className="mt-3 space-y-2">
      <textarea
        required
        rows={2}
        value={reponse}
        onChange={(e) => setReponse(e.target.value)}
        placeholder="Votre réponse..."
        className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
      />
      <button
        type="submit"
        disabled={chargement}
        className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary-dark disabled:opacity-50"
      >
        {chargement ? "Envoi..." : "Publier la réponse"}
      </button>
    </form>
  );
}
