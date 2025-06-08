import type { Directive } from 'vue'

const vDebounce: Directive = {
    mounted(el, binding) {
        let timeout: ReturnType<typeof setTimeout> | null = null;
        const event = binding.arg || 'input';
        const delay = binding.value.delay || 300;
        const handler = binding.value.callback;

        const listener = (e: Event) => {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => handler(e), delay);
        };

        el.__debounceHandler__ = listener;
        el.addEventListener(event, listener);
    },
    unmounted(el, binding) {
        const event = binding.arg || 'input';
        el.removeEventListener(event, el.__debounceHandler__);
        delete el.__debounceHandler__;
    }
};

export default vDebounce;
