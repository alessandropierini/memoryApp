import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { imageHeight, imageWidth } from '../config/config'

const ImageSlider = ({ data }) => {
    return (
        <View>
            <Image src={data} style={{ height: imageHeight, width: imageWidth, borderRadius: 10, marginBottom: -200 }} />
        </View>
    )
}

export default ImageSlider

const styles = StyleSheet.create({})