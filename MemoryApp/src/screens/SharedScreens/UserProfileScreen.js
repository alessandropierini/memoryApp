import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect } from 'react'
import ProfCard from '../../components/profCard'
import { mainBackground, defaultAvatar, loaderColor } from '../../config/config'
import MemoryCard from '../../components/memoryCard'

const UserProfileScreen = ({ route, navigation }) => {

  const { name, username, posts } = route.params

  const [refreshing, setRefreshing] = React.useState(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }, [])

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
    <ScrollView
      style={{ backgroundColor: mainBackground }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} style={{ backgroundColor: mainBackground }} title="Pull to refresh" tintColor={loaderColor} titleColor={loaderColor} />
      }>
      <ProfCard postslength = { posts.length } name={name} username={username} />
        {posts && posts.map(dat =>
          <MemoryCard
            image={dat.image}
            owner={dat.owner}
            time={dat.time}
            caption={dat.caption}
            comment={14}
            like={10}
            prof={defaultAvatar}
            isUser={false}
            navigation={navigation}
          />)}
    </ScrollView>
  )
}

export default UserProfileScreen

const styles = StyleSheet.create({})