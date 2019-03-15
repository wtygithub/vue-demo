<template>
  <common_header_menu>
    <h1>活动制作</h1>
  </common_header_menu>
</template>

<script>
  import '../assets/css/reset.css'
  import common_header_menu from './common/common_header_menu'
  export default {
    name: 'home',
    data () {
      return{

      }
    },
    mounted(){
      //this.getList()
    },
    methods:{
       getList(){
         var url =  'http://scrmuat.taikang.com/dev/hrsc/sys/log/list'
         this.$axios.post(url, {
           "begDate": "",
           "endDate": "",
           "operation": "",
           "pageNum": 1,
           "pageSize": 50,
           "serverId": "",
           "userName": ""
         })
           .then(function (response) {
             alert('111')
             console.log(response);
           })
           .catch(function (error) {
             console.log(error);
           });
       }
    },
    components:{
      common_header_menu
    }
  }
</script>
<style>

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
