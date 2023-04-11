import { StyleSheet, Text, View, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'
import React from 'react'

import HomeStack from './HomeStack';
import SearchStack from './SearchStack';
import MessagesStack from './MessagesStack';
import NewPostScreen from '../../screens/SharedScreens/NewPostScreen';
import ProfileStack from './ProfileStack';
import logo from '../../../assets/m__mLogoColors.png'

const Tabs = createBottomTabNavigator()
const TabIconSize = 32

const mainColor = '#1B6094'

const HomeTabs = () => {

    return (
        <Tabs.Navigator initialRouteName='HomeStack' screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            headerBackTitleVisible: false,
            headerTintColor: 'black',
        }}>
            <Tabs.Screen name="HomeStack" component={HomeStack} options={{
                tabBarIcon: ({ focused }) => (
                    <Ionicons
                        style={{ color: 'black' }}
                        name={focused ? "home" : "home-outline"}
                        size={TabIconSize} />
                ),
            }} />
            <Tabs.Screen name="SearchStack" component={SearchStack} options={{
                tabBarIcon: ({ focused }) => (
                    <Ionicons
                        style={{ color: 'black' }}
                        name={focused ? "md-search-sharp" : "md-search-outline"}
                        size={TabIconSize} />
                ),
            }} />
            <Tabs.Screen name="NewPostScreen" component={NewPostScreen} options={{
                headerShown: true,
                headerLeft: () => (
                    <Image style={{ width: 30, marginLeft: 13, marginBottom: 6 }} source={logo} resizeMode="contain" />
                ),
                title: "New Moment",
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 24,
                },
                headerStyle: {
                },
                tabBarIcon: ({ focused }) => (
                    <Ionicons
                        style={{ color: 'black' }}
                        name={focused ? "add-circle-sharp" : "add-circle-outline"}
                        size={TabIconSize} />
                ),
            }} />
            <Tabs.Screen name="InboxStack" component={MessagesStack} options={(route) => ({
                tabBarIcon: ({ focused }) => (
                    <Ionicons
                        style={{ color: 'black' }}
                        name={focused ? "ios-chatbubbles-sharp" : "ios-chatbubbles-outline"}
                        size={TabIconSize} />
                ),
            })} />
            <Tabs.Screen name="ProfileStack" component={ProfileStack} options={{
                tabBarIcon: ({ focused }) => (
                    <Ionicons
                        style={{ color: 'black' }}
                        name={focused ? "md-person-circle-sharp" : "md-person-circle-outline"}
                        size={TabIconSize} />
                ),
            }} />
        </Tabs.Navigator>
    )
}

export default HomeTabs

const styles = StyleSheet.create({})