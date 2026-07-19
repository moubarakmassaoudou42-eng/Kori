import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prenom, nom, email, password, role } = body as {
      prenom?: string;
      nom?: string;
      email?: string;
      password?: string;
      role?: "CLIENT" | "FREELANCE";
    };

    // Validation basique côté serveur (ne jamais faire confiance au frontend)
    if (!prenom || !nom || !email || !password) {
      return NextResponse.json(
        { erreur: "Tous les champs sont obligatoires." },
        { status: 400 }
      );
    }
    if (password.length < 8) {
      return NextResponse.json(
        { erreur: "Le mot de passe doit contenir au moins 8 caractères." },
        { status: 400 }
      );
    }
    if (role !== "CLIENT" && role !== "FREELANCE") {
      return NextResponse.json(
        { erreur: "Rôle invalide." },
        { status: 400 }
      );
    }

    const emailNormalise = email.toLowerCase().trim();

    const utilisateurExistant = await prisma.user.findUnique({
      where: { email: emailNormalise },
    });
    if (utilisateurExistant) {
      return NextResponse.json(
        { erreur: "Un compte existe déjà avec cette adresse e-mail." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const utilisateur = await prisma.user.create({
      data: {
        prenom,
        nom,
        email: emailNormalise,
        passwordHash,
        role,
      },
      select: { id: true, email: true, prenom: true, nom: true, role: true },
    });

    // L'envoi de l'e-mail de vérification (Resend) sera branché plus tard.
    return NextResponse.json({ utilisateur }, { status: 201 });
  } catch (erreur) {
    console.error("Erreur lors de l'inscription :", erreur);
    return NextResponse.json(
      { erreur: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
