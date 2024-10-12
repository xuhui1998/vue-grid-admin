<template>
  <fullScreen title="车载中控">
    <a-grid :col-gap="20" :row-gap="20" :cols="3">
      <a-grid-item>
        <div w50rem h18rem p3 lex="~ " justify-center items-center bg-dark class="weather-box">
          <dv-border-box10>
            <div dv-bg> dv-border-box-10 </div>
          </dv-border-box10>
        </div>
      </a-grid-item>
      <a-grid-item>
        <div w50rem h18rem p3 lex="~ " justify-center items-center bg-dark class="control-panel-box">
          <dv-border-box10>
            <div dv-bg> dv-border-box-10 </div>
          </dv-border-box10>
        </div>
      </a-grid-item>
      <a-grid-item>
        <div w50rem h18rem p3 lex="~ " justify-center items-center bg-dark class="music-box">
          <dv-border-box10>
            <div dv-bg> dv-border-box-10 </div>
          </dv-border-box10>
        </div>
      </a-grid-item>
      <a-grid-item>
        <div w50rem h18rem p3 lex="~ " justify-center items-center bg-dark class="weather-box">
          <dv-border-box10>
            <div dv-bg> dv-border-box-10 </div>
          </dv-border-box10>
        </div>
      </a-grid-item>
    </a-grid>
  </fullScreen>
</template>

<script lang="ts" setup>
  import fullScreen from './fullScreen.vue';
</script>

<script lang="ts">
  export default {
    name: 'LargeScreen',
  };
</script>

<style lang="less" scoped>
  .arco-grid {
    grid-template-rows: repeat(2, calc(50vh - 70px)) minmax(0, auto);
  }
  .weather-box {
    height: calc(50vh - 70px);
    // height: 373px;
  }
  .control-panel-box {
    height: 500px;
  }
  .music-box {
    height: calc(100vh - 120px);
  }
</style>
