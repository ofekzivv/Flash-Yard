<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="background: linear-gradient(to right,#c01039,#dc1223 67%,#de1e1e 84%,#e02a19);">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="lunch_dining"
          aria-label="Menu"
          @click="toggleLeftDrawer()"
        />

        <q-toolbar-title class="flash-title">
          FlashYard
        </q-toolbar-title>

        <div> FlashYard logo ?</div>
        <q-btn v-if="$route.fullPath.includes('/sumOrder')"
               v-go-back.single
               label="Back"
               flat
               dense
               icon="arrow_back"
        />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1"
    >
      <q-list >
        <q-item-label
          header
          class="text-grey-8"
        >
          שלום {{this.newUser.firstName}}
        </q-item-label>
        <q-separator size="2px" color="#444941"/>
        <q-item
          v-for="(item, index) of filteredlinks"
          :key="refreshKey+index"
          @xx="forceRerender"
          clickable
          tag="a"
          target="_blank"
          @click="itemRef(item)"
        >
          <q-item-section
            v-if="item.icon"
            avatar
          >
            <q-icon :name="item.icon" style="color: #DA0018"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ item.title }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator/>
        <q-btn :disabled="newUser.isAChef"
          @click="goToAgreaments()"
               class="btn-circSquare myColor" icon="local_dining" style="margin-top: 3vw" label="שף? התחל כאן!"/>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view  @xx="forceRerender"></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapState,mapMutations } from "vuex";
import FS from "src/middleware/firestore";


export default {
  name: 'MainLayout',
  computed:{
    ...mapState('users',['users','newUser']),
    ...mapState('yards',['yards','editedYardId'])
  },
  data() {
    return {
      filteredlinks:[],
      whatToPresent:undefined,
      leftDrawerOpen: false,
      essentialLinks: this.UserLinksList,
      refreshKey: 0,
      UserLinksList: [
        {
          title: 'הפרופיל שלי',
          icon: 'account_circle',
          link: 'MyProfile',
        },
        {
          title: 'קצת עלינו',
          icon: 'info',
          link: 'about'
          // link: 'https://chat.quasar.dev',
        },
        {
          title: 'החצרות שלנו',
          icon: 'local_dining',
          link: 'feed',
        },
        {
          title: 'החצר שלי',
          icon: 'local_dining',
          link: 'addYard',
        },
        {
          title: 'הוסף חצר',
          icon: 'local_dining',
          link: 'addYard',
        },
        {
          title: 'התנתק',
          icon: 'logout',
          link: 'login',
        },
      ]
    }
  },
  methods: {
    // ...mapState('users',['newUser']),
    ...mapActions('users',['signOutAction','setUserDataToLocal','setEditedUser']),
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    itemRef(chosenItem){
      if (chosenItem.title !== "התנתק"){
        this.$router.push(chosenItem.link)
      }else{
        this.signOutAction()
      }
    },
    async forceRerender(){
     this.refreshKey++;
      await this.whichMenu()
      this.$forceUpdate()

    },
    goToAgreaments(){
      this.$router.push('/addChef')
    },
    async whichMenu(){
      let userId = 0
      if (localStorage.getItem('uid')){
        userId = localStorage.getItem('uid')
      }else if(window.user.uid){
        userId = window.user.uid
      }
      let myData = await FS.getUserById(userId)
      /***********************loadData*****************
       *if you are a regular client not a chef      *
       ***********************************************/
      if (myData.isAChef){
        /***********************loadData*****************
         *you are a chef, let's check if you already have a yard,
         *  to know what to display
         ***********************************************/
            if (myData.yardId == null || myData.yardId == 'null'){
              this.filteredlinks = this.UserLinksList.filter(item => item.title !== 'החצר שלי' )
            }else{
              this.filteredlinks = this.UserLinksList.filter(item => item.title !== 'הוסף חצר' )
            }
      } else {
        console.log("he is not a chef")
        this.filteredlinks = this.UserLinksList.filter(item => item.title !=='הוסף חצר' && item.title !== 'החצר שלי')
      }
      await this.setEditedUser({myData})

    }
  },
  created() {
    this.whichMenu()
  },
}
</script>

<style scoped>
.flash-title{
text-align: center;
}
</style>
