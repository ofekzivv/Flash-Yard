<template>
  <div class="q-pa-md justify-center">
    <P class="textHeader">באיזה יום תרצו להגיע ? </P>

    <DatePicker locale="he" color="green" :disabled-dates='disableWeekdays' v-model="date"  :min-date='new Date()' :model-config="{type: 'string', mask: 'D/M/YYYY'}" />
    <div class="q-pa-md row flex items-baseline">
      <P>כמות משתתפים : </P>
      {{date}}
      <q-input
        v-model.number="numberOfppl"
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
{{options}}
  </div>
</template>

<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import {mapActions,mapState,mapMutations} from "vuex";

export default {
  name: "OrderComp",
  components:{
    DatePicker
  },
  data() {
    return {
      name : 'elad',
      notes: [],
      numberOfppl: 10,
      date: new Date(),
      noteText: '',
      // options: [{ weekdays: [1, 7] } ],
      localOrder : {}

    }
  },
  computed:{...mapState("test",['disableWeekdays'])},
      methods: {
        addNote() {
          this.notes.push(this.noteText)
          this.noteText = ''
        },
        slika() {
          let day = parseInt(this.date.split("/")[0])
          let month =parseInt(this.date.split("/")[1])
          let year = parseInt(this.date.split("/")[2])
          this.options.push(new Date(year,month,day))
          this.localOrder = [{
              name : this.name,
            date : this.date,
            amountOfppl : this.numberOfppl,
            notes : this.notes

          }]
         localStorage.setItem('key', JSON.stringify(this.localOrder)  )
          console.log(this.options)
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
