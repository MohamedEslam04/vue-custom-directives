import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import vTooltip from '@/directives/v-tooltip'

const TestComponent = defineComponent({
  template: '<button v-tooltip="tooltipText">Hover me</button>',
  props: ['tooltipText'],
  directives: { tooltip: vTooltip }
})

describe('v-tooltip directive', () => {
  it('should set title attribute on mount', () => {
    const wrapper = mount(TestComponent, {
      props: { tooltipText: 'This is a tooltip' }
    })

    const button = wrapper.find('button').element
    expect(button.getAttribute('title')).toBe('This is a tooltip')
  })

  it('should update title attribute when value changes', async () => {
    const wrapper = mount(TestComponent, {
      props: { tooltipText: 'Initial tooltip' }
    })

    await wrapper.setProps({ tooltipText: 'Updated tooltip' })

    const button = wrapper.find('button').element
    expect(button.getAttribute('title')).toBe('Updated tooltip')
  })
})