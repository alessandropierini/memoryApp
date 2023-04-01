import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { mainBackground } from '../../config/config'

const NewPostScreen = () => {
  return (
    <ScrollView
      style={{ backgroundColor: mainBackground }}
      showsVerticalScrollIndicator={false}
    >
      <Text>NewPostScreen</Text>
    </ScrollView>
  )
}

export default NewPostScreen

const styles = StyleSheet.create({})