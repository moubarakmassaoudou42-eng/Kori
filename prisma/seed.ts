import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Même contenu que src/lib/data-demo.ts, dupliqué ici volontairement :
// ce fichier tourne côté script Node (hors Next.js) et doit rester autonome.
const categories = [
  { id: "cv-bureau", nom: "Business & Bureau", couleur: "#DCFCE7", sousCategories: ["CV & Lettre de motivation", "Word", "Excel", "PowerPoint", "Saisie de données", "Assistance virtuelle", "Recherche Internet", "Comptabilité"] },
  { id: "design-canva", nom: "Design & Création", couleur: "#FCE7F3", sousCategories: ["Canva", "Logo", "Flyers", "Affiches", "Cartes de visite", "Présentations", "UI/UX Design", "Illustration"] },
  { id: "dev-web", nom: "Développement", couleur: "#DBEAFE", sousCategories: ["Site Web", "E-commerce", "Application mobile", "Développement logiciel", "WordPress", "Maintenance de site", "Débogage"] },
  { id: "reseaux-sociaux", nom: "Réseaux Sociaux", couleur: "#EDE9FE", sousCategories: ["Facebook", "Instagram", "TikTok", "Community Management", "Création de contenu", "Publicité Meta", "Stratégie digitale"] },
  { id: "redaction", nom: "Rédaction", couleur: "#FEF9C3", sousCategories: ["Rédaction d'articles", "Correction de texte", "Relecture", "Copywriting", "Rédaction académique", "Description de produits"] },
  { id: "traduction", nom: "Traduction", couleur: "#FFE4E6", sousCategories: ["Français ↔ Anglais", "Français ↔ Arabe", "Anglais ↔ Arabe", "Transcription", "Sous-titrage"] },
  { id: "photo-video", nom: "Photo & Vidéo", couleur: "#E0F2FE", sousCategories: ["Montage vidéo", "Motion Design", "Miniatures YouTube", "Photographie", "Retouche photo", "Voix off"] },
  { id: "ia-automatisation", nom: "IA & Automatisation", couleur: "#E0E7FF", sousCategories: ["Prompt Engineering", "ChatGPT", "Automatisation", "Création de chatbots", "Analyse de données"] },
  { id: "marketing", nom: "Marketing Digital", couleur: "#FFEDD5", sousCategories: ["Marketing digital", "SEO", "Email marketing", "Google Ads", "Facebook Ads", "Études de marché"] },
  { id: "formation", nom: "Formation", couleur: "#D1FAE5", sousCategories: ["Cours particuliers", "Mathématiques", "Français", "Anglais", "Informatique", "Économie", "Coaching"] },
  { id: "audio", nom: "Audio", couleur: "#FCE7F3", sousCategories: ["Montage audio", "Podcast", "Doublage", "Mixage"] },
  { id: "finance", nom: "Finance", couleur: "#F1F5F0", sousCategories: ["Analyse financière", "Business Plan", "Budgets", "Tableaux de bord Excel", "Conseil en gestion"] },
];

async function main() {
  console.log("🌱 Démarrage du seed...");

  for (const [index, cat] of categories.entries()) {
    await prisma.categorie.upsert({
      where: { id: cat.id },
      update: { nom: cat.nom, couleur: cat.couleur, ordre: index },
      create: {
        id: cat.id,
        nom: cat.nom,
        couleur: cat.couleur,
        ordre: index,
        sousCategories: {
          create: cat.sousCategories.map((nom) => ({ nom })),
        },
      },
    });
    console.log(`  ✓ Catégorie "${cat.nom}" (${cat.sousCategories.length} sous-catégories)`);
  }

  console.log("✅ Seed terminé avec succès.");
}

main()
  .catch((e) => {
    console.error("❌ Erreur pendant le seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
