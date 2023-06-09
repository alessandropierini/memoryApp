import React, { useContext } from 'react'
import { SafeAreaView, StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity } from 'react-native'
import Logo from '../../../assets/m__mLogoColors.png'
import LogoCompleto from '../../../assets/m__memoryLogoColors.png'
import CustomButton from '../../components/customButton'
import CustomInput from '../../components/customInput'
import { useForm } from 'react-hook-form'
import { mainColor, defaultAvatar, mainBackground } from '../../config/config'
import { AuthContext } from '../../context/AuthContext'
import { ScrollView } from 'react-native-gesture-handler'

const SignInScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext)
  const { control, handleSubmit, formState: { errors } } = useForm()

  const { height } = useWindowDimensions()
  const onSignInPressed = (data) => {
    username = data.username
    password = data.password
    login(username, password)
    console.log(`user: ${username}, pass: ${password}`)
  }

  const onSignUpPressed = () => {
    navigation.navigate("SignUp")
  }

  const onForgotPressed = () => {
    navigation.navigate("ForgotPass")
  }

  return (
    <ScrollView
      style={{ backgroundColor: mainBackground }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.root}>

        <Image source={Logo} style={[styles.logo, { height: height * 0.3, marginBottom: '1%', marginTop: '15%' }]} resizeMode="contain" />
        <CustomInput
          name="username"
          placeholder="Username"
          control={control}
          autoCapitalize='none'

          rules={{
            required: 'Username is required'
          }}
        />
        <CustomInput
          name="password"
          placeholder="Password"
          autoCapitalize='none'
          control={control}
          secureTextEntry
          rules={{
            required: 'Password is required',
          }}
        />
        <View style={{ padding: '5%' }} />
        <CustomButton text="Sign In" onPress={handleSubmit(onSignInPressed)} />


        <TouchableOpacity onPress={onSignUpPressed}>
          <Text style={{ color: mainColor, margin: '4%' }}>Don't have an account? <Text style={styles.text}>Sign Up here!</Text></Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onForgotPressed}>
          <Text style={{ color: mainColor, padding: 5, marginBottom: '33%', fontStyle: 'italic', fontWeight: 'bold' }}>Forgot password</Text>
        </TouchableOpacity>

        <Image source={LogoCompleto} style={[styles.logo, { height: height * 0.2 }]} resizeMode="contain" />
      </View>
    </ScrollView>
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