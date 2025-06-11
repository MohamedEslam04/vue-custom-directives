import DirectivesPlugin from './directives'

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
} from './directives'

// Export plugin as default
export default DirectivesPlugin
