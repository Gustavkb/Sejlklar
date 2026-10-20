import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, Alert } from 'react-native';
import { AppContext } from '../context/AppContext';
import styles from '../styles';

export default function KontakterScreen({ navigation }) {
  const { kontakter, sletKontakt } = useContext(AppContext);

  function ringOp(telefon) {
    // Funktionel knap: åbner telefonens opkalds-app med nummeret udfyldt
    Linking.openURL(`tel:${telefon}`);
  }

  // Iteration 2: hold fingeren på en kontakt for at slette den
  function bekraeftSlet(kontakt) {
    Alert.alert('Slet kontakt?', `Vil du slette ${kontakt.navn}?`, [
      { text: 'Annuller', style: 'cancel' },
      { text: 'Slet', style: 'destructive', onPress: () => sletKontakt(kontakt.id) },
    ]);
  }

  function renderKontakt({ item }) {
    return (
      <TouchableOpacity style={styles.contactRow} onLongPress={() => bekraeftSlet(item)}>
        <View style={styles.flexOne}>
          <Text style={styles.contactName}>{item.navn}</Text>
          <Text style={styles.contactRole}>{item.rolle}</Text>
        </View>
        <TouchableOpacity
          style={styles.callButton}
          onPress={() => ringOp(item.telefon)}
        >
          <Text style={styles.callButtonText}>Ring</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Vigtige kontakter</Text>

      <FlatList
        data={kontakter}
        keyExtractor={(item) => item.id}
        renderItem={renderKontakt}
        contentContainerStyle={styles.list}
        ListFooterComponent={
          <Text style={styles.smallNote}>Hold fingeren på en kontakt for at slette den.</Text>
        }
      />

      {/* Ny knap (iteration 2): navigation til "Tilføj kontakt" */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('TilfoejKontakt')}
      >
        <Text style={styles.primaryButtonText}>+ Tilføj kontakt</Text>
      </TouchableOpacity>
    </View>
  );
}
