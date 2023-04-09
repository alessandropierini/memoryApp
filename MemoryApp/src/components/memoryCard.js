import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, RefreshControl } from 'react-native'
import React, { useState, useEffect, useContext, useRef } from 'react'
import { abbreviateNumber } from 'js-abbreviation-number'
import moment from 'moment'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'

import axios from 'axios'

import { defaultAvatar, detailsColor, profSize, mainColor, BASE_URL, ScreenWidth, mainBackground, buttonTextColor, mainTextColor, ScreenHeight, loaderColor } from '../config/config'
import { AuthContext } from '../context/AuthContext'

import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import CommentCard from './commentCard'


const MemoryCard = ({ caption, image, time, owner, like, navigation, postID }) => {



  const BottomSheetModalRef = useRef(null)
  const snapPoints = ['95']
  const onCommentPressed = () => {
    BottomSheetModalRef.current?.present()
  }

  const { userInfo } = useContext(AuthContext)

  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState(null)
  const [isUser, setIsUser] = useState(false)
  const [profilePic, setProfilePic] = useState(defaultAvatar)
  const [likes, setLikes] = useState(0)

  const [toggle, setToggle] = useState(true)
  const handleLike = () => {
    axios.post(`${BASE_URL}/like`, {
      idPost: postID,
      idUser: userInfo._id
    }).then(res => {
      if (res.data.msg === "Like") {
        setToggle(false)
      } else {
        setToggle(true)
      }
      getLikes()
    }).catch(e => {
      console.log(e.response.data.msg)
    })
  }

  const getLikes = () => {
    axios.post(`${BASE_URL}/getlikes`, {
      idPost: postID
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

  const onDeletePressed = () => {
    Alert.alert(
      'WARNING',
      'You are about to delete this memory. This cannot be undone.',
      [{
        text: 'Delete', style: 'destructive',
        onPress: () =>
          Alert.alert(
            'DELETE MEMORY',
            'Are you sure you want to delete this memory?',
            [{
              text: 'Delete', style: 'destructive',
              onPress: () => deletePost()
            },
            {
              text: 'Cancel', style: 'cancel'
            }
            ]
          )
      },
      {
        text: 'Cancel', style: 'cancel'
      }
      ]
    )
  }

  const deletePost = () => {
    axios.post(`${BASE_URL}/deletepost`, {
      _id: postID
    }).then(res => {
      console.log(res.data.msg)
      Alert.alert(
        'Memory deleted',
        `${res.data.msg}`,
        [{
          text: 'Close', style: 'cancel'
        }]
      )
    }).catch(e => {
      console.log(e.response.data.msg)
      Alert.alert(
        'Memory deleted',
        `${e.response.data.msg}`,
        [{
          text: 'Close', style: 'cancel'
        }]
      )
    })
  }

  const specificUser = () => {
    axios.post(`${BASE_URL}/specificuser`, {
      _id: owner
    }).then(res => {
      setUsername(res.data.user.name)
      setPosts(res.data.post)
      setUser(res.data.user)
      setProfilePic(res.data.user.profilepic)
      // console.log(res.data)

    }).catch(e => {
      console.log(`specific user error: ${e.response.data.msg}`)
    })
    // await console.log(user)
    // await console.log(posts)
  }

  const checkIsUser = () => {
    if (userInfo._id == owner) {
      setIsUser(true)
    }
  }

  const [followingToggle, setFollowingToggle] = useState(false)
  const checkIfFollowing = () => {
    axios.post(`${BASE_URL}/getfollowers`, {
      FollowedUser: owner
    }).then(res => {
      if (res.data.some(user => user.FollowingUser === userInfo._id)) {
        setFollowingToggle(true)
      } else {
        setFollowingToggle(false)
      }
    }).catch(e => {
      console.log(e.response.msg)
    })
  }

  const [newComment, setNewComment] = useState("")
  function onNewCommentPressed() {
    if (!newComment.trim().length) {
    } else {
      axios.post(`${BASE_URL}/newcomment`, {
        idPost: postID,
        comment: newComment.trim(),
        time: moment(),
        idUser: userInfo._id,
        postOwnerid: postOwner
      }).then(res => {
        getComments()
      }).catch(e => {
        console.log(e.response)
      })
      this.textInput.clear()
    }
  }

  const [comments, setComments] = useState()
  const [commentsLength, setCommentsLength] = useState(0)
  const [commentsObtained, setCommentsObtained] = useState(false)
  const [postOwner, setPostOwner] = useState(userInfo._id)
  const getComments = () => {
    axios.post(`${BASE_URL}/getcomments`, {
      idPost: postID
    }).then(res => {
      setComments(res.data.comments)
      setCommentsLength(res.data.comments.length)
      setCommentsObtained(true)
      setPostOwner(res.data.post.owner)
    }).catch(e => {
      console.log(e.response.msg)
    })
  }

  useEffect(() => {
    getComments()
    specificUser()
    checkIsUser()
    getLikes()
    checkIfFollowing()
  }, [])

  const [refreshing, setRefreshing] = React.useState(false)
  const onRefresh = React.useCallback(() => {
    getComments()
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }, [])

  const deleteComment = (commentID) => {
    axios.post(`${BASE_URL}/deletecomment`, {
      idPost: commentID
    }).then(res => {
      console.log(res.data)
      getComments()
    }).catch(e => {
      console.log(e.response.msg)
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftCont}>
        <Image
          style={{ height: profSize, width: profSize, borderRadius: profSize, margin: 8 }}
          source={{ uri: profilePic }}
        />
      </View>
      <View style={styles.rightCont}>
        <View style={styles.topCont}>
          <View style={styles.nameCont}>
            <TouchableOpacity onPress={() => { isUser ? navigation.navigate('ProfileStack', { screen: 'Profile' }) : navigation.navigate('HomeUserProfile', { name: user.name, username: user.username, posts, profilepic: user.profilepic, userID: user._id }) }}>
              <Text style={styles.nameText}>{username}</Text>
            </TouchableOpacity>
            <Text style={styles.idText}>{moment(time).fromNow()}</Text>
            {followingToggle && <Text style={{ fontWeight: 'bold', color: detailsColor, fontStyle: 'italic', }}> • Following</Text>}
          </View>
          {isUser && <View style={{ paddingRight: 15 }}>
            <TouchableOpacity onPress={onDeletePressed}>
              <MaterialCommunityIcons name="trash-can-outline" color={detailsColor} size={20} />
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
            <TouchableOpacity onPress={onCommentPressed}>
              <MaterialCommunityIcons name="message-reply-outline" color="gray" size={20} />
            </TouchableOpacity>
            <Text style={styles.idText}>{commentsLength}</Text>
          </View>
          <View style={styles.iconCont}>
            {toggle ?
              <TouchableOpacity onPress={handleLike}>
                <MaterialCommunityIcons name="heart-outline" color="gray" size={20} />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={handleLike}>
                <MaterialCommunityIcons name="heart" color="#dd0000" size={20} />
              </TouchableOpacity>}
            <Text style={styles.idText}>{likes}</Text>
          </View>
        </View>
      </View>


      <BottomSheetModal
        ref={BottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomsheet}
        backgroundStyle={{ borderRadius: 10 }}
        enablePanDownToClose={true}
        enableTouchOutsideToClose={true}
        enableDismissOnClose={true}
      >

        <View style={{ alignItems: 'center', paddingBottom: 10, borderBottomColor: detailsColor, borderBottomWidth: 0.5 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Comments</Text>
        </View>

        <View style={{ alignItems: 'center', position: 'relative' }}>
          <TextInput
            placeholder='Comment memory'
            placeholderTextColor={detailsColor}
            maxLength={80}
            style={styles.searchText}
            multiline
            autoCorrect
            autoCapitalize='sentences'
            numberOfLines={2}
            blurOnSubmit={true}
            autoFocus={false}
            onChangeText={newText => setNewComment(newText)}
            ref={input => { this.textInput = input }}
          />
          <TouchableOpacity
            onPress={onNewCommentPressed}
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              paddingTop: 25,
              paddingRight: 20,

            }}>
            <Feather name="send" size={30} color={mainColor} style={{

            }} />
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={{ alignItems: 'center', padding: 10, }}
          style={{ backgroundColor: mainBackground }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} style={{ backgroundColor: mainBackground }} title="Pull to refresh" tintColor={loaderColor} titleColor={loaderColor} />
          }>
          {commentsObtained && comments.map(dat =>
            <CommentCard
              key={dat._id}
              commentID={dat._id}
              userId={dat.idUser}
              comment={dat.comment}
              time={dat.time}
              postOwner={postOwner}
              deleteComment={deleteComment}
              postID={postID}
            />
          )}
        </ScrollView>
      </BottomSheetModal>
    </View>

  )
}

export default MemoryCard

const styles = StyleSheet.create({
  bottomsheet: {
    borderRadius: 25,
    backgroundColor: mainBackground,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  searchText: {
    backgroundColor: 'white',
    paddingLeft: 25,
    textAlignVertical: 'top',
    height: 83,
    width: ScreenWidth,
    color: mainTextColor,
    paddingTop: 15,
    paddingRight: 70,
    fontSize: 18,
    paddingBottom: 25,
    borderBottomColor: detailsColor,
    borderBottomWidth: 0.25
  },
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
    marginRight: 0
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