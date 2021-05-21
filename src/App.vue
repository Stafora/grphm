<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>

  import DefaulLayout from '@/layouts/DefaultLayout.vue'

  export default {
      name: 'App',
      computed:{
        layout() {
          return this.$route.meta.layout || 'DefaulLayout'
        }
      },
      components: {
        DefaulLayout
      }
  }
</script>
