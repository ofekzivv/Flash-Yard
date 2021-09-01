<template>
<div>
  <q-expansion-item
    expand-separator
    label="ימים קבועים שבהם אני לא עובד"
  >
  <div class="q-gutter-sm">
        <q-checkbox size="1.5rem" v-for="day in days" v-model="nonWorkDays" :val="day.num" :label="day.string" color="teal" />
    <q-btn color="primary" label="עדכן" size="0.6rem" @click="setDisableDays(nonWorkDays)" />
      </div>

  </q-expansion-item>


<DatePicker
  locale="he"
  :model-config="{type: 'string', mask: 'D/M/YYYY'}"
  :value="null"
  color="red"
  is-dark
  v-model="day"
  :attributes='attributes'
  :disabled-dates='disableWeekdays'

/>

  <div>
    <button style="width: 500px" @click="ofek"/>
  </div>
</div>


</template>

<script>
import {mapActions,mapState,mapMutations} from "vuex";
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
export default {
  name: "Calendar",
  components:{
    DatePicker
  },


  data(){
    return{
      orders : '',
      day: '',
      expanded: true,
      days: [{num: 1,string: 'ראשון'},{num: 2,string: 'שני'},{num: 3,string: 'שלישי'},
        {num: 4,string: 'רביעי'},{num: 5,string: 'חמישי'},{num: 6,string: 'שישי'},{num: 7,string: 'שבת'}],
      nonWorkDays : []
    }
  },

  async created() {
    debugger
    await this.getOrders()
  },
  computed:{
    ...mapState("test",["disableWeekdays"]),
    attributes(){

      return [
        this.orders.forEach(o => {
           o.day = Number(o.date.split('/')[0])
          o.month = Number(o.date.split('/')[1])-1
          o.year = (Number(o.date.split('/')[2]))
        }),
        console.log(this.orders),
        // Attributes for todos
       ...this.orders.map( o => ({
          dates: [new Date(o.year,o.month,o.day)],
          bar: {
            color: 'red',
          },
          popover: {
            label: o.amountOfppl + '--' + o.name,
            visibility: 'click'
          },
          // customData: todo,
        })),

      ];

    }
  },
  methods:{
    ...mapActions("test",["setDisableDays"]),
    ofek(){
      let day = parseInt(this.day.split("/")[0])
      let month =parseInt(this.day.split("/")[1])
      let year = parseInt(this.day.split("/")[2])
      this.disableWeekdays.push(new Date(year,month,day))
    },

    getOrders(){
      let x = JSON.parse(localStorage.getItem('key'))
      console.log(x)
     this.orders = x
      console.log(this.orders)
    },
  }

}
</script>

<style scoped>

</style>
