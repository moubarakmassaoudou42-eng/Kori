import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ erreur: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const { reponse } = (await request.json()) as { reponse: string };

  const avis = await prisma.avis.findUnique({ where: { id } });
  if (!avis || avis.freelanceId !== session.user.id) {
    return NextResponse.json({ erreur: "Avis introuvable." }, { status: 404 });
  }

  const misAJour = await prisma.avis.update({
    where: { id },
    data: { reponse },
  });

  return NextResponse.json({ avis: misAJour });
}
