<template>
    <div class="messageBox" v-show="show">
      <div class="inner">
        <div class="top">
          <div class="tit">提示</div>
          <div class="smallIcon">
            <i class="el-icon-close"></i>
          </div>

        </div>
        <div class="center">
          {{text}}
        </div>
        <div class="bottom">
          <div class="bottonW">
            <button class="makeSure">确定</button>
            <button class="cancle">取消</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "messageBox",
        data(){
          return{
            show:false,
            text:'',
          }
        },
    }
</script>

<style scoped lang="scss">
  .messageBox{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    .inner{
      width: 334px;
      height: 204px;
      position: fixed;
      top:50%;
      left: 50%;
      transform: translate(-167px,-102px);
      background:rgba(255,255,255,1);
      box-shadow:0px 1px 4px 1px rgba(0,0,0,0.16);
      border-radius:4px 4px;
      .top{
        width:100%;
        height:40px;
        line-height: 40px;
        background:rgba(245,247,248,1);
        box-sizing: border-box;
        padding-left: 20px;
        //display: flex;
        .tit{
          display: inline-block;
          font-size:14px;
          font-family:MicrosoftYaHei;
          color:rgba(51,51,51,1);
        }
        .smallIcon{
          display: inline-block;
          float: right;
          width:40px;
          height:40px;
          background:rgba(233,238,242,1);
          text-align: center;
          font-size: 14px;
          cursor: pointer;
        }
      }
      .center{
        width: 100%;
        height: 102px;
        line-height: 102px;
        box-sizing: border-box;
        padding: 0 20px;
        text-align: center;
        font-size:14px;
        font-family:MicrosoftYaHei;
        color:rgba(102,102,102,1);
      }
      .bottom{
        width: 100%;
        height: 60px;
        line-height: 60px;
        box-sizing: border-box;
        border-top:1px solid rgba(238,238,238,1);
        padding: 0 20px;
        .bottonW{
          width: 160px;
          height: 30px;
          float: right;
          button{
            width:70px;
            height:30px;
            line-height: 30px;
            border-radius:4px;
            font-size:14px;
            font-family:MicrosoftYaHei;
            box-sizing: border-box;
            cursor: pointer;
          }
          .makeSure{
            color:rgba(255,255,255,1);
            background:rgba(0,138,124,1);
          }
          .cancle{
            background:rgba(255,255,255,1);
            color:rgba(102,102,102,1);
            border:1px solid rgba(204,204,204,1);
          }

        }
      }
    }
  }
</style>
