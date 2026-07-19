import {
  FileText,
  Palette,
  Code2,
  Smartphone,
  PenLine,
  Languages,
  Video,
  TrendingUp,
  Bot,
  GraduationCap,
  Music,
  LineChart,
  type LucideIcon,
} from "lucide-react";

export interface Categorie {
  id: string;
  nom: string;
  icon: LucideIcon;
  couleur: string; // couleur de fond de la pastille icône
  sousCategories: string[];
}

// Toutes les catégories de Kori (visibles sur /categories)
export const toutesLesCategories: Categorie[] = [
  {
    id: "cv-bureau",
    nom: "Business & Bureau",
    icon: FileText,
    couleur: "#DCFCE7",
    sousCategories: ["CV & Lettre de motivation", "Word", "Excel", "PowerPoint", "Saisie de données", "Assistance virtuelle", "Recherche Internet", "Comptabilité"],
  },
  {
    id: "design-canva",
    nom: "Design & Création",
    icon: Palette,
    couleur: "#FCE7F3",
    sousCategories: ["Canva", "Logo", "Flyers", "Affiches", "Cartes de visite", "Présentations", "UI/UX Design", "Illustration"],
  },
  {
    id: "dev-web",
    nom: "Développement",
    icon: Code2,
    couleur: "#DBEAFE",
    sousCategories: ["Site Web", "E-commerce", "Application mobile", "Développement logiciel", "WordPress", "Maintenance de site", "Débogage"],
  },
  {
    id: "reseaux-sociaux",
    nom: "Réseaux Sociaux",
    icon: Smartphone,
    couleur: "#EDE9FE",
    sousCategories: ["Facebook", "Instagram", "TikTok", "Community Management", "Création de contenu", "Publicité Meta", "Stratégie digitale"],
  },
  {
    id: "redaction",
    nom: "Rédaction",
    icon: PenLine,
    couleur: "#FEF9C3",
    sousCategories: ["Rédaction d'articles", "Correction de texte", "Relecture", "Copywriting", "Rédaction académique", "Description de produits"],
  },
  {
    id: "traduction",
    nom: "Traduction",
    icon: Languages,
    couleur: "#FFE4E6",
    sousCategories: ["Français ↔ Anglais", "Français ↔ Arabe", "Anglais ↔ Arabe", "Transcription", "Sous-titrage"],
  },
  {
    id: "photo-video",
    nom: "Photo & Vidéo",
    icon: Video,
    couleur: "#E0F2FE",
    sousCategories: ["Montage vidéo", "Motion Design", "Miniatures YouTube", "Photographie", "Retouche photo", "Voix off"],
  },
  {
    id: "ia-automatisation",
    nom: "IA & Automatisation",
    icon: Bot,
    couleur: "#E0E7FF",
    sousCategories: ["Prompt Engineering", "ChatGPT", "Automatisation", "Création de chatbots", "Analyse de données"],
  },
  {
    id: "marketing",
    nom: "Marketing Digital",
    icon: TrendingUp,
    couleur: "#FFEDD5",
    sousCategories: ["Marketing digital", "SEO", "Email marketing", "Google Ads", "Facebook Ads", "Études de marché"],
  },
  {
    id: "formation",
    nom: "Formation",
    icon: GraduationCap,
    couleur: "#D1FAE5",
    sousCategories: ["Cours particuliers", "Mathématiques", "Français", "Anglais", "Informatique", "Économie", "Coaching"],
  },
  {
    id: "audio",
    nom: "Audio",
    icon: Music,
    couleur: "#FCE7F3",
    sousCategories: ["Montage audio", "Podcast", "Doublage", "Mixage"],
  },
  {
    id: "finance",
    nom: "Finance",
    icon: LineChart,
    couleur: "#F1F5F0",
    sousCategories: ["Analyse financière", "Business Plan", "Budgets", "Tableaux de bord Excel", "Conseil en gestion"],
  },
];

// Les 8 catégories mises en avant sur la page d'accueil (les autres restent sur /categories)
export const categoriesAccueil: Categorie[] = toutesLesCategories.slice(0, 8);

export interface ServicePopulaire {
  id: string;
  titre: string;
  categorie: string; // id de catégorie
  prixDepart: number;
  note: number;
  nombreAvis: number;
  emoji: string;
  delaiJours: number;
  niveauVendeur: "Nouveau" | "Vendeur confirmé" | "Top vendeur";
}

