import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "CLIENT") {
    return NextResponse.json({ erreur: "Non autorisé." }, { status: 401 });
  }

  const { commandeId, note, commentaire } = (await request.json()) as {
    commandeId: string;
    note: number;
    commentaire: string;
  };

  if (!commandeId || !note || note < 1 || note > 5 || !commentaire?.trim()) {
    return NextResponse.json({ erreur: "Champs invalides." }, { status: 400 });
  }

  const commande = await prisma.commande.findUnique({
    where: { id: commandeId },
    include: { avis: true },
  });

  if (!commande || commande.clientId !== session.user.id) {
    return NextResponse.json({ erreur: "Commande introuvable." }, { status: 404 });
  }
  if (commande.statut !== "TERMINEE") {
    return NextResponse.json({ erreur: "Seules les commandes terminées peuvent recevoir un avis." }, { status: 400 });
  }
  if (commande.avis) {
    return NextResponse.json({ erreur: "Un avis a déjà été laissé pour cette commande." }, { status: 409 });
  }

  const avis = await prisma.avis.create({
    data: {
      note,
      commentaire: commentaire.trim(),
      commandeId: commande.id,
      serviceId: commande.serviceId,
      clientId: commande.clientId,
      freelanceId: commande.freelanceId,
    },
  });

  // Recalcule la note moyenne et le nombre d'avis du service concerné
  const tousLesAvis = await prisma.avis.findMany({
    where: { serviceId: commande.serviceId },
    select: { note: true },
  });
  const moyenne = tousLesAvis.reduce((total, a) => total + a.note, 0) / tousLesAvis.length;

  await prisma.service.update({
    where: { id: commande.serviceId },
    data: { noteMoyenne: moyenne, nombreAvis: tousLesAvis.length },
  });

  return NextResponse.json({ avis }, { status: 201 });
}
