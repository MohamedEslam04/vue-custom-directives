import type { Directive } from 'vue'

const vPermission: Directive = {
    mounted(el, binding) {
        const userRoles = ['admin', 'editor']; // Replace with real roles
        if (!userRoles.includes(binding.value)) {
            el.style.display = 'none';
        }
    }
};

export default vPermission;
