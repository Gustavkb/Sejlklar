import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking } from 'react-native';
import { AppContext } from '../context/AppContext';
import styles from '../styles';

export default function KontakterScreen() {
  const { kontakter } = useContext(AppContext);

  function ringOp(telefon) {
    // Funktionel knap: åbner telefonens opkalds-app med nummeret udfyldt
    Linking.openURL(`tel:${telefon}`);
  }

  function renderKontakt({ item }) {
    return (
      <View style={styles.contactRow}>
        <View>
          <Text style={styles.contactName}>{item.navn}</Text>
          <Text style={styles.contactRole}>{item.rolle}</Text>
        </View>
        <TouchableOpacity
          style={styles.callButton}
          onPress={() => ringOp(item.telefon)}
        >
          <Text style={styles.callButtonText}>Ring</Text>
        </TouchableOpacity>
      </View>
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
      />
    </View>
  );
}
