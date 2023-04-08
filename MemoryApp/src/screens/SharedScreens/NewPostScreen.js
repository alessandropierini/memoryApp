import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Image, TextInput, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import React, { useContext, useState } from 'react'
import moment from 'moment'

import axios from 'axios'
import { BASE_URL, ScreenHeight } from '../../config/config'

import { mainBackground, ScreenWidth, imageWidth, imageHeight, firebase, storageBucket_1, storageBucket_2 } from '../../config/config'
import CustomButton from '../../components/customButton'
import { AuthContext } from '../../context/AuthContext'

const NewPostScreen = ({ navigation }) => {

  const { userInfo } = useContext(AuthContext)

  const [uploading, setUploading] = useState(false)

  const [images, setImages] = useState([])
  const [image, setImage] = useState(null)
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 0.25,
      allowsMultipleSelection: true,
      selectionLimit: 1
    })
    setImage(result.assets[0].uri); //check if obsolete
    // console.log(result.assets[0].uri); //check if obsolete
    {
      result.assets.map((image) => (
        images.push(image.uri)
      )
      )
    }
    // console.log(images[0])
  }

  const [caption, setCaption] = useState("")
  const onPostPressed = async () => {
    setUploading(true)
    if (!caption.trim().length) {
      setUploading(false)
      Alert.alert(
        'Error',
        'Empty caption!',
        [
          { text: 'Close', style: 'close' },
        ]
      )
    } else if (images.length < 1) {
      setUploading(false)
      Alert.alert(
        'Error',
        `You haven't selected an image!`,
        [
          { text: 'Close', style: 'close' },
        ]
      )
    } else {
      setUploading(true)
      const response = await fetch(images[0])
      const blob = await response.blob()
      const filename = images[0].substring(images[0].lastIndexOf('/') + 1)
      var ref = firebase.storage().ref().child(filename).put(blob)

      // const response2 = await fetch(images[1])
      // const blob2 = await response2.blob()
      // const filename2 = images[1].substring(images[1].lastIndexOf('/') + 1)
      // var ref2 = firebase.storage().ref().child(filename2).put(blob2)

      try {
        await ref
        // await ref2
      } catch (e) {
        console.log(e)
      }

      var trimmedCaption = caption.trim()
      var instant = moment()
      var imageURI = storageBucket_1 + filename + storageBucket_2
      // console.log({trimmedCaption, instant, imageURI})
      axios.post(`${BASE_URL}/newpost`, {
        image: imageURI,
        caption: trimmedCaption,
        time: instant,
        owner: userInfo._id
      }).then(res => {
        console.log(`New post created by: ${userInfo.username}`)
      }).catch(e => {
        console.log(`Post error: ${e.response.data.msg}`)
      })
      setUploading(false)

      // var imageURI2 = storageBucket_1 + filename2 + storageBucket_2
      // console.log({ trimmedCaption, instant, imageURI, userInfo })
      navigation.navigate('HomeStack', { screen: 'Home' })
      this.textInput.clear()
      setImage(null)
      setImages([])
    }
  }


  const renderSlider = ({ item, index }) => {
    return <ImageSlider data={item} />
  }

  //X button resets images
  const onImagePressed = () => {
    setImage(false)
    setImages([])
  }

  if (uploading) {
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

      <View style={{ alignItems: 'center', position: 'relative' }}>
        {image ?
          <View style={{
            borderRadius: 10,
            marginLeft: 10,
            marginRight: 10,
            flex: 1,
            alignItems: 'center',

          }}>
            <Image
              source={{
                uri: image
              }}
              style={styles.imageButton}
            />
            <TouchableOpacity
              onPress={onImagePressed}
              style={{
                position: 'absolute',
                alignSelf: 'flex-end',
                paddingRight: 40,
                paddingTop: 40

              }}>
              <MaterialCommunityIcons name="close" size={30} color={'white'} style={{
                backgroundColor: 'rgba(100, 100, 100, .6)',
                borderRadius: 30,
              }} />
            </TouchableOpacity>
          </View>
          :
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <MaterialCommunityIcons name="image-plus" size={50} color={'white'} />
          </TouchableOpacity>}

      </View>
      <View style={styles.root}>
        <TextInput
          ref={input => { this.textInput = input }}
          placeholder='Caption your memory...'
          placeholderTextColor={'gray'}
          maxLength={100}
          style={styles.searchText}
          multiline
          autoCorrect
          autoCapitalize='sentences'
          numberOfLines={5}
          blurOnSubmit={true}
          autoFocus={true}
          onChangeText={newText => setCaption(newText)}
        />
      </View>
      <View style={styles.button}>
        <CustomButton text="Post this Now!" type="PRIMARY" onPress={onPostPressed} />
      </View>
    </ScrollView>
  )
}

export default NewPostScreen

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    paddingTop: 10
  },
  searchText: {
    flex: 2,
    backgroundColor: 'white',
    paddingLeft: 25,
    textAlignVertical: 'top',
    height: 120,
    width: ScreenWidth,
    marginBottom: 12,
    color: 'black',
    paddingTop: 15,
    paddingRight: 25,
    fontSize: 18,
    marginTop: 10,
    paddingBottom: 25
  },
  button: {
    alignItems: 'center',
    paddingBottom: 25
  },
  imageButton: {
    backgroundColor: '#d9d9d9',
    height: imageHeight,
    width: imageWidth,
    borderRadius: 10,
    marginTop: '8%',
    marginLeft: '8%',
    marginRight: '8%',
    marginBottom: '1%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
})