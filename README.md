# Sejlklar

React Native-app (Expo) til fritidssejlere: tjek at båden er klar, se om
vejret er til at sejle i, og hav de vigtigste kontakter ét sted.

## Iteration 2 (godkendelsesopgave 2) – hvad er nyt?

| Ændring | Hvorfor |
|---|---|
| **Data gemmes med AsyncStorage** | Tjekliste, kontakter og seneste vejr huskes, når appen lukkes. |
| **Ny skærm: Sejlforhold** | Henter telefonens lokation (expo-location) og live vind fra [Open-Meteo](https://open-meteo.com) og giver en grøn/gul/rød vurdering ud fra vindstød nu og de næste 6 timer. |
| **Ny skærm: Tjek ind/ud** | Trænerens forslag fra opgave 1: vælg båd nr. og antal i besætningen, tjek ind når båden går på vandet og ud når den er tilbage. Turene gemmes i en log. |
| **Ny skærm: Tilføj kontakt** | Feedback fra opgave 1: brugeren skal selv kunne udvide kontaktlisten. |
| **Fake door: Vindalarm** | Knap til en funktion der ikke findes endnu. Klik tælles og gemmes, så vi kan måle interessen (Lean Startup / traction test). |
| **Nye knapper** | "Opdater vejr", "Ja tak, slå vindalarm til", "+ Tilføj kontakt", "Start ny tur (nulstil)". Hold fingeren på et punkt/kontakt for at slette. |
| **Fremskridt** | Tjeklisten viser "3 af 5 punkter klar" / "Du er sejlklar!". |

## Skærme og navigation

Bundfane-navigation med stacks indeni:

- **Tjekliste** (stack): Tjekliste → Nyt punkt
- **Tjek ind/ud**: båd, besætning og log over ture
- **Vejr**: sejlforhold, vurdering og fake door
- **Kontakter** (stack): Kontakter → Ny kontakt

## Struktur

```
App.js                    navigation (tabs + stacks)
context/AppContext.js     fælles state + AsyncStorage
screens/                  én fil per skærm
styles.js                 al styling samlet i én fil
```

## Kom i gang

```bash
npm install
npx expo start
```

Scan QR-koden med Expo Go på telefonen, eller tryk `i` i terminalen for at
åbne i iOS-simulatoren. Giv appen adgang til lokation for vejret på din position (ellers bruges
København).

## Demovideo
- Iteration 2: https://www.loom.com/share/8950eaaf1ca8449da1f06767d644947d
- Iteration 1: https://www.loom.com/share/7e723c6c920e4fc582de0ea774ff1792

## GitHub
https://github.com/Gustavkb/Sejlklar
