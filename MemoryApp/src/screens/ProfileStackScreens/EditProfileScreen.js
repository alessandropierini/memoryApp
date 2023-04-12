import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import CustomButton from '../../components/customButton';
import CustomInput from '../../components/customInput';

import axios from 'axios';
import { defaultAvatar, mainBackground, mainColor, firebase, storageBucket_1, storageBucket_2, BASE_URL } from '../../config/config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from '../../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'


const EMAIL_REGEX = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

const EditProfileScreen = ({ navigation }) => {

  const { userInfo, setUserInfo } = useContext(AuthContext)
  const imageSize = 120

  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      username: userInfo.username,
      name: userInfo.name,
      email: userInfo.email,
    }
  })
  const pwd = watch('password')

  const onUpdatePressed = (data) => {
    console.log(data)
    axios.post(`${BASE_URL}/edituser`, {
      _id: userInfo._id,
      username: data.username,
      name: data.name,
      email: data.email
    }).then(res => {
      // console.log(res.data)
      AsyncStorage.setItem('userInfo', JSON.stringify(res.data.user))
      Alert.alert(
        `Profile updated!`
      )
    })
    updateUserInfo()
  }

  useEffect(() => {
    if (userInfo.profilepic) {
      setImage(userInfo.profilepic)
    } else {
      setImage(defaultAvatar)
    }
  }, [])

  const [image, setImage] = useState(defaultAvatar)
  const [imageChosen, setImageChosen] = useState(false)
  const onImagePressed = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri)
      setImageChosen(true)
      console.log(image)
    }
  }

  const onCancelImagePressed = () => {
    setImage(defaultAvatar)
    setImageChosen(false)
  }

  const onUpdateImagePressed = async () => {
    setIsLoading(true)
    const response = await fetch(image)
    const blob = await response.blob()
    const filename = image.substring(image.lastIndexOf('/') + 1)
    var ref = firebase.storage().ref().child(filename).put(blob)

    try {
      await ref
    } catch (e) {
      console.log(e)
    }

    var imageURI = storageBucket_1 + filename + storageBucket_2
    console.log(imageURI)

    axios.post(`${BASE_URL}/profilephoto`, {
      _id: userInfo._id,
      profilepic: storageBucket_1 + filename + storageBucket_2
    }).then(res => {
    AsyncStorage.setItem(`@memoryapp:userInfo`, JSON.stringify({profilepic:storageBucket_1 + filename + storageBucket_2}))
      Alert.alert(
        `Profile picture updated!`
      )
    }).catch(e => {
      console.log(`profile error: ${e.response.data.msg}`)
    })
    setIsLoading(false)
  }

  const updateUserInfo = () => {
    axios.post(`${BASE_URL}/specificuser`, {
      _id: userInfo._id
    }).then(res => {
      // console.log(res.data.user)
      setUserInfo(res.data.user)
      AsyncStorage.setItem('userInfo', JSON.stringify(res.data.user))
    }).catch(e => {
      console.log(`specific user error: ${e.response.data.msg}`)
    })
  }

  const [isLoading, setIsLoading] = useState(false)
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: mainBackground }}>
        <ActivityIndicator size={'large'} />
      </View>
    )
  }

  return (
    <ScrollView
      style={{
        backgroundColor: mainBackground
      }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.root}>
      <View>
        <TouchableOpacity style={{ position: 'relative' }} onPress={onImagePressed} >
          <Image
            style={{ height: imageSize, width: imageSize, borderRadius: imageSize, borderColor: mainColor, borderWidth: 5, opacity: 1, marginBottom: imageChosen ? 16 : 40 }}
            source={{ uri: image }}
          />
          <MaterialCommunityIcons name="image" size={40} color={mainColor} style={{ position: 'absolute', paddingLeft: 80, paddingTop: 84 }} />
        </TouchableOpacity>
      </View>
      {imageChosen &&
        <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
          <TouchableOpacity onPress={onUpdateImagePressed}>
            <Text style={{ fontWeight: 'bold' }}>Update Image</Text>
          </TouchableOpacity>
          <Text style={{ paddingHorizontal: 5 }}>|</Text>
          <TouchableOpacity onPress={onCancelImagePressed}>
            <Text>Clear Image</Text>
          </TouchableOpacity>
        </View>}

      <CustomInput
        name="username"
        placeholder="Username"
        control={control}
        rules={{
          required: 'Username is required',
          minLength: { value: 3, message: 'Username must be at least 3 characters long' },
          maxLength: { value: 13, message: 'Username must be less than 13 characters long' }
        }}
      />

      <CustomInput
        name="name"
        placeholder="Name"
        control={control}
        rules={{
          required: 'Name is required',
          minLength: { value: 3, message: 'Name must be at least 3 characters long' },
          maxLength: { value: 25, message: 'Name must be less than 25 characters long' }
        }}
      />

      <CustomInput
        name="email"
        placeholder="email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: { value: EMAIL_REGEX, message: 'Invalid email' }
        }}
      />


      <View style={{ marginTop: 10, width: '100%', alignItems: 'center' }}>
        <CustomButton text="Update Now!" onPress={handleSubmit(onUpdatePressed)} />
      </View>
      <View style={{ width: '80%', alignItems: 'center', marginTop: '50%' }}>
        <CustomButton text="Account Information" onPress={() => { navigation.navigate('EditInfo') }} type="FOLLOW2" />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    paddingTop: 20,
    margin: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 500,
    maxHeight: 500
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: mainColor,
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: mainColor,

  },
})

export default EditProfileScreen