<template>
  <Wrapper title="数据总览">
    <a-grid v-if="loading" :cols="24" :col-gap="20">
      <a-grid-item
        v-for="(_, index) in 6"
        :key="index"
        class="skeleton-col"
        :span="4"
      >
        <a-skeleton animation>
          <a-skeleton-shape />
        </a-skeleton>
      </a-grid-item>
    </a-grid>
    <a-grid v-else :cols="24" :col-gap="20" class="panel">
      <a-grid-item
        v-for="item in sumData"
        :key="item.id"
        class="panel-col"
        :span="4"
      >
        <a-space>
          <div class="icon">
            <SvgIcon :icon-class="item.icon" :size="54" />
          </div>
          <div class="statistic-info">
            <div class="statistic-title">{{ item.title }}</div>
            <!-- <div class="statistic-value">{{ item.value }}</div> -->
            <a-statistic :value="item.value" animation />
          </div>
        </a-space>
        <a-divider></a-divider>
        <div class="compare-value">
          <span class="text mr-5">较昨日</span>
          <span
            :class="{
              rise: item.value > item.old_value,
              drop: item.value <= item.old_value,
            }"
          >
            <icon-arrow-rise v-if="item.value > item.old_value" />
            <icon-arrow-fall v-else />
            <span class="value">{{
              ((1 - item.old_value / item.value) * 100).toFixed(2)
            }}</span>
            <span class="suffix">%</span>
          </span>
        </div>
      </a-grid-item>
    </a-grid>
  </Wrapper>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { getOverviewData } from '@/api/dashboard';
  import useLoading from '@/hooks/loading';

  const sumData = ref();
  const { loading, setLoading } = useLoading();

  const getAnalysisData = async () => {
    setLoading(true);
    const { code, data } = await getOverviewData();
    if (code === 200) {
      sumData.value = data;
      setLoading(false);
    }
  };

  onMounted(() => {
    getAnalysisData();
  });
</script>

<script lang="ts">
  export default {
    name: 'DataPanel',
  };
</script>

<style lang="less" scoped>
  .skeleton-col {
    .arco-skeleton-shape {
      width: 240px;
      height: 145px;
      border-radius: 6px;
    }
  }
  .panel {
    .panel-col {
      background: var(--color-bg-2);
      padding: 15px 20px;
      border-radius: 6px;
      .icon {
        margin-right: 10px;
        border-radius: 50%;
        width: 58px;
        height: 58px;
        position: relative;
        svg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .arco-divider {
        margin: 10px 0;
      }
      .statistic-info {
        display: inline-block;
        color: var(--color-text-2);
        line-height: 1.5715;
        .statistic-title {
          margin-bottom: 8px;
          color: var(--color-text-2);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .statistic-value,
        .arco-statistic-value {
          color: var(--color-text-1);
          font-weight: 500;
          font-size: 22px;
          white-space: nowrap;
        }
      }
      .compare-value {
        margin-left: 55px;
        .text {
          color: var(--color-text-2);
        }
        .value {
          font-weight: 500;
          font-size: 20px;
        }
        .rise {
          color: rgb(var(--green-5));
        }
        .drop {
          color: rgb(var(--red-5));
        }
      }
    }
  }
</style>
