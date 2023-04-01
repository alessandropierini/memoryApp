import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Image, TextInput } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import * as ImagePicker from 'expo-image-picker'
import React, { useContext, useState } from 'react'
import moment from 'moment'

import { mainBackground, ScreenWidth, imageWidth, imageHeight } from '../../config/config'
import CustomButton from '../../components/customButton'
import ImageSlider from '../../components/ImageSlider'
import { AuthContext } from '../../context/AuthContext'

const NewPostScreen = ({ navigation }) => {

  const { setIsLoading } = useContext(AuthContext)

  const [caption, setCaption] = useState("")
  const onPostPressed = () => {
    setIsLoading(true)
    if (!caption.trim().length) {
      setIsLoading(false)
      Alert.alert(
        'Error',
        'Empty caption!',
        [
          { text: 'Close', style: 'close' },
        ]
      )
    } else if (images.length < 1) {
      setIsLoading(false)
      Alert.alert(
        'Error',
        `You haven't selected an image!`,
        [
          { text: 'Close', style: 'close' },
        ]
      )
    } else {
      setIsLoading(false)
      var trimmedCaption = caption.trim()
      var instant = moment()
      console.log({ trimmedCaption, instant, images })
      navigation.navigate('HomeStack', { screen: 'Home' })      
      this.textInput.clear()
      setImage(null)
      setImages([])
    }
  }

  const [images, setImages] = useState([])
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
    setImage(result.assets[0].uri); //check if obsolete
    {
      result.assets.map((image) => (
        images.push(image.uri)
      )
      )
      console.log(images)
    }
  }
  const renderSlider = ({ item, index }) => {
    return <ImageSlider data={item} />
  }

  const onImagePressed = () => {
    setImage(false)
    setImages([])
  }

  return (
    <ScrollView
      style={{ backgroundColor: mainBackground }}
      showsVerticalScrollIndicator={false}
    >

      <View style={{ alignItems: 'center', position: 'relative' }}>
        {image ?
          <View style={{ paddingTop: 25 }}>
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={images}
              renderItem={renderSlider}
              sliderWidth={ScreenWidth}
              itemWidth={ScreenWidth - 200}
            />
            <TouchableOpacity
              onPress={onImagePressed}
              style={{
                position: 'absolute',
                alignSelf: 'flex-end',
                paddingRight: 10,
                paddingTop: 10

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
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
})