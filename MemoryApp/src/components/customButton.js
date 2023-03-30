import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const mainColor = '#1B6094'

const CustomButton = ({ onPress, text, type = "PRIMARY" }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  container: {
    width: '80%',
    padding: 15,
    paddingVertical: 10,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5
  },
  container_PRIMARY: {
    backgroundColor: mainColor,
  },
  container_SECONDARY: {
    backgroundColor: 'white',
    borderColor: mainColor,
    borderWidth: 2
  },
  text: {
    fontWeight: 'bold',
    color: 'white'
  },
  text_SECONDARY: {
    color: mainColor
  }

})