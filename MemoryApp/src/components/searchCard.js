import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { mainColor, defaultAvatar, BASE_URL } from '../config/config'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AuthContext } from '../context/AuthContext'

import axios from 'axios'

const SearchCard = ({ username, name, navigation, profilepic, userID }) => {

  const { userInfo } = useContext(AuthContext)

  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState(null)
  const specificUser = () => {
    axios.post(`${BASE_URL}/specificuser`, {
      _id: userID
    }).then(res => {
      setPosts(res.data.post)
      setUser(res.data.user)
      // console.log(res.data)

    }).catch(e => {
      console.log(`specific user error: ${e.response.data.msg}`)
    })
    // await console.log(user)
    // await console.log(posts)
  }

  useEffect(() => {
    specificUser()
  }, [])

  return (
    <TouchableOpacity onPress={() => navigation.navigate('HomeUserProfile', { name: user.name, username: user.username, posts, profilepic: user.profilepic, userID: userID })}>
      <View style={styles.container}>
        <View style={styles.leftCont}>
          <Image
            style={{ height: 50, width: 50, borderRadius: 50, margin: 5 }}
            source={{ uri: profilepic }}
          />
        </View>
        <View style={styles.rightCont}>
          <View style={{}}>
            <View style={styles.nameCont}>
              <Text style={styles.nameText}>{name}</Text>
            </View>
            <View>
              <Text style={styles.idText}>@{username}</Text>
            </View>

          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SearchCard

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.25
  },
  rightCont: {
    flex: 1,
    paddingBottom: 6,
    paddingBottom: 5,
    marginLeft: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 5
  },
  nameCont: {
    flexDirection: 'row',
    marginLeft: 5,
  },

  nameText: {
    color: "black",
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 5
  },
  idText: {
    marginLeft: 5,
    color: 'gray',
  },

})