<template>
  <FullScreen title="车载中控">
    <a-grid :col-gap="20" :row-gap="20" :cols="24">
      <a-grid-item :span="6">
        <div class="weather-box box-bg flex-column">
          <dv-border-box10>
            <div class="icon flex-center">
              <SvgIcon icon-class="light-rain" :size="120" />
            </div>
            <div class="flex-row-center mt-20">
              <div class="celsius">22°</div>
              <div class="weather-info flex-column">
                <span>南京</span>
                <span>晴转小雨</span>
              </div>
            </div>
            <div class="weather-extra flex-row-center">
              <div class="text-center">
                <SvgIcon icon-class="air-quality" :size="26" />
                <div class="mt-5">空气良好</div>
              </div>
              <div class="text-center">
                <SvgIcon icon-class="sunlight" :size="26" />
                <div class="mt-5">弱</div>
              </div>
              <div class="text-center">
                <SvgIcon icon-class="car-wash" :size="26" />
                <div class="mt-5">易洗车</div>
              </div>
            </div>
          </dv-border-box10>
        </div>
      </a-grid-item>
      <a-grid-item :span="12">
        <div class="control-panel-box box-bg">
          <dv-border-box10>
            <div class="mileage flex-row-center">
              <span>行驶总公里数:</span>
              <NumberFlip
                :to="mileage"
                :from="mileage - 1"
                class="number-flip"
              />
              <span>Km</span>
            </div>
            <div class="dashboard flex-row-center mt-20">
              <div class="flex-column dashboard-buttons">
                <dv-button border="Border6" color="#716fa8">
                  <SvgIcon icon-class="car" :size="22" />
                  车辆体检
                </dv-button>
                <dv-button border="Border6" color="#716fa8">
                  <SvgIcon icon-class="seat" :size="22" />
                  座位检测
                </dv-button>
              </div>
              <div class="dashboard-speed">
                <ParticleBall :size="[260, 260]" />
                <div class="speed-number flex-column">
                  <span>98</span>
                  <span>Km/h</span>
                </div>
              </div>
              <div class="flex-column dashboard-buttons">
                <dv-button border="Border6" color="#716fa8">
                  <SvgIcon icon-class="road" :size="22" />
                  道路检查
                </dv-button>
                <dv-button border="Border6" color="#716fa8">
                  <SvgIcon icon-class="wheel" :size="22" />
                  轮胎检测
                </dv-button>
              </div>
            </div>
            <div class="dashboard-bottom flex-row-between">
              <div small-bg>
                <dv-decoration-9 class="speed flex-column">
                  <span>92Km/h</span>
                  <span>平均速度</span>
                </dv-decoration-9>
              </div>
              <div small-bg>
                <dv-decoration-9 class="oil-wear flex-column">
                  <span>7.2L</span>
                  <span>平均油耗</span>
                </dv-decoration-9>
              </div>
            </div>
          </dv-border-box10>
          <img class="car" src="@/assets/images/bigScreen/car.png" alt="" />
          <img class="road" src="@/assets/images/bigScreen/road.png" alt="" />
          <img
            class="light"
            src="@/assets/images/bigScreen/left-light.png"
            alt=""
          />
          <img
            class="light-right"
            src="@/assets/images/bigScreen/right-light.png"
            alt=""
          />
        </div>
      </a-grid-item>
      <a-grid-item :span="6">
        <div class="music-box box-bg">
          <dv-border-box10>
            <div dv-bg> dv-border-box-10 </div>
          </dv-border-box10>
        </div>
      </a-grid-item>
      <a-grid-item :span="6">
        <div class="weather-box box-bg">
          <dv-border-box10>
            <div dv-bg> dv-border-box-10 </div>
          </dv-border-box10>
        </div>
      </a-grid-item>
    </a-grid>
  </FullScreen>
</template>

<script lang="ts" setup>
  import { ref, onUnmounted } from 'vue';
  import FullScreen from './fullScreen.vue';
  import NumberFlip from './components/numberFlip.vue';
  import ParticleBall from './components/particleBall.vue';

  const mileage = ref(79893);
  const timer = ref();

  timer.value = setInterval(() => {
    mileage.value += 1;
  }, 3000);

  onUnmounted(() => {
    clearInterval(timer.value);
  });
</script>

<script lang="ts">
  export default {
    name: 'LargeScreen',
  };
</script>

<style lang="less" scoped>
  .arco-grid {
    grid-template-rows: repeat(2, 50vh) minmax(0, auto);
  }
  .box-bg {
    background: #0e1940;
  }
  .weather-box {
    height: 50vh;
    color: #fff;
    :deep(.border-box-content) {
      padding: 40px;
    }
    .icon {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background-color: #3a3b7a;
      margin: 0 auto;
    }
    .celsius {
      font-size: 58px;
    }
    .weather-info {
      text-align: center;
      margin-left: 12px;
      font-size: 24px;
      text-align: left;
      gap: 8px;
    }
    .weather-extra {
      gap: 80px;
      margin-top: 28px;
      color: #5e4f9f;
      font-size: 18px;
    }
  }
  .control-panel-box {
    height: 75vh;
    position: relative;
    z-index: 9;
    background: url('@/assets/images/bigScreen/control-border.png') no-repeat,
      #0e1940;
    background-size: 90%;
    background-position: 50% 10%;
    color: #fff;
    .mileage {
      font-size: 30px;
      padding-top: 100px;
      font-family: YouSheBiaoTiHei;
      .number-flip {
        padding: 0 10px;
      }
    }
    .dashboard {
      gap: 120px;
      &-buttons {
        gap: 30px;
        font-family: YouSheBiaoTiHei;
        .dv-button-wrapper {
          width: 180px;
          text-align: center;
          height: 60px;
          line-height: 60px;
          display: flex;
          justify-content: center;
          :deep(.dv-button-text) {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 24px;
          }
        }
      }
      &-speed {
        position: relative;
        font-family: YouSheBiaoTiHei;
        .speed-number {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-weight: 600;
          color: #fff;
          text-align: center;
          span:nth-of-type(1) {
            font-size: 48px;
          }
          span:nth-of-type(2) {
            font-size: 36px;
          }
        }
      }
    }
    .dashboard-bottom {
      padding: 0 80px;
      .speed,
      .oil-wear {
        width: 200px;
        height: 200px;
        gap: 5px;
        font-family: YouSheBiaoTiHei;
        font-size: 18px;
        font-weight: 600;
      }
    }
    .car {
      position: absolute;
      bottom: -38%;
      left: 50%;
      transform: translateX(-50%);
      z-index: -1;
      width: 450px;
      opacity: 0.98;
    }
    .road {
      position: absolute;
      bottom: -45%;
      left: 50%;
      transform: translateX(-50%);
      z-index: -2;
      width: 750px;
    }
    .light {
      position: absolute;
      bottom: -65%;
      left: 15%;
      transform: translateX(-15%);
      width: 250px;
      z-index: -2;
    }
    .light-right {
      position: absolute;
      bottom: -65%;
      right: 10%;
      transform: translateX(-10%);
      width: 250px;
      z-index: -2;
    }
  }
  .music-box {
    height: calc(100vh + 20px);
  }
</style>
