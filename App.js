import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppProvider } from './context/AppContext';
import TjeklisteScreen from './screens/TjeklisteScreen';
import TilfoejPunktScreen from './screens/TilfoejPunktScreen';
import VejrScreen from './screens/VejrScreen';
import KontakterScreen from './screens/KontakterScreen';
import TilfoejKontaktScreen from './screens/TilfoejKontaktScreen';
import TjekIndUdScreen from './screens/TjekIndUdScreen';
import { NAVY } from './styles';

const Tab = createBottomTabNavigator();
const TjeklisteStack = createNativeStackNavigator();
const KontakterStack = createNativeStackNavigator();

// Stack i "Tjekliste"-fanen: liste -> tilføj punkt
function TjeklisteStackNavigator() {
  return (
    <TjeklisteStack.Navigator>
      <TjeklisteStack.Screen name="Tjekliste" component={TjeklisteScreen} options={{ title: 'Tjekliste' }} />
      <TjeklisteStack.Screen name="TilfoejPunkt" component={TilfoejPunktScreen} options={{ title: 'Nyt punkt' }} />
    </TjeklisteStack.Navigator>
  );
}

// Iteration 2: Kontakter har nu også en stack, så man kan tilføje egne kontakter
function KontakterStackNavigator() {
  return (
    <KontakterStack.Navigator>
      <KontakterStack.Screen name="KontaktListe" component={KontakterScreen} options={{ title: 'Kontakter' }} />
      <KontakterStack.Screen name="TilfoejKontakt" component={TilfoejKontaktScreen} options={{ title: 'Ny kontakt' }} />
    </KontakterStack.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: NAVY,
            // Ingen ikoner – kun tekst i fanerne
            tabBarIconStyle: { display: 'none' },
            tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
          }}>
          <Tab.Screen
            name="TjeklisteTab"
            component={TjeklisteStackNavigator}
            options={{ title: 'Tjekliste' }}
          />
          <Tab.Screen
            name="TjekIndUd"
            component={TjekIndUdScreen}
            options={{ title: 'Tjek ind/ud', headerShown: true }}
          />
          <Tab.Screen
            name="Vejr"
            component={VejrScreen}
            options={{ title: 'Vejr', headerTitle: 'Sejlforhold', headerShown: true }}
          />
          <Tab.Screen
            name="KontakterTab"
            component={KontakterStackNavigator}
            options={{ title: 'Kontakter' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
