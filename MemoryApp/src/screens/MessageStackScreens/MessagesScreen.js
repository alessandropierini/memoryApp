import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { mainBackground } from '../../config/config'
import ChatCard from '../../components/chatCard'

const MessagesScreen = ({ navigation }) => {
  return (
    <ScrollView
      style={{ backgroundColor: mainBackground }}
      showsVerticalScrollIndicator={false}
    >
      <ChatCard 
        navigation={navigation}
      />
    </ScrollView>
  )
}

export default MessagesScreen

const styles = StyleSheet.create({})