<template>
  <div>
    <SignIn v-if="!signUp"/>
    <SignUp v-if="signUp"/>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import SignIn from "components/Login/SignIn";
import SignUp from "components/Login/SignUp";

export default {
  name: "Login",
  components: {
    SignIn,
    SignUp
  },
  computed: {
    ...mapState('users', ['signUp']),
  }
}
</script>

<style scoped>

</style>
