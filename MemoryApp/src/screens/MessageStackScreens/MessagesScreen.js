import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { mainBackground } from '../../config/config'

const MessagesScreen = () => {
  return (
    <ScrollView
      style={{ backgroundColor: mainBackground }}
      showsVerticalScrollIndicator={false}
    >
      <Text>MessagesScreen</Text>
    </ScrollView>
  )
}

export default MessagesScreen

const styles = StyleSheet.create({})