import type { Directive } from 'vue'

interface FocusElement extends HTMLElement {
  _focusTimeout?: number
  _focusOptions?: Required<FocusOptions>
}

interface FocusOptions {
  enabled?: boolean
  delay?: number
  select?: boolean
  preventScroll?: boolean
  focusVisible?: boolean
}

const vFocus: Directive<FocusElement, FocusOptions> = {
  mounted(el, binding) {
    const options: Required<FocusOptions> = {
      enabled: binding.value?.enabled ?? true,
      delay: binding.value?.delay ?? 0,
      select: binding.value?.select ?? false,
      preventScroll: binding.value?.preventScroll ?? false,
      focusVisible: binding.value?.focusVisible ?? false
    }

    el._focusOptions = options
    if (!options.enabled) return

    const focus = () => {
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
        el.focus({ preventScroll: options.preventScroll })
        if (options.select) {
          el.select()
        }
      } else {
        el.focus({ preventScroll: options.preventScroll })
      }

      if (options.focusVisible) {
        el.classList.add('focus-visible')
      }
    }

    if (options.delay > 0) {
      el._focusTimeout = window.setTimeout(focus, options.delay)
    } else {
      focus()
    }
  },

  updated(el, binding) {
    const options: Required<FocusOptions> = {
      enabled: binding.value?.enabled ?? true,
      delay: binding.value?.delay ?? 0,
      select: binding.value?.select ?? false,
      preventScroll: binding.value?.preventScroll ?? false,
      focusVisible: binding.value?.focusVisible ?? false
    }

    el._focusOptions = options

    if (options.enabled) {
      const focus = () => {
        if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
          el.focus({ preventScroll: options.preventScroll })
          if (options.select) {
            el.select()
          }
        } else {
          el.focus({ preventScroll: options.preventScroll })
        }

        if (options.focusVisible) {
          el.classList.add('focus-visible')
        }
      }

      if (el._focusTimeout) {
        clearTimeout(el._focusTimeout)
      }

      if (options.delay > 0) {
        el._focusTimeout = window.setTimeout(focus, options.delay)
      } else {
        focus()
      }
    } else if (el._focusOptions?.focusVisible) {
      el.classList.remove('focus-visible')
    }
  },

  unmounted(el) {
    if (el._focusTimeout) {
      clearTimeout(el._focusTimeout)
      delete el._focusTimeout
    }
    if (el._focusOptions?.focusVisible) {
      el.classList.remove('focus-visible')
    }
    delete el._focusOptions
  }
}

export default vFocus
