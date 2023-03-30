import { SafeAreaView, StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity } from 'react-native'
import Logo from '../../../assets/m__mLogoColors.png'
import LogoCompleto from '../../../assets/m__memoryLogoColors.png'
import React from 'react'
import CustomButton from '../../components/customButton'
import CustomInput from '../../components/customInput'
import { useForm } from 'react-hook-form'

const mainColor = '#1B6094'

const SignInScreen = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm()

  const { height } = useWindowDimensions()
  const onSignInPressed = (data) => {
    console.log(data)
  }

  const onSignUpPressed = () => {
    navigation.navigate("SignUp")
  }

  return (
    <View style={styles.root}>
      <Image source={Logo} style={[styles.logo, { height: height * 0.3, marginTop: height * 0.15, marginBottom: height * 0.05 }]} resizeMode="contain" />

      <CustomInput
        name="username"
        placeholder="Username"
        control={control}
        rules={{
          required: 'Username is required'
        }}
      />
      <CustomInput
        name="password"
        placeholder="Password"
        control={control}
        secureTextEntry
        rules={{
          required: 'Password is required',
        }}
      />
      <View style={{padding: 10}}/>
      <CustomButton text="Sign In" onPress={handleSubmit(onSignInPressed)}/>


      <TouchableOpacity onPress={onSignUpPressed}>
        <Text style={{color: mainColor, padding: 5, marginBottom: 45 }}>Don't have an account? <Text style={styles.text}>Sign Up here!</Text></Text>
      </TouchableOpacity>

      <Image source={LogoCompleto} style={[styles.logo, { height: height * 0.2 }]} resizeMode="contain" />
    </View>
  )
}

export default SignInScreen

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
  },
  text: {
    fontWeight: 'bold',
  }
})