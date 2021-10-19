import firebase from 'firebase/app'
import 'firebase/firestore';


const  authentication = () => {
  return firebase.auth();
}

const FBIInit = config => {
  return firebase.initializeApp(config)
}

const DB = () => firebase.firestore()

export default {
  firebase,
  DB,
  authentication,
  FBIInit,
}


