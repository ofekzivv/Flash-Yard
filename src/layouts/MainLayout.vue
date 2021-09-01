<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="background-color: #DA0018">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="lunch_dining"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
         FlashYard
        </q-toolbar-title>
        <div>  FlashYard logo ?</div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
      "השם שלך כאן"
        </q-item-label>
        <q-separator size="2px" color="#444941"/>
        <q-item
          v-for="item in linksList"
          :key="item.title"
          clickable
          tag="a"
          target="_blank"
          @click="$router.push(item.link)"
        >
          <q-item-section
            v-if="item.icon"
            avatar
          >
            <q-icon :name="item.icon" style="color: #DA0018" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ item.title }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: this.linksList,
      linksList : [
        {
          title: 'הפרופיל שלי',
          icon: 'account_circle',
          link: 'MyProfile'
        },
        {
          title: 'שף ? התחל כאן!',
          icon: 'local_dining',
          link: 'addYard'
        },
        {
          title: 'קצת עלינו',
          icon: 'info',
          link: 'https://chat.quasar.dev'
        },
        {
          title: 'התנתק',
          icon: 'logout',
          link: 'https://forum.quasar.dev'
        },
      ]
    }
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }

  }
}
</script>
