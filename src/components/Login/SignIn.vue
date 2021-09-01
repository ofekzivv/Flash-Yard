<template>
  <div class="q-pa-md row items-start q-gutter-md" style="justify-content: center">
    <q-card class="my-card">
      <q-card-section class="text-white" style="background-color: #DA0018">
        <div align="center" class="text-h6">Flash Yard</div>
      </q-card-section>

      <q-separator/>
      <br>

      <div class="q-pa-md" style="max-width: 400px">
        <!--        @submit="onSubmit"-->
        <q-form
          class="q-gutter-md"

        >
          <div>
            <q-avatar icon="person" size="75px"/>
            <q-input
              style=" display:inline-grid; width:72%"
              filled
              v-model="Email"
              label='דוא"ל'
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'אנא מלא/י דואר אלקטרוני']"
            />
          </div>

          <div>
            <q-avatar icon="vpn_key" size="75px"/>
            <q-input
              style=" display:inline-grid; width:72%"
              filled
              type="Password"
              v-model="Password"
              label="סיסמה"
              lazy-rules
              :rules="[
          val => val !== null && val !== '' || 'הקש/י סיסמה',
        ]"
            />

          </div>

          <q-btn flat label="שכחתי סיסמה"/>
          <!--          <q-toggle v-model="accept" label="אני מסכים לתנאי השימוש"/>-->

          <div align="center">
            <q-btn @click="signInWithEmailAndPassword(Email,Password)" label="התחבר/י" type="submit" class="text-white"
                   style="background-color: #DA0018"/>
          </div>

          <q-btn flat label="לא רשום? לחץ כאן להרשמה" @click="localChangeSignUp()"/>
<div>
          <q-separator style="display: inline-grid; width:45%"/> <h7>או</h7> <q-separator style="display: inline-grid; width:45%"/>

</div>
          <q-card-actions align="center">

            <q-btn @click="loginWithGoogle()" outline rounded color="black" label="התחבר עם גוגל" icon="fab fa-google"/>
            <q-btn @click="loginWithFacebook()" outline rounded color="black" label="התחבר עם פייסבוק" icon="fab fa-facebook"/>

          </q-card-actions>

        </q-form>

      </div>

    </q-card>

  </div>
</template>

<!--//todo להוסיף הערה אם המשתמש שרוצה להתחבר לא קיים, להוסיף קו או-->

<script>
import firebaseInstance from '../../middleware/firebase/index'
import {mapState,mapActions, mapMutations} from 'vuex'


export default {
  name: "SignIn",

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
    ... mapActions('users', ['createNewUser']),
    ...mapMutations('users', ['changeSignUp','']),

    signInWithEmailAndPassword(Email, Password) {
      firebaseInstance.firebase.auth().signInWithEmailAndPassword(Email, Password)
        .then((userCredential) => {
          window.user = userCredential.user
          this.$router.push('/feed')
        })
        .catch((error) => {
          console.log(error.message)
        });
    },

    loginWithGoogle() {
      self = this;
      const provider = new firebaseInstance.firebase.auth.GoogleAuthProvider();
      firebaseInstance.firebase.auth().signInWithPopup(provider)
        .then((res) => {
          const userId = res.user.uid
          const userProf = res.additionalUserInfo.profile
          const userData = res.user;
          window.user = userData

          this.createNewUser({userId,userProf})

          window.user = res.user;
          self.$router.push('/feed')
        })
        .catch((error) => {
          console.log('error message login', error.message)
        })
    },
    loginWithFacebook() {
      self = this;
      const provider = new firebaseInstance.firebase.auth.FacebookAuthProvider();
      firebaseInstance.firebase.auth().signInWithPopup(provider)
        .then((res) => {
          window.user = res.user;
          self.$router.push('/feed')
        })
        .catch((error) => {
          console.log('error message login', error.message)
        })
    },

    localChangeSignUp() {
      this.changeSignUp()


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


  },


}
</script>

<style scoped>

</style>
