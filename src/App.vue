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
        console.log('getters===>')
        console.log(this.$store.state['editor'])
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
