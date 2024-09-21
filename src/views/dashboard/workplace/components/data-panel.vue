<template>
  <Wrapper title="数据总览">
    <a-grid :cols="24" :col-gap="20" class="panel">
      <a-grid-item class="panel-col" :span="4">
        <a-space>
          <div class="icon">
            <SvgIcon icon-class="day-cost" :size="54" />
          </div>
          <div class="statistic-info">
            <div class="statistic-title">今日订单数量</div>
            <div class="statistic-value">{{ sumData.orderNum }}</div>
          </div>
        </a-space>
        <a-divider></a-divider>
        <div class="compare-value">
          <span class="text mr-5">较昨日</span>
          <span class="drop">
            <icon-arrow-fall />
            <span class="value">12.64</span>
            <span class="suffix">%</span>
          </span>
        </div>
      </a-grid-item>
      <a-grid-item class="panel-col" :span="4">
        <a-space>
          <div class="icon">
            <SvgIcon icon-class="day-pay" :size="54" />
          </div>
          <div class="statistic-info">
            <div class="statistic-title">今日付费</div>
            <div class="statistic-value">{{ sumData.new_user_all_pay }}</div>
          </div>
        </a-space>
        <a-divider></a-divider>
        <div class="compare-value">
          <span class="text mr-5">较昨日</span>
          <span class="rise">
            <icon-arrow-rise />
            <span class="value">55.44</span>
            <span class="suffix">%</span>
          </span>
        </div>
      </a-grid-item>
      <a-grid-item class="panel-col" :span="4">
        <a-space>
          <div class="icon">
            <SvgIcon icon-class="new-user" :size="54" />
          </div>
          <div class="statistic-info">
            <div class="statistic-title">新增用户</div>
            <div class="statistic-value">{{ sumData.reg_user_count }}</div>
          </div>
        </a-space>
        <a-divider></a-divider>
        <div class="compare-value">
          <span class="text mr-5">较昨日</span>
          <span class="rise">
            <icon-arrow-rise />
            <span class="value">55.44</span>
            <span class="suffix">%</span>
          </span>
        </div>
      </a-grid-item>
      <a-grid-item class="panel-col" :span="4">
        <a-space>
          <div class="icon">
            <SvgIcon icon-class="new-pay" :size="54" />
          </div>
          <div class="statistic-info">
            <div class="statistic-title">新增付费</div>
            <div class="statistic-value">{{ sumData.all_pay_user }}</div>
          </div>
        </a-space>
        <a-divider></a-divider>
        <div class="compare-value">
          <span class="text mr-5">较昨日</span>
          <span class="rise">
            <icon-arrow-rise />
            <span class="value">55.44</span>
            <span class="suffix">%</span>
          </span>
        </div>
      </a-grid-item>
      <a-grid-item class="panel-col" :span="4">
        <a-space>
          <div class="icon">
            <SvgIcon icon-class="month-total" :size="54" />
          </div>
          <div class="statistic-info">
            <div class="statistic-title">本月累计</div>
            <div class="statistic-value">{{ sumData.cost }}</div>
          </div>
        </a-space>
        <a-divider></a-divider>
        <div class="compare-value">
          <span class="text mr-5">较昨日</span>
          <span class="rise">
            <icon-arrow-rise />
            <span class="value">55.44</span>
            <span class="suffix">%</span>
          </span>
        </div>
      </a-grid-item>
      <a-grid-item class="panel-col" :span="4">
        <a-space>
          <div class="icon">
            <SvgIcon icon-class="year-total" :size="54" />
          </div>
          <div class="statistic-info">
            <div class="statistic-title">年度累计</div>
            <div class="statistic-value">{{ sumData.cost }}</div>
          </div>
        </a-space>
        <a-divider></a-divider>
        <div class="compare-value">
          <span class="text mr-5">较昨日</span>
          <span class="rise">
            <icon-arrow-rise />
            <span class="value">55.44</span>
            <span class="suffix">%</span>
          </span>
        </div>
      </a-grid-item>
    </a-grid>
  </Wrapper>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';

  const sumData = reactive({
    orderNum: 9234,
  });
</script>

<script lang="ts">
  export default {
    name: 'DataPanel',
  };
</script>

<style lang="less" scoped>
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
        .statistic-value {
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
