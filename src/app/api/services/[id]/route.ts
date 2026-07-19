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
  const body = await request.json();

  const service = await prisma.service.findUnique({ where: { id } });
  if (!service || service.freelanceId !== session.user.id) {
    return NextResponse.json({ erreur: "Service introuvable." }, { status: 404 });
  }

  const updated = await prisma.service.update({
    where: { id },
    data: { statut: body.statut },
  });

  return NextResponse.json({ service: updated });
}
