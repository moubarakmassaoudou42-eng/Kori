import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function verifierAcces(conversationId: string, userId: string) {
  const conversation = await prisma.conversation.findUnique({ where: { id: conversationId } });
  if (!conversation) return null;
  if (conversation.participantAId !== userId && conversation.participantBId !== userId) return null;
  return conversation;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ erreur: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const conversation = await verifierAcces(id, session.user.id);
  if (!conversation) {
    return NextResponse.json({ erreur: "Conversation introuvable." }, { status: 404 });
  }

  const messages = await prisma.message.findMany({
    where: { conversationId: id },
    orderBy: { createdAt: "asc" },
  });

  // Marque comme lus les messages reçus (pas envoyés par la personne connectée)
  await prisma.message.updateMany({
    where: { conversationId: id, expediteurId: { not: session.user.id }, lu: false },
    data: { lu: true },
  });

  return NextResponse.json({
    messages: messages.map((m) => ({
      id: m.id,
      contenu: m.contenu,
      expediteurId: m.expediteurId,
      estMoi: m.expediteurId === session.user.id,
      createdAt: m.createdAt,
    })),
  });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ erreur: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const conversation = await verifierAcces(id, session.user.id);
  if (!conversation) {
    return NextResponse.json({ erreur: "Conversation introuvable." }, { status: 404 });
  }

  const { contenu } = (await request.json()) as { contenu: string };
  if (!contenu?.trim()) {
    return NextResponse.json({ erreur: "Message vide." }, { status: 400 });
  }

  const message = await prisma.message.create({
    data: {
      conversationId: id,
      expediteurId: session.user.id,
      contenu: contenu.trim(),
    },
  });

  await prisma.conversation.update({
    where: { id },
    data: { updatedAt: new Date() },
  });

  return NextResponse.json({ message }, { status: 201 });
}
