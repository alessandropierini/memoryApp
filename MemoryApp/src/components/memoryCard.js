import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { abbreviateNumber } from 'js-abbreviation-number'
import moment from 'moment'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import axios from 'axios'

import { defaultAvatar, detailsColor, profSize, mainColor, BASE_URL } from '../config/config'
import { AuthContext } from '../context/AuthContext'

const MemoryCard = ({ caption, image, time, owner, comment, like, navigation }) => {

  const { userInfo, setIsLoading } = useContext(AuthContext)

  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState(null)
  const [isUser, setIsUser] = useState(false)


  const [toggle, setToggle] = useState(true)
  const handleLike = () => {
    setToggle(!toggle)
    if (toggle == true) {
      console.log("trueeee")
    } else {
      console.log('falseeee')
    }
  }

  const onDeletePressed = () => {
    console.warn('delete')
  }

  const specificUser = async () => {
    axios.post(`${BASE_URL}/specificuser`, {
      _id: owner
    }).then(res => {
      setUsername(res.data.user.name)
      setPosts(res.data.post)
      setUser(res.data.user)
      // console.log(res.data)

    }).catch(e => {
      console.log(`specific user error: ${e.response.data.msg}`)
    })
    await console.log(user)
    await console.log(posts)
  }

  const checkIsUser = () => {
    if (userInfo._id == owner) {
      setIsUser(true)
    }
  }

  useEffect(() => {
    specificUser()
    checkIsUser()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.leftCont}>
        <Image
          style={{ height: profSize, width: profSize, borderRadius: profSize, margin: 8 }}
          source={{ uri: defaultAvatar }}
        />
      </View>
      <View style={styles.rightCont}>
        <View style={styles.topCont}>
          <View style={styles.nameCont}>
            <TouchableOpacity onPress={() => { isUser ? navigation.navigate('ProfileStack', { screen: 'Profile' }) : navigation.navigate('HomeUserProfile', { name: user.name, username: user.username, posts }) }}>
              <Text style={styles.nameText}>{username}</Text>
            </TouchableOpacity>
            <Text style={styles.idText}>{moment(time).fromNow()}</Text>
          </View>
          {isUser && <View style={{ paddingRight: 15 }}>
            <TouchableOpacity onPress={onDeletePressed}>
              <MaterialCommunityIcons name="trash-can" color="gray" size={20} />
            </TouchableOpacity>
          </View>}
        </View>
        <View style={styles.nowCont}>
          <Text style={styles.nowText}>{caption}</Text>
          {image && <Image style={{
            height: 300,
            width: "100%",
            borderRadius: 10,
            marginTop: 10,
          }}
            source={{ uri: image }} />}
        </View>
        <View style={styles.actionCont}>
          <View style={styles.iconCont}>
            {comment ?
              <TouchableOpacity>
                <MaterialCommunityIcons name="message-reply-outline" color="gray" size={20} />
              </TouchableOpacity>
              :
              <TouchableOpacity>
                <MaterialCommunityIcons name="message-reply-outline" color="gray" size={20} />
              </TouchableOpacity>}
            <Text style={styles.idText}>17</Text>
          </View>
          <View style={styles.iconCont}>
            {toggle ?
              <TouchableOpacity>
                <MaterialCommunityIcons name="heart-outline" color="gray" size={20} onPress={handleLike} />
              </TouchableOpacity>
              :
              <TouchableOpacity>
                <MaterialCommunityIcons name="heart" color="#dd0000" size={20} onPress={handleLike} />
              </TouchableOpacity>}
            <Text style={styles.idText}>{like}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default MemoryCard

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 5,
    borderBottomColor: detailsColor,
    borderBottomWidth: 0.5,
  },
  rightCont: {
    flex: 1,
    paddingTop: 6,
    paddingBottom: 5,
    marginLeft: 5,
    flexDirection: 'column'
  },
  topCont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  nameText: {
    color: "black",
    fontWeight: 'bold',
    marginRight: 5
  },
  idText: {
    marginLeft: 5,
    color: 'gray',
  },
  nameCont: {
    flexDirection: 'row',
  },
  nowText: {
    color: "black"
  },
  nowCont: {
    paddingRight: 15
  },
  actionCont: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 15,
  },
  iconCont: {
    flexDirection: 'row',
    paddingHorizontal: 5

  }
})