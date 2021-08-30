<template>
  <div>


  <q-item
    clickable
    tag="a"
    target="_blank"
    @click="this.$router.push(link)"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" style="color: #DA0018" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
    <q-separator />
  </div>
</template>

<script>
// import { defineComponent } from 'vue'

export default ({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  }
})
</script>
