import type { Directive } from 'vue'

interface RippleElement extends HTMLElement {
  _rippleHandlers?: {
    onMouseDown: (e: MouseEvent | TouchEvent) => void
  }
}

interface RippleOptions {
  color?: string
  duration?: number
  disabled?: boolean
}

const vRipple: Directive<RippleElement, RippleOptions> = {
  mounted(el, binding) {
    const options: RippleOptions = {
      color: binding.value?.color || 'rgba(255, 255, 255, 0.3)',
      duration: binding.value?.duration || 600,
      disabled: binding.value?.disabled || false
    }

    if (options.disabled) return

    const createRipple = (e: MouseEvent | TouchEvent) => {
      const rect = el.getBoundingClientRect()
      const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
      const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top

      const ripple = document.createElement('span')
      const size = Math.max(rect.width, rect.height) * 2

      ripple.style.cssText = `
                position: absolute;
                top: ${y - size / 2}px;
                left: ${x - size / 2}px;
                width: ${size}px;
                height: ${size}px;
                background: ${options.color};
                border-radius: 50%;
                transform: scale(0);
                opacity: 1;
                pointer-events: none;
                transition: transform ${options.duration}ms ease-out, opacity ${options.duration}ms ease-out;
            `

      el.appendChild(ripple)

      // Force reflow
      ripple.offsetHeight

      ripple.style.transform = 'scale(1)'
      ripple.style.opacity = '0'

      setTimeout(() => {
        ripple.remove()
      }, options.duration)
    }

    el._rippleHandlers = { onMouseDown: createRipple }
    el.addEventListener('mousedown', createRipple)
    el.addEventListener('touchstart', createRipple, { passive: true })
  },

  updated(el, binding) {
    const options: RippleOptions = {
      color: binding.value?.color || 'rgba(255, 255, 255, 0.3)',
      duration: binding.value?.duration || 600,
      disabled: binding.value?.disabled || false
    }

    if (options.disabled && el._rippleHandlers) {
      el.removeEventListener('mousedown', el._rippleHandlers.onMouseDown)
      el.removeEventListener('touchstart', el._rippleHandlers.onMouseDown)
      delete el._rippleHandlers
    } else if (!options.disabled && !el._rippleHandlers) {
      // Re-initialize the directive
      const createRipple = (e: MouseEvent | TouchEvent) => {
        const rect = el.getBoundingClientRect()
        const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
        const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top

        const ripple = document.createElement('span')
        const size = Math.max(rect.width, rect.height) * 2

        ripple.style.cssText = `
                    position: absolute;
                    top: ${y - size / 2}px;
                    left: ${x - size / 2}px;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${options.color};
                    border-radius: 50%;
                    transform: scale(0);
                    opacity: 1;
                    pointer-events: none;
                    transition: transform ${options.duration}ms ease-out, opacity ${options.duration}ms ease-out;
                `

        el.appendChild(ripple)
        ripple.offsetHeight
        ripple.style.transform = 'scale(1)'
        ripple.style.opacity = '0'

        setTimeout(() => {
          ripple.remove()
        }, options.duration)
      }

      el._rippleHandlers = { onMouseDown: createRipple }
      el.addEventListener('mousedown', createRipple)
      el.addEventListener('touchstart', createRipple, { passive: true })
    }
  },

  unmounted(el) {
    if (el._rippleHandlers) {
      el.removeEventListener('mousedown', el._rippleHandlers.onMouseDown)
      el.removeEventListener('touchstart', el._rippleHandlers.onMouseDown)
      delete el._rippleHandlers
    }
  }
}

export default vRipple
