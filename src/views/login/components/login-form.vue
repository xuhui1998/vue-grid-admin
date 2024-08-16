<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">{{ $t('login.form.title') }}</div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="loginForm"
      :model="userInfo"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="username"
        :rules="[{ required: true, message: $t('login.form.userName.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.username"
          :placeholder="$t('login.form.userName.placeholder')"
          size="large"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[{ required: true, message: $t('login.form.password.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.password"
          :placeholder="$t('login.form.password.placeholder')"
          allow-clear
          size="large"
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <div class="login-form-password-actions">
          <a-checkbox
            checked="rememberPassword"
            :model-value="loginConfig.rememberPassword"
            @change="setRememberPassword as any"
          >
            {{ $t('login.form.rememberPassword') }}
          </a-checkbox>
        </div>
        <a-button
          class="mt-20"
          size="large"
          type="primary"
          html-type="submit"
          long
          :loading="loading"
        >
          {{ $t('login.form.login') }}
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import { useI18n } from 'vue-i18n';
  import { useStorage } from '@vueuse/core';
  import { useUserStore } from '@/store';
  import useLoading from '@/hooks/loading';
  import { LoginConfigProps } from '@/types/global';
  import LoginDto from '@/dto/loginDto';
  import CryptoJS from 'crypto-js';

  const action = import.meta.env.VITE_API_BASE_URL;

  const router = useRouter();
  const { t } = useI18n();
  const errorMessage = ref('');
  const { loading, setLoading } = useLoading();
  const userStore = useUserStore();

  // 密钥（用于加密和解密）
  const secretKey = 'vue-grid-admin';
  /**
   * 加密函数
   * @param text 加密密文
   */
  const encrypt = (text: string) => {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
  };

  /**
   * 解密函数
   * @param cipherText 解密密文
   */
  const decrypt = (cipherText: string) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const loginConfig = useStorage('login-config', {} as LoginConfigProps);
  const userInfo = ref<LoginDto>({
    ...new LoginDto(),
    username: loginConfig.value.username,
    password: loginConfig.value.password
      ? decrypt(loginConfig.value.password)
      : '',
  });

  const handleSubmit = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: LoginDto;
  }) => {
    if (loading.value) return;
    if (!errors) {
      setLoading(true);
      try {
        const { code, data } = await userStore.login(values);
        if (code === 200) {
          const { redirect, ...othersQuery } = router.currentRoute.value.query;
          router.push({
            name:
              redirect === 'login'
                ? 'Workplace'
                : (redirect as string) || 'Workplace',
            query: {
              ...othersQuery,
            },
          });
          Message.success(t('login.form.login.success'));
          const { rememberPassword } = loginConfig.value;
          const { username, password } = values;
          // 进行md5加密存储。
          loginConfig.value.username = rememberPassword ? username : '';
          loginConfig.value.password = rememberPassword ? encrypt(password) : '';
        }
      } catch (err) {
        console.log(err);
        errorMessage.value = (err as Error).message;
      } finally {
        setLoading(false);
      }
    }
  };
  const setRememberPassword = (value: boolean) => {
    loginConfig.value.rememberPassword = value;
  };

  onMounted(() => {});
</script>

<style lang="less" scoped>
  .login-form {
    &-wrapper {
      width: 350px;
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
    }

    &-sub-title {
      color: var(--color-text-3);
      font-size: 16px;
      line-height: 24px;
    }

    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }

    .arco-form-item {
      margin-bottom: 20px;
    }
  }
</style>
