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
        <View style={{ flexDirection: 'column', alignItems: 'center', paddingTop: 20 }}>
          <Text style={{
            shadowColor: 'black',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 1,
            shadowRadius: 5,
            paddingBottom: 15
          }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>{username}</Text>
            <Text style={{ fontSize: 18, fontStyle: 'italic', color: 'white' }}>   {moment(time).fromNow()}</Text>
          </Text>
          <Text style={{
            shadowColor: 'black',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 1,
            shadowRadius: 5,
            fontWeight: 'bold',
            fontSize: 12,
            color: 'white'
          }}
          >Tap to close</Text>
        </View>,
      headerTransparent: true,
      animationEnabled: false,
      headerLeft: null,
    })
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