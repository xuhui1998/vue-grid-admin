import { DirectiveBinding } from 'vue';
import { useUserStore } from '@/store';

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const { value } = binding;
  const userStore = useUserStore();
  
  const authCodeArr = userStore.$state.auth_user_code?.map((item : any) => item.api_url)

  if (authCodeArr) {
    const hasPermission = authCodeArr.includes(value);
    if (!hasPermission && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
};
