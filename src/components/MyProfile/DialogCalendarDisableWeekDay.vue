<template>
  <q-card>
    <div class="bg-red text-white">
      <q-toolbar>
        <q-toolbar-title> {{ day }}</q-toolbar-title>
        <q-btn flat v-close-popup round dense icon="close"/>
      </q-toolbar>
    </div>
    <q-card-section>
      <p class="text-red">יום סגור באופן קבוע</p>
      <p class="text-red">לפתיחה יש לפתוח דרך ימים קבועים בשבוע</p>
    </q-card-section>
<!--    <q-card-actions align="center">-->
<!--      <q-btn class="glossy" rounded color="green" label="פתח יום" @click="removeDay(day)" v-close-popup/>-->
<!--    </q-card-actions>-->
    <q-card-actions align="right">
      <q-btn flat label="צא" color="primary" v-close-popup/>
    </q-card-actions>
  </q-card>
</template>

<script>
import {mapActions, mapState, mapMutations} from "vuex";
export default {
  name: "DialogCalendarDisableWeekDay",
  props: ['day'],
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}

</script>

<style scoped>

</style>



