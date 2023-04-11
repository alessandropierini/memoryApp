import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'

import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { detailsColor, mainBackground, mainColor } from '../../config/config'

const ChatScreen = ({ route, navigation }) => {

  const { username } = route.params


  const [messages, setMessages] = useState([])
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello!',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  const renderBubble = (props) => {
    return (

      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: mainColor
          },
          left: {
            backgroundColor: detailsColor
          }
        }}
        textStyle={{
          right: {
            color: 'white'
          },
            left: {
              color: 'black'
            }
        }}
      />
    )
  }

  const renderSend = (props) => {
    return (
      <Send {... props}>
        <View style={{}}>
          <Icon name="send-circle" size = {32} color={mainColor} style={{  padding: 6}}/>
        </View>
      </Send>
    )
  }

  const scrollToBottomComponent = (props) => {
    return (
      <MaterialIcons name="keyboard-arrow-down" size={22} />
    )
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  )
}

export default ChatScreen

const styles = StyleSheet.create({})