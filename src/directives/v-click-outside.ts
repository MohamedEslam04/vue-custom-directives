import type { Directive } from 'vue'

interface ClickOutsideElement extends HTMLElement {
  _clickOutsideHandler?: (e: MouseEvent | TouchEvent) => void
}

interface ClickOutsideOptions {
  handler: (e: MouseEvent | TouchEvent) => void
  ignore?: string[]
  enabled?: boolean
}

const vClickOutside: Directive<ClickOutsideElement, ClickOutsideOptions> = {
  mounted(el, binding) {
    const options: ClickOutsideOptions = {
      handler: typeof binding.value === 'function' ? binding.value : binding.value.handler,
      ignore: binding.value?.ignore || [],
      enabled: binding.value?.enabled ?? true
    }

    if (!options.enabled) return

    const handler = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement

      // Check if click is inside any ignored elements
      if (options.ignore?.some(selector => target.closest(selector))) {
        return
      }

      // Check if click is outside the element
      if (!el.contains(target)) {
        options.handler(e)
      }
    }

    el._clickOutsideHandler = handler
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler, { passive: true })
  },

  updated(el, binding) {
    const options: ClickOutsideOptions = {
      handler: typeof binding.value === 'function' ? binding.value : binding.value.handler,
      ignore: binding.value?.ignore || [],
      enabled: binding.value?.enabled ?? true
    }

    if (options.enabled && !el._clickOutsideHandler) {
      // Re-initialize the directive
      const handler = (e: MouseEvent | TouchEvent) => {
        const target = e.target as HTMLElement

        if (options.ignore?.some(selector => target.closest(selector))) {
          return
        }

        if (!el.contains(target)) {
          options.handler(e)
        }
      }

      el._clickOutsideHandler = handler
      document.addEventListener('mousedown', handler)
      document.addEventListener('touchstart', handler, { passive: true })
    } else if (!options.enabled && el._clickOutsideHandler) {
      document.removeEventListener('mousedown', el._clickOutsideHandler)
      document.removeEventListener('touchstart', el._clickOutsideHandler)
      delete el._clickOutsideHandler
    }
  },

  unmounted(el) {
    if (el._clickOutsideHandler) {
      document.removeEventListener('mousedown', el._clickOutsideHandler)
      document.removeEventListener('touchstart', el._clickOutsideHandler)
      delete el._clickOutsideHandler
    }
  }
}

export default vClickOutside
