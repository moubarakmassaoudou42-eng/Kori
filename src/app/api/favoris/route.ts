import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "CLIENT") {
    return NextResponse.json({ erreur: "Non autorisé." }, { status: 401 });
  }

  const { serviceId } = (await request.json()) as { serviceId: string };

  const existant = await prisma.favori.findUnique({
    where: { clientId_serviceId: { clientId: session.user.id, serviceId } },
  });

  if (existant) {
    await prisma.favori.delete({ where: { id: existant.id } });
    return NextResponse.json({ favori: false });
  }

  await prisma.favori.create({
    data: { clientId: session.user.id, serviceId },
  });
  return NextResponse.json({ favori: true });
}
