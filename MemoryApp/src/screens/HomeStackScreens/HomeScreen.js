import { StyleSheet, Text, ScrollView, RefreshControl, View } from 'react-native'
import React, { useState, useEffect, } from 'react'
import { defaultAvatar, loaderColor, mainBackground, mainColor } from '../../config/config'

import axios from 'axios'
import { BASE_URL } from '../../config/config'
import MemoryCard from '../../components/memoryCard'

const HomeScreen = () => {


  const [posts, setPosts] = useState("")
  const pullPosts = async () => {
    await axios.post(`${BASE_URL}/allposts`).then(res => {
      const sortedList = res.data.sort((a,b)=>
      b.time.localeCompare(a.time))
      setPosts(sortedList)
    }).catch(e => {
      console.log(`Posts error: ${e.response.data.msg}`)
    })
    await console.log(posts)
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
        />)}
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})