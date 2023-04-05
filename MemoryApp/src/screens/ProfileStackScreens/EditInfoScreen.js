import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import React, { useContext } from 'react'

import axios from 'axios'

import { mainBackground, BASE_URL } from '../../config/config'
import { useForm } from 'react-hook-form'
import CustomInput from '../../components/customInput'
import CustomButton from '../../components/customButton'
import { AuthContext } from '../../context/AuthContext'

const EditInfoScreen = () => {

  const { userInfo, setIsLoading, logout } = useContext(AuthContext)

  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      currentPassword: '',
      password: '',
      passwordRepeat: ''
    }
  })
  const pwd = watch('password')

  const onUpdatePressed = (data) => {
    console.log(data)
    axios.post(`${BASE_URL}/editpassword`, {
      _id: userInfo._id,
      actual: data.currentPassword,
      new: data.password
    }).then(res => {
      console.log(res.data)
      Alert.alert(
        'Success!',
        `${res.data.msg}`,
        [{
          text: 'Close', style: 'cancel'
        }]
      )
    }).catch(e => {
      console.log(`password error: ${e.response.data.msg}`)
      Alert.alert(
        'Error',
        `${e.response.data.msg}`,
        [{
          text: 'Close', style: 'cancel'
        }]
      )
    })
  }

  const onDeletePressed = () => {
    Alert.alert(
      'WARNING',
      'You are about to delete your accont. This cannot be undone.',
      [{
        text: 'I know.', style: 'destructive',
        onPress: () =>
          Alert.alert(
            'DELETE ACCOUNT',
            'Are you sure you want to delete your account?',
            [{
              text: 'Yes, delete my account', style: 'destructive',
              onPress: () => deleteAccount()
            },
            {
              text: 'Cancel', style: 'cancel'
            }
            ]
          )
      },
      {
        text: 'Cancel', style: 'cancel'
      }
      ]
    )
  }

  const deleteAccount = () => {
    setIsLoading(true)
    axios.post(`${BASE_URL}/deleteuser`, {
      _id: userInfo._id
    }).then(res => {
      console.log(res.data.msg)
    }).catch(e => {
      console.log(e.response.data.msg)
    })
    logout()
  }

  return (
    <ScrollView
      style={{ backgroundColor: mainBackground }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.root}>

      <View style={{ marginBottom: '10%' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 27 }}>Update your Password</Text>
      </View>

      <CustomInput
        name="currentPassword"
        placeholder="Current password"
        control={control}
        secureTextEntry
        rules={{
          required: 'Please confirm your current password',
          minLength: { value: 7, message: 'Password must be at least 7 characters long' },
          maxLength: { value: 13, message: 'Password must be less than 13 characters long' }
        }}
      />

      <CustomInput
        name="password"
        placeholder="New password"
        control={control}
        secureTextEntry
        rules={{
          required: 'Password is required',
          minLength: { value: 7, message: 'Password must be at least 7 characters long' },
          maxLength: { value: 13, message: 'Password must be less than 13 characters long' }
        }}
      />

      <CustomInput
        name="passwordRepeat"
        placeholder="Confirm new password"
        control={control}
        secureTextEntry
        rules={{
          required: 'Please confirm your password',
          minLength: { value: 7, message: 'Password must be at least 7 characters long' },
          maxLength: { value: 13, message: 'Password must be less than 13 characters long' },
          validate: value =>
            value === pwd || 'Passwords do not match'
        }}
      />

      <View style={{ marginTop: 10, width: '100%', alignItems: 'center' }}>
        <CustomButton text="Update password" onPress={handleSubmit(onUpdatePressed)} type="INFO" />
      </View>
      <View style={{ marginTop: '66%', width: '100%', alignItems: 'center' }}>
        <CustomButton text="Delete account" onPress={() => { onDeletePressed() }} type="DELETE" />
      </View>

    </ScrollView>
  )
}

export default EditInfoScreen

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    marginTop: '12%'
  },
})