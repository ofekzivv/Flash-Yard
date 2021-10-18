
import FS from '../../middleware/firestore'
import firebase from "firebase";
import auth from "../../middleware/firestore/auth"
import fbi from "../../middleware/firebase";
import {error} from "vue-infinite-loading/src/utils";
import {route} from "quasar/wrappers";
import routes from "src/router/routes";
import FS_Yards from "src/middleware/firestore/yards";

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

  setUserDataToLocal: async ({state,commit}) => {
    /*****************saveToLocalStorage*****************
     *set specific data to local storage in order to prevent
     * unwanted server calls.
     * we only need to know whether the current user is a chef, and
     * that action takes place every single refresh.
     ***********************************************/
    try{
      const userData = await FS.getUserById(window.user.uid)
      if(userData.isAChef){
        await localStorage.setItem("isAChef", "true");
        await localStorage.setItem("yardId", JSON.stringify(userData.yardId))
        commit('setEditedUser',userData)
      }else{
        state.newUser.isAChef = userData.isAChef
        if (userData.isAChef === undefined){
          userData.isAChef = false
        }
        await localStorage.setItem("isAChef", "false")
        commit('setEditedUser',userData)
      }
    }catch(e){
      return e.message
    }
  },

  async signOutAction({state,commit}){
    try {
      // Sign-out successful.
     await auth.logOutFB();
       if (state.signUp){
         commit('changeSignUp', false)
      }
       localStorage.removeItem("yardId")
       localStorage.removeItem("isAChef")
     await this.$router.push('/login')
    } catch(err) {
      // An error happened.
      console.log("there have been an error signing out", err);
    }
  },

  createUserWithEmail: async ({ },data) => {
    const id = (await auth.createWithEmail(data.email, data.password)).user.uid
    //todo other syntax to the obj
    const newUser = {id ,firstName: data.firstName, lastName: data.lastName,email: data.email, isAChef:data.isAChef}
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

  createChef: async ({state,commit})=>{

    // let user = await FS.getUserById(window.user.uid)
    await FS.createNewChef()
    await localStorage.setItem("isAChef", "true");
    await commit('changeChefPermission', true)
    await commit('addYardId',null)
    console.log(state.newUser.yardId)
  },

  setEditedUser : async({state,commit},obj)=>{
    let user={}
    if(state.users.length && state.users.find(user=>user === obj)){
      console.log(obj)
      user = obj
    }
    else {
      user = await FS.getUserById(obj.myData.id)
    }
    commit('setEditedUser',user)
    commit('insertUser',user)
    // commit('setEditedYardId',id)
    // commit('setEditedYard',yard)

  },

}
