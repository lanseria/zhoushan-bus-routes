<template>
  <div id="app">
    <m-header class="sub-wrapper"></m-header>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from '@/components/m-header/m-header'
export default {
  name: 'App',
  mounted () {
    document.addEventListener('touchmove', e => e.preventDefault(), {passive: false})
  },
  components: {
    MHeader
  }
}
</script>

<style>
#app {
  -webkit-overflow-scrolling: touch;
}
.sub-wrapper {
  height: 100%;
  overflow: auto;
}
</style>
