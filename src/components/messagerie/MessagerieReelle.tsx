"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Send } from "lucide-react";

interface ConversationApercu {
  id: string;
  autre: { id: string; nom: string; initiales: string };
  dernierMessage: string;
  derniereActivite: string;
}

interface MessageAffiche {
  id: string;
  contenu: string | null;
  estMoi: boolean;
  createdAt: string;
}

export default function MessagerieReelle() {
  const [conversations, setConversations] = useState<ConversationApercu[]>([]);
  const [conversationActiveId, setConversationActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageAffiche[]>([]);
  const [texte, setTexte] = useState("");
  const [chargementInitial, setChargementInitial] = useState(true);
  const finDesMessagesRef = useRef<HTMLDivElement>(null);

  const chargerConversations = useCallback(async () => {
    const reponse = await fetch("/api/conversations");
    if (reponse.ok) {
      const { conversations: liste } = await reponse.json();
      setConversations(liste);
      if (!conversationActiveId && liste.length > 0) {
        setConversationActiveId(liste[0].id);
      }
    }
    setChargementInitial(false);
  }, [conversationActiveId]);

  const chargerMessages = useCallback(async (id: string) => {
    const reponse = await fetch(`/api/conversations/${id}/messages`);
    if (reponse.ok) {
      const { messages: liste } = await reponse.json();
      setMessages(liste);
    }
  }, []);

  useEffect(() => {
    chargerConversations();
    const intervalle = setInterval(chargerConversations, 8000);
    return () => clearInterval(intervalle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!conversationActiveId) return;
    chargerMessages(conversationActiveId);
    const intervalle = setInterval(() => chargerMessages(conversationActiveId), 4000);
    return () => clearInterval(intervalle);
  }, [conversationActiveId, chargerMessages]);

  useEffect(() => {
    finDesMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function envoyerMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!texte.trim() || !conversationActiveId) return;

    const contenu = texte.trim();
    setTexte("");

    const reponse = await fetch(`/api/conversations/${conversationActiveId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contenu }),
    });

    if (reponse.ok) {
      chargerMessages(conversationActiveId);
      chargerConversations();
    }
  }

  const conversationActive = conversations.find((c) => c.id === conversationActiveId);

  if (chargementInitial) {
    return <div className="p-6 text-sm text-foreground/50">Chargement des conversations...</div>;
  }

  if (conversations.length === 0) {
    return (
      <div className="p-6">
        <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center text-foreground/50">
          Aucune conversation pour le moment. Elles apparaîtront ici dès qu&apos;un échange
          aura lieu autour d&apos;une commande.
        </div>
      </div>
    );
  }

  return (
    <div className="grid h-[calc(100vh-73px)] grid-cols-1 lg:grid-cols-[300px_1fr]">
      <div className="border-r border-black/5 bg-white overflow-y-auto">
        {conversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => setConversationActiveId(conv.id)}
            className={`flex w-full items-center gap-3 border-b border-border/60 p-4 text-left transition ${
              conv.id === conversationActiveId ? "bg-primary-light" : "hover:bg-muted"
            }`}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground/70">
              {conv.autre.initiales}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">{conv.autre.nom}</p>
              <p className="truncate text-xs text-foreground/50">{conv.dernierMessage || "Nouvelle conversation"}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex flex-col bg-cream">
        {conversationActive && (
          <div className="flex items-center gap-3 border-b border-black/5 bg-white p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground/70">
              {conversationActive.autre.initiales}
            </span>
            <p className="text-sm font-semibold text-foreground">{conversationActive.autre.nom}</p>
          </div>
        )}

        <div className="flex-1 space-y-3 overflow-y-auto p-6">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`max-w-xs rounded-2xl px-4 py-2.5 text-sm ${
                m.estMoi
                  ? "ml-auto rounded-tr-sm bg-primary text-primary-foreground"
                  : "rounded-tl-sm bg-white shadow-sm"
              }`}
            >
              {m.contenu}
            </div>
          ))}
          <div ref={finDesMessagesRef} />
        </div>

        <form onSubmit={envoyerMessage} className="flex items-center gap-2 border-t border-black/5 bg-white p-4">
          <input
            type="text"
            value={texte}
            onChange={(e) => setTexte(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-1 rounded-full border border-border bg-cream px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="rounded-full bg-primary p-2.5 text-primary-foreground hover:bg-primary-dark"
            aria-label="Envoyer"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
