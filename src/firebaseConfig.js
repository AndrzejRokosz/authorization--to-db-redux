import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDnO9_gZeUq2jFpx0r_SCunuanVsllsPG8",
    authDomain: "moj-firebase.firebaseapp.com",
    databaseURL: "https://moj-firebase.firebaseio.com",
    projectId: "moj-firebase",
    storageBucket: "moj-firebase.appspot.com",
    messagingSenderId: "558684420559"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const database = firebase.database()
export const googleProvider = new firebase.auth.GoogleAuthProvider()
