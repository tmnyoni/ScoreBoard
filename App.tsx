import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen, GameScreen, ResultScreen } from './app/screens';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#FBFBFB' },
          headerTitleAlign: 'center',
          headerRight: () => (
            <Text
              style={{
                paddingVertical: 8,
                paddingHorizontal: 15,
                backgroundColor: '#33595C',
                color: '#FBFBFB',
                borderRadius: 4
              }}
            >
              Menu
            </Text>
          ),
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
