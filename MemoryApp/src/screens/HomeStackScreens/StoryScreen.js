import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { ScreenHeight, ScreenWidth, defaultAvatar } from '../../config/config'
import moment from 'moment'
import { TouchableOpacity } from 'react-native-gesture-handler'

const StoryScreen = ({ navigation, route }) => {

  const { username, image, time } = route.params

  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerTitle: () =>
        <Text style={{
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 1,
          shadowRadius: 5,
        }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>{username}</Text>
          <Text style={{ fontSize: 18, fontStyle: 'italic', color: 'white' }}>   {moment(time).fromNow()}</Text>
        </Text>,
      headerTransparent: true,
      animationEnabled: false,
      headerLeft: null,
    })
    setTimeout(() => {
      navigation.navigate('Home')
    }, 12000)
  }, [])

  const back = () => {
    navigation.navigate('Home')
  }

  return (
    <View style={{ flex: 1, }}>
      <TouchableOpacity onPress={back}>
        <Image
          style={{ height: '100%', width: '100%' }}
          source={{ uri: image }}
        />
      </TouchableOpacity>
    </View>
  )
}

export default StoryScreen

const styles = StyleSheet.create({})