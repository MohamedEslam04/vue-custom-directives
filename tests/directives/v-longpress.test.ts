import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import vLongpress from '@/directives/v-longpress'

const TestComponent = defineComponent({
  template: '<button v-longpress="handleLongpress">Long Press Me</button>',
  methods: {
    handleLongpress: vi.fn()
  },
  directives: { longpress: vLongpress }
})

describe('v-longpress directive', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should trigger callback after long press', async () => {
    const wrapper = mount(TestComponent)
    const button = wrapper.find('button')

    await button.trigger('mousedown')
    vi.advanceTimersByTime(800)

    expect(wrapper.vm.handleLongpress).toHaveBeenCalledTimes(1)
  })

  it('should not trigger callback if released early', async () => {
    const wrapper = mount(TestComponent)
    const button = wrapper.find('button')

    await button.trigger('mousedown')
    vi.advanceTimersByTime(400)
    await button.trigger('mouseup')
    vi.advanceTimersByTime(400)

    expect(wrapper.vm.handleLongpress).not.toHaveBeenCalled()
  })

  it('should work with touch events', async () => {
    const wrapper = mount(TestComponent)
    const button = wrapper.find('button')

    await button.trigger('touchstart')
    vi.advanceTimersByTime(800)

    expect(wrapper.vm.handleLongpress).toHaveBeenCalledTimes(1)
  })

  it('should cancel on mouse leave', async () => {
    const wrapper = mount(TestComponent)
    const button = wrapper.find('button')

    await button.trigger('mousedown')
    vi.advanceTimersByTime(400)
    await button.trigger('mouseleave')
    vi.advanceTimersByTime(400)

    expect(wrapper.vm.handleLongpress).not.toHaveBeenCalled()
  })
})