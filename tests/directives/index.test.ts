import { describe, it, expect } from 'vitest'
import { createApp } from 'vue'
import DirectivesPlugin from '@/directives/index'

describe('Directives Plugin', () => {
  it('should install all directives', () => {
    const app = createApp({})
    const directiveSpy = vi.fn()
    app.directive = directiveSpy

    app.use(DirectivesPlugin)

    expect(directiveSpy).toHaveBeenCalledWith('copy', expect.any(Object))
    expect(directiveSpy).toHaveBeenCalledWith('debounce', expect.any(Object))
    expect(directiveSpy).toHaveBeenCalledWith('lazy', expect.any(Object))
    expect(directiveSpy).toHaveBeenCalledWith('longpress', expect.any(Object))
    expect(directiveSpy).toHaveBeenCalledWith('permission', expect.any(Object))
    expect(directiveSpy).toHaveBeenCalledWith('resize', expect.any(Object))
    expect(directiveSpy).toHaveBeenCalledWith('scroll-lock', expect.any(Object))
    expect(directiveSpy).toHaveBeenCalledWith('scroll-to', expect.any(Object))
    expect(directiveSpy).toHaveBeenCalledWith('tooltip', expect.any(Object))
    expect(directiveSpy).toHaveBeenCalledWith('click-outside', expect.any(Object))
    expect(directiveSpy).toHaveBeenCalledWith('draggable', expect.any(Object))
    expect(directiveSpy).toHaveBeenCalledWith('focus', expect.any(Object))
    expect(directiveSpy).toHaveBeenCalledWith('ripple', expect.any(Object))
    expect(directiveSpy).toHaveBeenCalledWith('uppercase', expect.any(Object))
  })
})