// Catalogue de services utilisé pour la page d'accueil ET la recherche
export const servicesPopulaires: ServicePopulaire[] = [
  { id: "cv-pro", titre: "Créer un CV professionnel", categorie: "cv-bureau", prixDepart: 2000, note: 4.8, nombreAvis: 124, emoji: "📄", delaiJours: 1, niveauVendeur: "Top vendeur" },
  { id: "logo", titre: "Concevoir un logo", categorie: "design-canva", prixDepart: 3000, note: 4.9, nombreAvis: 76, emoji: "🎨", delaiJours: 2, niveauVendeur: "Top vendeur" },
  { id: "affiche-canva", titre: "Réaliser une affiche Canva", categorie: "design-canva", prixDepart: 1500, note: 4.7, nombreAvis: 98, emoji: "🖼️", delaiJours: 1, niveauVendeur: "Vendeur confirmé" },
  { id: "traduire-document", titre: "Traduire un document", categorie: "traduction", prixDepart: 1000, note: 4.6, nombreAvis: 43, emoji: "🌍", delaiJours: 1, niveauVendeur: "Vendeur confirmé" },
  { id: "video-tiktok", titre: "Monter une vidéo TikTok", categorie: "photo-video", prixDepart: 2500, note: 4.8, nombreAvis: 54, emoji: "🎬", delaiJours: 2, niveauVendeur: "Top vendeur" },
  { id: "site-web", titre: "Créer un site web", categorie: "dev-web", prixDepart: 15000, note: 4.9, nombreAvis: 31, emoji: "💻", delaiJours: 7, niveauVendeur: "Top vendeur" },
  { id: "page-facebook", titre: "Gérer une page Facebook", categorie: "reseaux-sociaux", prixDepart: 5000, note: 4.7, nombreAvis: 65, emoji: "📱", delaiJours: 3, niveauVendeur: "Vendeur confirmé" },
  { id: "correction-texte", titre: "Corriger un texte", categorie: "redaction", prixDepart: 1000, note: 4.8, nombreAvis: 88, emoji: "✍️", delaiJours: 1, niveauVendeur: "Vendeur confirmé" },
  { id: "excel-tableau", titre: "Créer un tableau de bord Excel", categorie: "cv-bureau", prixDepart: 4000, note: 4.6, nombreAvis: 29, emoji: "📊", delaiJours: 2, niveauVendeur: "Nouveau" },
  { id: "flyer-evenement", titre: "Créer un flyer d'événement", categorie: "design-canva", prixDepart: 1500, note: 4.7, nombreAvis: 41, emoji: "🖨️", delaiJours: 1, niveauVendeur: "Nouveau" },
  { id: "site-ecommerce", titre: "Créer une boutique e-commerce", categorie: "dev-web", prixDepart: 25000, note: 4.9, nombreAvis: 18, emoji: "🛒", delaiJours: 10, niveauVendeur: "Top vendeur" },
  { id: "community-management", titre: "Gérer vos réseaux sociaux (1 mois)", categorie: "reseaux-sociaux", prixDepart: 8000, note: 4.8, nombreAvis: 22, emoji: "📅", delaiJours: 30, niveauVendeur: "Vendeur confirmé" },
  { id: "article-blog", titre: "Rédiger un article de blog SEO", categorie: "redaction", prixDepart: 2500, note: 4.7, nombreAvis: 37, emoji: "📝", delaiJours: 2, niveauVendeur: "Vendeur confirmé" },
  { id: "sous-titrage", titre: "Sous-titrer une vidéo", categorie: "traduction", prixDepart: 1500, note: 4.5, nombreAvis: 19, emoji: "🎞️", delaiJours: 1, niveauVendeur: "Nouveau" },
  { id: "chatbot-whatsapp", titre: "Créer un chatbot WhatsApp", categorie: "ia-automatisation", prixDepart: 10000, note: 4.9, nombreAvis: 12, emoji: "🤖", delaiJours: 5, niveauVendeur: "Top vendeur" },
  { id: "cours-maths", titre: "Cours particulier de mathématiques", categorie: "formation", prixDepart: 2000, note: 4.9, nombreAvis: 56, emoji: "📐", delaiJours: 1, niveauVendeur: "Top vendeur" },
  { id: "voix-off", titre: "Enregistrer une voix off", categorie: "audio", prixDepart: 3000, note: 4.6, nombreAvis: 15, emoji: "🎙️", delaiJours: 2, niveauVendeur: "Nouveau" },
  { id: "business-plan", titre: "Rédiger un business plan", categorie: "finance", prixDepart: 12000, note: 4.8, nombreAvis: 14, emoji: "📈", delaiJours: 5, niveauVendeur: "Vendeur confirmé" },
];

export interface Freelance {
  id: string;
  nom: string;
  specialite: string;
  note: number;
  initiales: string;
}

export const topFreelances: Freelance[] = [
  { id: "1", nom: "Mahamadou I.", specialite: "Design & Canva", note: 4.9, initiales: "MI" },
  { id: "2", nom: "Aïcha M.", specialite: "Rédaction & Correction", note: 4.8, initiales: "AM" },
  { id: "3", nom: "Abdoulaye H.", specialite: "Excel & Saisie de données", note: 4.8, initiales: "AH" },
];
