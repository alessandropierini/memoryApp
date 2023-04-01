import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { mainBackground } from '../../config/config'

const SavedScreen = () => {
  return (
    <ScrollView
      style={{ backgroundColor: mainBackground }}
      showsVerticalScrollIndicator={false}
      >
      <Text>SavedScreen</Text>
    </ScrollView>
  )
}

export default SavedScreen

const styles = StyleSheet.create({})