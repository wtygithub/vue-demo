<template>
   <common_header_menu>
    <div id="questionW">
     <div class="wrap">
       <div class="search">
         <el-form :inline="true" :model="formInline" class="demo-form-inline">
           <el-form-item label="创建者">
             <el-input v-model="formInline.user" placeholder="审批人"></el-input>
           </el-form-item>
           <el-form-item label="活动区域">
             <el-select v-model="formInline.region" placeholder="活动区域">
               <el-option label="区域一" value="shanghai"></el-option>
               <el-option label="区域二" value="beijing"></el-option>
             </el-select>
           </el-form-item>
           <el-form-item>
             <el-button type="primary">查询</el-button>
           </el-form-item>
         </el-form>
       </div>
       <div class="contentW">
         <el-table
           :data="tableData"
           border
           style="width: 100%"
           :header-cell-style = "{background:'#F2F9F8',height:'40px !important',padding:'0 !important'}"
           :row-style = "{height:'46px !important',padding:'0 !important'}"
           :cell-style = "{height:'40px !important',padding:'0 !important'}"
           @header-dragend = 'cellWidthChange'
         >
           <el-table-column
             prop="date"
             label="日期"
             min-width="180"
             show-overflow-tooltip>
           </el-table-column>
           <el-table-column
             prop="name"
             label="姓名"
             min-width="180"
             show-overflow-tooltip>
           </el-table-column>
           <el-table-column
             prop="address"
             label="地址"
             min-width="200"
             show-overflow-tooltip>
           </el-table-column>
           <el-table-column
             fixed="right"
             label="操作"
             min-width="200"
             show-overflow-tooltip
             :resizable = false
           >
             <template slot-scope="scope">
               <el-button type="text" size="small" @click="goDetail">查看</el-button>
               <el-popover
                 placement="top"
                 width="300"
                 trigger="click"
                 :ref="`pop${scope.row.id}`"
                 >
                 <p>这是一段内容这是一段内容确定删除吗？</p>
                 <div style="text-align: right; margin: 0">
                   <el-button size="mini" type="text" @click="hideDialog(scope.row.id)">取消</el-button>
                   <el-button type="primary" size="mini" @click="hideDialog(scope.row.id)">确定</el-button>
                 </div>
                 <el-button type="text" size="small" slot="reference">删除</el-button>
               </el-popover>

             </template>
           </el-table-column>
         </el-table>
       </div>
     </div>
    </div>

    </common_header_menu>
</template>

<script>
  import common_header_menu from './common/common_header_menu'
    export default {
      name: "questionManage",
      data(){
        return{
          currentIndex:null,
          formInline: {
            user: '',
            region: '',
          },
          tableData: [{
            date: '2016-05-02',
            name: '王小虎1',
            address: '上海市普陀区金沙江路 1518 弄',
            id:1,
            show: false
          }, {
            date: '2016-05-04',
            name: '王小虎2',
            address: '上海市普陀区金沙江路 1517 弄',
            show: false,
            id:2,
          }, {
            date: '2016-05-01',
            name: '王小虎3',
            address: '上海市普陀区金沙江路 1519 弄',
            show: false,
            id:3,
          }, {
            date: '2016-05-03',
            name: '王小虎4',
            address: '上海市普陀区金',
            show: false,
            id:4,
          },{
            date: '2016-05-02',
            name: '王小虎5',
            address: '上海市普陀区金沙江路 1518 弄',
            show: false,
            id:5,
          }, {
            date: '2016-05-04',
            name: '王小虎6',
            address: '上海市普陀区金沙江路 1517 弄',
            show: false,
            id:6,
          },
          ]
        }
      },
      beforeRouteLeave(to,from,next){
        if(to.name == 'detail'){
          this.$store.commit('setkeepAlive','questionManage')
        }
        setTimeout(()=>{
          next()
        },100)
      },
      methods:{
        hideDialog(id){
          var str = `pop${id}`
          console.log(str)
          this.$refs[str].doClose()//方法，代验证，本地模拟的数据不生效
        },
        cellWidthChange(newWidth, oldWidth, column, event){
          if(newWidth < column.minWidth){
            column.width = column.minWidth
          }
        },
        goDetail(){
          //this.$router.push('/detail')
          this.$router.push('/detail?flag=2')
        }
      },
      components:{
        common_header_menu
      }
    }
</script>

<style scoped lang="scss">
  #questionW{
    width: 100%;
    height: 100%;
    background: #fff;
    overflow-y: auto;
    .wrap{
      box-sizing: border-box;
      border: 15px solid #f7f7f7;
      width: 100%;
      min-height: 100%;
      background: #fff;
      .search{
        box-sizing: border-box;
        width: 100%;
        height: auto;
        padding: 15px;
      }
      .contentW{
        box-sizing: border-box;
        width: 100%;
        height: auto;
        padding: 15px;
      }
    }
  }
</style>
