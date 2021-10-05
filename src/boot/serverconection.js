import fbi from "../middleware/firebase"

export default () => {
  const firebaseConfig = {
    apiKey: "AIzaSyC21z_SwSmFDAW6KdvePYfcrILMItrsCXM",
    authDomain: "flashyard2.firebaseapp.com",
    projectId: "flashyard2",
    storageBucket: "flashyard2.appspot.com",
    messagingSenderId: "624727084484",
    appId: "1:624727084484:web:0c6dde0b2328f4bff9e891",
    measurementId: "G-FH3G27Y0NK"
  }
  fbi.FBIInit(firebaseConfig)
  // fbi.firebase.initializeApp(firebaseConfig)

  fbi.firebase.auth().onAuthStateChanged(user => {
    window.user = user
  })
}







