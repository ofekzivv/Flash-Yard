<template>

  <div class="container">
    <h1>הוסף את החצר שלך</h1>
    <div class="q-gutter-md" style="max-width: 400px">

      <div>
        <input name="yardName" v-model="localNewYard.yardName" type="text" class="fieldInput" placeholder="שם החצר"/>
        <input name="location" v-model="localNewYard.location" type="text" class="fieldInput" placeholder="מיקום"/>

        <div class="rangeField">כמות סועדים
          <span class="peopleRange">
            <q-badge color="green">{{ localNewYard.peopleRange.max }}</q-badge> -
            <q-badge color="red">{{ localNewYard.peopleRange.min }}</q-badge>
          </span>
          <q-range
              v-model="localNewYard.peopleRange"
              :min="10"
              :max="250"
              :step="1"
              label
              localNewYard.peopleRange
          />
        </div>

        <div class="space">

          <q-select
              class="rangeField "
              emit-value
              multiple
              map-options
              v-model="localNewYard.foodCategory"
              :options="options"
              use-chips
              stack-label
              label="קטגוריות אוכל"
              rounded
              borderless
          >
            <template v-slot:selected-item="scope">
              <q-chip
                  removable
                  dense
                  @remove="scope.removeAtIndex(scope.index)"
                  :tabindex="scope.tabindex"
                  color="white"
                  text-color="secondary"
                  class="q-ma-none"
              >
                <q-avatar color="secondary" text-color="white"/>
                {{ scope.opt.label }}
              </q-chip>
            </template>
          </q-select>
        </div>

        <!--        <input type="file" accept="image/*" @change="preview_image($event)">-->
        <!--        <img id="output_image"/>-->

        <q-file borderless clearable multiple class="rangeField" @input="preview_image($event)" v-model="images"
                label="תמונות של המקום">
          <template v-slot:prepend>
            <q-icon name="cloud_upload"/>
          </template>
        </q-file>

        <div class="listFrame">
          {{ images.length }}
          <ul class="list">
            <li class="item" v-for="(image,index) of previewImgs">
              <q-img class="img" :src="image">
                <div class="img_action_container">
                  <q-avatar  class="image_actions" icon="delete" @click="deleteImg(index)">
                    <q-tooltip>
                      מחק תמונה
                    </q-tooltip>
                  </q-avatar>
                  <q-avatar  class="image_actions" @click="makeCover(index)" icon="image">
                    <q-tooltip>
                      קבע כפרופיל
                    </q-tooltip>
                  </q-avatar>
                </div>
              </q-img>
            </li>
          </ul>
        </div
        >
        <div>
          <q-img :src="localNewYard.cover" alt="localNewYard.cover">
            <div class="absolute-bottom text-subtitle1 text-center">
              תמונות פרופיל
            </div>
          </q-img>
        </div>


        <input name="price" v-model="localNewYard.pricePerHead" type="number" placeholder="מחיר פר סועד"
               class="fieldInput"/>
        <textarea v-model="localNewYard.placeDesc" class="fieldInput" placeholder="פרטים על המקום"></textarea>


        <button class="btn" @click="addYard" :disabled="localNewYard.clicked">הוסף</button>
      </div>

    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from "vuex";

