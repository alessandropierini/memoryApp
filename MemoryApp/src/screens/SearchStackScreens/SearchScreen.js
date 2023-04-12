import { StyleSheet, Text, View, ScrollView, TextInput, RefreshControl } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import SearchCard from '../../components/SearchCard'

import axios from 'axios'
import { BASE_URL, mainColor, ScreenWidth, mainBackground, loaderColor } from '../../config/config'
import { AuthContext } from '../../context/AuthContext'


const SearchScreen = ({ navigation }) => {

  const { userInfo } = useContext(AuthContext)

  const [data, setData] = useState([])
  const [users, setUsers] = useState([])
  const pullUsers = () => {
    axios.post(`${BASE_URL}/searchuser`).then(res => {
      setData(res.data.filter(obj => obj._id !== userInfo._id))
      console.log(data)
    }).catch(e => {
      console.log(`Search error: ${e.response.data.msg}`)
    })
  }

  const searchUser = (e) => {
    if (data) {
      if (e) {
        setUsers(data.filter(dat => dat.name.toLowerCase().includes(e.toLowerCase())))
      } else {
        setUsers([])
      }
    }
  }

  useEffect(() => {

    navigation.setOptions({
      headerTitle: () => (
        <TextInput
          placeholder='Search'
          style={styles.searchText}
          onChangeText={searchUser}
          autoCorrect={false}
          autoFocus={true}
        />
      )
    })
    pullUsers()
  }, [])

  const [refreshing, setRefreshing] = React.useState(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    pullUsers()
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
      {
        users?.map(dat => <SearchCard key={dat._id} username={dat.username} name={dat.name} navigation={navigation} profilepic={dat.profilepic} userID={dat._id} />)
      }
    </ScrollView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  searchText: {
    flex: 1,
    textAlignVertical: 'center',
    width: ScreenWidth - 65,
    borderColor: mainColor,
    borderWidth: 1,
    paddingLeft: 10,
    marginLeft: 20,
    marginBottom: 8,
    borderRadius: 20
  },
})