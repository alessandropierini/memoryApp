import { StyleSheet, Text, View, TouchableOpacity, useWindowDimensions, Image } from 'react-native'
import Logo from '../../../assets/m__mLogoColors.png'
import LogoCompleto from '../../../assets/m__memoryLogoColors.png'
import React, { useContext } from 'react'
import CustomButton from '../../components/customButton'
import CustomInput from '../../components/customInput'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../context/AuthContext'
import { ScrollView } from 'react-native-gesture-handler'

import { mainColor, defaultAvatar } from '../../config/config'

const EMAIL_REGEX = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

const SignUpScreen = ({ navigation }) => {
  const { signup } = useContext(AuthContext)


  const { control, handleSubmit, formState: { errors }, watch } = useForm()
  const pwd = watch('password')
  const { height } = useWindowDimensions()

  const onSignInPressed = () => {
    navigation.navigate("SignIn")
  }

  const onSignUpPressed = (data) => {
    console.log(data)
    username = data.username
    name = data.displayName
    email = data.email
    password = data.password
    signup(username, name, email, password)
    console.log(`user: ${username}, name: ${name}, email: ${email} pass: ${password}`)

  }

  return (
    <ScrollView>

      <View style={styles.root}>
        <Image source={Logo} style={[styles.logo, { height: height * 0.15, marginTop: height * 0.05, marginBottom: height * 0.005 }]} resizeMode="contain" />

        <CustomInput
          name="username"
          placeholder="Username"
          autoCapitalize='none'
          control={control}
          rules={{
            required: 'Username is required',
            minLength: { value: 3, message: 'Username must be at least 3 characters long' },
            maxLength: { value: 13, message: 'Username must be less than 13 characters long' }
          }}
        />
        <CustomInput
          name="displayName"
          placeholder="Display Name"
          autoCapitalize='none'
          control={control}
          rules={{
            required: 'Display name is required',
            minLength: { value: 3, message: 'Name must be at least 3 characters long' },
            maxLength: { value: 25, message: 'Name must be less than 25 characters long' }
          }}
        />
        <CustomInput
          name="email"
          placeholder="email"
          autoCapitalize='none'
          keyboardType='email-address'
          control={control}
          rules={{
            required: 'Email is required',
            pattern: { value: EMAIL_REGEX, message: 'Invalid email' }
          }}
        />
        <CustomInput
          name="password"
          placeholder="Password"
          control={control}
          autoCapitalize='none'
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: { value: 7, message: 'Password must be at least 7 characters long' },
            maxLength: { value: 13, message: 'Password must be less than 13 characters long' },
          }}
        />
        <CustomInput
          name="passwordRepeat"
          placeholder="Confirm password"
          control={control}
          secureTextEntry
          autoCapitalize='none'
          rules={{
            required: 'Please confirm your password',
            minLength: { value: 7, message: 'Password must be at least 7 characters long' },
            maxLength: { value: 13, message: 'Password must be less than 13 characters long' },
            validate: value =>
              value === pwd || 'Passwords do not match'
          }}
        />

        <View style={{ padding: 30 }} />
        <CustomButton text="Sign Up" onPress={handleSubmit(onSignUpPressed)} />

        <TouchableOpacity onPress={onSignInPressed}>
          <Text style={{ color: mainColor, padding: 5, marginBottom: 80 }}>Have an account? <Text style={styles.text}>Sign In here!</Text></Text>
        </TouchableOpacity>

        <Image source={LogoCompleto} style={[styles.logo, { height: height * 0.2 }]} resizeMode="contain" />
      </View>
    </ScrollView>
  )
}

export default SignUpScreen

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