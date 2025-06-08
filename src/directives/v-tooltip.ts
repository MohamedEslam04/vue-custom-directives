import type { Directive } from 'vue'

const vTooltip: Directive = {
    mounted(el, binding) {
        el.setAttribute('title', binding.value);
    },
    updated(el, binding) {
        el.setAttribute('title', binding.value);
    }
};

export default vTooltip;
