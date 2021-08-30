import firebase from 'firebase/app'
import auth from 'firebase/auth'
import 'firebase/firestore';

const  authentication = () => {
  return firebase.auth();
}

const FBIinit = config => {
  return firebase.initializeApp(config)
}

const db = () => firebase.firestore()
export default {
  firebase,
  db,
  authentication,
  FBIinit,
}


