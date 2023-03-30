import { StyleSheet, Text, View, ScrollView, RefreshControl, Image } from 'react-native'
import React, { useState } from 'react'
import defaultAvatar from '../../../assets/default.jpg'

const mainColor = '#1B6094'

const profileImage = defaultAvatar

const ProfileScreen = () => {

  const [refreshing, setRefreshing] = React.useState(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }, [])

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} style={{ backgroundColor: 'white' }} title="Pull to refresh" tintColor={mainColor} titleColor={mainColor} />
      }>
      <View style={styles.profile}>
        <View style={styles.image}>
          <Image style={styles.profileImage} source={profileImage} resizeMode="contain" />
        </View>
      </View>
    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  profile: {
    borderBottomWidth: 2
  },
  image: {
    alignItems: 'center',
  },
  profileImage: {
    width: 200,
    borderWidth: 2,
    borderRadius: 200
  }
})