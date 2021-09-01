import fbi from "../middleware/firebase"
import firebaseInstance from '../middleware/firebase/index'

export default () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDHsGvxOotq7C3LOWEBdDclck-n3EvS_6U",
    authDomain: "flash-yard.firebaseapp.com",
    projectId: "flash-yard",
    storageBucket: "flash-yard.appspot.com",
    messagingSenderId: "1022234337539",
    appId: "1:1022234337539:web:84bd0e58e95ff59371c936",
    measurementId: "G-K0KR431HDG"
  }
  fbi.FBIInit(firebaseConfig)
  // fbi.firebase.initializeApp(firebaseConfig)
}
//
// firebaseInstance.firebase.auth().onAuthStateChanged(user => {
//
//   window.user = user
//
//
//
// })





