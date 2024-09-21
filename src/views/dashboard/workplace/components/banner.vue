<template>
  <Wrapper class="banner">
    <div class="flex-row-between">
      <div class="flex align-center">
        <a-avatar :size="60">
          <img :src="userStore.avatar" alt="avatar" />
        </a-avatar>
        <div class="flex-column ml-10">
          <div class="title">{{ currentTime }}</div>
          <div v-if="weatherData?.data" class="tip">
            今天{{ weatherData.data?.type }}，{{ weatherData.data?.low }}~{{
              weatherData.data?.high
            }}，{{ weatherData?.tip }}
          </div>
        </div>
      </div>
      <div class="flex mr-20">
        <a-space>
          <template #split>
            <a-divider direction="vertical" style="min-height: 2rem" />
          </template>
          <div class="space-item">
            <div class="flex align-center">
              <SvgIcon
                icon-class="wait-process"
                :size="24"
                color="#FF3939"
              ></SvgIcon>
              <span class="text">待办</span>
            </div>
            <div class="item-value">3/18</div>
          </div>
          <div class="space-item">
            <div class="flex align-center">
              <SvgIcon icon-class="project" :size="24"></SvgIcon>
              <span class="text">项目</span>
            </div>
            <div class="item-value">16</div>
          </div>
          <div class="space-item">
            <div class="flex align-center">
              <SvgIcon
                icon-class="message"
                :size="24"
                color="#B5B5B5"
              ></SvgIcon>
              <span class="text">消息</span>
            </div>
            <div class="item-value">36</div>
          </div>
        </a-space>
      </div>
    </div>
  </Wrapper>
</template>

<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue';
  import { weather } from '@/api/dashboard';
  import { useUserStore } from '@/store';
  import dayjs from 'dayjs';

  const userStore = useUserStore();

  const weatherData = ref<any>({});

  const currentTime = computed(() => {
    const currentHour = dayjs().hour();
    if (currentHour >= 5 && currentHour < 13) {
      return `早上好！${userStore.name}，今天又是元气满满的一天！`;
    }
    if (currentHour >= 13 && currentHour < 18) {
      return `下午好！${userStore.name}，继续加油，打工人。`;
    }
    if (currentHour >= 18 && currentHour < 22) {
      return `晚上好！${userStore.name}，忙碌了一天，好好放松一下，为明天养精蓄锐。`;
    }
    return `深夜了，${userStore.name}，也要注意好好休息哦。`;
  });
  const getWeather = async () => {
    const { data, code } = await weather({ city: '南京' });
    if (code === 200) {
      weatherData.value = data;
    }
  };

  onMounted(() => {
    getWeather();
  });
</script>

<style scoped lang="less">
  .banner {
    width: 100%;
    padding: 16px 10px;
    .title {
      font-size: 18px;
      font-weight: 600;
      color: var(--color-text-1);
    }
    .tip {
      font-size: 14px;
      color: var(--color-text-3);
      line-height: 30px;
    }
    .space-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
      .text {
        color: var(--color-text-2);
        margin-left: 8px;
      }
      .item-value {
        font-size: 20px;
        font-weight: 600;
        color: var(--color-text-1);
      }
    }
  }

  :deep(.arco-icon-home) {
    margin-right: 6px;
  }

  .arco-typography {
    margin: 0;
  }
</style>
