import type { Directive } from 'vue'

interface UppercaseElement extends HTMLInputElement {
    _uppercaseHandler?: (e: Event) => void
}

const vUppercase: Directive<UppercaseElement> = {
    mounted(el) {
        if (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') {
            console.warn('v-uppercase directive should be used on input or textarea elements')
            return
        }

        const handler = (e: Event) => {
            const target = e.target as HTMLInputElement
            const start = target.selectionStart
            const end = target.selectionEnd
            target.value = target.value.toUpperCase()
            
            // Restore cursor position
            if (start !== null && end !== null) {
                target.setSelectionRange(start, end)
            }
            
            // Trigger input event for Vue reactivity
            target.dispatchEvent(new Event('input', { bubbles: true }))
        }

        el._uppercaseHandler = handler
        el.addEventListener('input', handler)
    },
    unmounted(el) {
        if (el._uppercaseHandler) {
            el.removeEventListener('input', el._uppercaseHandler)
            delete el._uppercaseHandler
        }
    }
}

export default vUppercase