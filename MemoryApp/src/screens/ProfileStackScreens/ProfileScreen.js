import { StyleSheet, Text, View, ScrollView, RefreshControl, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { Ionicons } from '@expo/vector-icons'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CustomButton from '../../components/customButton'
import { mainColor, defaultAvatar, mainTextColor, mainBackground, loaderColor, detailsColor, ScreenHeight } from '../../config/config'
import BottomSheetOptions from '../../components/BottomSheetOptions'

const ProfileScreen = ({ navigation }) => {

  const { userInfo, logout } = useContext(AuthContext)

  const BottomSheetModalRef = useRef(null)
  const snapPoints = ["40%"]
  const onMenuPressed = () => {
    BottomSheetModalRef.current?.present()
  }

  const onLogoutPressed = () => {
      Alert.alert(
          'Warning',
          'Are you sure you want to log out?',
          [
              { text: 'Cancel', style: 'cancel' },
              { text: "Log out", onPress: () => {
                BottomSheetModalRef.current?.close()
                logout()
              } }]
      )
  }

  
  const onNewMemoryPressed = () => {
    BottomSheetModalRef.current?.close()
    navigation.navigate('NewPostScreen')
  }
  const onNewMomentPressed = () => {
    console.log('memory')
  }

  const [refreshing, setRefreshing] = React.useState(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }, [])

  const onEditPressed = () => {
    BottomSheetModalRef.current?.close()
    navigation.navigate('EditProfile')
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onMenuPressed}>
          <Ionicons
            style={{ color: 'black', marginRight: 10 }}
            name={"menu"}
            size={27}
          />
        </TouchableOpacity>
      )
    })
  })

  return (
    <ScrollView
      style={{ backgroundColor: mainBackground }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} style={{ backgroundColor: mainBackground }} title="Pull to refresh" tintColor={loaderColor} titleColor={loaderColor} />
      }>
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

      <BottomSheetModal
        ref={BottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomsheet}
        backgroundStyle={{ borderRadius: 10 }}
        enablePanDownToClose={true}
        enableTouchOutsideToClose={true}
      >
        <BottomSheetOptions
          icon="add-circle-sharp"
          text="New Memory"
          onPress={onNewMemoryPressed}
        />
        <BottomSheetOptions
          icon="ios-hourglass-outline"
          text="New Moment"
          onPress={onNewMomentPressed}
        />
        <View style={{paddingTop: "30%"}}>
          <BottomSheetOptions
            icon="ios-exit-outline"
            text="Logout"
            onPress={onLogoutPressed}
            borderPosition='TOP'
          />
        </View>
      </BottomSheetModal>

    </ScrollView>




  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  bottomsheet: {
    backgroundColor: mainBackground,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
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