import type { Directive } from 'vue'

interface DebounceElement extends HTMLElement {
  _debounceHandler?: (e: Event) => void
  _debounceTimeout?: number
  _debounceEvent?: string
}

interface DebounceOptions {
  callback: (e: Event) => void
  delay?: number
  event?: string
  immediate?: boolean
}

const vDebounce: Directive<DebounceElement, DebounceOptions> = {
  mounted(el, binding) {
    const options: DebounceOptions = {
      callback: binding.value?.callback || binding.value,
      delay: binding.value?.delay || 300,
      event: binding.arg || 'input',
      immediate: binding.value?.immediate || false
    }

    if (typeof options.callback !== 'function') {
      console.warn('v-debounce directive expects a function as value')
      return
    }

    const handler = (e: Event) => {
      if (el._debounceTimeout) {
        clearTimeout(el._debounceTimeout)
      }

      if (options.immediate && !el._debounceTimeout) {
        options.callback(e)
      }

      el._debounceTimeout = window.setTimeout(() => {
        if (!options.immediate) {
          options.callback(e)
        }
        el._debounceTimeout = undefined
      }, options.delay)
    }

    el._debounceHandler = handler
    el._debounceEvent = options.event
    el.addEventListener(options.event as keyof HTMLElementEventMap, handler, { passive: true })
  },

  updated(el, binding) {
    const options: DebounceOptions = {
      callback: binding.value?.callback || binding.value,
      delay: binding.value?.delay || 300,
      event: binding.arg || 'input',
      immediate: binding.value?.immediate || false
    }

    if (typeof options.callback !== 'function') {
      console.warn('v-debounce directive expects a function as value')
      return
    }

    // Remove old handler
    if (el._debounceHandler && el._debounceEvent) {
      el.removeEventListener(el._debounceEvent as keyof HTMLElementEventMap, el._debounceHandler)
      if (el._debounceTimeout) {
        clearTimeout(el._debounceTimeout)
      }
    }

    // Add new handler
    const handler = (e: Event) => {
      if (el._debounceTimeout) {
        clearTimeout(el._debounceTimeout)
      }

      if (options.immediate && !el._debounceTimeout) {
        options.callback(e)
      }

      el._debounceTimeout = window.setTimeout(() => {
        if (!options.immediate) {
          options.callback(e)
        }
        el._debounceTimeout = undefined
      }, options.delay)
    }

    el._debounceHandler = handler
    el._debounceEvent = options.event
    el.addEventListener(options.event as keyof HTMLElementEventMap, handler, { passive: true })
  },

  unmounted(el) {
    if (el._debounceHandler && el._debounceEvent) {
      el.removeEventListener(el._debounceEvent as keyof HTMLElementEventMap, el._debounceHandler)
      if (el._debounceTimeout) {
        clearTimeout(el._debounceTimeout)
      }
      delete el._debounceHandler
      delete el._debounceTimeout
      delete el._debounceEvent
    }
  }
}

export default vDebounce
