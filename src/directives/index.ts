import type { App } from 'vue'

// Import each directive
import vCopy from './v-copy'
import vDebounce from './v-debounce'
import vLazy from './v-lazy'
import vLongpress from './v-longpress'
import vPermission from './v-permission'
import vResize from './v-resize'
import vScrollLock from './v-scroll-lock'
import vScrollTo from './v-scroll-to'
import vTooltip from './v-tooltip'
import vClickOutside from './v-click-outside'
import vDraggable from './v-draggable'
import vFocus from './v-focus'
import vRipple from './v-ripple'
import vUppercase from './v-uppercase'

// Export individual directives for tree-shaking
export {
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
    vUppercase
}

// Plugin for installing all directives
export default {
    install(app: App) {
        app.directive('copy', vCopy)
        app.directive('debounce', vDebounce)
        app.directive('lazy', vLazy)
        app.directive('longpress', vLongpress)
        app.directive('permission', vPermission)
        app.directive('resize', vResize)
        app.directive('scroll-lock', vScrollLock)
        app.directive('scroll-to', vScrollTo)
        app.directive('tooltip', vTooltip)
        app.directive('click-outside', vClickOutside)
        app.directive('draggable', vDraggable)
        app.directive('focus', vFocus)
        app.directive('ripple', vRipple)
        app.directive('uppercase', vUppercase)
    }
}