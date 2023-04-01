import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { mainBackground } from '../../config/config'

const ChatScreen = () => {
  return (
    <ScrollView
      style={{ backgroundColor: mainBackground }}
      showsVerticalScrollIndicator={false}
    >
      <Text>ChatScreen</Text>
    </ScrollView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})