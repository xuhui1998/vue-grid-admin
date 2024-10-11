<template>
  <a-spin :loading="loading">
    <Wrapper title="更新记录" :content-style="{ padding: '20px 25px' }">
      <a-timeline>
        <a-timeline-item
          v-for="item in timelineData"
          :key="item.id"
          :label="item.label"
          >{{ item.title }}</a-timeline-item
        >
      </a-timeline>
    </Wrapper>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { getProjectUpdateList } from '@/api/dashboard';
  import useLoading from '@/hooks/loading';
  import { ProjectUpdatedList } from '../types';

  const timelineData = ref<Array<ProjectUpdatedList>>([]);
  const { loading, setLoading } = useLoading();

  const getUpdateLogList = async () => {
    setLoading(true);
    const { data, code } = await getProjectUpdateList();
    if (code === 200) {
      timelineData.value = data;
      setLoading(false);
    }
  };

  onMounted(() => {
    getUpdateLogList();
  });
</script>

<style lang="less" scoped>
  .wrapper {
    min-height: 600px;
  }
  :deep(.arco-timeline-item) {
    min-height: 71px;
  }
</style>
