import Stripe from "stripe";

// N'initialise Stripe que si la clé secrète est configurée.
// Tant que STRIPE_SECRET_KEY n'est pas renseignée, l'app continue de fonctionner
// avec le paiement simulé (escrow) déjà en place — Stripe est une option à activer plus tard.
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-12-18.acacia" as Stripe.LatestApiVersion })
  : null;
