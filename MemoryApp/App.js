import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation';
import { AuthProvider } from './src/context/AuthContext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function App() {



  return (
    <AuthProvider>
      <BottomSheetModalProvider>

        <StatusBar style="auto" />
        <Navigation />
      </BottomSheetModalProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});
