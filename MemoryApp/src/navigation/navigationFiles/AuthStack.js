import { StyleSheet, Text, View } from 'react-native'

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LaunchScreen from '../../screens/AuthStackScreens/LaunchScreen'
import SignInScreen from '../../screens/AuthStackScreens/SignInScreen'
import SignUpScreen from '../../screens/AuthStackScreens/SignUpScreen'
import ForgotPassScreen from '../../screens/AuthStackScreens/ForgotPassScreen'

const Stack = createStackNavigator()

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName='Launch' screenOptions={{ headerShown: false, headerTransparent: true, }}>
            <Stack.Screen name="Launch" component={LaunchScreen} options={{title: "Launch"}}/>
            <Stack.Screen name="SignIn" component={SignInScreen}/>
            <Stack.Screen name="SignUp" component={SignUpScreen}/>
            <Stack.Screen name="ForgotPass" component={ForgotPassScreen}/>
        </Stack.Navigator>
    )
}

export default AuthStack

const styles = StyleSheet.create({})