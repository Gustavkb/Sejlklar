import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Globalt state for appen. I iteration 2 gemmes data med AsyncStorage,
// så brugerens tjekliste og kontakter bliver husket, når appen lukkes.

export const AppContext = createContext();

// Nøgler som data gemmes under i telefonens lokale lager
const TJEKLISTE_KEY = 'sejlklar_tjekliste';
const KONTAKTER_KEY = 'sejlklar_kontakter';
const FAKEDOOR_KEY = 'sejlklar_fakedoor_vindalarm';
const AKTIV_TUR_KEY = 'sejlklar_aktiv_tur';
const TURLOG_KEY = 'sejlklar_turlog';

// Startdata bruges kun første gang appen åbnes (når lageret er tomt)
const startTjekliste = [
  { id: '1', tekst: 'Redningsveste ombord', udfoert: false },
  { id: '2', tekst: 'Vejrudsigt tjekket', udfoert: false },
  { id: '3', tekst: 'Brændstof niveau', udfoert: false },
  { id: '4', tekst: 'Søkort opdateret', udfoert: false },
  { id: '5', tekst: 'Fortalt nogen i land, hvornår jeg er hjemme', udfoert: false },
];

const startKontakter = [
  { id: '1', navn: 'Søredning', rolle: 'Alarmcentral', telefon: '112' },
  { id: '2', navn: 'Jan Sørensen', rolle: 'Sejlklub, formand', telefon: '20304050' },
  { id: '3', navn: 'Havnekontor', rolle: 'Lokal havn', telefon: '86123456' },
];

export function AppProvider({ children }) {
  const [tjekliste, setTjekliste] = useState(startTjekliste);
  const [kontakter, setKontakter] = useState(startKontakter);
  const [fakeDoorKlik, setFakeDoorKlik] = useState(0);
  // Tjek ind/ud (forslag fra træneren i opgave 1)
  const [aktivTur, setAktivTur] = useState(null); // null = ingen er ude at sejle
  const [turLog, setTurLog] = useState([]);
  // Undgår at vi overskriver gemte data med startdata, før de er indlæst
  const [erIndlaest, setErIndlaest] = useState(false);

  // 1) Hent gemte data én gang, når appen starter
  useEffect(() => {
    async function hentData() {
      try {
        const gemtTjekliste = await AsyncStorage.getItem(TJEKLISTE_KEY);
        const gemteKontakter = await AsyncStorage.getItem(KONTAKTER_KEY);
        const gemteKlik = await AsyncStorage.getItem(FAKEDOOR_KEY);
        const gemtAktivTur = await AsyncStorage.getItem(AKTIV_TUR_KEY);
        const gemtTurLog = await AsyncStorage.getItem(TURLOG_KEY);
        if (gemtTjekliste) setTjekliste(JSON.parse(gemtTjekliste));
        if (gemteKontakter) setKontakter(JSON.parse(gemteKontakter));
        if (gemteKlik) setFakeDoorKlik(Number(gemteKlik));
        if (gemtAktivTur) setAktivTur(JSON.parse(gemtAktivTur));
        if (gemtTurLog) setTurLog(JSON.parse(gemtTurLog));
      } catch (fejl) {
        console.log('Kunne ikke hente gemte data', fejl);
      }
      setErIndlaest(true);
    }
    hentData();
  }, []);

  // 2) Gem automatisk, hver gang tjeklisten eller kontakterne ændres
  useEffect(() => {
    if (erIndlaest) AsyncStorage.setItem(TJEKLISTE_KEY, JSON.stringify(tjekliste));
  }, [tjekliste, erIndlaest]);

  useEffect(() => {
    if (erIndlaest) AsyncStorage.setItem(KONTAKTER_KEY, JSON.stringify(kontakter));
  }, [kontakter, erIndlaest]);

  useEffect(() => {
    if (erIndlaest) AsyncStorage.setItem(AKTIV_TUR_KEY, JSON.stringify(aktivTur));
  }, [aktivTur, erIndlaest]);

  useEffect(() => {
    if (erIndlaest) AsyncStorage.setItem(TURLOG_KEY, JSON.stringify(turLog));
  }, [turLog, erIndlaest]);

  // --- Tjek ind/ud ---
  // Tjek ind: båden går på vandet. Tidspunktet gemmes automatisk.
  function tjekInd(baadNr, besaetning) {
    setAktivTur({ id: Date.now().toString(), baadNr, besaetning, indTid: new Date().toISOString() });
  }

  // Tjek ud: båden er tilbage. Turen flyttes over i loggen (nyeste øverst).
  function tjekUd() {
    if (!aktivTur) return;
    const faerdigTur = { ...aktivTur, udTid: new Date().toISOString() };
    setTurLog((prev) => [faerdigTur, ...prev].slice(0, 20)); // gem de seneste 20 ture
    setAktivTur(null);
  }

  // --- Tjekliste ---
  function toggleUdfoert(id) {
    setTjekliste((prev) =>
      prev.map((punkt) =>
        punkt.id === id ? { ...punkt, udfoert: !punkt.udfoert } : punkt
      )
    );
  }

  function tilfoejPunkt(tekst) {
    const nytPunkt = { id: Date.now().toString(), tekst, udfoert: false };
    setTjekliste((prev) => [...prev, nytPunkt]);
  }

  function sletPunkt(id) {
    setTjekliste((prev) => prev.filter((punkt) => punkt.id !== id));
  }

  // Ny tur: fjern alle flueben, men behold brugerens egne punkter
  function nulstilTjekliste() {
    setTjekliste((prev) => prev.map((punkt) => ({ ...punkt, udfoert: false })));
  }

  // --- Kontakter (feedback fra opgave 1: brugeren kan selv tilføje) ---
  function tilfoejKontakt(navn, rolle, telefon) {
    const nyKontakt = { id: Date.now().toString(), navn, rolle, telefon };
    setKontakter((prev) => [...prev, nyKontakt]);
  }

  function sletKontakt(id) {
    setKontakter((prev) => prev.filter((kontakt) => kontakt.id !== id));
  }

  // --- Fake door test: tæller hvor mange gange "Vindalarm" bliver trykket ---
  async function registrerFakeDoorKlik() {
    const nytAntal = fakeDoorKlik + 1;
    setFakeDoorKlik(nytAntal);
    await AsyncStorage.setItem(FAKEDOOR_KEY, String(nytAntal));
  }

  return (
    <AppContext.Provider
      value={{
        tjekliste,
        kontakter,
        fakeDoorKlik,
        aktivTur,
        turLog,
        tjekInd,
        tjekUd,
        toggleUdfoert,
        tilfoejPunkt,
        sletPunkt,
        nulstilTjekliste,
        tilfoejKontakt,
        sletKontakt,
        registrerFakeDoorKlik,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
