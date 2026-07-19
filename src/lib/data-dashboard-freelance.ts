export type StatutCommande = "En attente" | "En cours" | "Livrée" | "Terminée" | "Annulée";

export interface CommandeFreelance {
  id: string;
  service: string;
  client: string;
  clientInitiales: string;
  prix: number;
  statut: StatutCommande;
  dateEcheance: string;
}

export const commandesFreelance: CommandeFreelance[] = [
  { id: "CMD-1042", service: "Créer un CV professionnel", client: "Fatouma B.", clientInitiales: "FB", prix: 2000, statut: "En cours", dateEcheance: "Aujourd'hui" },
  { id: "CMD-1041", service: "Concevoir un logo", client: "Ibrahim S.", clientInitiales: "IS", prix: 3000, statut: "En attente", dateEcheance: "Demain" },
  { id: "CMD-1039", service: "Créer un CV professionnel", client: "Aminata T.", clientInitiales: "AT", prix: 2000, statut: "Livrée", dateEcheance: "Hier" },
  { id: "CMD-1035", service: "Concevoir un logo", client: "Moussa D.", clientInitiales: "MD", prix: 3000, statut: "Terminée", dateEcheance: "12 juin" },
  { id: "CMD-1030", service: "Créer un CV professionnel", client: "Halima N.", clientInitiales: "HN", prix: 2000, statut: "Terminée", dateEcheance: "5 juin" },
  { id: "CMD-1028", service: "Concevoir un logo", client: "Yacouba K.", clientInitiales: "YK", prix: 3000, statut: "Annulée", dateEcheance: "2 juin" },
];

export interface ServiceFreelance {
  id: string;
  titre: string;
  emoji: string;
  prixDepart: number;
  statut: "Actif" | "En pause" | "Brouillon";
  commandesEnCours: number;
  note: number;
  nombreAvis: number;
  vues30j: number;
}

export const servicesFreelance: ServiceFreelance[] = [
  { id: "cv-pro", titre: "Créer un CV professionnel", emoji: "📄", prixDepart: 2000, statut: "Actif", commandesEnCours: 3, note: 4.8, nombreAvis: 124, vues30j: 842 },
  { id: "logo", titre: "Concevoir un logo", emoji: "🎨", prixDepart: 3000, statut: "Actif", commandesEnCours: 1, note: 4.9, nombreAvis: 76, vues30j: 511 },
  { id: "affiche-canva", titre: "Réaliser une affiche Canva", emoji: "🖼️", prixDepart: 1500, statut: "En pause", commandesEnCours: 0, note: 4.7, nombreAvis: 98, vues30j: 203 },
  { id: "flyer-evenement", titre: "Créer un flyer d'événement", emoji: "🖨️", prixDepart: 1500, statut: "Brouillon", commandesEnCours: 0, note: 0, nombreAvis: 0, vues30j: 0 },
];

export interface AvisRecu {
  id: string;
  client: string;
  clientInitiales: string;
  service: string;
  note: number;
  commentaire: string;
  date: string;
  reponse?: string;
}

export const avisRecus: AvisRecu[] = [
  {
    id: "1",
    client: "Fatouma B.",
    clientInitiales: "FB",
    service: "Créer un CV professionnel",
    note: 5,
    commentaire: "Travail rapide et très professionnel, exactement ce que je voulais !",
    date: "Il y a 2 jours",
    reponse: "Merci beaucoup Fatouma, ravi que le CV vous plaise ! 🙏",
  },
  {
    id: "2",
    client: "Moussa D.",
    clientInitiales: "MD",
    service: "Concevoir un logo",
    note: 5,
    commentaire: "Très à l'écoute, plusieurs propositions avant de valider. Je recommande.",
    date: "Il y a 5 jours",
  },
  {
    id: "3",
    client: "Halima N.",
    clientInitiales: "HN",
    service: "Créer un CV professionnel",
    note: 4,
    commentaire: "Bon travail, juste un petit délai de retard sur la livraison.",
    date: "Il y a 1 semaine",
  },
];

export interface ConversationFreelance {
  id: string;
  client: string;
  clientInitiales: string;
  dernierMessage: string;
  heure: string;
  nonLu: boolean;
  enLigne: boolean;
}

export const conversationsFreelance: ConversationFreelance[] = [
  { id: "1", client: "Fatouma B.", clientInitiales: "FB", dernierMessage: "Merci beaucoup, c'est parfait !", heure: "10:42", nonLu: false, enLigne: true },
  { id: "2", client: "Ibrahim S.", clientInitiales: "IS", dernierMessage: "Est-ce que vous pouvez ajouter un fond bleu ?", heure: "09:15", nonLu: true, enLigne: false },
  { id: "3", client: "Aminata T.", clientInitiales: "AT", dernierMessage: "D'accord, j'attends la livraison", heure: "Hier", nonLu: false, enLigne: false },
];
