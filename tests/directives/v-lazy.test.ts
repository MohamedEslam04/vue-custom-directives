import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import vLazy from '@/directives/v-lazy'

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  disconnect: vi.fn(),
  unobserve: vi.fn()
})

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver
})

const TestComponent = defineComponent({
  template: '<img v-lazy="imageSrc" />',
  props: ['imageSrc'],
  directives: { lazy: vLazy }
})

describe('v-lazy directive', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should create IntersectionObserver on mount', () => {
    mount(TestComponent, {
      props: { imageSrc: 'https://example.com/image.jpg' }
    })

    expect(mockIntersectionObserver).toHaveBeenCalledWith(expect.any(Function))
  })

  it('should set src when element intersects', () => {
    let observerCallback: any

    mockIntersectionObserver.mockImplementation((callback) => {
      observerCallback = callback
      return {
        observe: vi.fn(),
        disconnect: vi.fn(),
        unobserve: vi.fn()
      }
    })

    const wrapper = mount(TestComponent, {
      props: { imageSrc: 'https://example.com/image.jpg' }
    })

    const img = wrapper.find('img').element

    // Simulate intersection
    observerCallback([{ isIntersecting: true, target: img }])

    expect(img.src).toBe('https://example.com/image.jpg')
  })

  it('should disconnect observer on unmount', () => {
    const mockDisconnect = vi.fn()
    mockIntersectionObserver.mockReturnValue({
      observe: vi.fn(),
      disconnect: mockDisconnect,
      unobserve: vi.fn()
    })

    const wrapper = mount(TestComponent, {
      props: { imageSrc: 'https://example.com/image.jpg' }
    })

    wrapper.unmount()

    expect(mockDisconnect).toHaveBeenCalled()
  })
})