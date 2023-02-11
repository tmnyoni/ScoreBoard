import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen, GameScreen, ResultScreen } from './screens';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Game' component={GameScreen} />
        <Stack.Screen name='Results' component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
