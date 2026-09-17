import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AppContext } from '../context/AppContext';
import styles from '../styles';

export default function TilfoejPunktScreen({ navigation }) {
  const { tilfoejPunkt } = useContext(AppContext);
  const [tekst, setTekst] = useState('');

  function gem() {
    if (tekst.trim().length === 0) return;
    tilfoejPunkt(tekst.trim());
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nyt tjekpunkt</Text>

      <TextInput
        style={styles.input}
        placeholder="Fx 'Ankerlys virker'"
        value={tekst}
        onChangeText={setTekst}
      />

      <TouchableOpacity style={styles.primaryButton} onPress={gem}>
        <Text style={styles.primaryButtonText}>Gem</Text>
      </TouchableOpacity>
    </View>
  );
}
