import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { AppContext } from '../context/AppContext';
import styles from '../styles';

// NY SKÆRM (iteration 2): Tjek ind/ud
// Forslag fra træneren (Jesper) i opgave 1: han vil kunne se, hvem der er
// ude at sejle. Eleven vælger båd og antal i besætningen og tjekker ind,
// når båden går på vandet, og tjekker ud, når den er tilbage.

const BAADE = ['1', '2', '3', '4', '5', '6'];
const MIN_BESAETNING = 1;
const MAX_BESAETNING = 6;

// Viser et ISO-tidspunkt som fx "14.05"
function klokken(iso) {
  return new Date(iso).toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' });
}

function dato(iso) {
  return new Date(iso).toLocaleDateString('da-DK', { day: 'numeric', month: 'short' });
}

export default function TjekIndUdScreen() {
  const { aktivTur, turLog, tjekInd, tjekUd } = useContext(AppContext);
  const [valgtBaad, setValgtBaad] = useState(null);
  const [besaetning, setBesaetning] = useState(3);

  function aendrBesaetning(aendring) {
    const nyVaerdi = besaetning + aendring;
    if (nyVaerdi >= MIN_BESAETNING && nyVaerdi <= MAX_BESAETNING) setBesaetning(nyVaerdi);
  }

  function haandterTjekInd() {
    if (!valgtBaad) return;
    tjekInd(valgtBaad, besaetning);
    setValgtBaad(null);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.list}>
      {aktivTur ? (
        // --- Båden er på vandet: vis status og "Tjek ud" ---
        <View style={[styles.statusCard, styles.status_groen]}>
          <Text style={styles.statusTitle}>På vandet</Text>
          <Text style={styles.statusText}>
            Båd {aktivTur.baadNr} · {aktivTur.besaetning} personer · tjekket ind kl. {klokken(aktivTur.indTid)}
          </Text>
          <TouchableOpacity style={[styles.secondaryButton, styles.checkOutButton]} onPress={tjekUd}>
            <Text style={styles.secondaryButtonText}>Tjek ud – vi er i havn</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // --- Ingen tur i gang: vælg båd og besætning og tjek ind ---
        <View style={styles.card}>
          <Text style={styles.header}>Tjek ind</Text>

          <Text style={styles.inputLabel}>Båd nr.</Text>
          <View style={styles.chipRow}>
            {BAADE.map((nr) => (
              <TouchableOpacity
                key={nr}
                style={[styles.chip, valgtBaad === nr && styles.chipSelected]}
                onPress={() => setValgtBaad(nr)}
              >
                <Text style={[styles.chipText, valgtBaad === nr && styles.chipTextSelected]}>{nr}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.inputLabel}>Antal i besætningen</Text>
          <View style={styles.stepperRow}>
            <TouchableOpacity style={styles.stepperButton} onPress={() => aendrBesaetning(-1)}>
              <Text style={styles.stepperButtonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.stepperValue}>{besaetning}</Text>
            <TouchableOpacity style={styles.stepperButton} onPress={() => aendrBesaetning(1)}>
              <Text style={styles.stepperButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.primaryButton, !valgtBaad && styles.buttonDisabled]}
            onPress={haandterTjekInd}
            disabled={!valgtBaad}
          >
            <Text style={styles.primaryButtonText}>
              {valgtBaad ? `Tjek ind med båd ${valgtBaad}` : 'Vælg en båd'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Log over tidligere ture, gemt med AsyncStorage */}
      <Text style={[styles.header, styles.sectionHeader]}>Seneste ture</Text>
      {turLog.length === 0 ? (
        <Text style={styles.smallNote}>Ingen ture endnu.</Text>
      ) : (
        turLog.map((tur) => (
          <View key={tur.id} style={styles.contactRow}>
            <View>
              <Text style={styles.contactName}>Båd {tur.baadNr}</Text>
              <Text style={styles.contactRole}>{tur.besaetning} personer · {dato(tur.indTid)}</Text>
            </View>
            <Text style={styles.weatherValue}>
              {klokken(tur.indTid)}–{klokken(tur.udTid)}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}
