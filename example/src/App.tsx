import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Reader } from './components';
import Home from './screens';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const theme = {
  background: '#212529',
  onBackground: 'rgb(37, 41, 45)',
  onSurface: '#2A2E32',
  divider: 'rgba(241,245,249,.12)',
  text: {
    primary: {
      high: 'rgb(255,255,255)',
      medium: 'rgb(148, 163, 184)',
      disabled: 'rgb(156, 163, 175)',
    },
    positive: '#02b10e',
    negative: '#eb4d2f',
  },
  button: {
    secondary: {
      backgroundColor: '#fafafa',
      color: '#242424',
    },
    disabled: {
      backgroundColor: `#fafafa0f`,
      color: `#fafafa50`,
    },
    negative: {
      backgroundColor: '#b10d02',
      color: '#fcfbfb',
    },
    positive: {
      backgroundColor: '#008000',
      color: '#fcfbfb',
    },
  },
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.divider,
          borderTopWidth: 2,
          height: 56,
          paddingBottom: 6,
        },
        tabBarActiveTintColor: '#ff6900',
        tabBarInactiveTintColor: theme.text.primary.high,
        headerStyle: {
          backgroundColor: theme.background,
          borderBottomColor: theme.divider,
          borderBottomWidth: 2,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          color: theme.text.primary.high,
        },
      }}
    >
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Tabs"
        screenOptions={{
          headerStyle: {
            borderBottomWidth: 2,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: '#000',
          },
          headerTintColor: '#000',
          headerTitleAlign: 'center',
          animation: 'fade_from_bottom',
        }}
      >
        <Stack.Screen name="Reader" component={Reader} />

        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
