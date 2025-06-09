import type { Directive } from 'vue'

interface RippleElement extends HTMLElement {
    _rippleHandler?: (e: MouseEvent) => void
}

const vRipple: Directive<RippleElement> = {
    mounted(el) {
        el.style.position = 'relative'
        el.style.overflow = 'hidden'

        // Add ripple styles to document if not already added
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style')
            style.id = 'ripple-styles'
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `
            document.head.appendChild(style)
        }

        const handler = (e: MouseEvent) => {
            const ripple = document.createElement('span')
            const size = Math.max(el.clientWidth, el.clientHeight)
            const rect = el.getBoundingClientRect()
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                top: ${e.clientY - rect.top - size / 2}px;
                left: ${e.clientX - rect.left - size / 2}px;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 1000;
            `
            
            el.appendChild(ripple)
            ripple.addEventListener('animationend', () => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple)
                }
            })
        }

        el._rippleHandler = handler
        el.addEventListener('click', handler)
    },
    unmounted(el) {
        if (el._rippleHandler) {
            el.removeEventListener('click', el._rippleHandler)
            delete el._rippleHandler
        }
    }
}

export default vRipple