export default {

  name: "addYardForm",
  computed: {
    // ...mapState('yards', ['editYard']),
    // ...mapState('users', ['loginUser']),
  },
  data() {
    return {
      localNewYard: {
        yardName: '',
        peopleRange: {
          min: 10,
          max: 250
        },
        uidChef:'',
        location: '',
        pricePerHead: '',
        foodCategory: [],
        placeDesc: '',
        cover:0,
        clicked:false
      },
      index:0,
      images: [],
      previewImgs: [],
      url: 'https://placeimg.com/500/300/nature',


      options: [
        {
          label: 'גריל',
          value: 'gril',
          icon: 'fas fa-hamburger'
        },
        {
          label: 'איטלקי',
          value: 'italian',
          icon: 'fas fa-pizza-slice'
        },
        {
          label: 'ים תיכוני',
          value: 'Mediterranean',
          icon: 'map'
        },
        {
          label: 'דגים',
          value: 'fish',
          icon: 'fas fa-fish'
        }],
    }
  },
  methods: {
    ...mapActions('yards', ["insertYard"]),
    ...mapActions('users',['setUserDataToLocal']),
    preview_image(event) {
      let arr = []
      event.forEach(img => {
        let reader = new FileReader()
        reader.onload = function () {
          img.previewUri = reader.result
          arr.push(reader.result)
        }
        reader.readAsDataURL(img);
      })
      this.previewImgs = arr
    },
     ...mapActions('users',['setUserDataToLocal']),

    deleteImg(index) {
      this.previewImgs.splice(index, 1)
      this.images.splice(index, 1)
    },
    makeCover(index){
      this.localNewYard.cover = this.previewImgs[index]
      this.index=index;
    },

    async addYard() {
      this.clicked = true
      //send to action obj with all local data & img
      this.localNewYard.cover = this.index;
      await this.insertYard({data: this.localNewYard, images: this.images})
      this.previewImgs = []
      await this.setUserDataToLocal()
      await this.$parent.$emit('xx')
      await this.$router.push('/feed')
    },

  },
  created() {
    this.uidChef=window.user.uid
  }
}
</script>

<style scoped>
* {

}

h1 {
  font-weight: bold;
  font-size: 35px;
  padding:10px;
  color: #111111;

}
.container{
  margin: 15px 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;

  border-radius:15px 15px 15px 15px;
}
.space {
  margin-top: 20px;
  margin-bottom: 20px;
}
.fieldInput{
  font-weight: bold;
  font-size: 14px;
  width: 100%;
  margin: 20px 20px;
  height: 50px;
  padding: 15px 15px;
  border-radius: 15px;
  outline: none;
  border: none;
  background: #F6F7F9;
  color: #757575;
}
.rangeField {
  font-weight: bold;
  font-size: 14px;
  width: 100%;
  margin: 15px 15px;
  height: 75px;
  padding: 10px 10px;
  border-radius: 15px;
  outline: none;
  border: none;
  background: #F6F7F9;
  color: #757575;
}
::placeholder {
  padding-right: 50px;
}


.btn {
  font-weight: bold;
  width: 230px;
  margin: 0 35px 20px;
  height: 45px;
  padding: 6px 15px;
  border-radius: 5px;
  outline: none;
  border: none;
  background: #111111;
  color: white;
  font-size: 14px;
}

.peopleRange {
  /*float: right;*/
}

/*-------------------------test Css--------------------------*/
.listFrame {
  max-width: 100%;
  width: calc(100% - 20px);
  margin-left: 10px;
  margin-right: 10px;
}

.list {
  display: flex;
  padding: 20px;
  overflow-x: scroll;
  list-style: none;
  border: 5px solid #fff;
  /*background-color: #181818;*/
  padding: 20px;
  border-radius: 12px;
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 8px;
  font-size: 32px;
  text-shadow: 0 2px 1px rgba(0, 0, 0, 0.4);
  box-shadow: 0 2px 1px rgba(0, 0, 0, 1);
  height: 150px;
  width: 125px;
  flex-shrink: 0;
  flex: 1 0 45%;
  margin: 5%;
}

.img {
  width: 100%;
  height: 100%;
}

.image_actions {

}

.img_action_container {
  /*display: flex;*/
  justify-content: space-between;
  margin-left:5px;
}
</style>










<!--<template>-->

<!--  <div class="container">-->
<!--    <h1>הוסף את החצר שלך</h1>-->
<!--    <div class="q-gutter-md" style="max-width: 400px">-->

<!--      <div>-->
<!--        <input name="yardName" v-model="localNewYard.yardName" type="text" class="fieldInput" placeholder="שם החצר" />-->
<!--        <input name="location" v-model="localNewYard.location" type="text" class="fieldInput" placeholder="מיקום" />-->

