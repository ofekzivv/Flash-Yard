<template>
  <div class=" row items-start q-gutter-md page ">
    <q-card class="centerBoxPos colorBox boxWidth">
      <q-card-section  class="text-white" style="background-color: #DA0018;">
        <q-resize-observer @resize="setAtr()"/>
        <div align="center" class="text-h6">RESET PASSWORD</div>
      </q-card-section>

      <br>

      <div class="q-pa-md" >
        <!--        @submit="onSubmit"-->
        <q-form
          class="q-gutter-md"
        >
          <div>
            <q-avatar icon="person" size="75px"/>
            <q-input
              style=" display:inline-grid; width:73%;"
              filled
              v-model="Email"
              label='דוא"ל'
              lazy-rules
              :rules="[ val =>/^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val) || 'אנא מלא/י דואר אלקטרוני']"
            />
          </div>

          <q-card-actions align="center" style="margin-top: 5vh;margin-bottom: 10vh;">
            <q-btn @click="resetPass(Email)" outline rounded color="black"  label="איתחול סיסמה" icon="vpn_key"/>
            <q-btn v-go-back="'/login'" outline rounded color="black"  label="חזור למסך הכניסה" icon="home"/>
          </q-card-actions>

        </q-form>
      </div>
    </q-card>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import Quasar from "quasar";
import { Notify } from 'quasar';

export default {
  name: "ResetPassword",
  data() {
    return {
      Email: null
    }
  },
  methods: {
    ...mapActions('users', ['resetPassword']),

    async resetPass(Email) {
      await this.resetPassword(Email)
      this.handleNoti()
      await this.$router.push('/login')

    },
    setAtr() {
      const navPos = document.querySelector('.text-white');
      if (window.innerWidth <= 1000) navPos.classList.add('fixed-top');
      else navPos.classList.remove('fixed-top');
    },

    handleNoti() {
      setTimeout(() => {
        this.$q.notify({
          progress: true,
          message: 'check your email to continue...',
          icon: 'mail',
          color: 'white',
          textColor: 'primary'
        })
      }, 2000)
    }
  }
}
</script>

<style scoped>

</style>
