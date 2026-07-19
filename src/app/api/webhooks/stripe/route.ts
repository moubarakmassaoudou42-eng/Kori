import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json({ erreur: "Stripe n'est pas configuré." }, { status: 501 });
  }

  const signature = request.headers.get("stripe-signature");
  const corps = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      corps,
      signature ?? "",
      process.env.STRIPE_WEBHOOK_SECRET ?? ""
    );
  } catch (erreur) {
    console.error("Signature webhook Stripe invalide :", erreur);
    return NextResponse.json({ erreur: "Signature invalide." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const checkoutSession = event.data.object as Stripe.Checkout.Session;
    const commandeId = checkoutSession.metadata?.commandeId;

    if (commandeId) {
      const commande = await prisma.commande.findUnique({
        where: { id: commandeId },
        include: { paiement: true },
      });

      if (commande?.paiement) {
        await prisma.paiement.update({
          where: { id: commande.paiement.id },
          data: { statut: "RETENU", referenceStripe: checkoutSession.id },
        });
      }
    }
  }

  return NextResponse.json({ recu: true });
}
