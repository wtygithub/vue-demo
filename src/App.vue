<template>
  <div id="app">
    <keep-alive :include="keepList">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    name: 'App',
    //computed:mapGetters(['getList'])
    computed:{
      keepList(){
        return this.$store.getters.getList
      }
    }
  }
</script>

<style lang="scss">
  #app{
    width: 100%;
    height: 100%;
  }
</style>
