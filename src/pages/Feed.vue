<template>
  <div class="feed">
    <YardCard v-for="yard of myYards" :yard="yard"/>
    <InfiniteLoading @infinite="infiniteHandler">
      <span class="noMore" slot="no-more">
      אין חצרות נוספות
    </span>
    </InfiniteLoading>
  </div>
</template>

<script>
import YardCard from "components/Feed/YardCard";
import {mapState, mapActions} from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: "Feed",
  components: {YardCard, InfiniteLoading},
  computed: {
    ...mapState('yards', ['yards', 'yardsCount', 'foodCatOpt'])
  },
  data() {
    return {
      myYards: [],
      loading: false,
    }
  },

  methods: {
    ...mapActions('yards', ['readYards', 'getFoodCategory']),

    /***********************loadData*****************
     *load all yards and show them in the feed      *
     ***********************************************/
    loadData() {
      return this.readYards()
        .then(() => {
          if (this.yardsCount) {
            this.myYards = [...this.yards]
            return true;
          }
          return false;
        })

    },
    /*****************infiniteHandler*****************
     *this function make infinity scroll pagination  *
     ************************************************/
    async infiniteHandler($state) {
      if (this.yardsCount) {
        const newYards = await this.loadData()
        if (newYards) {
          this.loading = true
          return $state.loaded()
        }
      }
      this.loading = false
      return $state.complete()
    }
  },
  //todo fix get error 404
  created() {
    if (!this.foodCatOpt.length)
      this.getFoodCategory()
    this.myYards = [...this.yards]
  }


}
</script>

<style>
.feed {
  margin-left: 10%;
  margin-right: 10%;
  display: grid;
  grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));
  /*grid-template-columns: 1fr 1fr;*/
  grid-gap: 2rem;
  align-items: center;
  justify-content: center;
}

</style>
