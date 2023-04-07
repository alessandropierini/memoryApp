import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'

import CustomButton from './customButton'
import { mainColor, mainTextColor, defaultAvatar, mainBackground, detailsColor, BASE_URL, } from '../config/config'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

const ProfCard = ({ profilepic, username, onPress, isLoggedUser = false, postslength = 0, userID }) => {

    const { userInfo } = useContext(AuthContext)
    
    const [followingNum, setFollowingNum] = useState(0)
    const [followersNum, setFollowersNum] = useState(0)

    const getFollowersInfo = () => {
        axios.post(`${BASE_URL}/getfollowers`, {
            FollowedUser: userID
        }).then(res => {
            // console.log('followed')
            // console.log(res.data.length)
            setFollowersNum(res.data.length)
            if (res.data.some(user => user.FollowingUser === userInfo._id)) {
                setToggle(true)
              } else {
                setToggle(false)
              }
        }).catch(e => {
            console.log(e.response.msg)
        })
    }

    const getFollowingInfo = () => {
        console.log(userID)
        axios.post(`${BASE_URL}/getfollowing`, {
            FollowingUser: userID
        }).then(res => {
            // console.log('following')
            // console.log(res.data.length)
            setFollowingNum(res.data.length)
        }).catch(e => {
            console.log(e.response.msg)
        })
    }

    const [toggle, setToggle] = useState(false)

    const FollowAction = () => {
        axios.post(`${BASE_URL}/follow`, {
            FollowingUser: userInfo._id,
            FollowedUser: userID
        }).then(res => {
            console.log('followAction')
            console.log(res.data)
            getFollowersInfo()
            getFollowingInfo()
        }).catch(e => {
            console.log('following error')
        })
    }


    useEffect(() => {
        getFollowersInfo()
        getFollowingInfo()
    }, [])

    return (
        <View>

            <View style={styles.userInfoSection}>
                <View style={styles.container}>
                    <View style={{ paddingRight: 0 }}>
                        <Image
                            style={{ height: 100, width: 100, borderRadius: 100, borderColor: mainColor, borderWidth: 1, marginBottom: 15 }}
                            source={{ uri: profilepic }}
                        />
                    </View>
                </View>

                <View style={styles.rightCont}>
                    <View style={styles.topCont}>
                        <Text style={styles.idText}>@{username}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 15, alignItems: 'center', justifyContent: 'space-evenly', marginHorizontal: -20 }}>

                    <View style={styles.followInfo} >
                        <Text style={{ fontWeight: 'bold', color: mainTextColor }}>Memories</Text>
                        <Text style={{ color: mainTextColor }}>{postslength}</Text>
                    </View>

                    <View style={styles.followInfo} >
                        <Text style={{ fontWeight: 'bold', color: mainTextColor }}>Following</Text>
                        <Text style={{ color: mainTextColor }}>{followingNum}</Text>
                    </View>

                    <View style={styles.followInfo}>
                        <Text style={{ fontWeight: 'bold', color: mainTextColor }}>Followers</Text>
                        <Text style={{ color: mainTextColor }}>{followersNum}</Text>
                    </View>
                </View>
                <View style={{ alignItems: 'center', flex: 1, paddingBottom: 10 }}>
                    {
                        isLoggedUser
                            ?
                            <CustomButton text="Edit Profile" onPress={onPress} type="EDITPROFILE" />
                            :

                            <View>
                                {toggle ?
                                    <View style={{ flexDirection: 'row', }}>
                                        <CustomButton text="Message" onPress={onPress} type="MESSAGE" />
                                        <CustomButton text="Following" onPress={FollowAction} type="FOLLOWING" />
                                    </View>
                                    :
                                    <View style={{ flexDirection: 'row', }}>
                                        <CustomButton text="Follow" onPress={FollowAction} type="NOTFOLLOWED" />
                                    </View>
                                }
                            </View>
                    }
                </View>
            </View>

        </View>
    )
}

export default ProfCard

const styles = StyleSheet.create({
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
        backgroundColor: mainBackground,
        borderBottomColor: detailsColor,
        borderBottomWidth: 0.25
    },
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        paddingTop: 5,
        paddingBottom: 1,
    },
    followInfo: {
        alignItems: 'center',
        paddingHorizontal: 10
    },
    topCont: {
        flex: 1,
        alignItems: 'center'
    },
    idText: {
        marginLeft: 0,
        color: mainTextColor,
        fontWeight: 'bold',
    },
})