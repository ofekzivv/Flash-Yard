
import FS from '../../middleware/firestore'

export default {

  createNewUser : async ({ state,commit },option)=> {
    debugger
    const newUser = {};

    if (option.userId) {
      newUser.id = option.userId;
      newUser.firstName = option.userProf.given_name;
      newUser.lastName = option.userProf.family_name;
    }

    await FS.createUser(newUser)
    await commit('insertUser',newUser)
  },


}
