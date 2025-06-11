import type { Directive } from 'vue'

interface ScrollLockElement extends HTMLElement {
  _scrollLockState?: {
    originalStyle: string
    originalPadding: string
    scrollbarWidth: number
  }
}

interface ScrollLockOptions {
  enabled?: boolean
  preserveScrollbar?: boolean
}

const vScrollLock: Directive<ScrollLockElement, ScrollLockOptions> = {
  mounted(el, binding) {
    const options: Required<ScrollLockOptions> = {
      enabled: binding.value?.enabled ?? true,
      preserveScrollbar: binding.value?.preserveScrollbar ?? true
    }

    if (!options.enabled) return

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const originalStyle = document.body.style.cssText
    const originalPadding = document.body.style.paddingRight

    el._scrollLockState = {
      originalStyle,
      originalPadding,
      scrollbarWidth
    }

    document.body.style.overflow = 'hidden'
    if (options.preserveScrollbar && scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }
  },

  updated(el, binding) {
    const options: Required<ScrollLockOptions> = {
      enabled: binding.value?.enabled ?? true,
      preserveScrollbar: binding.value?.preserveScrollbar ?? true
    }

    if (options.enabled && !el._scrollLockState) {
      // Apply scroll lock
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      const originalStyle = document.body.style.cssText
      const originalPadding = document.body.style.paddingRight

      el._scrollLockState = {
        originalStyle,
        originalPadding,
        scrollbarWidth
      }

      document.body.style.overflow = 'hidden'
      if (options.preserveScrollbar && scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }
    } else if (!options.enabled && el._scrollLockState) {
      // Restore original state
      document.body.style.cssText = el._scrollLockState.originalStyle
      document.body.style.paddingRight = el._scrollLockState.originalPadding
      delete el._scrollLockState
    }
  },

  unmounted(el) {
    if (el._scrollLockState) {
      // Restore original state
      document.body.style.cssText = el._scrollLockState.originalStyle
      document.body.style.paddingRight = el._scrollLockState.originalPadding
      delete el._scrollLockState
    }
  }
}

export default vScrollLock
