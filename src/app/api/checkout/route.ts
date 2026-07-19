import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ erreur: "Non autorisé." }, { status: 401 });
  }

  if (!stripe) {
    return NextResponse.json(
      { erreur: "Stripe n'est pas configuré. Ajoutez STRIPE_SECRET_KEY dans .env pour activer le paiement par carte." },
      { status: 501 }
    );
  }

  const { commandeId } = (await request.json()) as { commandeId: string };

  const commande = await prisma.commande.findUnique({
    where: { id: commandeId },
    include: { service: true, paiement: true },
  });

  if (!commande || commande.clientId !== session.user.id) {
    return NextResponse.json({ erreur: "Commande introuvable." }, { status: 404 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  // XOF (FCFA) est une devise "zero-decimal" pour Stripe : le montant s'envoie tel quel, sans centimes.
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "xof",
          product_data: { name: commande.service.titre },
          unit_amount: commande.prix,
        },
        quantity: 1,
      },
    ],
    metadata: { commandeId: commande.id },
    success_url: `${appUrl}/client/commandes?paiement=succes`,
    cancel_url: `${appUrl}/client/commandes?paiement=annule`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
