import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TouchableOpacity, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import CustomButton from '../../components/customButton';
import CustomInput from '../../components/customInput';
import { defaultAvatar, mainBackground, mainColor, firebase, storageBucket_1, storageBucket_2 } from '../../config/config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from '../../context/AuthContext'


const EMAIL_REGEX = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

const EditProfileScreen = ({ navigation }) => {

  const { userInfo, setIsLoading } = useContext(AuthContext)
  const imageSize = 120


  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      username: userInfo.username,
      name: userInfo.name,
      email: userInfo.email,
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
    setImage(result.assets[0].uri)
    setImageChosen(true)
    console.log(image)
  }

  const onCancelImagePressed = () => {
    setImage(defaultAvatar)
    setImageChosen(false)
  }

  const onUpdateImagePressed = async () => {
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
    Alert.alert(
      'Profile updated!'
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
        <CustomButton text="Update Now!" onPress={handleSubmit(onUpdatePressed)}/>
      </View>
      <View style={{width: '80%', alignItems: 'center', marginTop: '50%'}}>
        <CustomButton text="Account Information" onPress={() => {navigation.navigate('EditInfo')}} type="FOLLOW2" />
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