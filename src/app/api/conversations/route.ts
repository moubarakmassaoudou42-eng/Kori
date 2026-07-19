import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Liste les conversations de la personne connectée
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ erreur: "Non autorisé." }, { status: 401 });
  }

  const conversations = await prisma.conversation.findMany({
    where: {
      OR: [{ participantAId: session.user.id }, { participantBId: session.user.id }],
    },
    include: {
      participantA: true,
      participantB: true,
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: { updatedAt: "desc" },
  });

  const resultat = conversations.map((conv) => {
    const autre = conv.participantAId === session.user.id ? conv.participantB : conv.participantA;
    return {
      id: conv.id,
      autre: { id: autre.id, nom: `${autre.prenom} ${autre.nom}`, initiales: `${autre.prenom[0]}${autre.nom[0]}` },
      dernierMessage: conv.messages[0]?.contenu ?? "",
      derniereActivite: conv.updatedAt,
    };
  });

  return NextResponse.json({ conversations: resultat });
}

// Crée (ou récupère) une conversation avec un autre utilisateur
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ erreur: "Non autorisé." }, { status: 401 });
  }

  const { destinataireId } = (await request.json()) as { destinataireId: string };
  if (!destinataireId || destinataireId === session.user.id) {
    return NextResponse.json({ erreur: "Destinataire invalide." }, { status: 400 });
  }

  const [a, b] = [session.user.id, destinataireId].sort();

  const conversation = await prisma.conversation.upsert({
    where: { participantAId_participantBId: { participantAId: a, participantBId: b } },
    update: {},
    create: { participantAId: a, participantBId: b },
  });

  return NextResponse.json({ conversation });
}
