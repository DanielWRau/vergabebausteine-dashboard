# Vergabebausteine Dashboard - Setup Guide

## 🎯 Übersicht

Dieses Projekt ist ein Refine Admin Dashboard mit Appwrite Backend-Integration für das Vergabebausteine-System.

**Projekt Details:**
- **Name**: Vergabebausteine Dashboard
- **Frontend**: Refine + React + TypeScript + Ant Design
- **Backend**: Appwrite (Frankfurt Region)
- **URL (Development)**: http://localhost:5174
- **Appwrite Projekt**: Vergabebausteine (69214d3d003de369905e)

---

## 📋 Schritt-für-Schritt Setup

### Schritt 1: Appwrite Datenbank erstellen (in der Console)

1. Öffne die [Appwrite Console](https://cloud.appwrite.io/console/project-69214d3d003de369905e)
2. Gehe zu **Databases** im linken Menü
3. Klicke auf **Create database**
   - **Database ID**: `main`
   - **Name**: `Main Database`
4. Klicke **Create**

### Schritt 2: Users Collection erstellen

1. In der `main` Datenbank, klicke auf **Create collection**
   - **Collection ID**: `users`
   - **Name**: `Users`
2. Klicke **Create**

### Schritt 3: Attribute zur Users Collection hinzufügen

Klicke auf die `users` Collection und dann auf **Attributes**:

**Attribut 1: name**
- Type: `String`
- Key: `name`
- Size: `255`
- Required: ✅ Ja
- Default: (leer)

**Attribut 2: email**
- Type: `Email`
- Key: `email`
- Required: ✅ Ja

**Attribut 3: role**
- Type: `String`
- Key: `role`
- Size: `50`
- Required: ❌ Nein
- Default: `user`

**Attribut 4: createdAt**
- Type: `DateTime`
- Key: `createdAt`
- Required: ❌ Nein

Klicke nach jedem Attribut auf **Create** und warte bis der Status "Available" ist.

### Schritt 4: Collection Permissions setzen

1. Gehe zu **Settings** der `users` Collection
2. Unter **Permissions** füge hinzu:
   - **Read access**: `Any`
   - **Create**: `Users`
   - **Update**: `Users`
   - **Delete**: `Users`
3. **Document security**: ✅ Aktivieren

### Schritt 5: Test-User erstellen

1. Gehe zu **Auth** im linken Menü
2. Klicke auf **Create user**
3. Wähle **Email/Password**
   - **Email**: `test@vergabebausteine.de`
   - **Password**: `password123`
   - **Name**: `Test User`
4. Klicke **Create**

### Schritt 6: Hostname für Web-App hinzufügen

1. Gehe zu **Settings** > **Platforms**
2. Klicke **Add platform** > **Web App**
   - **Name**: `Vergabebausteine Dashboard Dev`
   - **Hostname**: `localhost`
3. Klicke **Next** und **Create**

Wiederhole für Production (später):
   - **Name**: `Vergabebausteine Dashboard Production`
   - **Hostname**: `vergabebausteine.de` (oder deine Domain)

---

## 🚀 Dashboard starten

### 1. Dependencies installieren (falls noch nicht geschehen)

```bash
cd vergabebausteine-dashboard
npm install
```

### 2. Development Server starten

```bash
npm run dev
```

Der Server startet auf: **http://localhost:5174**

### 3. Login testen

1. Öffne http://localhost:5174
2. Du wirst zur Login-Seite weitergeleitet
3. **Email**: `test@vergabebausteine.de`
4. **Password**: `password123`
5. Klicke **Sign in**

✅ Du solltest jetzt im Dashboard sein!

---

## 📁 Projektstruktur

```
vergabebausteine-dashboard/
├── src/
│   ├── utility/
│   │   └── appwriteClient.ts      # Appwrite Client-Konfiguration
│   ├── authProvider.ts            # Authentication Provider
│   ├── App.tsx                    # Haupt-App mit Refine Config
│   └── main.tsx                   # React Entry Point
├── package.json                   # Dependencies
├── vite.config.ts                 # Vite Config (Port 5174)
└── SETUP-GUIDE.md                 # Diese Datei
```

---

## 🔧 Konfiguration

### Appwrite Credentials

Die Credentials sind in `src/utility/appwriteClient.ts` definiert:

```typescript
const APPWRITE_URL = "https://fra.cloud.appwrite.io/v1";
const APPWRITE_PROJECT = "69214d3d003de369905e";
```

### Database & Collection IDs

In `src/App.tsx`:

```typescript
const APPWRITE_DATABASE_ID = "main";
const APPWRITE_USERS_COLLECTION_ID = "users";
```

⚠️ **Wichtig**: Diese IDs müssen mit deinen Appwrite Console IDs übereinstimmen!

---

## 🧪 Features

### Aktuell implementiert

✅ **Authentication**
- Login (Email/Password)
- Registration
- Logout
- Password Recovery
- Password Reset
- Protected Routes

✅ **Layout**
- Ant Design ThemedLayout
- Custom Sidebar mit "Vergabebausteine" Title
- Responsive Design

✅ **Routing**
- React Router v6
- Protected Routes
- Public Auth Pages

✅ **Refine Integration**
- Data Provider (Appwrite)
- Live Provider (Realtime)
- Auth Provider
- Notification System
- Unsaved Changes Warning

### Placeholder Pages (noch zu implementieren)

Die folgenden Routes existieren, haben aber noch keine echten Komponenten:

- `/users` - Users List
- `/users/create` - Create User
- `/users/edit/:id` - Edit User
- `/users/show/:id` - Show User

---

## 📝 Nächste Schritte

### 1. Users List Page implementieren

Erstelle `src/pages/users/list.tsx`:

```typescript
import { List, Table, useTable } from "@refinedev/antd";

export const UsersList = () => {
  const { tableProps } = useTable();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="email" title="Email" />
        <Table.Column dataIndex="role" title="Role" />
      </Table>
    </List>
  );
};
```

### 2. Create/Edit Forms hinzufügen

Nutze Refine's `useForm` Hook für CRUD-Operationen.

### 3. Weitere Collections hinzufügen

Je nach deinen Anforderungen:
- Projekte
- Vergaben
- Documents
- etc.

### 4. Production Deployment

1. Build erstellen: `npm run build`
2. Hostname in Appwrite Console hinzufügen
3. Environment Variables für Production setzen
4. Deploy auf Hosting-Service (Vercel, Netlify, etc.)

---

## 🐛 Troubleshooting

### Problem: "Database not found"

**Lösung**: Prüfe ob die Database ID in `App.tsx` mit der ID in Appwrite Console übereinstimmt.

### Problem: "Collection not found"

**Lösung**: Prüfe ob die Collection ID korrekt ist und alle Attribute erstellt wurden.

### Problem: Login schlägt fehl

**Mögliche Ursachen**:
1. User existiert nicht → Erstelle User in Appwrite Console
2. Password ist falsch → Setze Password zurück
3. Hostname nicht in Appwrite registriert → Füge `localhost` als Platform hinzu

### Problem: "CORS Error"

**Lösung**: Stelle sicher, dass `localhost` als Web Platform in Appwrite Settings hinzugefügt wurde.

### Problem: Attributes nicht sichtbar

**Lösung**: Warte bis alle Attributes den Status "Available" haben. Das kann 10-30 Sekunden dauern.

---

## 📚 Ressourcen

- [Refine Dokumentation](https://refine.dev/docs/)
- [Appwrite Refine Tutorial](https://appwrite.io/docs/tutorials/refine)
- [Appwrite Dokumentation](https://appwrite.io/docs)
- [Ant Design Components](https://ant.design/components/overview/)

---

## ✅ Checkliste

- [x] Vite React TypeScript Projekt erstellt
- [x] Refine + Appwrite Packages installiert
- [x] Appwrite Client konfiguriert
- [x] Auth Provider implementiert
- [x] Refine App mit Routing erstellt
- [ ] Appwrite Database `main` erstellt (in Console)
- [ ] Appwrite Collection `users` erstellt (in Console)
- [ ] Attributes hinzugefügt (in Console)
- [ ] Test-User erstellt (in Console)
- [ ] `localhost` als Platform hinzugefügt (in Console)
- [ ] Dashboard gestartet und getestet
- [ ] Login erfolgreich

---

**Status**: ✅ Code fertig, ⏳ Appwrite Console Setup ausstehend
**Next**: Befolge Schritt 1-6 oben in der Appwrite Console
