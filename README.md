# Kori

Marketplace de services freelance, 100% en français, inspirée de Fiverr — design premium, architecture production-ready.

> ⚠️ Le nom **Kori** est temporaire et peut être changé facilement (voir `NEXT_PUBLIC_APP_NAME` dans `.env`).

## Stack technique

| Domaine | Technologie |
|---|---|
| Frontend | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Shadcn/UI, Framer Motion |
| Backend | API Routes Next.js (extensible vers NestJS si besoin de séparation) |
| Base de données | PostgreSQL + Prisma ORM |
| Authentification | JWT + NextAuth (OAuth Google / Facebook) |
| Stockage | Cloudinary |
| Paiement | Stripe |
| Emails | Resend |
| Temps réel | Socket.IO (messagerie) |
| Déploiement | Vercel (frontend) + Railway/Render (DB + workers) |

## Structure du projet

```
freelancemarket/
├── prisma/                 # Schéma et migrations de la base de données
├── public/                 # Assets statiques
├── src/
│   ├── app/
│   │   ├── (marketing)/    # Pages publiques (accueil, recherche...)
│   │   ├── (auth)/         # Connexion, inscription, mot de passe oublié
│   │   ├── (dashboard)/    # Espaces client / freelance / admin
│   │   └── api/            # Routes API (backend)
│   ├── components/
│   │   ├── ui/             # Composants génériques (boutons, inputs, cartes...)
│   │   ├── layout/         # Header, footer, navigation
│   │   └── services/       # Composants liés aux services
│   ├── lib/                 # Fonctions utilitaires, clients (Prisma, Stripe...)
│   ├── hooks/               # Hooks React personnalisés
│   └── types/                # Types TypeScript partagés
```

## Obtenir une base de données PostgreSQL (gratuite)

Le plus simple pour démarrer, sans rien installer sur ton Mac :

1. Crée un compte gratuit sur [neon.com](https://neon.com) (ou [supabase.com](https://supabase.com))
2. Crée un nouveau projet PostgreSQL
3. Copie l'URL de connexion fournie (commence par `postgresql://...`)
4. Colle-la dans ton fichier `.env`, à la place de `DATABASE_URL`

## Démarrage local

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer les variables d'environnement
cp .env.example .env
# → remplir DATABASE_URL avec ton URL Neon/Supabase (voir ci-dessus)

# 3. Générer le client Prisma et créer les tables
npm run prisma:generate
npm run prisma:migrate

# 4. Pré-remplir les catégories (Business & Bureau, Design, Développement...)
npx prisma db seed

# 5. Lancer le serveur de développement
npm run dev
```

L'application sera disponible sur http://localhost:3000

## Roadmap de développement (étapes)

- [x] **Étape 1** — Initialisation du projet, architecture, configuration
- [x] **Étape 2** — Schéma de base de données complet (services, commandes, avis, paiements)
- [x] **Étape 3** — Authentification (JWT via NextAuth, vérification email non branchée, OAuth non branché)
- [x] **Étape 4** — Design system (composants UI, palette Kori)
- [x] **Étape 5** — Pages publiques (accueil, recherche, page service)
- [x] **Étape 6** — Dashboard client
- [x] **Étape 7** — Dashboard freelance
- [x] **Étape 8** — Commandes & workflow complet (créer un service, commander, accepter/livrer/valider — paiement simulé, Stripe pas encore branché)
- [x] **Étape 9** — Messagerie (persistee en base, rafraichissement automatique — pas de websockets/temps reel strict)
- [x] **Étape 10** — Fondations Stripe (checkout + webhook prets, a activer avec de vraies cles ; le flux principal reste en paiement simule)
- [x] **Étape 11** — Administration (vue d'ensemble, utilisateurs, services, commandes)
- [x] **Étape 12** — SEO de base (sitemap.xml, robots.txt, meta tags dynamiques par service) — sécurité de base assurée (mots de passe hachés, routes protégées par rôle) ; rate limiting et audit de sécurité approfondi restent à faire avant une vraie mise en production
- [ ] **Étape 13** — Déploiement production

## Licence

Projet privé — tous droits réservés.
