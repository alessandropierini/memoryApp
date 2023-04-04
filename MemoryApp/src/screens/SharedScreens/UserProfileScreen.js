import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import ProfCard from '../../components/profCard'
import { mainBackground } from '../../config/config'

const UserProfileScreen = ({ route, navigation }) => {

  const { name, username } = route.params

  useEffect(() => {
    navigation.setOptions({
      title: `${name}`,
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
      },
      headerStyle: {
        backgroundColor: mainBackground,
        shadowColor: 'transparent', // this covers iOS
        elevation: 0, // this covers Android
      },
    })
  }, [])

  return (
    <ScrollView>
      <ProfCard name={name} username={username}/>
    </ScrollView>
  )
}

export default UserProfileScreen

const styles = StyleSheet.create({})