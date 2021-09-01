<template>
  <q-page-container>

    <div class="payInputs">
      <div class="h1">
        <h1> סיכום עסקה</h1>
      </div>
      <q-input label="תאריך" outlined filled dense="dense" disable/>
      <q-input label="מספר אנשים" outlined filled dense="dense" disable/>
      <q-input label="סכום עסקה:" outlined filled dense="dense" disable/>
      <q-btn class="confirm-btn" label="אישור ומעבר לתשלום" @click="SendToPayment()"></q-btn>
    </div>
  </q-page-container>
</template>

<script>
import {mapState, mapActions, mapMutations, mapGetters} from 'vuex'

export default {
  name: "sum-order",
  data() {
    return {}
  },
  computed: {
    ...mapState('payment', ['allPayments', 'payDetails'])
  },
  methods: {
    SendToPayment() {
      this.$router.push('/payment')
    }
  }
}
</script>

<style scoped>
.payInputs {
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  display: grid;
  grid-template-rows:repeat(auto-fill, auto);
  grid-gap: 15px
}

.confirm-btn {
  color: #0d0e11;
  background: #DA0018;
}

h1 {
  font-size: 3rem;
  font-weight: bold;
  line-height: 2rem;
  letter-spacing: 0.01em;
}
</style>
