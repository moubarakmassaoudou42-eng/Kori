import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Action = "accepter" | "refuser" | "livrer" | "valider" | "demander_revision";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ erreur: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const { action } = (await request.json()) as { action: Action };

  const commande = await prisma.commande.findUnique({ where: { id } });
  if (!commande) {
    return NextResponse.json({ erreur: "Commande introuvable." }, { status: 404 });
  }

  const estFreelance = commande.freelanceId === session.user.id;
  const estClient = commande.clientId === session.user.id;
  if (!estFreelance && !estClient) {
    return NextResponse.json({ erreur: "Non autorisé." }, { status: 403 });
  }

  let nouveauStatut = commande.statut;

  if (action === "accepter" && estFreelance) nouveauStatut = "EN_COURS";
  else if (action === "refuser" && estFreelance) nouveauStatut = "ANNULEE";
  else if (action === "livrer" && estFreelance) nouveauStatut = "LIVREE";
  else if (action === "demander_revision" && estClient) nouveauStatut = "REVISION_DEMANDEE";
  else if (action === "valider" && estClient) nouveauStatut = "TERMINEE";
  else {
    return NextResponse.json({ erreur: "Action non autorisée pour ce rôle." }, { status: 403 });
  }

  const misAJour = await prisma.commande.update({
    where: { id },
    data: { statut: nouveauStatut },
  });

  // Quand le client valide, on libère les fonds au freelance (simulation d'escrow)
  if (action === "valider") {
    const paiement = await prisma.paiement.findUnique({ where: { commandeId: id } });
    if (paiement && paiement.statut === "RETENU") {
      await prisma.paiement.update({
        where: { id: paiement.id },
        data: { statut: "LIBERE" },
      });
      await prisma.user.update({
        where: { id: commande.freelanceId },
        data: { soldeDisponible: { increment: paiement.montant - paiement.commission } },
      });
    }
  }

  return NextResponse.json({ commande: misAJour });
}
