import { StyleSheet, Text, ScrollView, RefreshControl, View } from 'react-native'
import React, { useState } from 'react'
import { loaderColor, mainBackground, mainColor } from '../../config/config'

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
    style={{backgroundColor: mainBackground}}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} style={{ backgroundColor: mainBackground }} title="Pull to refresh" tintColor={loaderColor} titleColor={loaderColor} />
      }>
      <Text>HomeScreen</Text>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})