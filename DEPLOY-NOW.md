# 🚀 Vergabebausteine Dashboard - JETZT DEPLOYEN!

## ✅ Alles ist bereit!

**GitHub Repository**: https://github.com/DanielWRau/vergabebausteine-dashboard
**Status**: Code gepusht, Backend konfiguriert, Build getestet

---

## 🎯 Deployment Schritte (5 Minuten)

### Option 1: Appwrite Sites (Empfohlen - Kostenlos)

#### Schritt 1: Appwrite Console öffnen

Gehe zu: https://cloud.appwrite.io/console/project-69214d3d003de369905e

#### Schritt 2: Site erstellen

1. Klicke im linken Menü auf **"Sites"**
2. Klicke **"Create site"**
3. Wähle **"Connect Git repository"**

#### Schritt 3: GitHub verbinden

1. **Authorize Appwrite** - Gib Zugriff auf dein GitHub Account
2. **Select repository**: `DanielWRau/vergabebausteine-dashboard`
3. **Branch**: `main`
4. Klicke **"Next"**

#### Schritt 4: Build-Konfiguration

Trage ein:
- **Name**: `Vergabebausteine Dashboard`
- **Root directory**: `/` (Standard)
- **Install command**: `npm install`
- **Build command**: `npm run build`
- **Output directory**: `dist`

Klicke **"Create site"**

#### Schritt 5: Deployment starten

Die Site wird automatisch gebaut und deployed!

**Build-Zeit**: ~2-3 Minuten

---

### Option 2: Via Appwrite CLI

```bash
cd vergabebausteine-dashboard

# Login (falls noch nicht eingeloggt)
appwrite login

# Site initialisieren
appwrite init sites

# Folge den Prompts:
# - Name: Vergabebausteine Dashboard
# - Site ID: vergabebausteine-dashboard
# - Framework: Vite
# - Install: npm install
# - Build: npm run build
# - Output: dist

# Deployen
appwrite deploy site
```

---

## 🌐 Deine Public URL

Nach erfolgreichem Deployment erhältst du eine URL wie:

```
https://69214d3d003de369905e.fra.cloud.appwrite.io
```

oder mit Custom Domain:
```
https://dashboard.vergabebausteine.de
```

---

## 🔧 Custom Domain einrichten (Optional)

1. In Appwrite Console: **Sites** > Deine Site
2. **Settings** > **Domains**
3. **Add domain**: `dashboard.vergabebausteine.de`
4. Kopiere die DNS-Einträge
5. Füge sie in deinem Domain-Provider hinzu:
   - **Type**: CNAME
   - **Name**: dashboard
   - **Value**: [von Appwrite bereitgestellt]
6. Warte auf DNS-Propagation (~10 Min)
7. **Verify domain** in Appwrite
8. ✅ Fertig!

---

## ✅ Deployment Checkliste

### Vor dem Deployment

- [x] ✅ GitHub Repo erstellt
- [x] ✅ Code gepusht
- [x] ✅ appwrite.json konfiguriert
- [x] ✅ Build erfolgreich lokal getestet
- [x] ✅ Appwrite Backend eingerichtet
- [x] ✅ Test-User erstellt

### Nach dem Deployment

- [ ] ⏳ Site in Appwrite Console erstellt
- [ ] ⏳ GitHub Repo verbunden
- [ ] ⏳ Build erfolgreich
- [ ] ⏳ Public URL erhalten
- [ ] ⏳ Login getestet
- [ ] ⏳ Dashboard funktionsfähig

---

## 🧪 Nach Deployment testen

### 1. URL öffnen

Öffne deine Appwrite Sites URL

### 2. Login testen

- Du wirst zur Login-Seite weitergeleitet
- **Email**: `test@vergabebausteine.de`
- **Password**: `password123`
- Klicke **Sign in**

### 3. Dashboard prüfen

- ✅ Du solltest im Dashboard sein
- ✅ Menü ist sichtbar
- ✅ "Users" Navigation funktioniert
- ✅ Keine Console-Errors

### 4. Realtime testen

1. Öffne 2 Browser-Tabs mit deiner Site
2. Ändere etwas in einem Tab
3. Sollte in beiden Tabs aktualisiert werden (Realtime!)

---

## 🔄 Re-Deployment

Bei Code-Änderungen:

```bash
# Änderungen machen
# ...

# Committen und pushen
git add .
git commit -m "Update: Deine Änderung"
git push

# Appwrite baut automatisch neu!
```

Auto-Deployment ist aktiviert! 🎉

---

## 🐛 Troubleshooting

### Build schlägt fehl

**Lösung**:
1. Check Build Logs in Appwrite Console
2. Teste lokal: `npm run build`
3. Fixe Errors
4. Push und retry

### Login funktioniert nicht

**Check**:
1. Appwrite Console → Auth → Users
2. Test-User existiert?
3. Email stimmt?
4. Passwort korrekt?

### "CORS Error"

**Lösung**:
1. Appwrite Console → Settings → Platforms
2. Add Web Platform
3. **Hostname**: Deine Site-URL (ohne https://)
4. Save

### Site lädt nicht

**Check**:
1. Build logs in Appwrite
2. Browser Console für Errors
3. Network Tab für 404s

---

## 📚 Ressourcen

- **GitHub Repo**: https://github.com/DanielWRau/vergabebausteine-dashboard
- **Appwrite Console**: https://cloud.appwrite.io/console/project-69214d3d003de369905e
- **Appwrite Sites Docs**: https://appwrite.io/docs/products/sites
- **Support**: https://appwrite.io/discord

---

## 🎯 Was kommt als nächstes?

### Sofort:

1. ✅ **Deploy jetzt** via Appwrite Console (5 Min)
2. ✅ **Teste** Login und Dashboard
3. ✅ **Teile** die URL mit deinem Team

### Später:

1. **Custom Domain** einrichten
2. **Users CRUD** Pages implementieren
3. **Weitere Collections** hinzufügen
4. **Dashboard erweitern** mit Widgets

---

**JETZT DEPLOYEN**: https://cloud.appwrite.io/console/project-69214d3d003de369905e/sites

**Status**: ⏳ Warte auf Deployment
**Nächster Schritt**: Gehe zur Appwrite Console und erstelle die Site!
