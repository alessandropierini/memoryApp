import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { detailsColor } from '../config/config'
import React from 'react'

const BottomSheetOptions = ({icon, text, onPress, borderPosition = "BOTTOM"}) => {
  return (
    <View >
    <View style={{paddingHorizontal: 20}}>
      <TouchableOpacity
        onPress={onPress}
      >
        <View style={[styles.optionStyles, styles[`border_${borderPosition}`]]}>
          <Ionicons
            style={{ color: 'black', paddingRight: 12 }}
            name={icon}
            size={25} />
          <Text style={{
            fontWeight: 'bold',
            fontSize: 24,
          }}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default BottomSheetOptions

const styles = StyleSheet.create({
    optionStyles: {
        flexDirection: 'row', padding: 10
    },
    border_TOP: {
        borderColor: { detailsColor }, borderTopWidth: 0.5,
    },
    border_BOTTOM: {
        borderColor: { detailsColor }, borderBottomWidth: 0.5,
    }
})