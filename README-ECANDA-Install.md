# 🚀 ECANDA — Installation complète

> Exécute ces commandes **dans l'ordre exact**. Chaque section = une phase.

---

## ✅ PHASE 1 — Prérequis système

### 1.1 — Node.js v20 LTS (via nvm — recommandé)
```bash
# Installer nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Recharger le terminal, puis :
nvm install 20
nvm use 20
nvm alias default 20

# Vérifier
node --version    # doit afficher v20.x.x
npm --version     # doit afficher 10.x.x
```

> **Windows** : Utilise [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) à la place.

---

### 1.2 — Git + configuration
```bash
# Installer Git si pas déjà présent
# Windows : https://git-scm.com/download/win
# Linux/Mac :
sudo apt install git  # ou brew install git

# Configuration ECANDA (une seule fois)
git config --global user.name "Ggboykxz"
git config --global user.email "ggboykxz@gmail.com"
git config --global init.defaultBranch main

# Vérifier
git --version
git config --list
```

---

### 1.3 — Java JDK 17 (requis pour Android)
```bash
# Ubuntu / WSL
sudo apt update
sudo apt install openjdk-17-jdk

# Vérifier
java -version   # doit afficher openjdk 17.x.x
```

> **Windows** : Télécharge [Eclipse Temurin JDK 17](https://adoptium.net/) et installe-le.
> Ensuite ajoute `JAVA_HOME` dans tes variables d'environnement.

---

### 1.4 — Android Studio (pour l'émulateur)
> Si tu utilises **Expo Go sur ton téléphone**, tu peux sauter cette étape.

1. Télécharge [Android Studio](https://developer.android.com/studio)
2. Installe avec SDK Platform **Android 14 (API 34)** et **Android Emulator**
3. Crée un AVD (Virtual Device) : Pixel 7, API 34
4. Ajoute ces variables d'environnement :

```bash
## Dans ~/.bashrc ou ~/.zshrc (Linux/Mac) ou variables système Windows :
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

---

## ✅ PHASE 2 — CLIs globaux

```bash
# Expo CLI
npm install -g expo-cli

# EAS CLI (builds + OTA updates)
npm install -g eas-cli

# Firebase CLI (deploy rules, fonctions)
npm install -g firebase-tools

# Vérifier tout
expo --version
eas --version
firebase --version
```

---

## ✅ PHASE 3 — Création du projet

### 3.1 — Créer le projet Expo avec TypeScript
```bash
npx create-expo-app@latest ecanda --template tabs

cd ecanda
```

### 3.2 — Initialiser Git + GitHub
```bash
git init
git add .
git commit -m "chore(init): initial Expo project scaffold"

# Créer le repo sur GitHub : https://github.com/new
# Nom du repo : ecanda
# Ensuite :
git remote add origin https://github.com/Ggboykxz/ecanda.git
git branch -M main
git push -u origin main
```

### 3.3 — Configurer EAS
```bash
eas login
eas init --id ecanda
```

### 3.4 — Nettoyer le template (supprimer les fichiers inutiles)
```bash
# Supprimer les exemples du template
rm -rf app/\(tabs\)/explore.tsx
rm -rf components/HelloWave.tsx
rm -rf components/ParallaxScrollView.tsx
rm -rf components/ThemedText.tsx
rm -rf components/ThemedView.tsx

git add .
git commit -m "chore(cleanup): remove template boilerplate"
```

---

## ✅ PHASE 4 — Dépendances core

### 4.1 — NativeWind v4 + TailwindCSS
```bash
npm install nativewind@^4.0.1
npm install --save-dev tailwindcss@^3.3.5

npx tailwindcss init

git add .
git commit -m "feat(ui): add NativeWind v4 + TailwindCSS"
```

### 4.2 — Animations & Gestures
```bash
npx expo install react-native-reanimated
npx expo install react-native-gesture-handler
npm install moti

git add .
git commit -m "feat(ui): add Reanimated v3, Gesture Handler, Moti"
```

### 4.3 — Composants UI essentiels
```bash
npx expo install expo-image
npm install @shopify/flash-list
npm install @gorhom/bottom-sheet
npx expo install react-native-safe-area-context
npx expo install react-native-screens

git add .
git commit -m "feat(ui): add FlashList, BottomSheet, expo-image, safe-area"
```

### 4.4 — State Management
```bash
npm install zustand
npm install @tanstack/react-query

git add .
git commit -m "feat(state): add Zustand + TanStack Query v5"
```

### 4.5 — Forms & Validation
```bash
npm install react-hook-form
npm install zod

git add .
git commit -m "feat(forms): add React Hook Form + Zod"
```

---

## ✅ PHASE 5 — Firebase + Paiements + Extras

### 5.1 — Firebase SDK complet
```bash
npm install firebase
npx expo install @react-native-firebase/app
npx expo install @react-native-firebase/auth
npx expo install @react-native-firebase/firestore
npx expo install @react-native-firebase/storage
npx expo install @react-native-firebase/functions
npx expo install @react-native-firebase/messaging

git add .
git commit -m "feat(backend): add Firebase SDK (auth, firestore, storage, functions, messaging)"
```

### 5.2 — Stripe (Visa / Mastercard)
```bash
npx expo install @stripe/stripe-react-native

git add .
git commit -m "feat(payment): add Stripe React Native SDK"
```

### 5.3 — Notifications + Localisation
```bash
npx expo install expo-notifications
npx expo install expo-location
npx expo install expo-haptics

git add .
git commit -m "feat(device): add expo-notifications, expo-location, expo-haptics"
```

### 5.4 — Animations avancées
```bash
npx expo install lottie-react-native
npx expo install @shopify/react-native-skia

git add .
git commit -m "feat(ui): add Lottie + Skia for advanced visuals"
```

### 5.5 — Typographies ECANDA
```bash
npx expo install @expo-google-fonts/syne
npx expo install @expo-google-fonts/plus-jakarta-sans
npx expo install expo-font

git add .
git commit -m "feat(ui): add Syne + Plus Jakarta Sans fonts"
```

### 5.6 — Divers utiles
```bash
npx expo install expo-camera         # photos produits
npx expo install expo-image-picker   # galerie
npx expo install expo-linking        # deep links WhatsApp
npx expo install expo-clipboard      # copier codes promo
npm install date-fns                 # formatage dates
npm install axios                    # requêtes HTTP (Airtel/Moov APIs)

git add .
git commit -m "feat(utils): add camera, image-picker, linking, clipboard, date-fns, axios"
```

---
## ✅ PHASE 6 — Configuration Firebase

### 6.1 — Créer le projet Firebase
1. Va sur [console.firebase.google.com](https://console.firebase.google.com)
2. Crée un projet : **ECANDA**
3. Active : **Authentication** (Phone, Email/Password, Google)
4. Active : **Firestore Database** (mode production)
5. Active : **Storage**
6. Active : **Cloud Functions** (nécessite plan Blaze)
7. Télécharge `google-services.json` (Android) → place dans `/android/app/`

### 6.2 — Variables d'environnement
```bash
# Créer le fichier .env à la racine
touch .env

# Ajouter dans .env :
EXPO_PUBLIC_FIREBASE_API_KEY=xxx
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
EXPO_PUBLIC_FIREBASE_PROJECT_ID=ecanda-xxxx
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
EXPO_PUBLIC_FIREBASE_APP_ID=xxx
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx

# S'assurer que .env est dans .gitignore
echo ".env" >> .gitignore
echo "google-services.json" >> .gitignore

git add .gitignore
git commit -m "chore(security): add .env and google-services.json to .gitignore"
```

---
## ✅ PHASE 7 — Vérification finale & Premier lancement

```bash
# Vérifier que tout est installé
npx expo-doctor

# Lancer le projet
npx expo start

# Sur téléphone : scanner le QR code avec Expo Go
# Sur émulateur Android : appuyer sur 'a'
# Sur simulateur iOS (Mac uniquement) : appuyer sur 'i'
```

---
## 📦 Résumé — package.json final attendu

```json
{
  "dependencies": {
    "expo": "~51.x.x",
    "expo-router": "~3.x.x",
    "react": "18.x.x",
    "react-native": "0.74.x",
    "nativewind": "^4.0.1",
    "tailwindcss": "^3.3.5",
    "react-native-reanimated": "~3.x.x",
    "react-native-gesture-handler": "~2.x.x",
    "moti": "^0.x.x",
    "expo-image": "~1.x.x",
    "@shopify/flash-list": "^1.x.x",
    "@gorhom/bottom-sheet": "^4.x.x",
    "zustand": "^4.x.x",
    "@tanstack/react-query": "^5.x.x",
    "react-hook-form": "^7.x.x",
    "zod": "^3.x.x",
    "firebase": "^10.x.x",
    "@stripe/stripe-react-native": "0.x.x",
    "expo-notifications": "~0.x.x",
    "expo-location": "~17.x.x",
    "expo-haptics": "~13.x.x",
    "lottie-react-native": "7.x.x",
    "@shopify/react-native-skia": "^1.x.x",
    "@expo-google-fonts/syne": "^0.x.x",
    "@expo-google-fonts/plus-jakarta-sans": "^0.x.x",
    "expo-font": "~12.x.x",
    "expo-camera": "~15.x.x",
    "expo-image-picker": "~15.x.x",
    "expo-linking": "~6.x.x",
    "date-fns": "^3.x.x",
    "axios": "^1.x.x"
  }
}
```

---
## 🆘 Erreurs fréquentes

| Erreur | Solution |
|--------|----------|
| `JAVA_HOME not set` | Configurer la variable d'environnement JAVA_HOME vers le JDK 17 |
| `SDK location not found` | Créer `local.properties` dans `/android/` avec `sdk.dir=/path/to/sdk` |
| `Metro bundler failed` | `npx expo start --clear` |
| `Reanimated plugin missing` | Ajouter `"react-native-reanimated/plugin"` en dernier dans `babel.config.js` |
| `NativeWind styles not applied` | Vérifier `tailwind.config.js` content array + import du CSS global |

---
*ECANDA Setup Complete — Let's build. 🇬🇦*
