import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useContext } from 'react'

import ProfileScreen from '../../screens/ProfileStackScreens/ProfileScreen'
import PostScreen from '../../screens/SharedScreens/PostScreen'
import EditProfileScreen from '../../screens/ProfileStackScreens/EditProfileScreen'
import SavedScreen from '../../screens/SharedScreens/SavedScreen'
import logo from '../../../assets/m__mLogoColors.png'
import { AuthContext } from '../../context/AuthContext'
import { mainBackground } from '../../config/config'


const Stack = createStackNavigator()

const ProfileStack = () => {

  const onMenuPressed = () => {
    console.log(userInfo)
    logout()
  }

  const { logout, userInfo } = useContext(AuthContext)

  return (
    <Stack.Navigator screenOptions={{
      headerBackTitleVisible: true,
      headerTintColor: 'black',
    }}>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{
        headerStyle: {
          backgroundColor: mainBackground,
          shadowColor: 'transparent', // this covers iOS
          elevation: 0, // this covers Android
        },
        headerLeft: () => (
          <Image style={{ width: 30, marginLeft: 13, marginBottom: 6 }} source={logo} resizeMode="contain" />
        ),
        title: `${userInfo.name}`,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
        },
        headerRight: () => (
          <TouchableOpacity onPress={onMenuPressed}>
            <Ionicons
              style={{ color: 'black', marginRight: 10 }}
              name={"menu"}
              size={27}
            />
          </TouchableOpacity>
        )
      }} />
      <Stack.Screen name="ProfilePost" component={PostScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options = {{
        title: 'Edit Profile',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
        },
      }}/>
      <Stack.Screen name="ProfileSaved" component={SavedScreen} />
    </Stack.Navigator>
  )
}

export default ProfileStack

const styles = StyleSheet.create({})