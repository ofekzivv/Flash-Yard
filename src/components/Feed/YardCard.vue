<template>
    <div>
      <!------------------------------------show card cover--------------------------------------
      :style="{backgroundImage:`linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.9)),
      url(${yard.cover})`}"-->
      <div class="card"  >
        <div class="card-headers">
          <h4 class="card-title">{{ yard.yardName }}</h4>
          <h4 class="card-category">קטגוריה:
            <span   v-for="(category,index) of yard.foodCategory"> {{ category }}
              <span v-if="yard.foodCategory.length>1 && index!==yard.foodCategory.length-1">,</span>
            </span>
          </h4>
        </div>
        <div class="card-details">
          <q-list class="-horizontal">
            <q-item>
              <q-item-section avatar>
                <q-avatar class="icon" color="black" text-color="white" icon="room" />
              </q-item-section>

              <q-item-section class="icon-text">{{yard.location}}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-avatar class="icon"  color="black" text-color="white" icon="fas fa-user-alt icon " />
              </q-item-section>

              <q-item-section class="icon-text"> {{yard.peopleRange.min}}-{{yard.peopleRange.max}}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-avatar class="icon" color="black" text-color="white" icon="fas fa-shekel-sign icon" />
              </q-item-section>

              <q-item-section class="icon-text">{{yard.pricePerHead}} ש"ח </q-item-section>
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
      debugger
      this.setEditedYardId(id)
      this.setEditedYardById()
      this.$router.push(`/YardPage${id}`)
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


.card-details{
  text-align: left;
  display: flex;
  justify-content: center;
  padding:20px;

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

.card-headers {
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
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


.card:hover {

  /*transform: translateY(0);*/
}

.card-btn {
  font-size: 20px;
  background:linear-gradient(to right,#c01039,#dc1223 67%,#de1e1e 84%,#e02a19);
  color: white;
  border: none;
  padding: 10px 12px;
  margin-bottom: 15px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: rgba(3, 8, 20, 0.1) 0 0.15rem 0.5rem, rgba(2, 8, 20, 0.1) 0 0.075rem 0.175rem;

}
</style>
