# Setup Meta Ads

Krok po kroku jak utworzyć Meta App i podłączyć CRM do Facebook/Instagram Ads.

## 1. Utwórz aplikację Meta

1. Wejdź na https://developers.facebook.com/apps
2. **Create App** → Use case: **Other** → Type: **Business**
3. Nazwa: `BeautyRise CRM` (lub inna), Contact email: Twój

## 2. Skonfiguruj podstawowe dane

W panelu app → **Settings → Basic**:
- skopiuj **App ID** → będzie jako `META_APP_ID`
- kliknij **Show** przy App Secret → skopiuj jako `META_APP_SECRET`
- wypełnij Privacy Policy URL, User Data Deletion URL (nawet fake stronę w razie potrzeby)

## 3. Dodaj produkty

W lewym menu → **Add Product**:

### Facebook Login for Business
- Skonfiguruj:
  - **Settings → Valid OAuth Redirect URIs**:
    - `http://localhost:3001/api/integrations/meta/callback` (dev)
    - `https://twoj-projekt.vercel.app/api/integrations/meta/callback` (prod)

### Marketing API
- Automatycznie dodaje uprawnienia `ads_read`, `ads_management`

### Webhooks (dla Lead Ads)
- **Page → Subscribe to** pole: `leadgen`
- **Callback URL**: `https://twoj-projekt.vercel.app/api/webhooks/meta-leads`
  (webhook Meta wymaga publicznego HTTPS — lokalnie test przez ngrok)
- **Verify Token**: wygeneruj losowy string → będzie jako `META_WEBHOOK_VERIFY_TOKEN`

## 4. App Review

- **Dev mode** (własne konto): **niepotrzebne**. Od razu możesz używać z kontami,
  na których jesteś adminem w Meta Business.
- **Production / klienci**: wymagane:
  - Business Verification (dokumenty firmy)
  - App Review z screencastem każdego uprawnienia
  - Proces ~1-2 tygodnie. Przejdziemy w Fazie 4 (multi-tenant).

## 5. Zaktualizuj `.env.local`

```env
META_APP_ID=<twój app id>
META_APP_SECRET=<twój app secret>
META_WEBHOOK_VERIFY_TOKEN=<wygenerowany string>
META_REDIRECT_URI=http://localhost:3001/api/integrations/meta/callback
CRON_SECRET=<wygeneruj losowy string, np. openssl rand -hex 32>
```

**Ważne:** po dodaniu zrestartuj `npm run dev`.

## 6. Połącz konto w CRM

1. Wejdź na `/integrations/meta` → kliknij **Połącz przez OAuth**
2. Meta poprosi o zgodę → zatwierdź
3. Wybierz ad account z listy → zapisz
4. CRM automatycznie rozpocznie sync kampanii i metryk
5. Zobacz `/campaigns` — powinny pojawić się dane

## 7. Ustaw webhook Lead Ads (tylko produkcja / ngrok)

1. W Meta App → **Webhooks → Page**:
   - Callback URL: `https://twoj-projekt.vercel.app/api/webhooks/meta-leads`
   - Verify Token: ten co w `.env.local`
2. Kliknij **Verify and Save**
3. Subscribe: `leadgen`
4. Przetestuj przez **Lead Ads Testing Tool** w Meta Business Suite

## 8. Testowanie lokalnie przez ngrok (opcjonalne)

Webhook Meta wymaga publicznego HTTPS. Do testów lokalnych:

```bash
npm install -g ngrok
ngrok http 3001
# skopiuj HTTPS URL (np. https://abc123.ngrok.io)
# wklej w Meta App jako Callback URL + /api/webhooks/meta-leads
```

## Troubleshooting

- **"Invalid OAuth access token"** → token wygasł (60 dni). Kliknij "Połącz ponownie".
- **Webhook nie dostaje eventów** → sprawdź czy app jest w **Live mode** (Dev mode nie
  wysyła webhooków z produkcyjnych kampanii). Dla dev: użyj **Lead Ads Testing Tool**.
- **Brak kampanii po sync** → user, który autoryzował, musi mieć rolę **Advertiser**
  w Business Manager dla tego ad accountu.
