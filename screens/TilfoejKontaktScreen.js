import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AppContext } from '../context/AppContext';
import styles from '../styles';

// NY SKÆRM (iteration 2): Brugeren kan selv tilføje kontakter.
// Direkte svar på feedback fra godkendelsesopgave 1.

export default function TilfoejKontaktScreen({ navigation }) {
  const { tilfoejKontakt } = useContext(AppContext);
  const [navn, setNavn] = useState('');
  const [rolle, setRolle] = useState('');
  const [telefon, setTelefon] = useState('');

  function gem() {
    // Navn og telefonnummer er påkrævet, rolle er valgfri
    if (navn.trim() === '' || telefon.trim() === '') {
      Alert.alert('Mangler oplysninger', 'Udfyld både navn og telefonnummer.');
      return;
    }
    tilfoejKontakt(navn.trim(), rolle.trim() || 'Kontakt', telefon.trim());
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ny kontakt</Text>

      <Text style={styles.inputLabel}>Navn</Text>
      <TextInput
        style={styles.input}
        placeholder="Fx 'Mor' eller 'Havnefoged Aarhus'"
        value={navn}
        onChangeText={setNavn}
      />

      <Text style={styles.inputLabel}>Rolle (valgfri)</Text>
      <TextInput
        style={styles.input}
        placeholder="Fx 'Ved hvornår jeg er hjemme'"
        value={rolle}
        onChangeText={setRolle}
      />

      <Text style={styles.inputLabel}>Telefon</Text>
      <TextInput
        style={styles.input}
        placeholder="Fx 20304050"
        keyboardType="phone-pad"
        value={telefon}
        onChangeText={setTelefon}
      />

      <TouchableOpacity style={styles.primaryButton} onPress={gem}>
        <Text style={styles.primaryButtonText}>Gem kontakt</Text>
      </TouchableOpacity>
    </View>
  );
}
