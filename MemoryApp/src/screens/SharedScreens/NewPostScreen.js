import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, Alert, Image, TextInput } from 'react-native'
import React, { useState } from 'react'

import { mainBackground } from '../../config/config'
import CustomButton from '../../components/customButton'
import * as ImagePicker from 'expo-image-picker'
import moment from 'moment'

const ScreenWidth = Dimensions.get('window').width

const imageHeight = 1920/5
const imageWidth = 1080/5

const NewPostScreen = () => {

  const [caption, setCaption] = useState("")
  const onPostPressed = () => {
    if (!caption.trim().length) {
      Alert.alert(
        'Error',
        'Empty caption!',
        [
          { text: 'Close', style: 'close' },
        ]
      )
    } else {
      var trimmedCaption = caption.trim()
      var instant = moment()
      console.log({ trimmedCaption, instant })
      // nav.navigate('HomeScreen')
      this.textInput.clear()
      setImage(null)
    }
  }

  const [image, setImage] = useState(null)
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [2, 3],
      quality: 1,
      allowsMultipleSelection: true, 
      selectionLimit: 4
    })
    setImage(result.assets[0].uri);
    console.log(result.assets.length())
  }

  const onImagePressed = () => {
    setImage(false)
  }

  return (
    <ScrollView
      style={{ backgroundColor: mainBackground }}
      showsVerticalScrollIndicator={false}
    >

      <View style={{ alignItems: 'center', position: 'relative' }}>
        {image ?
          <View style={{
            height: imageHeight,
            width: imageWidth,
            borderRadius: 10,
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 15,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',

          }}>
            <Image
              source={{
                uri: image
              }}
              style={[styles.imageButton, { position: 'absolute' }]}
            />
            <TouchableOpacity
              onPress={onImagePressed}
              style={{
                position: 'absolute',
                alignSelf: 'flex-end',
                paddingBottom: 435,
                paddingRight: 10,

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
          maxLength={150}
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
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 15,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  },
})