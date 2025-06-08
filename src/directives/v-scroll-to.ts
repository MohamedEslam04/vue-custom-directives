import type { Directive } from 'vue'

const vScrollTo: Directive = {
    mounted(el, binding) {
        const handler = () => {
            const target = document.querySelector(binding.value);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        };
        el.__scrollHandler__ = handler;
        el.addEventListener('click', handler);
    },
    unmounted(el) {
        el.removeEventListener('click', el.__scrollHandler__);
        delete el.__scrollHandler__;
    }
};

export default vScrollTo;
