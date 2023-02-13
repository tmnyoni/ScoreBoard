
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  HomeScreen,
  GameScreen,
  ResultScreen,
  SettingScreen
} from './app/screens';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#FBFBFB' },
          headerTitleAlign: 'center'
        }}
      >
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            title: "New Match",
          }}
        />
        <Stack.Screen name='Game' component={GameScreen} />
        <Stack.Screen name='Results' component={ResultScreen} />
        <Stack.Screen name='Settings' component={SettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
