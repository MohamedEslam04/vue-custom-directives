import type { Directive } from 'vue'

const vLongpress: Directive = {
    mounted(el, binding) {
        let pressTimer: ReturnType<typeof setTimeout> | null = null;

        const start = () => {
            pressTimer = setTimeout(() => binding.value(), 800);
        };
        const cancel = () => {
            if (pressTimer) clearTimeout(pressTimer);
        };

        el.addEventListener('mousedown', start);
        el.addEventListener('touchstart', start);
        el.addEventListener('mouseup', cancel);
        el.addEventListener('mouseleave', cancel);
        el.addEventListener('touchend', cancel);

        el.__longpressCancel__ = cancel;
    },
    unmounted(el) {
        el.__longpressCancel__?.();
        delete el.__longpressCancel__;
    }
};

export default vLongpress;
