<template>
  <div class="q-pa-md justify-center">
    <P class="textHeader">באיזה יום תרצו להגיע ? </P>

    <DatePicker locale="he" color="green" :disabled-dates='options' v-model="date" :model-config="{type: 'string', mask: 'D'}" />
    <div class="q-pa-md row flex items-baseline">
      <P>כמות משתתפים : </P>
      <q-input
        v-model.number="model"
        type="number"
        filled
        style="max-width: 50px;"
        color="deep-orange-5"
      />
    </div>
    <q-input bottom-slots v-model="noteText" color="deep-orange-5" style="max-width: 90%" label="הערות" >
      <template v-slot:before>
        <q-icon name="note" />
      </template>

      <template v-slot:append>
        <q-btn round dense flat icon="add" @click="addNote" />
      </template>
    </q-input>
    <q-list v-if="notes.length > 0" light bordered separator   style="max-width: 318px; ">
      <q-item clickable v-ripple :key="note" v-for="note in notes">
        <q-item-section>
          <p>  <q-icon left  size="12px" name="done"/>{{ note }}</p>
        </q-item-section>
      </q-item>
    </q-list>
    <q-btn @click="slika" color="deep-orange" glossy label="מעבר לתשלום" />

  </div>
</template>

<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
export default {
  name: "OrderComp",
  components:{
    DatePicker
  },
  data() {
    return {
      notes: [],
      model: 10,
      date: new Date(),
      noteText: '',
      options: [{ weekdays: [1, 7] },{ days: [4,6,25]}],

    }
  },
      methods: {
        addNote() {
          this.notes.push(this.noteText)
          this.noteText = ''
        },
        slika() {
          this.options[1].days.push(parseInt(this.date))
        },

      },
    created() {

    }
}
</script>

<style scoped>
.textHeader{
  text-align: center;
  font-size: 1.3rem;
}
</style>
