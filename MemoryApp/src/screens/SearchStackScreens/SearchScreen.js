import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchCard from '../../components/SearchCard'

import axios from 'axios'
import { BASE_URL, mainColor, ScreenWidth } from '../../config/config'


const SearchScreen = ({ navigation }) => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TextInput
          placeholder='Search'
          style={styles.searchText}
          onEndEditing={searching}
        />
      )
    })

    axios.post(`${BASE_URL}/searchuser`, {
      
    })
      .then(res => {
        console.log(res.data)
      }).catch(e => {
        console.log(`Search error: ${e.response.data.msg}`)
      })

  }, [])

  const searching = (e) => {
    console.log(e.nativeEvent.text)
  }

  return (
    <ScrollView>
      <SearchCard username="sofe06" name="Sofia Ferrer" />
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