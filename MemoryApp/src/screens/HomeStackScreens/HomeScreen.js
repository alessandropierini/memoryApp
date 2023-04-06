import { StyleSheet, Text, ScrollView, RefreshControl, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, } from 'react'
import { defaultAvatar, detailsColor, loaderColor, mainBackground, mainColor } from '../../config/config'

import axios from 'axios'
import { BASE_URL } from '../../config/config'
import MemoryCard from '../../components/memoryCard'

import { Ionicons } from '@expo/vector-icons'

const HomeScreen = ({ navigation }) => {


  const [posts, setPosts] = useState("")
  const pullPosts = async () => {
    await axios.post(`${BASE_URL}/allposts`).then(res => {
      const sortedList = res.data.post.sort((a, b) =>
        b.time.localeCompare(a.time))
      setPosts(sortedList)
    }).catch(e => {
      console.log(`Posts error: ${e.response.data.msg}`)
    })
    // await console.log(posts)
  }

  useEffect(() => {
    pullPosts()
  }, [])



  const [refreshing, setRefreshing] = React.useState(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    pullPosts()
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }, [])

  return (
    <ScrollView
      style={{ backgroundColor: mainBackground }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} style={{ backgroundColor: mainBackground }} title="Pull to refresh" tintColor={loaderColor} titleColor={loaderColor} />
      }>
      <ScrollView style={{ padding: 10, borderBottomColor: detailsColor, borderBottomWidth: 0.25 }} horizontal={true} >
        <TouchableOpacity style={{ backgroundColor: '#D3D3D3', height: 56, width: 56, borderRadius: 56, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons
            style={{ color: 'white', paddingRight: 0 }}
            name='ios-hourglass-outline'
            size={25} />
        </TouchableOpacity>
      </ScrollView>
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

export default HomeScreen

const styles = StyleSheet.create({})