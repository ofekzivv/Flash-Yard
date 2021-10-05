<template>
  <div class="page YardBG" >
    <div class="q-pa-md">
      <h3 class="text-center myTxt" style="margin-bottom:-5px;">{{editedYard.yardName}}</h3><br>
      <h5 class="text-center myTxt">{{editedYard.placeDesc}}</h5>
      <div class="yardContainer">
        <div class=" desc" >
          <p>
            המטבח שלנו מציע אוכל:<br>
            <span v-for="(meal,index) of editedYard.foodCategory" :name="++index" :src="editedYard.foodCategory[index-1]"> {{meal}}
          <span v-if="editedYard.foodCategory.length>1 && index!==editedYard.foodCategory.length">,</span>
        </span>
          </p>
          <p>
            המחיר פר סועד הוא:
            <span class="text-center desc"><i class="fas fa-shekel-sign icon q-icon notranslate"></i> {{editedYard.pricePerHead}}</span>
          </p>
          <p>
            מיקום:
            <span class="text-center desc"><i class='fas fa-map-marker-alt' style='font-size:1rem;color:red;'></i> {{editedYard.location}} </span>
          </p>
          <p>
            טווח מוזמנים:
            <span class="text-center desc"> <i class="fas fa-user-alt icon  q-icon notranslate"></i> {{editedYard.peopleRange.max}} - {{editedYard.peopleRange.min}} </span>
          </p>
          <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <q-btn class="btn-grad myColor" label="לעבור להזמנה" @click="nav()"/>
          </transition>
        </div>
        <div class="containerCarousel">
          <div>
            <q-carousel
              v-model="currentIndex"
              :autoplay="autoplay"
              animated
              arrows
              height="40vh"
              infinite
              swipeable
              transition-next="slide-left"
              transition-prev="slide-right"
              width="100vw"
              @mouseenter="autoplay = false"
              @mouseleave="autoplay = true"
            >
              <q-carousel-slide style="border-radius: 5px;" v-for="(pic, index) of editedYard.imagesUrl " :img-src="editedYard.imagesUrl[currentIndex-1]" :name="++index"/>
            </q-carousel>
          </div>
          <div class="smallPrevDiv" >
            <ul  v-for="(pic, index) of editedYard.imagesUrl"  :img-src="editedYard.imagesUrl[index-1]"
                 :name="++index"
                 class="showPreview" v-on:click="onThumbClick(index)">
              <li style="width: 100%;height: 100%">
                <figure class="galleryImg" >
                  <img :src="pic" alt="blablabla" style="width: 100%">
                </figure>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "YardPage",
  data(){
    return{
      autoplay: true,
      currentIndex : 1
    }
  },
  computed:{
    ...mapState('yards',['yards','editedYard','editedYardId'])

  },
  methods:{
    nav(){
      this.$router.push('/order')
    },
    onThumbClick (_index) {
      this.currentIndex = _index;
    },
  }
}
</script>

<style >
@import url('https://fonts.googleapis.com/css2?family=Birthstone&family=Palanquin+Dark&display=swap');

.containerCarousel{
  width: 30vw;
  position: relative;
}
.myTxt{
  font-family: 'Rubik', sans-serif;
}
.desc{
  font-size: 20px;
  display: table;
  align-items: center;
  direction: ltr;
}
.YardBG{
  background: #d9c8b3;
}
.showPreview {
  flex-wrap: wrap;
  flex: 1 1 25%;
  list-style: none;
  width: 400px;
  height: 80px;
}

.galleryImg {
  width: 100%;
  height: 80%;
  /*puts the pictures in the middle*/
  float: left;
}
.smallPrevDiv{
  display:flex;
  justify-content: space-between;
  width: 100%;
  overflow-x: scroll;
}
.galleryImg img:hover {
  opacity: 1;
  transform: scale(1.03);}

.galleryImg img {
  opacity: 0.7;
  width: 100%;
  height: 100%;
  transform: scale(1.15);
  transition: transform 0.5s, opacity 0.5s;}

.yardContainer{
  width: 80vw;
  position: relative;
  flex-direction: row !important;
  direction: rtl;
  display: flex;
  column-gap: 10vw;
  justify-content: center;
  align-content: center;
}

</style>
