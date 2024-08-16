<template>
  <a-card :title="title" :bordered="false">
    <a-row type="flex" justify="center">
      <a-col :span="3">
        <a-space>
          <div class="icon"><SvgIcon icon-class="cost" :size="30" /></div>
          <div class="statistic-info">
            <div class="statistic-title">推广消耗</div>
            <div class="statistic-value">{{ sumData.cost }}</div>
          </div>
        </a-space>
      </a-col>
      <a-col :span="3">
        <a-space>
          <div class="icon"
            ><SvgIcon icon-class="new-pay-total" :size="40"
          /></div>
          <div class="statistic-info">
            <div class="statistic-title">新增用户付费</div>
            <div class="statistic-value">{{ sumData.new_user_all_pay }}</div>
          </div>
        </a-space>
      </a-col>
      <a-col :span="3">
        <a-space>
          <div class="icon">
            <SvgIcon icon-class="pay-total" :size="40" />
          </div>
          <div class="statistic-info">
            <div class="statistic-title">总付费</div>
            <div class="statistic-value">{{ sumData.all_money }}</div>
          </div>
        </a-space>
      </a-col>
      <a-col :span="3">
        <a-space>
          <div class="icon"><SvgIcon icon-class="admin" :size="40" /></div>
          <div class="statistic-info">
            <div class="statistic-title">付费用户数</div>
            <div class="statistic-value">{{ sumData.all_pay_user }}</div>
          </div>
        </a-space>
      </a-col>
      <a-col :span="3">
        <a-space>
          <div class="icon"><SvgIcon icon-class="pay-count" :size="40" /></div>
          <div class="statistic-info">
            <div class="statistic-title">付费次数</div>
            <div class="statistic-value">{{ sumData.all_pay_count }}</div>
          </div>
        </a-space>
      </a-col>
      <a-col :span="3">
        <a-space>
          <div class="icon"><SvgIcon icon-class="new-reg" :size="40" /></div>
          <div class="statistic-info">
            <div class="statistic-title">新增用户数</div>
            <div class="statistic-value">{{ sumData.reg_user_count }}</div>
          </div>
        </a-space>
      </a-col>
      <a-col :span="3">
        <a-space>
          <div class="icon"><SvgIcon icon-class="add-admin" :size="40" /></div>
          <div class="statistic-info">
            <div class="statistic-title">新增付费用户数</div>
            <div class="statistic-value">{{ sumData.new_pay_user }}</div>
          </div>
        </a-space>
      </a-col>
      <a-col :span="3">
        <a-space>
          <div class="icon">
            <SvgIcon icon-class="new-pay-count" :size="40" />
          </div>
          <div class="statistic-info">
            <div class="statistic-title">新增用户付费次数</div>
            <div class="statistic-value">{{ sumData.new_pay_count }}</div>
          </div>
        </a-space>
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts" setup>
  import { toRefs } from 'vue';

  const props = defineProps({
    sumData: {
      type: Object,
      default: () => ({}),
    },
    title: {
      type: String,
      default: null,
    },
  });

  const { sumData } = toRefs(props);
</script>

<style lang="less" scoped>
  .icon {
    margin-right: 10px;
    border-radius: 50%;
    width: 58px;
    height: 58px;
    background-color: #eee;
    position: relative;
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
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
  :deep(.arco-statistic-title) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
