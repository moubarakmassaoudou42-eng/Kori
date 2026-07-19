"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { MessageCircle } from "lucide-react";

export default function ContacterFreelanceButton({ freelanceId }: { freelanceId: string }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  async function contacter() {
    if (status !== "authenticated") {
      router.push("/connexion");
      return;
    }

    const reponse = await fetch("/api/conversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destinataireId: freelanceId }),
    });

    if (reponse.ok) {
      router.push(session.user.role === "FREELANCE" ? "/freelance/messages" : "/client/messages");
    }
  }

  return (
    <button
      onClick={contacter}
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
    >
      <MessageCircle className="h-4 w-4" />
      Contacter le freelance
    </button>
  );
}
