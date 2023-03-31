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


const Stack = createStackNavigator()

const ProfileStack = () => {

const { logout } = useContext(AuthContext)

  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{
        headerLeft: () => (
          <Image style={{ width: 30, marginLeft: 13, marginBottom: 6 }} source={logo} resizeMode="contain" />
        ),
        title: "Your Profile",
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
        },
        headerRight: () => (
          <TouchableOpacity onPress={() => {logout()}}>
            <Ionicons
              style={{ color: 'black', marginRight: 10 }}
              name={"menu"}
              size={27}
            />
          </TouchableOpacity>
        )
      }} />
      <Stack.Screen name="ProfilePost" component={PostScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ProfileSaved" component={SavedScreen} />
    </Stack.Navigator>
  )
}

export default ProfileStack

const styles = StyleSheet.create({})