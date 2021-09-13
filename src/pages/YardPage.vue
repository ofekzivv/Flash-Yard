<template>
<div dir="ltr">
  <p> editedYard: {{editedYard}} </p>
  <p> editedYardId: {{editedYardId}} </p>
  <q-btn  @click="nav()"  color="deep-orange"  glossy label="click here"/>

</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "YardPage",
  computed:{
    ...mapState('yards',['yards','editedYard','editedYardId'])

  },
  methods:{
    nav(){
      this.$router.push('/order')
    }
  }
}
</script>

<style scoped>

</style>
