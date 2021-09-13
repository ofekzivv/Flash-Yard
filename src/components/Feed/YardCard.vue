<template>
    <div>
      <div class="card"  :style="{backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.9)),url('https://source.unsplash.com/random')`}" >
        <div class="card-details">
          <h4 class="card-title">{{ yard.yardName }}</h4>
          <h4 class="card-category">קטגוריה:
            <span   v-for="(category,index) of yard.foodCategory"> {{ category }}
              <span v-if="yard.foodCategory.length>1 && index!==yard.foodCategory.length-1">,</span>
            </span>
          </h4>
          <p class="card-desc">
             על החצר: {{ yard.placeDesc }}
          </p>
        </div>
        <div class="card-info">
          <q-list>
            <q-item>
              <q-item-section avatar>
                <q-avatar class="icon" color="black" text-color="white" icon="room" />
              </q-item-section>

              <q-item-section class="icon-text">מיקום: {{yard.location}}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-avatar class="icon"  color="black" text-color="white" icon="fas fa-user-alt icon " />
              </q-item-section>

              <q-item-section class="icon-text">מס' משתתפים: {{yard.minPeople}}-{{yard.maxPeople}}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-avatar class="icon" color="black" text-color="white" icon="fas fa-shekel-sign icon" />
              </q-item-section>

              <q-item-section class="icon-text">מחיר לסועד: {{yard.pricePerHead}} ש"ח </q-item-section>
            </q-item>
          </q-list>

        </div>
        <button class="card-btn" @click="goToItem(yard.id)">לפרטים נוספים</button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex'

export default {
  props:['yard'],
  name: "YardCard",
  components: {},
  data() {
    return {
      bgImage:'',
    }
  },
  computed: {
  },
  methods: {
    ...mapActions('yards', ['setEditedYardById']),
    ...mapMutations('yards',['setEditedYardId']),

    /***********************goToItem****************
     *     open yard in singlePage                 *
     ***********************************************/
    goToItem(id) {
      this.setEditedYardId(id)
      this.setEditedYardById()
      this.$router.push('/YardPage')

    },
  },
  created() {
  }
}
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
}

.card {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem, rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
  width: 100%;
  height: 100%;
  margin-top: 30px;
  border-radius: 40px;
  transition: all 500ms;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

}


.card-info{
  text-align: left;
  display: block;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 5px;
}


.icon {
  font-size: 3vh;
  margin-right: 10px;

}

.icon-text {
  font-size: 18px;
  letter-spacing: 1px;
  margin-right: 10PX;
}

.card-details {
  display: flex;
  flex-direction: column;
}

.card-title {
  padding-top: 10px;
  font-weight: bold;
  font-size: 35px;
  text-align: center;
  letter-spacing: 1px;
  color: #1D1D1D;
}

.card-category {
  font-size: 20px;
  text-align: center;
  color: black;
}

.card-desc {
  font-size: 16px;
}

.card-btn {
  font-size: 20px;
  background-color: #C10015;
  color: white;
  border: none;
  padding: 10px 12px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: rgba(3, 8, 20, 0.1) 0 0.15rem 0.5rem, rgba(2, 8, 20, 0.1) 0 0.075rem 0.175rem;

}
</style>
