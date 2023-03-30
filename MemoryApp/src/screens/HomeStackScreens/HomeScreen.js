import { StyleSheet, Text, ScrollView, RefreshControl, View } from 'react-native'
import React, { useState } from 'react'

const mainColor = '#1B6094'

const HomeScreen = () => {

  const [refreshing, setRefreshing] = React.useState(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }, [])

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} style={{ backgroundColor: 'white' }} title="Pull to refresh" tintColor={'gray'} titleColor={'gray'} />
      }>
      <Text>HomeScreen</Text>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})