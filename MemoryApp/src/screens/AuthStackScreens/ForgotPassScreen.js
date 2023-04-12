import { StyleSheet, Text, View, ScrollView, useWindowDimensions, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'
import { useForm } from 'react-hook-form'
import React,{ useState } from 'react'

import CustomButton from '../../components/customButton'
import CustomInput from '../../components/customInput'
import LogoCompleto from '../../../assets/m__memoryLogoColors.png'
import Logo from '../../../assets/m__mLogoColors.png'
import { mainBackground, mainColor, EMAIL_REGEX, BASE_URL } from '../../config/config'

import axios from 'axios'

const ForgotPassScreen = ({ navigation }) => {

  const { height } = useWindowDimensions()

  const { control, handleSubmit, formState: { errors }, watch } = useForm()
  const pwd = watch('password')

  const [loading, setLoading] = useState(false)

  const onUpdatePassword = (data) => {
    setLoading(true)
    axios.post(`${BASE_URL}/forgotpassword`, {
      username: data.username,
      email: data.email,
      password: data.password
    }).then(res => {
      Alert.alert(
        'Forgot Password',
        `Password updated successfully!`,
        [{
          text: 'Back to Sign In',
          style: 'cancel',
          onPress: () => { onBackPressed() }
        }]
      )
      setLoading(false)
    }).catch(e => {
      Alert.alert(
        'Forgot Password Error',
        `${e.response.data.msg}`,
        [{
          text: 'Close', style: 'cancel'
        }]
      )
      setLoading(false)
    })
  }

  const onBackPressed = () => {
    navigation.goBack()
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: mainBackground }}>
        <ActivityIndicator size={'large'} />
      </View>
    )
  }

  return (
    <ScrollView
      style={{ backgroundColor: mainBackground }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.root}>
        <Image source={Logo} style={[styles.logo, { height: height * 0.15, marginTop: '20%', marginBottom: '5%' }]} resizeMode="contain" />

        <Text style={{ color: mainColor, padding: '2%', marginBottom: '10%', fontWeight: 'bold', fontSize: 24 }}>Confirm your information</Text>

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
          name="password"
          placeholder="New password"
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
          placeholder="Confirm new password"
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

        <View style={{ marginTop: '15%' }} />
        <CustomButton text="Reset password" onPress={handleSubmit(onUpdatePassword)} />

        <TouchableOpacity onPress={onBackPressed}>
          <Text style={{ color: mainColor, marginBottom: '3%', marginTop: '15%' }}>Back</Text>
        </TouchableOpacity>

        <Image source={LogoCompleto} style={[styles.logo, { height: height * 0.2 }]} resizeMode="contain" />
      </View>
    </ScrollView>
  )
}

export default ForgotPassScreen

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