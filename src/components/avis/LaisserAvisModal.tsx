"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, X } from "lucide-react";

export default function LaisserAvisModal({
  commandeId,
  onClose,
}: {
  commandeId: string;
  onClose: () => void;
}) {
  const router = useRouter();
  const [note, setNote] = useState(5);
  const [survol, setSurvol] = useState(0);
  const [commentaire, setCommentaire] = useState("");
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setChargement(true);
    setErreur(null);

    const reponse = await fetch("/api/avis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commandeId, note, commentaire }),
    });

    if (!reponse.ok) {
      const donnees = await reponse.json();
      setErreur(donnees.erreur ?? "Une erreur est survenue.");
      setChargement(false);
      return;
    }

    onClose();
    router.refresh();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-elegant">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-foreground">Laisser un avis</h3>
          <button onClick={onClose} aria-label="Fermer">
            <X className="h-5 w-5 text-foreground/50" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setNote(n)}
                onMouseEnter={() => setSurvol(n)}
                onMouseLeave={() => setSurvol(0)}
              >
                <Star
                  className={`h-8 w-8 ${
                    n <= (survol || note) ? "fill-accent text-accent" : "text-border"
                  }`}
                />
              </button>
            ))}
          </div>

          <textarea
            required
            rows={4}
            value={commentaire}
            onChange={(e) => setCommentaire(e.target.value)}
            placeholder="Racontez votre expérience avec ce freelance..."
            className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />

          {erreur && <p className="text-sm text-red-600">{erreur}</p>}

          <button
            type="submit"
            disabled={chargement}
            className="w-full rounded-xl bg-accent py-3 text-sm font-semibold text-accent-foreground transition hover:bg-accent-dark disabled:opacity-60"
          >
            {chargement ? "Envoi..." : "Publier l'avis"}
          </button>
        </form>
      </div>
    </div>
  );
}
