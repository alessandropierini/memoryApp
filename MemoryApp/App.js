import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation';

export default function App() {
  return (
      <Navigation />
  );
}

const styles = StyleSheet.create({});
