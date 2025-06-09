import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import vCopy from '@/directives/v-copy'

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve())
  }
})

const TestComponent = defineComponent({
  template: '<button v-copy="text">Copy</button>',
  props: ['text'],
  directives: { copy: vCopy }
})

describe('v-copy directive', () => {
  let consoleLogSpy: any
  let consoleErrorSpy: any

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.clearAllMocks()
  })

  afterEach(() => {
    consoleLogSpy.mockRestore()
    consoleErrorSpy.mockRestore()
  })

  it('should copy text to clipboard when clicked', async () => {
    const wrapper = mount(TestComponent, {
      props: { text: 'Hello World' }
    })

    await wrapper.find('button').trigger('click')

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Hello World')
    expect(consoleLogSpy).toHaveBeenCalledWith('Copied:', 'Hello World')
  })

  it('should handle clipboard write failure', async () => {
    const error = new Error('Clipboard not available')
    vi.mocked(navigator.clipboard.writeText).mockRejectedValueOnce(error)

    const wrapper = mount(TestComponent, {
      props: { text: 'Hello World' }
    })

    await wrapper.find('button').trigger('click')
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(consoleErrorSpy).toHaveBeenCalledWith('Copy failed', error)
  })

  it('should clean up event listeners on unmount', () => {
    const wrapper = mount(TestComponent, {
      props: { text: 'Hello World' }
    })

    const button = wrapper.find('button').element
    const removeEventListenerSpy = vi.spyOn(button, 'removeEventListener')

    wrapper.unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function))
  })
})