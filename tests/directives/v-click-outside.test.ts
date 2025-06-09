import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import vClickOutside from '@/directives/v-click-outside'

const TestComponent = defineComponent({
  template: `
    <div>
      <div v-click-outside="handleClickOutside" class="target">Target</div>
      <div class="outside">Outside</div>
    </div>
  `,
  methods: {
    handleClickOutside: vi.fn()
  },
  directives: { clickOutside: vClickOutside }
})

describe('v-click-outside directive', () => {
  it('should trigger callback when clicking outside', async () => {
    const wrapper = mount(TestComponent, {
      attachTo: document.body
    })

    const outside = wrapper.find('.outside')
    await outside.trigger('click')

    expect(wrapper.vm.handleClickOutside).toHaveBeenCalledTimes(1)

    wrapper.unmount()
  })

  it('should not trigger callback when clicking inside', async () => {
    const wrapper = mount(TestComponent, {
      attachTo: document.body
    })

    const target = wrapper.find('.target')
    await target.trigger('click')

    expect(wrapper.vm.handleClickOutside).not.toHaveBeenCalled()

    wrapper.unmount()
  })

  it('should handle non-function values gracefully', () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    
    const BadComponent = defineComponent({
      template: '<div v-click-outside="notAFunction">Test</div>',
      data() {
        return { notAFunction: 'not a function' }
      },
      directives: { clickOutside: vClickOutside }
    })

    mount(BadComponent)

    expect(consoleWarnSpy).toHaveBeenCalledWith('v-click-outside directive expects a function as value')
    
    consoleWarnSpy.mockRestore()
  })
})