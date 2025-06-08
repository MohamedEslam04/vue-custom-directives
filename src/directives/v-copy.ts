import type { Directive } from 'vue'

const vCopy: Directive = {
    mounted(el, binding) {
        const copyText = () => {
            navigator.clipboard.writeText(binding.value)
                .then(() => console.log('Copied:', binding.value))
                .catch(err => console.error('Copy failed', err));
        };
        el.__copyHandler__ = copyText;
        el.addEventListener('click', copyText);
    },
    unmounted(el) {
        el.removeEventListener('click', el.__copyHandler__);
        delete el.__copyHandler__;
    }
};

export default vCopy;
