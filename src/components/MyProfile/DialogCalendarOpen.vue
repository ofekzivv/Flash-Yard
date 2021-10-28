<template>
<!--  <q-dialog v-model="dialog" transition-show="rotate" transition-hide="rotate">-->
    <!--  <component :is="checkWhichComponentToOpen(trueDay)" v-bind="{day:trueDay}"></component>-->

    <q-card>
      <div class="bg-red text-white">
        <q-toolbar>
          <q-toolbar-title> {{ day }}</q-toolbar-title>
          <q-btn flat v-close-popup round dense icon="close"/>
        </q-toolbar>
      </div>
      <q-card-section>
        <p class="text-green">יום פתוח להזמנות</p>
        <p class="text-green"> אין אירוע ליום זה</p>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn v-if="wantToClose === false" class="glossy" rounded color="red" label="סגור יום זה לאירועים"
               @click="wantToClose = true"/>
        <q-input v-if="wantToClose === true" bottom-slots v-model="noteText" color="deep-red-5" style="max-width: 90%"
                 label="הערה לסגירת היום">
          <template v-slot:before>
            <q-icon name="note"/>
          </template>
        </q-input>
      </q-card-actions>
      <q-card-actions align="center">
        <q-btn v-if="wantToClose === true" class="glossy" rounded color="red" label="סגור יום" @click="closeDay()"
               v-close-popup/>
      </q-card-actions>
      <q-card-actions align="right">
        <q-btn flat label="צא" color="primary" v-close-popup/>
      </q-card-actions>
    </q-card>

</template>

<script>
import {mapActions, mapState, mapMutations} from "vuex";

export default {
  name: "DialogCalendarOpen",
  props: ['day','dialog'],
  data() {
    return {
      wantToClose: false,
      noteText: '',
    }
  },
  computed: {
    ...mapState("test", ['disableDays']),
  },
  methods: {
    ...mapActions("test", ["setDayToDisableDays"]),
    closeDay() {
      const dayObj = {
        date: this.day,
        note: this.noteText
      }
      this.setDayToDisableDays(dayObj)
      this.$emit('closeDialog')
    }
  }
}

</script>

<style scoped>

</style>



