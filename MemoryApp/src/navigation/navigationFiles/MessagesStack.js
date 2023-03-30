import { StyleSheet, Text, View, Image } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import MessagesScreen from '../../screens/MessageStackScreens/MessagesScreen'
import ChatScreen from '../../screens/MessageStackScreens/ChatScreen'
import UserProfileScreen from '../../screens/SharedScreens/UserProfileScreen'
import logo from '../../../assets/m__mLogoColors.png'

const Stack = createStackNavigator()

const MessagesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Messages" component={MessagesScreen} options={{
        headerLeft: () => (
            <Image style={{ width: 30, marginLeft: 13, marginBottom: 6 }} source={logo} resizeMode="contain" />
        ),
        title: "Chats",
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
        },
      }} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="ChatUserProfile" component={UserProfileScreen} />
    </Stack.Navigator>
  )
}

export default MessagesStack

const styles = StyleSheet.create({})