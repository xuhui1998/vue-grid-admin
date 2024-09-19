<template>
  <a-input-number
    v-if="type === 'number'"
    :style="{ width: '100px' }"
    size="small"
    :default-value="(defaultValue as number)"
    @change="handleChange"
  />
  <a-select
    v-if="type === 'select'"
    :default-value="(defaultValue as string)"
    :options="options"
    size="small"
    :style="{ width: '100px' }"
    @change="handleChange"
  ></a-select>
  <a-switch
    v-if="type === 'switch'"
    :default-checked="(defaultValue as boolean)"
    @change="handleChange"
  />
</template>

<script lang="ts" setup>
  const props = defineProps({
    type: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    options: {
      type: Array<{ label: string; value: string }>,
      default() {
        return [];
      },
    },
    defaultValue: {
      type: [String, Boolean, Number],
      default: '',
    },
  });
  const emit = defineEmits(['inputChange']);
  const handleChange = (value: unknown) => {
    emit('inputChange', {
      value,
      key: props.name,
    });
  };
</script>
