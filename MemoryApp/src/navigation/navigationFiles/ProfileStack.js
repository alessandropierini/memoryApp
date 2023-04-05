import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useContext, useRef } from 'react'

import ProfileScreen from '../../screens/ProfileStackScreens/ProfileScreen'
import PostScreen from '../../screens/SharedScreens/PostScreen'
import EditProfileScreen from '../../screens/ProfileStackScreens/EditProfileScreen'
import SavedScreen from '../../screens/SharedScreens/SavedScreen'
import logo from '../../../assets/m__mLogoColors.png'
import { AuthContext } from '../../context/AuthContext'
import { mainBackground } from '../../config/config'
import EditInfoScreen from '../../screens/ProfileStackScreens/EditInfoScreen'


const Stack = createStackNavigator()

const ProfileStack = () => {

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
      }} />
      <Stack.Screen name="ProfilePost" component={PostScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{
        title: 'Edit Profile',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
        },
      }} />
      <Stack.Screen name="ProfileSaved" component={SavedScreen} />
      <Stack.Screen name="EditInfo" component={EditInfoScreen} />
    </Stack.Navigator>
  )
}

export default ProfileStack

const styles = StyleSheet.create({})