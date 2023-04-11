import { StyleSheet, Text, ScrollView, RefreshControl, View, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'

import { BASE_URL, detailsColor, loaderColor, mainBackground, mainColor, firebase, storageBucket_1, storageBucket_2 } from '../config/config'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import StoryIcon from './storyIcon'
import { AuthContext } from '../context/AuthContext'
import moment from 'moment'

const StoryBar = ({ navigation }) => {

    const { userInfo } = useContext(AuthContext)


    const [stories, setStories] = useState()
    const [users, setUsers] = useState()
    const pullStories = () => {
        axios.post(`${BASE_URL}/allstories`).then(res => {
            setStories(res.data.storie.sort((a, b) =>
                b.time.localeCompare(a.time)))
            setUsers(res.data.user)
        }).catch(e => {
            console.log(e.response.data.msg)
        })
    }

    useEffect(() => {
        pullStories()
    }, [])

    const [image, setImage] = useState(null)
    const onNewMomentPressed = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [9, 16],
            quality: 0.25,
        })
        if (!result.canceled) {
            setImage(result.assets[0].uri)
            Alert.alert(
                'New Moment',
                'Do you want to upload this moment?',
                [{
                    text: 'Yes',
                    onPress: () => imageUpload(),
                    style: 'close',
                }, {
                    text: 'No',
                    style: 'close'
                }]

            )
        }
    }

    const imageUpload = async () => {
        const response = await fetch(image)
        const blob = await response.blob()
        const filename = image.substring(image.lastIndexOf('/') + 1)
        var ref = firebase.storage().ref().child(filename).put(blob)
        try {
            await ref
        } catch (e) {
            console.log(e)
        }

        axios.post(`${BASE_URL}/newstorie`, {
            idUser: userInfo._id,
            time: moment(),
            image: storageBucket_1 + filename + storageBucket_2
        }).then(res => {
            console.log(res.data)
        }).catch(e => {
            console.log(e.response.data.msg)
            console.log('error')
        })
        setImage(null)
    }

    return (
        <ScrollView
            style={{ padding: 10, borderBottomColor: detailsColor, borderBottomWidth: 0.25 }}
            horizontal={true}
        >
            <View style={{ paddingHorizontal: 5, alignItems: 'center', justifyContent: 'center', }}>
                <TouchableOpacity
                    style={{ backgroundColor: '#D3D3D3', height: 56, width: 56, borderRadius: 56, alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                    onPress={onNewMomentPressed}
                >
                    <Ionicons
                        style={{ color: 'white', paddingRight: 0, position: 'absolute' }}
                        name='ios-hourglass-outline'
                        size={25} />
                    <View>
                        <View style={{ backgroundColor: mainColor, height: 20, width: 20, borderRadius: 20, borderColor: 'white', borderWidth: 2, top: 20, left: 20 }}>
                            <Ionicons
                                style={{ color: 'white', top: -2.5, right: 1.25 }}
                                name="add"
                                size={20}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', paddingTop: 5, fontSize: 12, color: 'gray' }}>Moments</Text>
            </View>
            {stories && stories.map(dat =>
                <StoryIcon
                    key={dat._id}
                    idUser={dat.idUser}
                    image={dat.image}
                    time={dat.time}
                    navigation={navigation}
                />
            )}
        </ScrollView>
    )
}

export default StoryBar

const styles = StyleSheet.create({})