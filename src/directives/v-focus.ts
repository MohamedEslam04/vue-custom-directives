import type { Directive } from 'vue'

const vFocus: Directive = {
    mounted(el) {
        // Use nextTick to ensure DOM is ready
        setTimeout(() => {
            if (el.focus && typeof el.focus === 'function') {
                el.focus()
            }
        }, 0)
    }
}

export default vFocus