<template>
  <Wrapper title="项目动态">
    <a-list class="trend-list" :bordered="false" :data="list">
      <template #item="{ item }">
        <a-list-item class="list-item" action-layout="vertical">
          <template #actions>
            <div class="flex-row-between">
              <div class="list-item-action">
                <span v-if="item.thumbs_up">
                  <icon-thumb-up />{{ item.thumbs_up }}
                </span>
                <span><icon-eye />{{ item.browse }}</span>
                <span><icon-message />{{ item.comment }}</span>
              </div>
              <div>{{ item.time }}</div>
            </div>
          </template>
          <template #extra>
            <div v-if="item.extra" class="image-extra">
              <img alt="avatar" :src="item.extra" />
            </div>
          </template>
          <a-list-item-meta :title="item.title">
            <template #avatar>
              <a-avatar shape="square">
                <img alt="avatar" :src="item.avatar" />
              </a-avatar>
            </template>
            <template #description>
              <span>
                {{ item.content }}
                <a-link>{{ item.link }}</a-link>
              </span>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </Wrapper>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { getProjectDynamicList } from '@/api/dashboard';
  import { TrendsProps } from '../types';

  const list = ref<Array<TrendsProps>>([]);

  const getList = async () => {
    const { data, code } = await getProjectDynamicList();
    if (code === 200) {
      list.value = data.sort((a, b) => b.id - a.id);
    }
  };

  onMounted(() => {
    getList();
  });
</script>

<script lang="ts">
  export default {
    name: 'ProjectTrends',
  };
</script>

<style lang="less" scoped>
  .trend-list {
    .image-extra {
      width: 200px;
      border-radius: 4px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .list-item {
      padding: 20px 0;
      border-bottom: 1px solid var(--color-fill-3);
      gap: 20px;
      .list-item-action {
        display: flex;
        align-items: center;
        gap: 8px;
        span {
          cursor: pointer;
        }
      }
    }
    :deep(.arco-list-item-action) {
      .arco-icon {
        margin-right: 4px;
      }
      li {
        width: 100%;
        color: var(--color-text-3);
        cursor: auto;
      }
    }
  }
</style>
