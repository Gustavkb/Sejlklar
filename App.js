import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppProvider } from './context/AppContext';
import TjeklisteScreen from './screens/TjeklisteScreen';
import TilfoejPunktScreen from './screens/TilfoejPunktScreen';
import KontakterScreen from './screens/KontakterScreen';

const Tab = createBottomTabNavigator();
const TjeklisteStack = createNativeStackNavigator();

// Tjekliste + "Tilføj punkt" ligger i deres egen stack, så man kan
// navigere frem og tilbage inden for samme fane.
function TjeklisteStackNavigator() {
  return (
    <TjeklisteStack.Navigator>
      <TjeklisteStack.Screen
        name="Tjekliste"
        component={TjeklisteScreen}
        options={{ title: 'Tjekliste' }}
      />
      <TjeklisteStack.Screen
        name="TilfoejPunkt"
        component={TilfoejPunktScreen}
        options={{ title: 'Nyt punkt' }}
      />
    </TjeklisteStack.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="TjeklisteTab" component={TjeklisteStackNavigator} options={{ title: 'Tjekliste' }} />
          <Tab.Screen name="Kontakter" component={KontakterScreen} options={{ headerShown: true }} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
