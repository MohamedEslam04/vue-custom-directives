// ~/types/vue-directives-kit.d.ts
import type {
  vCopy,
  vDebounce,
  vLazy,
  vLongpress,
  vPermission,
  vResize,
  vScrollLock,
  vScrollTo,
  vTooltip,
  vClickOutside,
  vDraggable,
  vFocus,
  vRipple,
  vUppercase,
} from 'vue-directives-kit'

declare module '@vue/runtime-core' {
  export interface ComponentCustomDirectives {
    copy: typeof vCopy
    debounce: typeof vDebounce
    lazy: typeof vLazy
    longpress: typeof vLongpress
    permission: typeof vPermission
    resize: typeof vResize
    'scroll-lock': typeof vScrollLock
    'scroll-to': typeof vScrollTo
    tooltip: typeof vTooltip
    'click-outside': typeof vClickOutside
    draggable: typeof vDraggable
    focus: typeof vFocus
    ripple: typeof vRipple
    uppercase: typeof vUppercase
  }
}
