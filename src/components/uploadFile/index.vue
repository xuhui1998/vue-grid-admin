<template>
  <a-upload
    :list-type="listType"
    :action="action"
    :file-list="file ? [file] : []"
    :show-file-list="showFile"
    :headers="{ Authorization: getToken() as string }"
    :auto-upload="autoUpload"
    :limit="limit"
    :accept="accept"
    :show-remove-button="showRemoveButton"
    @change="changeUploadFile"
    @progress="onProgress"
    @before-remove="beforeRemove"
  >
    <template #upload-button>
      <div
        :class="`arco-upload-list-item${
          file && file.status === 'error' ? ' arco-upload-list-item-error' : ''
        }`"
      >
        <div
          v-if="file && file.url"
          :style="cardStyle"
          class="arco-upload-list-picture custom-upload-avatar"
        >
          <img :src="file.url" />
          <div class="arco-upload-list-picture-mask">
            <a-space class="icon-list">
              <IconEdit />
              <IconDelete v-if="showDelIcon" @click.stop="removeFile" />
            </a-space>
          </div>
          <a-progress
            v-if="file.status === 'uploading' && file.percent < 100"
            :percent="file.percent"
            type="circle"
            size="mini"
            :style="{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translateX(-50%) translateY(-50%)',
            }"
          />
        </div>
        <div v-else class="arco-upload-picture-card" :style="cardStyle">
          <div class="arco-upload-picture-card-text">
            <span v-if="icon">
              <component
                :is="icon"
                v-if="getIconType(icon) === 'arco-icon'"
                :style="iconStyle"
              ></component>
              <SvgIcon
                v-if="getIconType(icon) !== 'arco-icon'"
                :icon-class="icon"
                :style="iconStyle"
              ></SvgIcon>
            </span>
            <span v-else><IconPlus /></span>
            <div style="font-weight: 600; font-size: 13px">
              <slot name="text"></slot>
            </div>
          </div>
        </div>
      </div>
    </template>
  </a-upload>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { getToken } from '@/utils/auth';
  // import { upload } from '@/api/episode';
  import { getIconType } from '@/utils';
  import { Message, Modal, FileItem } from '@arco-design/web-vue';

  type FileListType = 'text' | 'picture' | 'picture-card';

  const props = withDefaults(
    defineProps<{
      listType?: FileListType;
      path?: string;
      fileData?: object | string;
      actionUrl?: string;
      autoUpload?: boolean;
      customUpload?: boolean;
      showFile?: boolean;
      limit?: number;
      cardStyle?: { width: string; height: string };
      accept?: string;
      showRemoveButton?: boolean;
      icon?: string;
      iconStyle?: { [key: string]: string };
      /** 文件大小限制 单位MB */
      limitFileSize?: number;
      showDelIcon?: boolean;
    }>(),
    {
      listType: 'picture-card',
      path: '',
      fileData: '',
      actionUrl: '',
      customUpload: false,
      showFile: false,
      limit: 0,
      autoUpload: false,
      accept: '',
      showRemoveButton: true,
      showDelIcon: false,
    }
  );
  const emit = defineEmits([
    'linkPath',
    'removeFile',
    'customUpload',
    'beforeUpload',
    'coverSize',
  ]);

  const action = `${import.meta.env.VITE_API_BASE_URL}${props.actionUrl}`;
  const file = ref<any>(props.fileData || null);
  // 上传进度
  const loading = ref<boolean>(false);
  const imageDimensions = ref();

  const uploadFile = async () => {
    // 自动上传上传状态 上传中
    loading.value = true;
    const timestamp = new Date().getTime();
    const fileData = new FormData();
    const fileName = file.value.name.split('.');
    fileName.splice(1, 0, timestamp);
    fileData.append(
      'filepath',
      `${props.path}/${fileName.join('.').replace('.', '')}`
    );
    fileData.append('file', file.value.file);
    // const { result, success } = await upload(props.actionUrl, fileData);
    // if (!result?.data?.src) {
    //   loading.value = false;
    //   file.value = null;
    //   // Message.error('上传失败');
    //   return;
    // }
    // if (success) {
    //   file.value.url = result.data.src;
    //   // 自动上传上传状态 上传完成
    //   loading.value = false;
    //   emit('linkPath', result.data.src, file.value.file);
    // }
  };

  const getCoverSize = (coverFile: File) => {
    // console.log(coverFile);
    const imageUrl = URL.createObjectURL(coverFile);
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      imageDimensions.value = { width: img.width, height: img.height };
      emit('coverSize', imageDimensions.value);
      // 释放创建的 URL 对象，优化内存
      URL.revokeObjectURL(imageUrl);
    };
  };

  const changeUploadFile = (fileList: any, fileItem: any) => {
    if (props.limitFileSize) {
      const isExceedSize = fileItem.file.size > props.limitFileSize * 1024 * 1024;
      if (isExceedSize) {
        Message.warning(`文件大小不能超过${props.limitFileSize}MB`);
        return;
      }
    }
    getCoverSize(fileItem.file);
    file.value = { ...fileItem };
    if (props.customUpload) {
      // 手动上传可以自定义loading状态
      emit('customUpload', file.value);
      return;
    }
    uploadFile();
  };

  const onProgress = (currentFile: any) => {
    file.value = currentFile;
  };

  const beforeRemove = (currentFile: FileItem): Promise<boolean> => {
    return new Promise(() => {
      Modal.confirm({
        title: '提示',
        content: `确认删除 ${currentFile.name}`,
        onOk: () => {
          file.value = null;
          emit('removeFile');
        },
      });
    });
  };

  const removeFile = () => {
    file.value = null;
    emit('removeFile');
  };

  defineExpose({
    loading,
  });

  const onBeforeUpload = (file: File) => {
    // emit('beforeUpload', file);
  };
</script>

<script lang="ts">
  export default {
    name: 'UploadFile',
  };
</script>

<style lang="less" scoped>
  .cover-upload {
    :deep(.arco-upload) {
      position: absolute;
      top: 0;
      z-index: 999;
    }
    :deep(.arco-upload-list-picture) {
      width: 120px;
      height: 160px;
      position: absolute;
      top: 0;
      z-index: 999;
      margin: 0;
      .icon-list {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .arco-upload-list-picture-operation {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .arco-upload-icon-upload {
          display: none;
        }
      }
    }
  }
  :deep(.arco-upload-list-picture-mask) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .arco-upload {
    .arco-upload-list-item {
      margin: 0;
    }
  }
  :deep(.arco-upload-list) {
    .arco-upload-progress {
      display: none;
    }
  }
</style>
