import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// You must have enabled the authentication anddatabase in firebase
// In this 'var' you must put your firebase apiKey
var firebaseConfig = {
    apiKey: "AIzaSyBpYtPs3_kJ7Dl-MNXlA9cAlztiju3WhK8",
    authDomain: "auth-firebase-v.firebaseapp.com",
    projectId: "auth-firebase-v",
    storageBucket: "auth-firebase-v.appspot.com",
    messagingSenderId: "709883834277",
    appId: "1:709883834277:web:6d1cd00cba8d770e9b824c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()

export { db, auth }