// src/types/index.d.ts
/**
 * Vue Directives Kit - Type Definitions
 * A collection of TypeScript type definitions for Vue 3 custom directives
 */

import type { Directive } from 'vue'

/**
 * Base interface for directive binding options
 * @template T - The type of the directive's value
 */
export interface DirectiveBinding<T = unknown> {
  /** The value passed to the directive */
  value: T
  /** The previous value of the directive */
  oldValue: T
  /** The argument passed to the directive (if any) */
  arg?: string
  /** Object containing modifiers */
  modifiers: Record<string, boolean>
  /** The Vue instance */
  instance: any
  /** The directive object */
  dir: Directive
}

/**
 * Options for the copy directive
 */
export interface CopyOptions {
  /** Text to be copied */
  text?: string
  /** Callback function when copy is successful */
  onSuccess?: () => void
  /** Callback function when copy fails */
  onError?: (error: Error) => void
}

/**
 * Options for the debounce directive
 */
export interface DebounceOptions {
  /** Delay in milliseconds before executing the callback */
  delay?: number
  /** Whether to execute the callback immediately on first trigger */
  immediate?: boolean
}

/**
 * Options for the lazy loading directive
 */
export interface LazyOptions {
  /** Source URL of the image to load */
  src: string
  /** URL of the loading placeholder image */
  loading?: string
  /** URL of the error placeholder image */
  error?: string
  /** Threshold for triggering the load (0-1) */
  threshold?: number
  /** Root margin for the IntersectionObserver */
  rootMargin?: string
}

/**
 * Options for the longpress directive
 */
export interface LongpressOptions {
  /** Duration in milliseconds to trigger the longpress */
  duration?: number
  /** Callback function when longpress starts */
  onStart?: () => void
  /** Callback function when longpress ends */
  onEnd?: () => void
}

/**
 * Options for the permissions directive
 */
export interface PermissionOptions {
  /** Single permission or array of permissions to check */
  permissions: string | string[]
  /** How to handle unauthorized access */
  mode?: 'hide' | 'disable'
}

/**
 * Options for the resize directive
 */
export interface ResizeOptions {
  /** Whether to trigger the callback immediately on mount */
  immediate?: boolean
  /** Whether to use passive event listeners */
  passive?: boolean
}

/**
 * Options for the tooltip directive
 */
export interface TooltipOptions {
  /** Content to display in the tooltip */
  content: string
  /** Placement of the tooltip relative to the element */
  placement?: 'top' | 'bottom' | 'left' | 'right'
  /** Delay in milliseconds before showing the tooltip */
  delay?: number
  /** Additional CSS classes to apply to the tooltip */
  class?: string
}

/**
 * Options for the ripple directive
 */
export interface RippleOptions {
  /** Color of the ripple effect */
  color?: string
  /** Duration of the ripple animation in milliseconds */
  duration?: number
  /** Whether to disable the ripple effect */
  disabled?: boolean
}