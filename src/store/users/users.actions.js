
import FS from '../../middleware/firestore'
import firebase from "firebase";
import auth from "../../middleware/firestore/auth"
import fbi from "../../middleware/firebase";
import {error} from "vue-infinite-loading/src/utils";

export default {

  createNewUser : async ({ },option)=> {

    const newUser = {};
    if (option.userId) {
      newUser.id = option.userId;
      newUser.firstName = option.userProf.given_name;
      newUser.lastName = option.userProf.family_name;
      newUser.email = option.userProf.email;
    }
    await FS.createUser(newUser)
  },

  async signOutAction({state,commit}){
    try {
      // Sign-out successful.
     await auth.logOutFB();
       if (state.signUp){
         commit('changeSignUp', false)
      }
     await this.$router.push('/login')
    } catch(err) {
      // An error happened.
      console.log("there have been an error signing out", err);
    }
  },

  createUserWithEmail: async ({ },data) => {
    const id = (await auth.createWithEmail(data.email, data.password)).user.uid
    //todo other syntax to the obj
    const newUser = {id ,firstName: data.firstName, lastName: data.lastName,email: data.email}
    await FS.createUser(newUser)
  },

   loginUserWithEmail: async ({ },data)=> {
      await auth.loginWithEmail(data.Email, data.Password)
  },

  loginGoogle: async ({dispatch}) => {
    try {
      self = this;
      const provider = new fbi.firebase.auth.GoogleAuthProvider();
      let data = await fbi.firebase.auth().signInWithPopup(provider)
      if (data.additionalUserInfo.isNewUser){
        const userId = data.user.uid
        const userProf = data.additionalUserInfo.profile
        await dispatch('createNewUser',{userId,userProf})
      }
    }catch{
      console.log('error message login', error.message)
    }
  },
  resetPassword: async ({},email)=>{
    await firebase.auth().sendPasswordResetEmail(email)
      try {
        //todo setTimeOut msg to user

      }catch(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode,errorMessage)
      }
  },



}
