import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "FREELANCE") {
    return NextResponse.json({ erreur: "Non autorisé." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { titre, description, categorieId, delaiJours, revisions, packages } = body as {
      titre: string;
      description: string;
      categorieId: string;
      delaiJours: number;
      revisions: number;
      packages: { type: "BASIQUE" | "STANDARD" | "PREMIUM"; nom: string; description: string; prix: number; delaiJours: number; revisions: number }[];
    };

    if (!titre || !description || !categorieId || !packages?.length) {
      return NextResponse.json({ erreur: "Champs obligatoires manquants." }, { status: 400 });
    }

    const service = await prisma.service.create({
      data: {
        titre,
        description,
        categorieId,
        delaiJours: Number(delaiJours) || 1,
        revisions: Number(revisions) || 1,
        statut: "ACTIF",
        freelanceId: session.user.id,
        images: [],
        tags: [],
        packages: {
          create: packages.map((p) => ({
            type: p.type,
            nom: p.nom,
            description: p.description,
            prix: Number(p.prix),
            delaiJours: Number(p.delaiJours) || 1,
            revisions: Number(p.revisions) || 1,
            optionsIncluses: [],
          })),
        },
      },
      include: { packages: true },
    });

    return NextResponse.json({ service }, { status: 201 });
  } catch (erreur) {
    console.error("Erreur création service :", erreur);
    return NextResponse.json({ erreur: "Une erreur est survenue." }, { status: 500 });
  }
}
