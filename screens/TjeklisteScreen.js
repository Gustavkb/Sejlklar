import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { AppContext } from '../context/AppContext';
import styles from '../styles';

export default function TjeklisteScreen({ navigation }) {
  const { tjekliste, toggleUdfoert, sletPunkt, nulstilTjekliste } = useContext(AppContext);

  // Iteration 2: vis fremskridt, så brugeren hurtigt kan se om båden er "sejlklar"
  const antalUdfoert = tjekliste.filter((punkt) => punkt.udfoert).length;
  const alleUdfoert = tjekliste.length > 0 && antalUdfoert === tjekliste.length;

  function bekraeftSlet(punkt) {
    Alert.alert('Slet punkt?', punkt.tekst, [
      { text: 'Annuller', style: 'cancel' },
      { text: 'Slet', style: 'destructive', onPress: () => sletPunkt(punkt.id) },
    ]);
  }

  function renderPunkt({ item }) {
    return (
      // Tryk = skift status, hold fingeren nede = slet punktet
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => toggleUdfoert(item.id)}
        onLongPress={() => bekraeftSlet(item)}
      >
        <View style={[styles.checkbox, item.udfoert && styles.checkboxChecked]}>
          {item.udfoert && <Text style={styles.checkboxMark}>✓</Text>}
        </View>
        <Text style={[styles.listItemText, item.udfoert && styles.listItemTextDone]}>
          {item.tekst}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tjekliste før afsejling</Text>

      <View style={[styles.progressBox, alleUdfoert && styles.progressBoxDone]}>
        <Text style={styles.progressText}>
          {alleUdfoert ? 'Du er sejlklar!' : `${antalUdfoert} af ${tjekliste.length} punkter klar`}
        </Text>
      </View>

      <FlatList
        data={tjekliste}
        keyExtractor={(item) => item.id}
        renderItem={renderPunkt}
        contentContainerStyle={styles.list}
        ListFooterComponent={
          <Text style={styles.smallNote}>Hold fingeren på et punkt for at slette det.</Text>
        }
      />

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('TilfoejPunkt')}
      >
        <Text style={styles.primaryButtonText}>+ Tilføj punkt</Text>
      </TouchableOpacity>

      {/* Ny knap (iteration 2): nulstil fluebenene før næste tur */}
      <TouchableOpacity style={styles.secondaryButton} onPress={nulstilTjekliste}>
        <Text style={styles.secondaryButtonText}>Start ny tur (nulstil)</Text>
      </TouchableOpacity>
    </View>
  );
}
