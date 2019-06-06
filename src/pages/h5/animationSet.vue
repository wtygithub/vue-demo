<template>
  <div class="panel panel-edit">
    <div class="item">
      <label>动画库</label>
      <div class="content">
        <el-select placeholder="daneden/animate.css"
                   v-model="element.animatedName"
                   clearable>
          <el-option v-for="(item, index) in animateList"
                     :key="index"
                     :label="item"
                     :value="item"></el-option>
        </el-select>
      </div>
    </div>
    <div class="item">
      <label>是否循环</label>
      <div class="content">
        <el-checkbox v-model="element.loop">循环</el-checkbox>
      </div>
    </div>
    <div class="item">
      <label>速度</label>
      <div class="content">
        <el-slider v-model="element.duration"
                   :step="0.1"
                   :min="0"
                   :max="10"></el-slider>
      </div>
    </div>
    <div class="item">
      <label>延迟</label>
      <div class="content">
        <el-slider v-model="element.delay"
                   :step="0.1"
                   :min="0"
                   :max="10"></el-slider>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .panel-edit {
    height: 100%;
    margin-top: 20px;
    z-index: 1;
    .item {
      padding: 5px 0;
      clear: both;
      .content {
        margin-left: 70px;
      }
    }
    label {
      text-align: right;
      vertical-align: middle;
      font-size: 14px;
      color: #48576a;
      line-height: 1;
      width: 70px;
      float: left;
      padding: 11px 12px 11px 0;
    }
  }

  /deep/ .content{
    .el-slider__runway{
      width: 92%;
    }
  }
</style>

<script>
  export default {
    props: {
      element: {
        type: Object
      },
    },
    data () {
      return {
        animateList: ['bounce', 'flash', 'pulse', 'rubberBand', 'shake', 'swing', 'tada', 'wobble', 'jello', 'bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp', 'bounceOut', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight', 'bounceOutUp', 'fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'fadeOut', 'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig', 'fadeOutUp', 'fadeOutUpBig', 'flip', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY', 'lightSpeedIn', 'lightSpeedOut', 'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight', 'rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight', 'slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight', 'slideOutUp', 'slideOutDown', 'slideOutLeft', 'slideOutRight', 'zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp', 'zoomOut', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight', 'zoomOutUp', 'hinge', 'rollIn', 'rollOut'],
        fontFamily: ['宋体', '微软雅黑', '幼体', '黑体', 'sans-serif']
      }
    }
  }
</script>
