//Color palette
export const mainColor =  '#1B6094'
export const mainTextColor = 'black'
export const mainBackground = 'white'
export const loaderColor = 'gray'
export const buttonColor = 'black'
export const buttonTextColor = 'white'
export const detailsColor = 'gray'

//Image data
import { Dimensions } from 'react-native'
export const ScreenWidth = Dimensions.get('window').width
export const ScreenHeight = Dimensions.get('window').height
export const imageHeight = 1920 / 6
export const imageWidth = 1080 / 6

export const profSize = 40

//Default Avatar
export const defaultAvatar = "https://images.are.na/eyJidWNrZXQiOiJhcmVuYV9pbWFnZXMiLCJrZXkiOiI4MDQwOTc0L29yaWdpbmFsX2ZmNGYxZjQzZDdiNzJjYzMxZDJlYjViMDgyN2ZmMWFjLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTIwMCwiaGVpZ2h0IjoxMjAwLCJmaXQiOiJpbnNpZGUiLCJ3aXRob3V0RW5sYXJnZW1lbnQiOnRydWV9LCJ3ZWJwIjp7InF1YWxpdHkiOjkwfSwianBlZyI6eyJxdWFsaXR5Ijo5MH0sInJvdGF0ZSI6bnVsbH19?bc=0"

//Axios config
export const BASE_URL = "https://memoryapp-production.up.railway.app"

//Firebase config
export const storageBucket_1 = "https://firebasestorage.googleapis.com/v0/b/test-c3a5c.appspot.com/o/"
export const storageBucket_2 = "?alt=media&token"


// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4CyOxTj7vOiYBup_sNs7qSp-Zg2eNFVY",
  authDomain: "test-c3a5c.firebaseapp.com",
  projectId: "test-c3a5c",
  storageBucket: "test-c3a5c.appspot.com",
  messagingSenderId: "883771530892",
  appId: "1:883771530892:web:65497125a3c783321ba5a9",
  measurementId: "G-3GPR1H8BVH"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export { firebase }