import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { AppContext } from '../context/AppContext';
import styles from '../styles';

export default function TjeklisteScreen({ navigation }) {
  const { tjekliste, toggleUdfoert } = useContext(AppContext);

  function renderPunkt({ item }) {
    return (
      // Tryk på et punkt = funktionel knap nr. 1 (skifter status)
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => toggleUdfoert(item.id)}
      >
        <View
          style={[
            styles.checkbox,
            item.udfoert && styles.checkboxChecked,
          ]}
        >
          {item.udfoert && <Text style={styles.checkboxMark}>✓</Text>}
        </View>
        <Text
          style={[
            styles.listItemText,
            item.udfoert && styles.listItemTextDone,
          ]}
        >
          {item.tekst}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tjekliste før afsejling</Text>

      <FlatList
        data={tjekliste}
        keyExtractor={(item) => item.id}
        renderItem={renderPunkt}
        contentContainerStyle={styles.list}
      />

      {/* Funktionel knap nr. 2 = navigation til "Tilføj punkt" */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('TilfoejPunkt')}
      >
        <Text style={styles.primaryButtonText}>+ Tilføj punkt</Text>
      </TouchableOpacity>
    </View>
  );
}
