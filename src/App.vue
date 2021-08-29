<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue';
import fbi from './middleware/firebase'
export default defineComponent({
  name: 'App',
  created() {
    fbi.db()
  }
})
</script>
