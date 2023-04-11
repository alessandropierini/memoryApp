import { StyleSheet, Text, View, ScrollView, RefreshControl, Image, TouchableOpacity, Alert, } from 'react-native'
import React, { useState, useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import moment from 'moment'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CustomButton from '../../components/customButton'
import { mainColor, defaultAvatar, mainTextColor, mainBackground, loaderColor, detailsColor, ScreenHeight, firebase, storageBucket_1, storageBucket_2, BASE_URL } from '../../config/config'

import { BottomSheetModal } from '@gorhom/bottom-sheet'
import BottomSheetOptions from '../../components/BottomSheetOptions'

import ProfCard from '../../components/profCard'
import axios from 'axios'
import MemoryCard from '../../components/memoryCard'

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
        {
          text: "Log out", onPress: () => {
            BottomSheetModalRef.current?.close()
            logout()
          }
        }]
    )
  }


  const onNewMemoryPressed = () => {
    BottomSheetModalRef.current?.close()
    navigation.navigate('NewPostScreen')
  }

  const [image, setImage] = useState(null)
  const onNewMomentPressed = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 0.1,
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
    BottomSheetModalRef.current?.close()
  }

  const [refreshing, setRefreshing] = React.useState(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    specificUser()

    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }, [])

  const onEditPressed = () => {
    BottomSheetModalRef.current?.close()
    navigation.navigate('EditProfile')
  }

  useEffect(() => {
    specificUser()
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
  }, [])

  const [username, setUsername] = useState(userInfo.username)
  const [posts, setPosts] = useState(null)
  const [postslength, setPostslegnth] = useState(0)
  const specificUser = () => {
    axios.post(`${BASE_URL}/specificuser`, {
      _id: userInfo._id
    }).then(res => {
      const sortedList = res.data.post.sort((a, b) =>
        b.time.localeCompare(a.time))
      setPosts(sortedList)
      setPostslegnth(res.data.post.length)
      // console.log(res.data)
      // console.log(posts)
    }).catch(e => {
      console.log(`specific user error: ${e.response.data.msg}`)
    })
  }


  return (
    <ScrollView
      style={{ backgroundColor: mainBackground }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} style={{ backgroundColor: mainBackground }} title="Pull to refresh" tintColor={loaderColor} titleColor={loaderColor} />
      }>

      <ProfCard userID={userInfo._id} postslength={postslength} profilepic={userInfo.profilepic} username={userInfo.username} isLoggedUser={true} onPress={onEditPressed} />

      {posts && posts.map(dat =>
        <MemoryCard
          key={dat._id}
          postID={dat._id}
          image={dat.image}
          owner={dat.owner}
          time={dat.time}
          caption={dat.caption}
          comment={14}
          like={10}
          prof={defaultAvatar}
          isUser={false}
          navigation={navigation}
        />)}


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
        <View style={{ alignItems: 'center', padding: 2 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 12, fontStyle: 'italic' }}>Moments will disappear after 24 hours</Text>
        </View>
        <View style={{ paddingTop: "30%" }}>
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

})