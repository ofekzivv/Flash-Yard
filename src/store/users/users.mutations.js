export default {

  changeSignUp: (state) => {
    state.signUp = true
  },

  insertUser: ((state, loginUser) => {
    state.loginUser = loginUser;
    console.log('state.loginUser :',state.loginUser)
  }),

}
