import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { mainColor, defaultAvatar, BASE_URL } from '../config/config'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AuthContext } from '../context/AuthContext'

import axios from 'axios'

const SearchCard = ({ username, name, navigation, _id, profilepic, currentUser }) => {

  const { userInfo } = useContext(AuthContext)

  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState(null)
  const specificUser = async () => {
    axios.post(`${BASE_URL}/specificuser`, {
      _id: _id
    }).then(res => {
      setPosts(res.data.post)
      setUser(res.data.user)
      console.log(res.data)
      if (userInfo._id == res.data.user_id) {
        setIsUser(true)
      }
    }).catch(e => {
      console.log(`specific user error: ${e.response.data.msg}`)
    })
    await console.log(user)
    await console.log(posts)
  }


  const [isUser, setIsUser] = useState(false)
  const checkIsUser = () => {
    if (_id == currentUser) {
      setIsUser(true)
    }
  }

  useEffect(() => {
    checkIsUser()
      specificUser()
  }, [])

  return (
    <TouchableOpacity onPress={() => { isUser ? navigation.navigate('ProfileStack', { screen: 'Profile' }) : navigation.navigate('HomeUserProfile', { name: user.name, username: user.username, posts, profilepic: user.profilepic }) }}>
      <View style={styles.container}>
        <View style={styles.leftCont}>
          <Image
            style={{ height: 50, width: 50, borderRadius: 50, margin: 5 }}
            source={{ uri: profilepic }}
          />
        </View>
        <View style={styles.rightCont}>
          <View style={styles.topCont}>
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

//{ nav.navigate("UserProfileScreen", { id, name, verified, prof, bio, followers, following }

export default SearchCard

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1
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
  topCont: {
    flex: 1,


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