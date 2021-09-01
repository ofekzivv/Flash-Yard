<template>
  <div class="feed">


    <YardCard/>
    <YardCard/>
    <YardCard/>
    <YardCard/>
    <YardCard/>
    <YardCard/>
    <YardCard/>
    <YardCard/>
    <YardCard/>
    <YardCard/>


  </div>
</template>

<script>
import YardCard from "components/Feed/YardCard";


export default {
  name: "Feed",
  components: {YardCard},
  data() {
    return {
      index: 6
    }
  }
}
</script>

<style>
.feed {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 4fr 2fr);
  grid-gap: 2rem;
  padding: 20px
}


.card-tall {
  grid-row: span 2;
}

/*@media screen and (max-width: 600px) {*/
/*  .feed {*/
/*    grid-template-columns: 1fr 1fr;*/

/*    grid-gap: 1px;*/
/*  }*/
/*}*/
</style>
