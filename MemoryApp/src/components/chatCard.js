import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { defaultAvatar, detailsColor, mainColor, profSize } from '../config/config'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ChatCard = ({ navigation }) => {

  onChatPressed = () => {
    navigation.navigate('Chat', { username })
  }

  const username = "Sofi"
  const time = "10 minutes ago"
  const message = "I really liked that! It looks great!"

  return (
    <TouchableOpacity
      style={{ padding: 5, borderBottomColor: detailsColor, borderBottomWidth: 0.5, flex: 1, flexDirection: 'row' }}
      onPress={onChatPressed}
    >
      <View style={{ padding: 5, }}>
        <Image
          source={{ uri: defaultAvatar }}
          style={{ height: 50, aspectRatio: 1, borderRadius: 50 }}
        />
      </View>
      <View style={{ flex: 1, padding: 5, justifyContent: 'space-evenly', }}>
        <View style={{ flexDirection: 'row', }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, }}>{username}</Text>
          <View style={{ flex: 1, alignItems: 'flex-end', }}>
            <Text style={{ alignItems: 'flex-end', color: 'gray' }}>{time}</Text>
          </View>
        </View>
        <View style={{}}>
          <Text style={{ fontStyle: 'italic', fontSize: 16 }}>{message}</Text>
        </View>
      </View>
      {/* <View style={{ justifyContent: 'center', padding: 5 }}>
        <View style={{ backgroundColor: mainColor, height: 20, aspectRatio: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>1</Text>
        </View>
      </View> */}
    </TouchableOpacity>
  )
}

export default ChatCard

const styles = StyleSheet.create({})