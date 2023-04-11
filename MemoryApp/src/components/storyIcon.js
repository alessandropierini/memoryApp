import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL, ScreenHeight, ScreenWidth, defaultAvatar, mainBackground, mainColor } from '../config/config'
import moment from 'moment'


const StoryIcon = ({ navigation, idUser, image, time }) => {

    useEffect(() => {
        specificUser()
        compareTime()
    }, [])

    

    const [userPic, setUserPic] = useState(defaultAvatar)
    const [username, setUsername] = useState("")
    const specificUser = () => {
        axios.post(`${BASE_URL}/specificuser`, {
            _id: idUser
        }).then(res => {
            setUserPic(res.data.user.profilepic)
            setUsername(res.data.user.username)
        }).catch(e => {
            console.log(e.response.data.msg)
        })
    }

    const [visible, setVisible] = useState(false)
    const compareTime = () => {
        const timeSince = moment(time).fromNow()
        if (timeSince.includes("minute")) {
            setVisible(true)
        } else if (timeSince.includes('hour')) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }

    const onStoryPressed = () => {
        navigation.navigate("Story", { username, image, time })
    }

    if (visible) {
        return (
            <View style={{ paddingHorizontal: 5, alignItems: 'center', justifyContent: 'center', }}>
                <TouchableOpacity
                    style={{ height: 56, width: 56, borderRadius: 56, borderColor: mainColor, borderWidth: 2 }}
                    onPress={onStoryPressed}
                >
                    <Image style={{ height: 52, width: 52, borderRadius: 52, borderColor: 'white', borderWidth: 2 }}
                        source={{ uri: userPic }} />
                </TouchableOpacity >
                <Text style={{ fontWeight: 'bold', paddingTop: 5, fontSize: 12 }}>{username}</Text>
            </View>
        )
    }
}

export default StoryIcon

const styles = StyleSheet.create({})