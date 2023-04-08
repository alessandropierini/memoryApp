import { StyleSheet, Text, ScrollView, RefreshControl, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, } from 'react'
import { loaderColor, mainBackground } from '../../config/config'

import axios from 'axios'
import { BASE_URL } from '../../config/config'
import MemoryCard from '../../components/memoryCard'
import StoryBar from '../../components/storyBar'


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
    pullPosts()
    setRefreshing(true)
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
      <StoryBar />
      {posts && posts.map(dat =>
        <MemoryCard
          key={dat._id}
          postID={dat._id}
          image={dat.image}
          owner={dat.owner}
          time={dat.time}
          caption={dat.caption}
          comment={14}
          like={10}
          isUser={false}
          navigation={navigation}
        />)}
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})