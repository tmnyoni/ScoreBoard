import React from 'react';
import { Settings, Text, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { SvgUri } from 'react-native-svg';
import MenuIcon from './app/assets/menu.svg';

import {
  HomeScreen,
  GameScreen,
  ResultScreen,
  SettingScreen
} from './app/screens';

const Stack = createNativeStackNavigator();

export default function App() {
  const navigation = useNavigation();

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
