import { StyleSheet, Text, View, Image, TextInput, Dimensions } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import SearchScreen from '../../screens/SearchStackScreens/SearchScreen'
import UserProfileScreen from '../../screens/SharedScreens/UserProfileScreen'
import PostScreen from '../../screens/SharedScreens/PostScreen'
import logo from '../../../assets/m__mLogoColors.png'

const mainColor = '#1B6094'
const ScreenWidth = Dimensions.get('window').width
const Stack = createStackNavigator()

const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerBackTitleVisible: false,
      headerTintColor: 'black'
    }}>
      <Stack.Screen name="Search" component={SearchScreen} options={{
        cardStyle: { backgroundColor: '#FFFFFF' },
        headerLeft: () => (
          <Image style={{ width: 30, marginLeft: 13, marginBottom: 6 }} source={logo} resizeMode="contain" />
        ),
        headerTitle: () => (
          <TextInput
            placeholder='Search'
            style={styles.searchText}
          />
        )
      }}
      />
      <Stack.Screen name="SearchUserProfile" component={UserProfileScreen} />
      <Stack.Screen name="SearchPost" component={PostScreen} />
    </Stack.Navigator>
  )
}

export default SearchStack

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