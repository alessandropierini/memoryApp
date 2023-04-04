import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import CustomButton from './customButton'
import { mainColor, mainTextColor, defaultAvatar, mainBackground, detailsColor } from '../config/config'

const ProfCard = ({ username, onPress, isLoggedUser = false }) => {

    return (
        <View style={styles.userInfoSection}>
            <View style={styles.container}>
                <View style={{ paddingRight: 0 }}>
                    <Image
                        style={{ height: 100, width: 100, borderRadius: 100, borderColor: 'white', borderWidth: 2 }}
                        source={{ uri: defaultAvatar }}
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
                    <Text style={{ color: mainTextColor }}>26</Text>
                </View>

                <View style={styles.followInfo} >
                    <Text style={{ fontWeight: 'bold', color: mainTextColor }}>Following</Text>
                    <Text style={{ color: mainTextColor }}>198</Text>
                </View>

                <View style={styles.followInfo}>
                    <Text style={{ fontWeight: 'bold', color: mainTextColor }}>Followers</Text>
                    <Text style={{ color: mainTextColor }}>8.3M</Text>
                </View>
            </View>
            <View style={{ alignItems: 'center', flex: 1, paddingBottom: 10 }}>
                {isLoggedUser ? <CustomButton text="Edit Profile" onPress={onPress} type="EDITPROFILE" /> : 
                <CustomButton text="Follow" onPress={onPress} type="EDITPROFILE" />}
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