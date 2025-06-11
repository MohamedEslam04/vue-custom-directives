import type { DirectiveBinding } from './index'

declare module 'vue' {
  export interface GlobalDirectives {
    // Copy directive
    copy: DirectiveBinding<{
      text?: string
      onSuccess?: () => void
      onError?: (error: Error) => void
    }>

    // Debounce directive
    debounce: DirectiveBinding<{
      delay?: number
      immediate?: boolean
    }>

    // Lazy loading directive
    lazy: DirectiveBinding<{
      src: string
      loading?: string
      error?: string
      threshold?: number
      rootMargin?: string
    }>

    // Longpress directive
    longpress: DirectiveBinding<{
      duration?: number
      onStart?: () => void
      onEnd?: () => void
    }>

    // Permissions directive
    permissions: DirectiveBinding<{
      permissions: string | string[]
      mode?: 'hide' | 'disable'
    }>

    // Resize directive
    resize: DirectiveBinding<{
      immediate?: boolean
      passive?: boolean
    }>

    // Tooltip directive
    tooltip: DirectiveBinding<{
      content: string
      placement?: 'top' | 'bottom' | 'left' | 'right'
      delay?: number
      class?: string
    }>

    // Ripple directive
    ripple: DirectiveBinding<{
      color?: string
      duration?: number
      disabled?: boolean
    }>

    // Draggable directive
    draggable: DirectiveBinding<boolean>

    // Focus directive
    focus: DirectiveBinding<boolean>

    // Click outside directive
    clickOutside: DirectiveBinding<() => void>
  }
}
