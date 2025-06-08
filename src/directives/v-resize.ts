import type { Directive } from 'vue'

const vResize: Directive = {
    mounted(el, binding) {
        const observer = new ResizeObserver(() => binding.value());
        observer.observe(el);
        el.__resizeObserver__ = observer;
    },
    unmounted(el) {
        el.__resizeObserver__?.disconnect();
        delete el.__resizeObserver__;
    }
};

export default vResize;
