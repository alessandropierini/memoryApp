import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { createContext, useState, useEffect } from 'react'
import { BASE_URL } from '../config/config'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [userInfo, setUserInfo] = useState(null)

    const login = (username, password) => {
        setIsLoading(true)
        axios.post(`${BASE_URL}/signin`, {
            username,
            password
        }).then(res => {
            console.log(res.data)
            let userInfo = res.data.user
            setUserInfo(userInfo)
            setUserToken(res.data.token)
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
            AsyncStorage.setItem('userToken', res.data.token)

        }).catch(e => {
            console.log(`login error: ${e.response.data.msg}`)
            Alert.alert(
                'Sign In Error',
                `${e.response.data.msg}`,
                [{
                  text: 'Close', style: 'cancel'
                }]
              )
        })
        setIsLoading(false)
    }

    const signup = (username, name, email, password) => {
        setIsLoading(true)
        axios.post(`${BASE_URL}/signup`, {
            username,
            name,
            email,
            password
        }).then(res => {
            console.log(res.data)
            let userInfo = res.data.Newuser
            setUserInfo(userInfo)
            setUserToken(res.data.token)
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
            AsyncStorage.setItem('userToken', res.data.token)
        }).catch(e => {
            console.log(`Register error: ${e.response.data.msg}`)
            Alert.alert(
                'Sign Up Error',
                `${e.response.data.msg}`,
                [{
                  text: 'Close', style: 'cancel'
                }]
              )
        })
        setIsLoading(false)
    }

    const logout = () => {
        setIsLoading(true)
        setUserToken(null)
        AsyncStorage.removeItem('userToken')
        AsyncStorage.removeItem('userInfo')
        setIsLoading(false)
    }

    const isLoggedIn = async () => {
        try {
            let userToken = await AsyncStorage.getItem('userToken')
            let userInfo = await AsyncStorage.getItem('userInfo')
            userInfo = JSON.parse(userInfo)
            console.log(userToken)
            console.log(userInfo)

            if (userInfo) {
                setUserInfo(userInfo)
                setUserToken(userToken)
            }
            setUserToken(userToken)
        } catch (e) {
            console.log(`isLogged error: ${e}`)
        }
    }

    useEffect(() => {
        isLoggedIn()
    }, [])

    return (
        <AuthContext.Provider value={{ login, signup, logout, isLoading, userToken, userInfo, setIsLoading }}>
            {children}
        </AuthContext.Provider>
    )
}