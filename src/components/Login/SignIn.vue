<template >

  <div class=" row items-start q-gutter-md page ">
<!--    <div>-->
<!--      <ResetPassword v-if="forgetPass"/>-->
<!--    </div>-->
    <q-card class="centerBoxPos colorBox">
      <q-card-section  class="text-white" style="background-color: #DA0018;">
        <q-resize-observer @resize="setAtr()"/>
        <div align="center" class="text-h6">Flash Yard</div>
      </q-card-section>

      <br>

      <div class="q-pa-md" >
        <!--        @submit="onSubmit"-->
        <q-form
          class="q-gutter-md topSpaceForm"

        >
          <div>
            <q-avatar icon="person" size="75px"/>
            <q-input
              style=" display:inline-grid; width:73%;"
              filled
              v-model="Email"
              label='דוא"ל'
              lazy-rules
              :rules="[ val => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val) || 'אנא מלא/י דואר אלקטרוני']"
            />
          </div>

          <div>
            <q-avatar icon="vpn_key" size="75px"/>
            <q-input
              style=" display:inline-grid; width:72%;"
              filled
              type="Password"
              v-model="Password"
              label="סיסמה"
              lazy-rules
              :rules="[ val => val !== null && val.length > 5 || 'הקש/י סיסמה', ]"
            />

          </div>

          <q-btn flat @click="forgetPass()" >
            <strong>שכחתי סיסמה</strong>
          </q-btn>
          <!--          <q-toggle v-model="accept" label="אני מסכים לתנאי השימוש"/>-->

          <div align="center">
            <q-btn @click="signInWithEmailAndPassword(Email,Password)" label="התחבר/י" type="submit" class="text-white"
                   style="background-color: #DA0018"/>
          </div>
          <div >
            <q-btn flat @click="localChangeSignUp()" >
              לא רשום?&nbsp<strong> לחץ כאן להרשמה  </strong>
            </q-btn>
          </div>

          <q-card-actions align="center" style="margin-top: 5vh">
          <!--login with facebook require special businnes account and etc...-->
            <q-btn @click="loginWithGoogle()" outline rounded color="black" label="התחבר עם גוגל" icon="fab fa-google"/>
            <q-btn @click="loginWithFacebook()" outline rounded color="black" label="התחבר עם פייסבוק" icon="fab fa-facebook"/>

          </q-card-actions>

        </q-form>
      </div>
    </q-card>
  </div>
</template>


<script>
import {mapState,mapActions, mapMutations} from 'vuex'
import ResetPassword from "pages/ResetPassword";

export default {
  name: "SignIn",
  components: {ResetPassword},
  computed: {
    ...mapState('users', ['signUp']),
  },

  data() {
    return {
      Email: null,
      Password: null,
      accept: false
    }
  },

  methods: {
    ... mapActions('users', ['loginUserWithEmail','loginGoogle']),
    ...mapMutations('users', ['changeSignUp']),

    async signInWithEmailAndPassword(Email, Password) {
      await this.loginUserWithEmail({Email,Password})
      await this.$router.push('/feed')
    },
     loginWithGoogle() {
       this.loginGoogle().then(()=>{
         this.$router.push('/feed')
       })
    },

    localChangeSignUp() {
      this.changeSignUp(true)
    },

      /*it is responsible to place the nav on top of the screen responsively to screen media*/
    setAtr(){
      const navPos = document.querySelector('.text-white');
        if (window.innerWidth <= 1000) navPos.classList.add('fixed-top');
        else navPos.classList.remove('fixed-top');
    },

    forgetPass(){
      this.$router.push('/reset')
    }

// onSubmit () {
//   if (this.accept !== true) {
//     this.$q.notify({
//       color: 'red-5',
//       textColor: 'white',
//       icon: 'warning',
//       message: 'You need to accept the license and terms first'
//     })
//   }
//   else {
//     this.$q.notify({
//       color: 'green-4',
//       textColor: 'white',
//       icon: 'cloud_done',
//       message: 'Submitted'
//     })
//   }
// },

  }
}


</script>

<style scoped>


</style>
