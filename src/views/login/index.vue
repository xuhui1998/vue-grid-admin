<template>
  <div class="container">
    <header>
      <div class="logo">
        <img alt="logo" src="@/assets/images/logo.png" width="50" />
        <div class="logo-text">{{ store.projectName }}</div>
      </div>
    </header>
    <div class="content">
      <img src="@/assets/images/login-bg.png" width="320" alt="" />
      <div class="content-inner flex align-center">
        <LoginForm />
      </div>
    </div>
    <div class="g-bg">
      <div class="g-polygon g-polygon-1"></div>
      <div class="g-polygon g-polygon-2"></div>
      <div class="g-polygon g-polygon-3"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import LoginForm from './components/login-form.vue';
  import { useAppStore } from '@/store';

  const store = useAppStore();
</script>

<style lang="less" scoped>
  .container {
    // display: flex;
    height: 100vh;
    // max-width: 1920px;

    header {
      width: 100%;
      height: 100px;
    }
    .logo {
      position: fixed;
      top: 24px;
      left: 22px;
      z-index: 1;
      display: inline-flex;
      align-items: center;

      &-text {
        margin-right: 4px;
        margin-left: 8px;
        color: var(--color-text-1);
        font-weight: bold;
        font-size: 24px;
        position: relative;
      }
    }

    .content {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      // transform: scale(1.3);
      display: flex;
      border-radius: 8px;
      box-shadow: 15px 15px 25px rgba(34, 87, 188, 0.1),
        0 0 0 rgba(34, 87, 188, 0.1), 0 0 10px rgba(34, 87, 188, 0.1);
      overflow: hidden;
      img {
        object-fit: cover;
      }
      &-inner {
        padding: 40px;
        background-color: #fff;
      }
    }

    .g-bg {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      z-index: -1;
      &:before {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        backdrop-filter: blur(150px);
        z-index: 1;
      }
      .g-polygon {
        position: absolute;
        opacity: 0.5;
        &-1 {
          width: 60%;
          height: 60%;
          left: 50%;
          top: 25%;
          transform: translate(-50%, -30%);
          background: #ffee55;
          clip-path: polygon(0 10%, 30% 0, 100% 40%, 70% 100%, 20% 90%);
        }

        &-2 {
          width: 70%;
          height: 70%;
          left: -5%;
          top: 80%;
          transform: translate(0%, -80%);
          background: #e950d1;
          clip-path: polygon(10% 0, 100% 70%, 100% 100%, 20% 90%);
        }

        &-3 {
          width: 60%;
          height: 60%;
          right: 5%;
          top: 80%;
          transform: translate(5%, -80%);
          background: rgba(87, 80, 233);
          clip-path: polygon(80% 0, 100% 70%, 100% 100%, 20% 90%);
        }
      }
    }
  }

  .logo {
    position: fixed;
    top: 24px;
    left: 22px;
    z-index: 1;
    display: inline-flex;
    align-items: center;

    &-text {
      margin-right: 4px;
      margin-left: 4px;
      color: var(--color-fill-1);
      font-size: 20px;
    }
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-lg) {
    .container {
      .banner {
        width: 25%;
      }
    }
  }
</style>
