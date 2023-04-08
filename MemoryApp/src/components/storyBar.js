import { StyleSheet, Text, ScrollView, RefreshControl, View, TouchableOpacity } from 'react-native'
import React from 'react'

import { detailsColor, loaderColor, mainBackground } from '../config/config'
import { Ionicons } from '@expo/vector-icons'

const StoryBar = () => {

    return (
        <ScrollView
            style={{ padding: 10, borderBottomColor: detailsColor, borderBottomWidth: 0.25 }}
            horizontal={true}
        >
            <TouchableOpacity style={{ backgroundColor: '#D3D3D3', height: 56, width: 56, borderRadius: 56, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons
                    style={{ color: 'white', paddingRight: 0 }}
                    name='ios-hourglass-outline'
                    size={25} />
            </TouchableOpacity>
        </ScrollView>
    )
}

export default StoryBar

const styles = StyleSheet.create({})