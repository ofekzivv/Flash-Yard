<template>

  <div class="container">
    <h1>הוסף את החצר שלך</h1>
    <div class="q-gutter-md" style="max-width: 400px">

      <div>
        <input name="yardName" v-model="localNewYard.yardName" type="text" class="fieldInput" placeholder="שם החצר" />
        <input name="location" v-model="localNewYard.location" type="text" class="fieldInput" placeholder="מיקום" />

        <div class="rangeField">כמות סועדים
          <q-input borderless
                   name="quantity" type="range"
                   v-model="localNewYard.peopleRange"
                   min="2" max="100"
                   placeholder="כמות המשתתפים האפשרית" >
            <q-badge floating color="red">{{localNewYard.peopleRange}}</q-badge>
          </q-input>
        </div>

        <div class="space" >

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
                <q-avatar color="secondary" text-color="white" />
                {{ scope.opt.label }}
              </q-chip>
            </template>
          </q-select>
        </div>

        <q-file borderless clearable multiple class="rangeField" v-model="images" label="תמונות של המקום" >
          <template v-slot:prepend>
            <q-icon name="cloud_upload" />
          </template>
        </q-file>

        <input name="price" v-model="localNewYard.pricePerHead" type="number" placeholder="מחיר פר סועד" class="fieldInput"/>
        <textarea v-model="localNewYard.placeDesc" class="fieldInput" placeholder="פרטים על המקום"></textarea>


        <button class="btn" @click="addYard">הוסף</button>
      </div>

    </div>
  </div>
</template>

<script>
 import {mapState,mapActions,mapMutations} from "vuex";

export default {

  name: "addYardForm",
  computed:{
    // ...mapState('yards', ['editYard']),
    // ...mapState('users', ['loginUser']),
  },
  data() {
    return {
      localNewYard: {
        yardName:'',
        peopleRange:'',
        location:'',
        pricePerHead:'',
        foodCategory:[],
        placeDesc:''
      },
      images: [],

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
  methods : {
     ...mapActions('yards', ["insertYard"]),

    addYard() {
      //send to action obj with all local data & img
      const images = this.images
      console.log('images',images)
       this.insertYard({data : this.localNewYard, images})
       console.log('this.localNewYard',this.localNewYard)
       this.images = []
    },

  }
}
</script>

<style scoped>
*{

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
  margin: 15px 15px ;
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
.btn{
  font-weight: bold;
  width: 230px;
  margin: 0 35px 20px ;
  height: 45px;
  padding: 6px 15px;
  border-radius: 5px;
  outline: none;
  border: none;
  background: #111111;
  color: white;
  font-size: 14px;
}
</style>
