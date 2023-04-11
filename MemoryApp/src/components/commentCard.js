import { StyleSheet, Text, View, Image, Alert, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { abbreviateNumber } from 'js-abbreviation-number'
import moment from 'moment'
import { BASE_URL, defaultAvatar, detailsColor, mainColor, profSize } from '../config/config'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

const CommentCard = ({ userId, comment, time, like, postOwner, deleteComment, commentID, postID, navigation, CloseBottomSheet }) => {

  const { userInfo } = useContext(AuthContext)

  const [toggle, setToggle] = useState(true)
  const handleLike = () => {
    axios.post(`${BASE_URL}/likecomments`, {
      _id: commentID,
      idPost: postID,
      idUser: userInfo._id
    }).then(res => {
      if (res.data.msg === "Like comment") {
        setToggle(false)
      } else {
        setToggle(true)
      }
      getCommentLikes()
    }).catch(e => {
      console.log(e.response.data.msg)
    })
  }

  const [likes, setLikes] = useState(0)
  const getCommentLikes = () => {
    axios.post(`${BASE_URL}/getlikecomments`, {
      _id: commentID
    }).then(res => {
      setLikes(res.data.length)
      if (res.data.some(user => user.idUser === userInfo._id)) {
        setToggle(false)
      } else {
        setToggle(true)
      }
      // console.log(res.data.includes(userInfo._id))
    })
  }

  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState(null)
  const [isUser, setIsUser] = useState(false)
  const [profilePic, setProfilePic] = useState(defaultAvatar)
  const specificUser = () => {
    axios.post(`${BASE_URL}/specificuser`, {
      _id: userId
    }).then(res => {
      setUsername(res.data.user.name)
      setUser(res.data.user)
      setPosts(res.data.post)
      setProfilePic(res.data.user.profilepic)
      // console.log(res.data)

    }).catch(e => {
      console.log(`specific user error: ${e.response.data.msg}`)
    })
    // await console.log(user)
    // await console.log(posts)
  }

  const checkIsUser = () => {
    if (userInfo._id == userId) {
      setIsUser(true)
    } else if (userId._id == postOwner) {
      setIsUser(true)
    }
  }

  const onDeleteCommentPressed = () => {
    Alert.alert(
      'Delete Comment',
      'Are you sure you want to delete this comment?',
      [{
        text: 'Delete', style: 'destructive',
        onPress: () => deleteComment(commentID)
      },
      {
        text: 'Cancel', style: 'cancel'
      }]
    )
  }




  useEffect(() => {
    checkIsUser()
    specificUser()
    getCommentLikes()
  }, [])

  onUserPressed = () => {
    CloseBottomSheet()
    if(isUser){
      navigation.navigate('ProfileStack', { screen: 'Profile' })
    } else {
      navigation.navigate('HomeUserProfile', { name: user.name, username: user.username, posts, profilepic: user.profilepic, userID: user._id })
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftCont}>
        <Image
          style={{ height: profSize, width: profSize, borderRadius: profSize, margin: 3, marginTop: 8 }}
          source={{ uri: profilePic }}
        />
      </View>
      <View style={styles.rightCont}>
        <View style={styles.topCont}>
          <View style={styles.nameCont}>
            <TouchableOpacity onPress={onUserPressed}>
              <Text style={styles.nameText}>{username}</Text>
            </TouchableOpacity>
            <Text style={styles.idText}>{moment(time).fromNow()}</Text>

          </View>
          <View style={styles.actionCont}>
            <Text style={[styles.idText,]}>{likes}</Text>
            <View style={{ paddingRight: 5 }}>
              {toggle ?
                <TouchableOpacity onPress={handleLike} >
                  <MaterialCommunityIcons name="heart-outline" color={detailsColor} size={20} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={handleLike} >
                  <MaterialCommunityIcons name="heart" color="#dd0000" size={20} />
                </TouchableOpacity>}
            </View>
            {isUser && <View style={{ paddingRight: 5 }}>
              <TouchableOpacity onPress={onDeleteCommentPressed}>
                <MaterialCommunityIcons name="trash-can-outline" color={detailsColor} size={20} />
              </TouchableOpacity>
            </View>}
          </View>
        </View>
        <View style={styles.nowCont}>
          <Text style={styles.nowText}>{comment}</Text>
        </View>
        <View style={styles.actionCont}>
        </View>
      </View>
    </View>
  )
}

export default CommentCard

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 0,
    borderBottomColor: detailsColor,
    borderBottomWidth: 0.25
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
    marginRight: 0
  },
  idText: {
    marginLeft: 5,
    color: 'gray',
    paddingRight: 2
  },
  nameCont: {
    flexDirection: 'row',
  },
  nowText: {
    color: "black"
  },
  nowCont: {
    paddingRight: 0,
    flexDirection: 'row',
    marginBottom: 10
  },
  actionCont: {
    marginTop: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative'
  },
})