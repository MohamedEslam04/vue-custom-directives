import type { Directive } from 'vue'

interface LazyElement extends HTMLImageElement {
    _lazyObserver?: IntersectionObserver
    _lazyOptions?: {
        src: string
        loading?: string
        error?: string
        threshold?: number
        rootMargin?: string
    }
}

const vLazy: Directive<LazyElement> = {
    mounted(el, binding) {
        const options = {
            src: binding.value,
            loading: binding.modifiers.loading ? binding.value : undefined,
            error: binding.modifiers.error ? binding.value : undefined,
            threshold: 0.1,
            rootMargin: '50px'
        }

        el._lazyOptions = options

        // Set loading placeholder if provided
        if (options.loading) {
            el.src = options.loading
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target as HTMLImageElement
                        img.src = options.src

                        // Handle load error
                        img.onerror = () => {
                            if (options.error) {
                                img.src = options.error
                            }
                            observer.unobserve(img)
                        }

                        // Cleanup after successful load
                        img.onload = () => {
                            observer.unobserve(img)
                        }

                        observer.unobserve(img)
                    }
                })
            },
            {
                threshold: options.threshold,
                rootMargin: options.rootMargin
            }
        )

        el._lazyObserver = observer
        observer.observe(el)
    },

    updated(el, binding) {
        if (el._lazyOptions?.src !== binding.value) {
            // Update options
            el._lazyOptions = {
                ...el._lazyOptions,
                src: binding.value
            }

            // Re-observe with new options
            if (el._lazyObserver) {
                el._lazyObserver.unobserve(el)
                el._lazyObserver.observe(el)
            }
        }
    },

    unmounted(el) {
        if (el._lazyObserver) {
            el._lazyObserver.unobserve(el)
            el._lazyObserver.disconnect()
            delete el._lazyObserver
            delete el._lazyOptions
        }
    }
}

export default vLazy
