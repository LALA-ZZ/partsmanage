<template>
  <div class="wrap-progress" style="height: 200px;">
    <circle-progressbar :id="1" barColor="#0000ff" backgroundColor="rgba(0,0,0,0.4)" :width="100" :radius="10"
      :progress="progress" :isAnimation="false"></circle-progressbar>
  </div>
</template>

<script>
import circleProgressbar from 'vue-circleprogressbar';
export default {
  //组件引用
  components: {
    circleProgressbar
  },
  data () {
    return {
      progress: 0,
    }
  },
  created () {
    this.progress = 0;
    var that = this;
    var timer = setInterval(function () {
      that.progress = parseInt(that.progress) + 10;
      // console.log(that.progress);
      if (that.progress == 100) {
        if (that.progress == "100") {
          that.dialogComputedVisible = false;
        }
        clearInterval(timer);
      }
    }, 1000);
  },
}
</script>
