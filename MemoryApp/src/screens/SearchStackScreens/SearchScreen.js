import { StyleSheet, Text, View, ScrollView, TextInput, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchCard from '../../components/SearchCard'

import axios from 'axios'
import { BASE_URL, mainColor, ScreenWidth, mainBackground, loaderColor } from '../../config/config'
import { AuthContext } from '../../context/AuthContext'


const SearchScreen = ({ navigation }) => {

  const { userInfo } = useContext(AuthContext)


  const [data, setData] = useState("")
  const [users, setUsers] = useState([])
  const pullUsers = async () => {
    await axios.post(`${BASE_URL}/searchuser`).then(res => {
      setData(res.data)
    }).catch(e => {
      console.log(`Search error: ${e.response.data.msg}`)
    })
    await console.log(data)
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

  const searchUser = (e) => {
    if (data) {
      if (e) {
        setUsers(data.filter(dat => dat.name.toLowerCase().includes(e.toLowerCase())))
      } else {
        setUsers([])
      }
    }
  }

  return (
    <ScrollView
      style={{ backgroundColor: mainBackground }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} style={{ backgroundColor: mainBackground }} title="Pull to refresh" tintColor={loaderColor} titleColor={loaderColor} />
      }>
      {
        users?.map(dat => <SearchCard currentUser={userInfo._id} _id={dat._id} username={dat.username} name={dat.name} navigation={navigation} profilepic={dat.profilepic} />)
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