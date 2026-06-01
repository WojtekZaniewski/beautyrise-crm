# Backlog debugowania wysyłki SMS

## Stan na: 2026-06-01

---

## STATUS SESJI (po restarcie zacznij tutaj)

**Gdzie skończyliśmy:**
- Skonfigurowaliśmy MCP Supabase — plik `.mcp.json` jest w projekcie
- Po restarcie Claude Code MCP powinien być aktywny
- Nie uzyskaliśmy jeszcze logów z odpowiedzi SMSMobileAPI (Vercel Logs nie pokazuje console.log w widoku szczegółów requestu)

**Co zrobić zaraz po restarcie:**
1. Sprawdź czy MCP działa — powiedz Claude: *"sprawdź ostatnie wpisy w tabeli sms_messages, szczególnie kolumnę external_id"*
2. Jeśli `external_id` jest `null` dla ostatnio wysłanego SMS → pole GUID ma inną nazwę, trzeba dopisać je w `src/app/api/sms/send/route.ts` ~linia 54
3. Jeśli `external_id` ma wartość → GUID działa, problem jest w logice pollingu `check-status`

**Ostatni wysłany SMS:**
- Czas: 2026-06-01 10:21:49 (z Vercel Logs)
- Endpoint: POST /api/sms/send → 200 OK
- SMSMobileAPI odpowiedział: GET api.smsmobileapi.com/sendsms/ → 200 (430ms)
- Czy SMS faktycznie dotarł na telefon — nieznane

---

## Problem główny
Wysyłka kampanii SMS nie działa sekwencyjnie — wszystkie SMS-y idą naraz zamiast jeden po drugim z potwierdzeniem. CRM pokazuje błędy lub "w kolejce (telefon offline)" nawet gdy telefon jest online.

---

## KROK 1 — Sprawdź co zwraca SMSMobileAPI (PRIORYTET)

**Co zrobić:**
Wyślij JEDNEGO testowego SMS-a z zakładki "Wyślij SMS" (nie kampania) i sprawdź logi serwera.

**Gdzie szukać logów:**
- Lokalnie: terminal z `npm run dev` — szukaj linii `[sms/send] phone=... response=...`
- Vercel: panel → Functions → Logs → filtruj po `[sms/send]`

**Co nas interesuje:**
Dokładna zawartość pola `response=` — czyli pełny JSON który zwraca SMSMobileAPI po wywołaniu `sendsms`.

**Przykład czego szukamy:**
```
[sms/send] phone=+48534187109 response={"result":"OK","message_id":"abc123..."}
```
lub
```
[sms/send] phone=+48534187109 response={"status":"OK","id":"abc123..."}
```

**Dlaczego to ważne:**
Jeśli `guid` w odpowiedzi jest `null`, cały polling getsms jest pomijany i wszystkie SMS-y lecą naraz bez czekania. Musimy znać dokładną nazwę pola z GUID-em (może być: `message_id`, `id`, `guid`, `waID`, `id_message` lub coś innego).

---

## KROK 2 — Sprawdź co zwraca getsms

**Co zrobić:**
Po zobaczeniu logu z KROK 1 — sprawdź czy `[check-status]` też loguje coś w logach przy próbie pollingu.

Szukaj: `[check-status] guid=... rawStatus="..." raw=...`

**Możliwe wartości rawStatus z SMSMobileAPI:**
- `"success"` lub `"Success"` → SMS wysłany przez telefon ✓
- `"pending"` lub `"Pending"` → czeka w kolejce
- `"error"` lub `"Error"` → błąd wysyłki ✗

**Jeśli rawStatus jest pusty lub nierozpoznany** → trzeba dopisać ten status do listy w `/api/sms/check-status/route.ts`.

---

## KROK 3 — Napraw nazwę pola GUID (po KROK 1)

**Plik:** `src/app/api/sms/send/route.ts` linia ~52

Obecny kod:
```javascript
guid = data?.message_id ?? data?.guid ?? data?.id ?? data?.waID ?? null;
```

Jeśli z logów wynika że pole nazywa się inaczej (np. `id_message`), dodaj je tutaj:
```javascript
guid = data?.message_id ?? data?.id_message ?? data?.guid ?? data?.id ?? data?.waID ?? null;
```

---

## KROK 4 — Napraw nazwę pola statusu w getsms (po KROK 2)

**Plik:** `src/app/api/sms/check-status/route.ts` linia ~50

Obecny kod sprawdza `"success"`, `"sent"`, `"delivered"`, `"ok"`, `"1"`.

Jeśli SMSMobileAPI zwraca inną wartość (np. `"Sent"`, `"SENT"`, `"delivered_to_terminal"`) — dodaj ją do listy success:
```javascript
if (
  rawStatus === "success" ||
  rawStatus === "sent"    ||
  rawStatus === "delivered" ||
  // ← dodaj tutaj nową wartość z logów
) {
```

---

## KROK 5 — Weryfikacja sekwencyjności

**Co sprawdzić:**
Po poprawkach z KROK 3/4 — wyślij kampanię do 3 osób i obserwuj:
1. Czy w SMSMobileAPI pojawiają się kolejno (z kilkusekundowym odstępem)?
2. Czy progress bar w CRM rusza się po jednym na raz?
3. Czy statusy w tabeli kampanii zmieniają się: `pending` → `sending` → `sent`?

**Oczekiwane zachowanie:**
- SMS #1 wysłany → progress bar: 0/3 → polling (3s przerwy) → status "sent" → progress bar: 1/3
- SMS #2 wysłany → polling → "sent" → progress bar: 2/3  
- SMS #3 wysłany → polling → "sent" → progress bar: 3/3
- "Zakończono: 3 wysłanych, 0 błędów"

---

## Pliki kluczowe (zmienione w tej sesji)

| Plik | Co robi |
|---|---|
| `src/app/api/sms/send/route.ts` | Wysyła SMS, zwraca GUID, oznacza odbiorcę jako "sending" |
| `src/app/api/sms/check-status/route.ts` | Jeden call getsms → aktualizuje DB gdy potwierdzone |
| `src/app/(app)/integrations/sms/page.tsx` | Frontend: sekwencyjna pętla send → poll → next |
| `src/app/api/sms/campaigns/[id]/execute/route.ts` | Stary SSE endpoint (nieużywany już w kampaniach) |
| `src/app/api/sms/campaigns/[id]/send-one/route.ts` | Nieużywany (zastąpiony przez /api/sms/send) |
| `src/app/api/sms/campaigns/[id]/delivery-status/route.ts` | Nieużywany (zastąpiony przez /api/sms/check-status) |

---

## Notatki z sesji debugowania

- **Problem z SSE (EventSource)**: Vercel serverless zabija funkcje po ~10s, EventSource auto-reconnectuje i odpala endpoint od nowa → wszystkie SMS-y szły naraz. Wyrzucono SSE, pętla teraz działa w przeglądarce.
- **Duplikaty SMS**: Były powodowane przez race condition (podwójne kliknięcie przycisku) — naprawione przez `sendingRef.current` guard.
- **Status "Success" vs "sent"**: SMSMobileAPI zwraca `"Success"` (wielka S), nasz kod sprawdzał tylko `"sent"` — dodano `"success"` lowercase do listy.
- **Timeout → nie "sent"**: Poprzedni kod oznaczał timeout jako "wysłany" — zmieniono na "queued".
