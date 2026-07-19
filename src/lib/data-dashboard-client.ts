export type StatutCommandeClient = "En attente" | "En cours" | "Livrée" | "Terminée" | "Annulée";

export interface CommandeClient {
  id: string;
  service: string;
  freelance: string;
  freelanceInitiales: string;
  prix: number;
  statut: StatutCommandeClient;
  date: string;
}

export const commandesClient: CommandeClient[] = [
  { id: "CMD-2081", service: "Créer un CV professionnel", freelance: "Mahamadou I.", freelanceInitiales: "MI", prix: 2000, statut: "Livrée", date: "1 juillet 2026" },
  { id: "CMD-2077", service: "Concevoir un logo", freelance: "Aïcha M.", freelanceInitiales: "AM", prix: 3000, statut: "En cours", date: "28 juin 2026" },
  { id: "CMD-2070", service: "Traduire un document", freelance: "Abdoulaye H.", freelanceInitiales: "AH", prix: 1000, statut: "Terminée", date: "15 juin 2026" },
  { id: "CMD-2065", service: "Gérer une page Facebook", freelance: "Halima N.", freelanceInitiales: "HN", prix: 5000, statut: "Terminée", date: "2 juin 2026" },
  { id: "CMD-2060", service: "Monter une vidéo TikTok", freelance: "Yacouba K.", freelanceInitiales: "YK", prix: 2500, statut: "Annulée", date: "20 mai 2026" },
];

export interface ServiceFavori {
  id: string;
  titre: string;
  freelance: string;
  emoji: string;
  prixDepart: number;
  note: number;
}

export const favorisClient: ServiceFavori[] = [
  { id: "logo", titre: "Concevoir un logo", freelance: "Aïcha M.", emoji: "🎨", prixDepart: 3000, note: 4.9 },
  { id: "site-web", titre: "Créer un site web", freelance: "Ibrahim T.", emoji: "💻", prixDepart: 15000, note: 4.9 },
  { id: "article-blog", titre: "Rédiger un article de blog SEO", freelance: "Fatouma B.", emoji: "📝", prixDepart: 2500, note: 4.7 },
];

export interface Facture {
  id: string;
  commande: string;
  montant: number;
  date: string;
}

export const facturesClient: Facture[] = [
  { id: "FAC-2026-081", commande: "Créer un CV professionnel", montant: 2000, date: "1 juillet 2026" },
  { id: "FAC-2026-070", commande: "Traduire un document", montant: 1000, date: "15 juin 2026" },
  { id: "FAC-2026-065", commande: "Gérer une page Facebook", montant: 5000, date: "2 juin 2026" },
];

export interface ConversationClient {
  id: string;
  freelance: string;
  freelanceInitiales: string;
  dernierMessage: string;
  heure: string;
  nonLu: boolean;
  enLigne: boolean;
}

export const conversationsClient: ConversationClient[] = [
  { id: "1", freelance: "Aïcha M.", freelanceInitiales: "AM", dernierMessage: "Voici une première proposition de logo !", heure: "11:20", nonLu: true, enLigne: true },
  { id: "2", freelance: "Mahamadou I.", freelanceInitiales: "MI", dernierMessage: "Merci pour votre commande, à bientôt !", heure: "Hier", nonLu: false, enLigne: false },
];
