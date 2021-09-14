<template>
  <div class="feed">
    <YardCard v-for="yard of this.myYards" :yard="yard"/>
    <q-img class="loading-circles"  v-if="loading" :src="url"/>
    <InfiniteLoading @infinite="infiniteHandler">
      <span class="noMore" slot="no-more">
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
    ...mapState('yards', ['yards'])
  },
  data() {
    return {
      myYards: [],
      startPoint: 0,
      loading:false,
      url:'https://i.stack.imgur.com/h6viz.gif'
    }
  },

  methods: {
    ...mapActions('yards', ['readYards']),

    /***********************loadData*****************
     *load all yards and show them in the feed      *
     ***********************************************/
    loadData() {
      return this.readYards()
        .then(() => {
          this.myYards.push(...this.yards)
          return this.yards.length
        })

    },
    /*****************infiniteHandler*****************
     *this function make infinity scroll pagination   *
     ***********************************************/
    async infiniteHandler($state) {
      const newYards = await this.loadData()
      if (newYards > 0) {

        this.loading=true
        return $state.loaded()
      }
      this.loading=false
      return $state.complete()

    }
  }
}
</script>

<style>
.feed {
  margin-left:10%;
  margin-right:10%;
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(20rem,35rem));
  grid-gap: 2rem;
  align-items: center;
  justify-content: center;
}

</style>
