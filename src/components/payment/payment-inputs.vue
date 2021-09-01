<template>
  <q-page-container>
    <div class="payment-card">
      <q-card flat borderedclass="card">
        <q-card-section>
          <div class="text-h5">פרטי לקוח</div>
        </q-card-section>

        <q-card-section class="inputs">
          <q-input label="שם פרטי" outlined dense/>
          <q-input label=" שם משפחה" outlined dense/>
          <q-input label=" מספר ת.ז של בעל הכרטיס" outlined dense/>
          <q-input label="טלפון לבירורים" outlined dense maxlength="10"/>
        </q-card-section>

        <q-separator color="red" size="0.5px"/>

        <q-card-section>
          <div class="text-h5">פרטי תשלום</div>
        </q-card-section>

        <q-card-section class="inputs">
          <q-input label="אנא הזן פרטי כרטיס אשראי" type="number" outlined dense/>
          <q-input label="תוקף" outlined dense/>
          <q-input label="CVV" outlined dense maxlength="3"/>
          <q-input label="תשלומים" outlined dense/>
        </q-card-section>

        <q-separator color="red" size="0.5px"/>

        <q-card-section>
          <div class="text-h5">השלמת עסקה</div>
        </q-card-section>

        <q-card-section class="inputs">
          <q-input label="סכום עסקה:" type="number" outlined dense disable/>
          <div class="pay-button">
            <q-btn label="אישור ומעבר לתשלום" @click="slockOti()"></q-btn>
          </div>
        </q-card-section>

      </q-card>
    </div>
  </q-page-container>
</template>

<script>
export default {
  name: "payment-inputs",
  components: {},
  data() {
    return {}
  },
  methods: {
    slockOti() {
      alert('hello')
    }
  }
}
</script>

<style scoped>
.text-h5{
  font-weight: bold;
}
.payment-card {
  height: 100%;
  width: 100%;
}

.payment-card * {
  padding: 8px;
}

.pay-button {
  display: flex;
  align-items: center;
  justify-content: center;
}
.pay-button *{
  background: #21BA45;
  font-weight: bold;
}
</style>
