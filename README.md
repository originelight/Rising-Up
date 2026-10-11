# Stude Coin – Plateforme de révision

Plateforme HTML + Supabase pour lycéens (Terminale / 1ère).

## Fichiers

- `index.html` → page élèves (inscription, cours, exercices, boutique, classement, bonus)
- `admin.html` → page administrateur
- `js/supabase.js` → configuration Supabase (clé **anon** uniquement)

## Installation rapide

### 1. Supabase
1. Crée un projet gratuit sur [supabase.com](https://supabase.com)
2. Ouvre **SQL Editor** → colle le contenu de `schema.sql` (fourni précédemment) → **Run**
3. Dans Authentication → Providers → Email → **désactive Confirm email**
4. Crée un compte, puis exécute :
   ```sql
   UPDATE profiles SET role = 'admin' WHERE id = (SELECT id FROM auth.users WHERE email = 'TON_EMAIL');
   ```
5. Dans la table `settings` (ou via la fonction), mets ton numéro Orange Money

### 2. Configuration des clés
Ouvre `js/supabase.js` et remplace :
```js
const SUPABASE_URL = 'https://XXXX.supabase.co';
const SUPABASE_ANON_KEY = 'eyJ...';
```

### 3. Déploiement (Vercel + GitHub)
1. Crée un repo GitHub
2. Upload ces 3 fichiers (+ dossier js)
3. Sur [vercel.com](https://vercel.com) → Import Project → sélectionne le repo
4. Deploy → ton site est en ligne (statique)

## Sécurité importante
- La clé `service_role` ne doit **jamais** apparaître dans le HTML
- Toute logique sensible (coins, validation, réponses d’exercices) passe par des **fonctions RPC** + RLS
- `admin.html` est protégé uniquement par le rôle `admin` côté serveur

## Ordre recommandé
1. schema.sql (déjà fait)
2. Ces fichiers HTML
3. Tester inscription → validation admin → paiement → déblocage cours
