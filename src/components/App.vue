<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import GoogleMap from './GoogleMap.vue'
import NavHeader from './NavHeader.vue'

export default {

  components: {
    GoogleMap,
    NavHeader
  }
}
</script>

<style>
</style>
