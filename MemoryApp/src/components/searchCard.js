import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { mainColor, defaultAvatar } from '../config/config'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AuthContext } from '../context/AuthContext'

const SearchCard = ({ username, name, navigation }) => {

  const { userInfo } = useContext(AuthContext)

  return (
    <TouchableOpacity onPress={() => {navigation.navigate("SearchUserProfile", {name, username })}}>
      <View style={styles.container}>
        <View style={styles.leftCont}>
          <Image
            style={{ height: 50, width: 50, borderRadius: 50, margin: 5 }}
            source={{ uri: defaultAvatar }}
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