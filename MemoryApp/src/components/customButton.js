import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { buttonColor, buttonTextColor, mainColor } from '../config/config'

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
  },
  container_FOLLOW: {
    backgroundColor: 'white',
    width: '50%',
  },
  container_FOLLOW2: {
    backgroundColor: 'black',
    width: '50%',
  },
  container_EDITPROFILE: {
    backgroundColor: buttonColor,
    width: '100%',
  },
  text_EDITPROFILE: {
    fontSize: 16,
    fontWeight: 'bold',
    color: buttonTextColor
  },
  text_FOLLOW: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },

})