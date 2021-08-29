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

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'הפרופיל שלי',
    icon: 'account_circle',
    link: '/pages/MyProfile.vue'
  },
  {
    title: 'שף ? התחל כאן!',
    icon: 'local_dining',
    link: '/pages/AddYard.vue'
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
];

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
