<template>
  <addYardForm>
      <router-view  @xx=""></router-view>
  </addYardForm>
</template>

<script>
import addYardForm from "components/addYard/addYardForm";
import {mapActions} from "vuex";
export default {
  name: "AddYard",
  components : {
    addYardForm
  }
}
</script>

<style scoped>

</style>
