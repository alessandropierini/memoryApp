import { StyleSheet, Text, View, ScrollView, RefreshControl, Image } from 'react-native'
import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CustomButton from '../../components/customButton'
import { mainColor, defaultAvatar, mainTextColor, mainBackground, loaderColor, detailsColor } from '../../config/config'

const ProfileScreen = ({ navigation }) => {

  const { userInfo } = useContext(AuthContext)

  const [refreshing, setRefreshing] = React.useState(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }, [])

  const onEditPressed = () => {
    navigation.navigate('EditProfile')
  }

  return (
    <ScrollView
    style={{backgroundColor: mainBackground}}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} style={{ backgroundColor: mainBackground }} title="Pull to refresh" tintColor={loaderColor} titleColor={loaderColor} />
      }>
      <View style={styles.userInfoSection}>
        <View style={styles.container}>
          <View style={{ paddingRight: 5 }}>
            <Image
              style={{ height: 100, width: 100, borderRadius: 100, borderColor: 'white', borderWidth: 2 }}
              source={{ uri: defaultAvatar }}
            />
          </View>
        </View>

        <View style={styles.rightCont}>
          <View style={styles.topCont}>
            <Text style={styles.idText}>@{userInfo.username}</Text>
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
          <CustomButton text="Edit Profile" onPress={onEditPressed} type="EDITPROFILE" />
        </View>
      </View>
    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    backgroundColor: 'white',
    borderBottomColor: detailsColor,
    borderBottomWidth: 0.25
  },
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingTop: 5,
    paddingBottom: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: mainTextColor,
  },
  followInfo: {
    alignItems: 'center',
    paddingHorizontal: 10
  },
  root: {
    alignItems: 'center',
    padding: 5,
  },
  bio: {
    flex: 5,
    marginTop: 20,
    marginBottom: 1,
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
    color: mainTextColor,
  },
  rightCont: {
    flex: 1,
    paddingBottom: 6,
    marginLeft: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  nameCont: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingLeft: 0

  },
  topCont: {
    flex: 1,
    alignItems: 'center'
  },
  nameText: {
    color: mainTextColor,
    marginRight: 5,
    fontSize: 24,
    fontWeight: 'bold',
  },
  idText: {
    marginLeft: 0,
    color: mainTextColor,
  },
})