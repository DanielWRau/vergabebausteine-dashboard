# Vergabebausteine Dashboard

Admin Dashboard für das Vergabebausteine-System, gebaut mit Refine und Appwrite.

## 🚀 Quick Start

```bash
# 1. Dependencies installieren
npm install

# 2. Development Server starten
npm run dev

# 3. Öffne Browser
open http://localhost:5174
```

**Test Login:**
- Email: `test@vergabebausteine.de`
- Password: `password123`

## 📋 Vollständige Setup-Anleitung

Siehe [SETUP-GUIDE.md](./SETUP-GUIDE.md) für detaillierte Schritt-für-Schritt Anweisungen zur Einrichtung der Appwrite-Datenbank.

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 + TypeScript
- **Admin Framework**: [Refine](https://refine.dev)
- **UI Library**: Ant Design 6
- **Backend**: [Appwrite](https://appwrite.io)
- **Build Tool**: Vite 7
- **Routing**: React Router v7

## 📁 Projekt-Struktur

```
src/
├── utility/
│   └── appwriteClient.ts    # Appwrite Config
├── authProvider.ts          # Authentication Logic
├── App.tsx                  # Main App Component
└── main.tsx                 # Entry Point
```

## 🔐 Features

- ✅ Email/Password Authentication
- ✅ User Registration
- ✅ Password Recovery
- ✅ Protected Routes
- ✅ Realtime Data Sync
- ✅ CRUD Operations
- ✅ Responsive Layout

## 📦 Scripts

```bash
npm run dev      # Start development server (Port 5174)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🌐 Environment

**Development**: http://localhost:5174
**Appwrite Endpoint**: https://fra.cloud.appwrite.io/v1
**Appwrite Project**: 69214d3d003de369905e

## 📖 Dokumentation

- [Setup Guide](./SETUP-GUIDE.md) - Vollständige Einrichtungsanleitung
- [Refine Docs](https://refine.dev/docs/)
- [Appwrite Docs](https://appwrite.io/docs)

## 🐛 Troubleshooting

Siehe [SETUP-GUIDE.md](./SETUP-GUIDE.md#troubleshooting) für häufige Probleme und Lösungen.

## 📝 License

ISC
