<template>
  <q-card>
    <div class="bg-red text-white">
      <q-toolbar>
        <q-toolbar-title>
          {{ day }}
        </q-toolbar-title>
        <q-btn flat v-close-popup round dense icon="close"/>
      </q-toolbar>
    </div>
    <q-card-section>
      <div>
        <div class="text-red">
          <h6> פרטי האירוע:</h6>
        </div>
        <div class="q-pa-md row flex items-baseline">
          <P>תאריך האירוע : </P>
          <q-field :dense="true" outlined>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                <q-icon name="event"/>
                {{ orderAndUser.date }}
              </div>
            </template>
          </q-field>
        </div>

        <div class="q-pa-md row flex items-baseline">
          <P>שם המזמין : </P>
          <q-field :dense="true" outlined>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ `${orderAndUser.firstName} ${orderAndUser.lastName}` }}
              </div>
            </template>
          </q-field>
        </div>
        <div class="q-pa-md row flex items-baseline">
          <P>מייל המזמין : </P>
          <q-field :dense="true" outlined>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ orderAndUser.email }}
              </div>
            </template>
          </q-field>
        </div>
        <div class="q-pa-md row flex items-baseline">
          <P>כמות משתתפים : </P>
          <q-field :dense="true" outlined>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ orderAndUser.numOfPeople }}
              </div>
            </template>
          </q-field>
        </div>
        <div class="q-pa-md row flex items-baseline">
          <P>עלות משתתף : </P>
          <q-field :dense="true" outlined suffix="₪">
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ orderAndUser.pricePerHead }}
              </div>
            </template>
          </q-field>
        </div>
        <div class="q-pa-md row flex items-baseline">
          <P>עלות כוללת : </P>
          <q-field :dense="true" outlined suffix="₪">
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ orderAndUser.totalPrice }}
              </div>
            </template>
          </q-field>
        </div>
      </div>
    </q-card-section>
    <q-card-actions align="center">
      <q-btn class="glossy" rounded color="red" label="בטל אירוע זה" v-close-popup/>
    </q-card-actions>
    <q-card-actions align="right">
      <q-btn flat label="צא ללא שינוי" color="primary" v-close-popup/>
    </q-card-actions>
  </q-card>
</template>

<script>
import {mapActions, mapState, mapMutations} from "vuex";

export default {
  name: "DialogCalendarEvent",
  props: ['day'],
  data() {
    return {
      orderAndUser: {},
    }
  },
  computed: {
    ...mapState("test", ['disableWeekdays', 'disableDays', 'orderedEvents']),
  },
  methods: {
    ...mapActions("test", ["setDisableDays"]),
    ...mapActions("order", ["getOrderAndUserById"]),

    async getData() {
      const index = this.orderedEvents.findIndex(y => y.date === this.day)
      const idOrder = this.orderedEvents[index].idOrder
      this.orderAndUser = await this.getOrderAndUserById(idOrder)
    },
  },
  async created() {
    await this.getData();
  },
}

</script>

<style scoped>

</style>