<!--        <div class="rangeField">כמות סועדים-->
<!--          <q-input borderless-->
<!--                   name="quantity" type="range"-->
<!--                   v-model="localNewYard.peopleRange"-->
<!--                   min="2" max="100"-->
<!--                   placeholder="כמות המשתתפים האפשרית" >-->
<!--            <q-badge floating color="red">{{localNewYard.peopleRange}}</q-badge>-->
<!--          </q-input>-->
<!--        </div>-->

<!--        <div class="space" >-->

<!--          <q-select-->
<!--            class="rangeField "-->
<!--            emit-value-->
<!--            multiple-->
<!--            map-options-->
<!--            v-model="localNewYard.foodCategory"-->
<!--            :options="options"-->
<!--            use-chips-->
<!--            stack-label-->
<!--            label="קטגוריות אוכל"-->
<!--            rounded-->
<!--            borderless-->
<!--          >-->
<!--            <template v-slot:selected-item="scope">-->
<!--              <q-chip-->
<!--                removable-->
<!--                dense-->
<!--                @remove="scope.removeAtIndex(scope.index)"-->
<!--                :tabindex="scope.tabindex"-->
<!--                color="white"-->
<!--                text-color="secondary"-->
<!--                class="q-ma-none"-->
<!--              >-->
<!--                <q-avatar color="secondary" text-color="white" />-->
<!--                {{ scope.opt.label }}-->
<!--              </q-chip>-->
<!--            </template>-->
<!--          </q-select>-->
<!--        </div>-->

<!--        <q-file borderless clearable multiple class="rangeField" v-model="images" label="תמונות של המקום" >-->
<!--          <template v-slot:prepend>-->
<!--            <q-icon name="cloud_upload" />-->
<!--          </template>-->
<!--        </q-file>-->

<!--        <input name="price" v-model="localNewYard.pricePerHead" type="number" placeholder="מחיר פר סועד" class="fieldInput"/>-->
<!--        <textarea v-model="localNewYard.placeDesc" class="fieldInput" placeholder="פרטים על המקום"></textarea>-->


<!--        <button class="btn" @click="addYard">הוסף</button>-->
<!--      </div>-->

<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!-- import {mapState,mapActions,mapMutations} from "vuex";-->

<!--export default {-->

<!--  name: "addYardForm",-->
<!--  computed:{-->
<!--    // ...mapState('yards', ['editYard']),-->
<!--    // ...mapState('users', ['loginUser']),-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      localNewYard: {-->
<!--        yardName:'',-->
<!--        peopleRange:'',-->
<!--        location:'',-->
<!--        pricePerHead:'',-->
<!--        foodCategory:[],-->
<!--        placeDesc:''-->
<!--      },-->
<!--      images: [],-->

<!--      options: [-->
<!--        {-->
<!--          label: 'גריל',-->
<!--          value: 'gril',-->
<!--          icon: 'fas fa-hamburger'-->
<!--        },-->
<!--        {-->
<!--          label: 'איטלקי',-->
<!--          value: 'italian',-->
<!--          icon: 'fas fa-pizza-slice'-->
<!--        },-->
<!--        {-->
<!--          label: 'ים תיכוני',-->
<!--          value: 'Mediterranean',-->
<!--          icon: 'map'-->
<!--        },-->
<!--        {-->
<!--          label: 'דגים',-->
<!--          value: 'fish',-->
<!--          icon: 'fas fa-fish'-->
<!--        }],-->
<!--    }-->
<!--  },-->
<!--  methods : {-->
<!--     ...mapActions('yards', ["insertYard"]),-->

<!--    async addYard() {-->
<!--      //send to action obj with all local data & img-->
<!--      const images = this.images-->
<!--      console.log('images',images)-->
<!--       this.insertYard({data : this.localNewYard, images})-->
<!--       console.log('this.localNewYard',this.localNewYard)-->
<!--       this.images = []-->

<!--    },-->

<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--</style>-->
