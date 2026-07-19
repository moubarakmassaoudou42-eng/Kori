import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function genererReference() {
  return `CMD-${Math.floor(1000 + Math.random() * 9000)}`;
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "CLIENT") {
    return NextResponse.json({ erreur: "Seul un compte client peut passer commande." }, { status: 401 });
  }

  try {
    const { packageId, instructions } = (await request.json()) as {
      packageId: string;
      instructions?: string;
    };

    const pack = await prisma.package.findUnique({
      where: { id: packageId },
      include: { service: true },
    });

    if (!pack) {
      return NextResponse.json({ erreur: "Package introuvable." }, { status: 404 });
    }
    if (pack.service.freelanceId === session.user.id) {
      return NextResponse.json({ erreur: "Vous ne pouvez pas commander votre propre service." }, { status: 400 });
    }

    const dateEcheance = new Date();
    dateEcheance.setDate(dateEcheance.getDate() + pack.delaiJours);

    const commission = Math.round(pack.prix * 0.1);

    const commande = await prisma.commande.create({
      data: {
        reference: genererReference(),
        serviceId: pack.serviceId,
        packageId: pack.id,
        clientId: session.user.id,
        freelanceId: pack.service.freelanceId,
        prix: pack.prix,
        statut: "EN_ATTENTE",
        instructions,
        dateEcheance,
        paiement: {
          create: {
            clientId: session.user.id,
            montant: pack.prix,
            commission,
            methode: "AIRTEL_MONEY",
            statut: "RETENU", // simulation d'escrow : fonds retenus jusqu'à validation
            numeroFacture: `FAC-${Date.now()}`,
          },
        },
      },
    });

    return NextResponse.json({ commande }, { status: 201 });
  } catch (erreur) {
    console.error("Erreur création commande :", erreur);
    return NextResponse.json({ erreur: "Une erreur est survenue." }, { status: 500 });
  }
}
