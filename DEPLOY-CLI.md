# 🚀 Appwrite CLI Deployment Guide

## Zukünftige Deployments via CLI

Da du die Site jetzt via Console erstellt hast, kannst du zukünftige Updates via CLI deployen.

---

## 📋 Setup (Einmalig)

### 1. CLI konfigurieren

```bash
cd vergabebausteine-dashboard

# Endpoint setzen
appwrite client --endpoint https://fra.cloud.appwrite.io/v1

# API Key setzen (für Site-Operations)
appwrite client --key YOUR_API_KEY_WITH_SITE_PERMISSIONS
```

### 2. Site ID ermitteln

Nach dem ersten Deployment via Console:

```bash
appwrite sites list
```

Notiere die Site ID (z.B. `6543abc...`)

---

## 🔄 Updates deployen

### Option A: Automatisches Re-Deploy (Empfohlen)

Die Site baut **automatisch neu** bei jedem Git Push!

```bash
# Code ändern
# ...

# Committen und pushen
git add .
git commit -m "Update: Deine Änderung"
git push

# Appwrite baut automatisch neu! ✨
```

### Option B: Manuelles Deploy via CLI

Falls du lokal deployen willst:

```bash
# 1. Bauen
npm run build

# 2. Via CLI deployen (wenn implementiert)
appwrite push deployment \
  --site-id YOUR_SITE_ID \
  --entrypoint dist/index.html
```

**Hinweis**: CLI Site-Deployment ist in v12.0.0 noch limitiert. Git-based Deployment (Option A) ist der empfohlene Weg.

---

## 🔧 CLI Kommandos für Sites

### Sites auflisten
```bash
appwrite sites list
```

### Site Details anzeigen
```bash
appwrite sites get --site-id YOUR_SITE_ID
```

### Deployments anzeigen
```bash
appwrite sites list-deployments --site-id YOUR_SITE_ID
```

### Build Logs anzeigen
```bash
appwrite sites get-deployment \
  --site-id YOUR_SITE_ID \
  --deployment-id DEPLOYMENT_ID
```

---

## 🎯 Empfohlener Workflow

### Für Development:

```bash
# Lokal testen
npm run dev
# → http://localhost:5174

# Änderungen machen
# ...

# Testen
npm run build
npm run preview
```

### Für Production:

```bash
# Committen
git add .
git commit -m "Feature: Neue Funktion"

# Pushen (triggert Auto-Deploy!)
git push

# Status checken in Console:
# https://cloud.appwrite.io/console/project-69214d3d003de369905e/sites
```

---

## ✅ Vorteile Git-based Deployment

1. **Automatisch**: Push = Deploy
2. **Versioniert**: Jedes Deployment = Git Commit
3. **Rollback**: Einfach zu vorherigem Commit zurück
4. **Preview**: Branch-based Deployments möglich
5. **CI/CD**: GitHub Actions Integration möglich

---

## 🔄 Rollback zu vorheriger Version

### Via Git:

```bash
# Vorherigen Commit finden
git log --oneline

# Zurücksetzen
git revert COMMIT_HASH

# Pushen (triggert Re-Deploy)
git push
```

### Via Appwrite Console:

1. Sites → Deine Site
2. Deployments Tab
3. Wähle vorheriges Deployment
4. "Redeploy" klicken

---

## 📊 Deployment Status überwachen

### Via CLI:

```bash
# Latest Deployment Status
appwrite sites list-deployments \
  --site-id YOUR_SITE_ID \
  --queries '["limit(1)"]'
```

### Via Console:

https://cloud.appwrite.io/console/project-69214d3d003de369905e/sites

---

## 🐛 Troubleshooting CLI

### "Site not found"

**Lösung**: Prüfe Site ID
```bash
appwrite sites list
```

### "Unauthorized"

**Lösung**: API Key Permissions prüfen
- Needs: `sites.read`, `sites.write`

### "Build failed"

**Lösung**: Check logs
```bash
appwrite sites get-deployment \
  --site-id YOUR_SITE_ID \
  --deployment-id DEPLOYMENT_ID
```

---

## 💡 Pro-Tips

### 1. Environment Variables setzen

In Appwrite Console:
- Sites → Settings → Environment Variables
- Add: `VITE_CUSTOM_VAR=value`

### 2. Branch Deployments

- `main` → Production
- `develop` → Staging (separate Site)

### 3. Custom Domain

```bash
# Via Console:
# Sites → Settings → Domains → Add domain
```

### 4. Performance Monitoring

Check in Console:
- Sites → Analytics
- Response times, Traffic, Errors

---

## 📚 Weitere Ressourcen

- [Appwrite CLI Docs](https://appwrite.io/docs/tooling/command-line)
- [Sites API Reference](https://appwrite.io/docs/references/cloud/server-nodejs/sites)
- [Deployment Best Practices](https://appwrite.io/docs/products/sites)

---

**Aktueller Status**: Site deployed via Console ✅
**Updates**: Automatisch via Git Push 🚀
**CLI**: Konfiguriert und bereit 🔧
