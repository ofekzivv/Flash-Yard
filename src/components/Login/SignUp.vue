<template>
  <div class="q-pa-md row items-start q-gutter-md" style="justify-content: center">
    <q-card class="my-card">
      <q-card-section class="text-white" style="background-color: #DA0018">
        <div align="center" class="text-h6">הרשמה</div>
      </q-card-section>

      <q-separator/>
      <div class="q-pa-md" style="max-width: 400px">

        <q-form
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="email"
            label='דוא"ל'
            lazy-rules
            :rules="[ val => val !== null && val !== ''|| 'אנא מלא/י דואר אלקטרוני']"
          />


          <q-input
            filled
            type="Password"
            v-model="password"
            label="סיסמה"
            lazy-rules
            :rules="[
          val => val !== null && val !== '' || 'הקש/י סיסמה',
          ]"

          />



          <q-card-actions align="center">
            <q-btn @click="createUserWithEmailAndPassword(email,password)" class="text-white" style="background-color: #DA0018" label="הירשם"/>
          </q-card-actions>

        </q-form>

      </div>


    </q-card>
  </div>
</template>

<script>
import firebaseInstance from "src/middleware/firebase";

export default {
  name: "SignUp",

  data(){
    return{
      email:'',
      password:''


    }
  },

  methods: {
    createUserWithEmailAndPassword(email, password) {
      self = this
      firebaseInstance.firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          self.$router.push('/feed')
        })
        .catch((error) => {
          console.log(error.message)
        });
    },

  }

}
</script>


<style scoped>

</style>
