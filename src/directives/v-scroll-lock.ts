import type { Directive } from 'vue'

const vScrollLock: Directive = {
    mounted(_, binding) {
        document.body.style.overflow = binding.value ? 'hidden' : '';
    },
    updated(_, binding) {
        document.body.style.overflow = binding.value ? 'hidden' : '';
    },
    unmounted() {
        document.body.style.overflow = '';
    }
};

export default vScrollLock;
