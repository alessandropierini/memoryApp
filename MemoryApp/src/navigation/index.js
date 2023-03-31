import React, { useContext } from 'react'
import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import AuthStack from './navigationFiles/AuthStack'
import { NavigationContainer } from '@react-navigation/native'
import { enableScreens } from 'react-native-screens';
import HomeTabs from './navigationFiles/HomeTabs';
import { AuthContext } from '../context/AuthContext';


const Navigation = () => {

    const { isLoading, userToken } = useContext(AuthContext)

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} />
            </View>
        )
    }

    return (
        <NavigationContainer styles={{}}>
            {userToken !== null ? <HomeTabs /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default Navigation

const styles = StyleSheet.create({})