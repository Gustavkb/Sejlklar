import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../context/AppContext';
import styles from '../styles';

// NY SKÆRM (iteration 2): Sejlforhold
// Henter brugerens position med GPS og live vinddata fra Open-Meteo
// (gratis vejr-API uden API-nøgle). Appen giver derefter en simpel
// "sejlklar"-vurdering baseret på vindstød.

const VEJR_CACHE_KEY = 'sejlklar_seneste_vejr';
// Bruges hvis brugeren ikke giver adgang til lokation (København)
const STANDARD_POSITION = { latitude: 55.6761, longitude: 12.5683 };

// Oversætter vindretning i grader til kompasretning
function kompasRetning(grader) {
  const retninger = ['N', 'NØ', 'Ø', 'SØ', 'S', 'SV', 'V', 'NV'];
  return retninger[Math.round(grader / 45) % 8];
}

// Simpel vurdering ud fra vindstød (m/s). Grænserne er et udgangspunkt,
// som brugerne i 2. iteration blev spurgt om.
function vurderForhold(vindstoed) {
  if (vindstoed < 8) {
    return { tekst: 'Gode forhold', forklaring: 'Let til jævn vind.', farve: 'groen' };
  }
  if (vindstoed < 12) {
    return { tekst: 'Pas på', forklaring: 'Frisk vind – kun for erfarne sejlere.', farve: 'gul' };
  }
  return { tekst: 'Bliv i havn', forklaring: 'Kraftige vindstød.', farve: 'roed' };
}

export default function VejrScreen() {
  const { fakeDoorKlik, registrerFakeDoorKlik } = useContext(AppContext);
  const [vejr, setVejr] = useState(null);
  const [henter, setHenter] = useState(false);
  const [fejl, setFejl] = useState(null);
  const [harTrykketAlarm, setHarTrykketAlarm] = useState(false);

  // Vis det sidst hentede vejr med det samme (virker også uden dækning på vandet)
  useEffect(() => {
    async function hentCache() {
      const gemt = await AsyncStorage.getItem(VEJR_CACHE_KEY);
      if (gemt) setVejr(JSON.parse(gemt));
      hentVejr();
    }
    hentCache();
  }, []);

  async function hentVejr() {
    setHenter(true);
    setFejl(null);
    try {
      // 1) Spørg om lov til at bruge lokation
      let position = STANDARD_POSITION;
      let stedNavn = 'København (standard)';
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const lokation = await Location.getCurrentPositionAsync({});
        position = lokation.coords;
        stedNavn = 'Din position';
      }

      // 2) Hent vejrdata fra Open-Meteo (vind i m/s)
      const url =
        'https://api.open-meteo.com/v1/forecast' +
        `?latitude=${position.latitude}&longitude=${position.longitude}` +
        '&current=temperature_2m,wind_speed_10m,wind_gusts_10m,wind_direction_10m' +
        '&hourly=wind_gusts_10m&forecast_hours=6' +
        '&wind_speed_unit=ms&timezone=auto';
      const svar = await fetch(url);
      const data = await svar.json();

      // 3) Pak de data ud, vi skal bruge
      const nytVejr = {
        stedNavn,
        temperatur: data.current.temperature_2m,
        vind: data.current.wind_speed_10m,
        vindstoed: data.current.wind_gusts_10m,
        retning: data.current.wind_direction_10m,
        // Højeste vindstød de næste 6 timer – vigtigt for en hel sejltur
        maxStoed6t: Math.max(...data.hourly.wind_gusts_10m),
        hentetKl: new Date().toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' }),
      };
      setVejr(nytVejr);
      await AsyncStorage.setItem(VEJR_CACHE_KEY, JSON.stringify(nytVejr));
    } catch (e) {
      setFejl('Kunne ikke hente vejret. Viser seneste kendte data.');
    }
    setHenter(false);
  }

  // Fake door: funktionen findes ikke endnu – vi måler bare interessen
  async function trykVindalarm() {
    await registrerFakeDoorKlik();
    setHarTrykketAlarm(true);
    Alert.alert(
      'Tak for din interesse!',
      'Vindalarm er under udvikling. Dit klik hjælper os med at beslutte, om vi skal bygge den.'
    );
  }

  // Vurderingen bruger det værste af "nu" og "de næste 6 timer"
  const vurdering = vejr ? vurderForhold(Math.max(vejr.vindstoed, vejr.maxStoed6t)) : null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.list}>
      <Text style={styles.header}>Sejlforhold lige nu</Text>

      {henter && !vejr && <ActivityIndicator size="large" />}
      {fejl && <Text style={styles.errorText}>{fejl}</Text>}

      {vejr && (
        <>
          <View style={[styles.statusCard, styles[`status_${vurdering.farve}`]]}>
            <Text style={styles.statusTitle}>{vurdering.tekst}</Text>
            <Text style={styles.statusText}>{vurdering.forklaring}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>{vejr.stedNavn} · hentet kl. {vejr.hentetKl}</Text>
            <View style={styles.weatherRow}>
              <Text style={styles.weatherKey}>Vind</Text>
              <Text style={styles.weatherValue}>
                {vejr.vind.toFixed(1)} m/s fra {kompasRetning(vejr.retning)}
              </Text>
            </View>
            <View style={styles.weatherRow}>
              <Text style={styles.weatherKey}>Vindstød nu</Text>
              <Text style={styles.weatherValue}>{vejr.vindstoed.toFixed(1)} m/s</Text>
            </View>
            <View style={styles.weatherRow}>
              <Text style={styles.weatherKey}>Max vindstød næste 6 t</Text>
              <Text style={styles.weatherValue}>{vejr.maxStoed6t.toFixed(1)} m/s</Text>
            </View>
            <View style={styles.weatherRow}>
              <Text style={styles.weatherKey}>Temperatur</Text>
              <Text style={styles.weatherValue}>{Math.round(vejr.temperatur)}°C</Text>
            </View>
          </View>
        </>
      )}

      {/* Ny knap 1: opdater vejret */}
      <TouchableOpacity style={styles.primaryButton} onPress={hentVejr} disabled={henter}>
        <Text style={styles.primaryButtonText}>{henter ? 'Henter…' : 'Opdater vejr'}</Text>
      </TouchableOpacity>

      {/* Ny knap 2: fake door test af en mulig premium-funktion */}
      <View style={styles.fakeDoorCard}>
        <Text style={styles.fakeDoorTitle}>Vindalarm</Text>
        <Text style={styles.fakeDoorText}>
          Få en notifikation, hvis vinden stiger, mens du er på vandet.
        </Text>
        <TouchableOpacity
          style={[styles.secondaryButton, harTrykketAlarm && styles.buttonDisabled]}
          onPress={trykVindalarm}
          disabled={harTrykketAlarm}
        >
          <Text style={styles.secondaryButtonText}>
            {harTrykketAlarm ? 'Du er skrevet op' : 'Ja tak, slå vindalarm til'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.smallNote}>Interesse registreret på denne telefon: {fakeDoorKlik}</Text>
      </View>

      <Text style={styles.smallNote}>
        Vejrdata: Open-Meteo.com. Vurderingen er vejledende – brug altid din egen sømandsskab.
      </Text>
    </ScrollView>
  );
}
