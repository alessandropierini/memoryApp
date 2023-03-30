import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native'
import Logo from '../../../assets/m__mLogoColors.png'
import LogoCompleto from '../../../assets/m__memoryLogoColors.png'
import React from 'react'

import CustomButton from '../../components/customButton'

const LaunchScreen = ({ navigation }) => {

  const { height } = useWindowDimensions()


  const onSignInPressed = () => {
    navigation.navigate("SignIn")
  }

  const onSignUpPressed = () => {
    navigation.navigate("SignUp")
  }


  return (
    <View style={styles.root}>
      <Image source={Logo} style={[styles.logo, { height: height * 0.3, marginBottom: height * 0.1, marginTop: height * 0.15, marginBottom: height * 0.2 }]} resizeMode="contain" />
      <CustomButton text="Sign In" onPress={onSignInPressed} />
      <CustomButton text="Sign Up" type="SECONDARY" onPress={onSignUpPressed} />
      <View style={{marginBottom: 30}}/>
      <Image source={LogoCompleto} style={[styles.logo, { height: height * 0.2 }]} resizeMode="contain" />
    </View>
  )
}

export default LaunchScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20
  },
  logo: {
    width: '70%',
    maxWidth: 500,
    maxHeight: 500
  }
})