import type { Directive } from 'vue'

const vLazy: Directive = {
    mounted(el, binding) {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                el.src = binding.value;
                observer.disconnect();
            }
        });
        observer.observe(el);
        el.__lazyObserver__ = observer;
    },
    unmounted(el) {
        el.__lazyObserver__?.disconnect();
        delete el.__lazyObserver__;
    }
};

export default vLazy;
