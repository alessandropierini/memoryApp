import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

import { mainBackground } from '../../config/config'
import { useForm } from 'react-hook-form'
import CustomInput from '../../components/customInput'
import CustomButton from '../../components/customButton'

const EditInfoScreen = () => {

  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      password: '',
      passwordRepeat: ''
    }
  })
  const pwd = watch('password')

  const onUpdatePressed = (data) => {
    console.log(data)
    if (errors) { } else {
      console.warn('edited')
    }
  }

  return (
    <ScrollView
      style={{ backgroundColor: mainBackground }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.root}>

      <View style={{marginBottom: '35%'}}>
        <Text style={{fontWeight: 'bold', fontSize: 24}}>Update your Password</Text>
      </View>

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
        <CustomButton text="Update Now!" onPress={handleSubmit(onUpdatePressed)} type="INFO" />
      </View>
      <View style={{ marginTop: '50%', width: '100%', alignItems: 'center' }}>
        <CustomButton text="Delete account" onPress={handleSubmit(onUpdatePressed)} type="DELETE" />
      </View>

    </ScrollView>
  )
}

export default EditInfoScreen

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    paddingTop: '15%',
    margin: 20,
  },
})