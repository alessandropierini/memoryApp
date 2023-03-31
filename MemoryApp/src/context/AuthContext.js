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
        axios.post(`${BASE_URL}/signup`, {
            username,
            password
        }).then(res => {
            console.log(res)
            // let userInfo = res
            // setUserInfo(userInfo)
            // setUserToken(userInfo.token)
            // AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
            // AsyncStorage.setItem('userToken', userInfo.token)

        }).catch(e => {
            console.log(`login error: ${e}`)
        })
        setUserToken('adsfasdf')
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
            setIsLoading(true)
            let userToken = await AsyncStorage.getItem('userToken')
            let userInfo = await AsyncStorage.getItem('userInfo')
            userInfo = JSON.parse(userInfo)

            if (userInfo) {
                setUserInfo(userInfo)
                setUserToken(userToken)
            }

            setUserToken(userToken)
            setIsLoading(false)
        } catch (e) {
            console.log(`isLogged error: ${e}`)
        }
    }

    useEffect(() => {
        isLoggedIn()
    }, [])

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
            {children}
        </AuthContext.Provider>
    )
}