<template>
  <q-card>
    <div class="bg-red text-white">
      <q-toolbar>
        <q-toolbar-title> {{ day }}</q-toolbar-title>
        <q-btn flat v-close-popup round dense icon="close"/>
      </q-toolbar>
    </div>
    <q-card-section>
      <p class="text-red">יום סגור להזמנות</p>
      <p class="text-red">{{note}}-</p>
    </q-card-section>
    <q-card-actions align="center">
      <q-btn class="glossy" rounded color="green" label="פתח יום" @click="removeDay(day)" v-close-popup/>
    </q-card-actions>
    <q-card-actions align="right">
      <q-btn flat label="צא" color="primary" v-close-popup/>
    </q-card-actions>
  </q-card>
</template>

<script>
import {mapActions, mapState, mapMutations} from "vuex";

export default {
  name: "DialogCalendarPersonal",
  props: ['day'],
  data() {
    return {
      note:'',
    }
  },
  computed: {
    ...mapState("test", ['disableWeekdays', 'disableDays', 'orderedEvents']),
  },
  methods: {
    ...mapActions("test", ["removeDayFromDisableDays"]),
    removeDay(day) {
      this.removeDayFromDisableDays(day)
      this.$emit('closeDialog')

    },
    createNote(day){
      const index = this.disableDays.findIndex(y => y.date === day)
      this.note= this.disableDays[index].note
    },
  },
  created() {
    this.createNote(this.day)
  }
}

</script>

<style scoped>

</style>



