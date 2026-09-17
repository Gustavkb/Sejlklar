import React, { createContext, useState } from 'react';

// Simpelt globalt state uden ekstern state-management-lib.
// I en rigtig version kunne dette gemmes med AsyncStorage, så data
// ikke forsvinder når appen lukkes.

export const AppContext = createContext();

const startTjekliste = [
  { id: '1', tekst: 'Redningsveste ombord', udfoert: true },
  { id: '2', tekst: 'Vejrudsigt tjekket', udfoert: true },
  { id: '3', tekst: 'Brændstof niveau', udfoert: false },
  { id: '4', tekst: 'Søkort opdateret', udfoert: false },
];

const startKontakter = [
  { id: '1', navn: 'Søredning', rolle: 'Alarmcentral', telefon: '112' },
  { id: '2', navn: 'Jan Sørensen', rolle: 'Sejlklub, formand', telefon: '20304050' },
  { id: '3', navn: 'Havnekontor', rolle: 'Lokal havn', telefon: '86123456' },
];

export function AppProvider({ children }) {
  const [tjekliste, setTjekliste] = useState(startTjekliste);
  const [kontakter, setKontakter] = useState(startKontakter);

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

  function tilfoejKontakt(navn, rolle, telefon) {
    const nyKontakt = { id: Date.now().toString(), navn, rolle, telefon };
    setKontakter((prev) => [...prev, nyKontakt]);
  }

  return (
    <AppContext.Provider
      value={{ tjekliste, kontakter, toggleUdfoert, tilfoejPunkt, tilfoejKontakt }}
    >
      {children}
    </AppContext.Provider>
  );
}
