<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="q-pa-md justify-center">
    <P class="textHeader">באיזה יום תרצו להגיע ? </P>

    <DatePicker locale="he" color="green" :disabled-dates='AllDisableDays'
                v-model="localOrder.date" :min-date='new Date()'
                :model-config="{type: 'string', mask: 'YYYY/MM/DD'}"/>
    <div class="q-pa-md row flex items-baseline">
      <P>תאריך האירוע : </P>
      <q-field :dense="true">
        <template v-slot:prepend>
          <q-icon name="event"/>
        </template>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ localOrder.date }}
          </div>
        </template>
      </q-field>
    </div>
    <div class="q-pa-md row flex items-baseline">
      <P>כמות משתתפים : </P>
      <q-input outlined
               v-model.number="localOrder.numOfPeople"
               type="number" :min="this.editedYard.peopleRange.min" :max="this.editedYard.peopleRange.max"

               style="max-width: 150px;"
               color="deep-orange-5"
               :rules="[val => val!=='' && val >= this.editedYard.peopleRange.min && val <= this.editedYard.peopleRange.max]"
      />
      <P>עלות משתתף : </P>
      <q-field outlined suffix="₪">
        <template v-slot:control>
          <div class="self-center full-width no-outline window-width=" tabindex="0">{{ editedYard.pricePerHead }}</div>
        </template>
      </q-field>
      <P>עלות כוללת : </P>
      <q-field outlined suffix="₪">
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ editedYard.pricePerHead * localOrder.numOfPeople }}
          </div>
        </template>
      </q-field>
    </div>
    <q-input bottom-slots v-model="noteText" color="deep-orange-5" style="max-width: 90%" label="הערות">
      <template v-slot:before>
        <q-icon name="note"/>
      </template>
      <template v-slot:append>
        <q-btn round dense flat icon="add" @click="addNote"/>
      </template>
    </q-input>
    <q-list v-if="localOrder.notes.length > 0" light bordered separator style="max-width: 318px; ">
      <q-item clickable v-ripple :key="note" v-for="note in localOrder.notes">
        <q-item-section>
          <p>
            <q-icon left size="12px" name="done"/>
            {{ note }}
          </p>
        </q-item-section>
      </q-item>
    </q-list>
    <q-btn @click="goToSummary" color="deep-orange" glossy label="מעבר לתשלום"/>
    <p> editedYard: {{ editedYard }} </p>
    <p> editedYardId: {{ editedYardId }} </p>
    <p> createAllDisableDays: {{ AllDisableDays }} </p>
  </div>
</template>

<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import {mapActions, mapState, mapMutations, mapGetters} from "vuex";


export default {
  name: "OrderComp",
  components: {
    DatePicker,
  },
  data() {
    return {
      localOrder: {
        notes: [],
        numOfPeople: 0,
        date: new Date().toLocaleString('he-IL', {dateStyle: 'short'}),
      },
      noteText: ''
    }
  },
  computed: {
    ...mapState("test", ['disableWeekdays', 'disableDays', 'orderedEvents']),
    ...mapState('yards', ['yards', 'editedYard', 'editedYardId']),

    dateToShortString() {
      return this.localOrder.date.toLocaleString('he-IL', {dateStyle: 'short'})
    },
    AllDisableDays() {
      return [
        ...this.disableDays.map(disableDay => (disableDay.date)),
        ...this.orderedEvents.map(orderedEvent => (orderedEvent.date)),
        this.disableWeekdays]
    },
  },
  methods: {
    ...mapActions("test", ["setDisableWeekdays", 'setDisableWeekdaysChefInBD', 'getDisableWeekdaysChefFromBD', 'setDisableDaysChefInBD', 'getDisableDaysChefFromBD','getYardOrdersFromBD']),
    ...mapActions('order', ['createOrder', 'CheckingOrderWithDB', "createOrderInDB"]),
    addNote() {
      this.localOrder.notes.push(this.noteText)
      this.noteText = ''
    },
    //createAllDisableDays() {
    //this.allDisableDays = this.disableWeekdays.concat(this.disableDays, this.orderedEvents)
    //},
    updateMinPeopleInCreate() {
      this.localOrder.numOfPeople = this.editedYard.peopleRange.min
    },
    async goToSummary() {
      await this.createOrder(this.localOrder)
      const check = await this.CheckingOrderWithDB()
      console.log(check, 'check')
      if (check) {
        const idOrder = await this.createOrderInDB()
        console.log(idOrder, 'idOrder')
        await this.$router.push('/sumOrder')
      } else {
        window.alert('פרטי הזמנה אינם תקינים, יש לבדוק האם התאריך פנוי או כמות המוזמנים תקינה')
      }

    },

  },
  async created() {
    console.log(this.editedYard)
    this.updateMinPeopleInCreate()
    await this.getDisableWeekdaysChefFromBD( this.editedYard.uidChef)
    await this.getDisableDaysChefFromBD( this.editedYard.uidChef)
    await this.getYardOrdersFromBD( this.editedYardId)

  }
}
</script>

<style scoped>
.textHeader {
  text-align: center;
  font-size: 1.3rem;
}
</style>
