import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { mainBackground } from '../../config/config'

const SavedScreen = () => {
  return (
    <ScrollView
      style={{ backgroundColor: mainBackground }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 24, color: 'gray' }}>
          No memories saved
        </Text>
      </View>
    </ScrollView>
  )
}

export default SavedScreen

const styles = StyleSheet.create({})