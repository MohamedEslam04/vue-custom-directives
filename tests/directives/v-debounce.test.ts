import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import vDebounce from '@/directives/v-debounce'

const TestComponent = defineComponent({
  template: '<input v-debounce="{ callback: handleInput, delay: 100 }" />',
  methods: {
    handleInput: vi.fn()
  },
  directives: { debounce: vDebounce }
})

describe('v-debounce directive', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should debounce input events', async () => {
    const wrapper = mount(TestComponent)
    const input = wrapper.find('input')

    // Trigger multiple input events
    await input.trigger('input')
    await input.trigger('input')
    await input.trigger('input')

    // Should not have called the callback yet
    expect(wrapper.vm.handleInput).not.toHaveBeenCalled()

    // Fast-forward time
    vi.advanceTimersByTime(100)

    // Should have called the callback once
    expect(wrapper.vm.handleInput).toHaveBeenCalledTimes(1)
  })

  it('should use custom event type', async () => {
    const CustomComponent = defineComponent({
      template: '<input v-debounce:keyup="{ callback: handleKeyup, delay: 50 }" />',
      methods: {
        handleKeyup: vi.fn()
      },
      directives: { debounce: vDebounce }
    })

    const wrapper = mount(CustomComponent)
    const input = wrapper.find('input')

    await input.trigger('keyup')
    vi.advanceTimersByTime(50)

    expect(wrapper.vm.handleKeyup).toHaveBeenCalledTimes(1)
  })

  it('should clean up on unmount', () => {
    const wrapper = mount(TestComponent)
    const input = wrapper.find('input').element
    const removeEventListenerSpy = vi.spyOn(input, 'removeEventListener')

    wrapper.unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('input', expect.any(Function))
  })
})