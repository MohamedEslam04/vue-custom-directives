import type { Directive } from 'vue'

interface DraggableElement extends HTMLElement {
    _dragHandlers?: {
        onMouseDown: (e: MouseEvent | TouchEvent) => void
        onMouseMove: (e: MouseEvent | TouchEvent) => void
        onMouseUp: () => void
    }
    _dragState?: {
        isDragging: boolean
        initialX: number
        initialY: number
        offsetX: number
        offsetY: number
    }
}

const vDraggable: Directive<DraggableElement> = {
    mounted(el, binding) {
        // Set initial styles
        el.style.position = 'absolute'
        el.style.cursor = 'move'
        el.style.userSelect = 'none'
        el.style.touchAction = 'none'

        // Initialize drag state
        el._dragState = {
            isDragging: false,
            initialX: 0,
            initialY: 0,
            offsetX: 0,
            offsetY: 0
        }

        const getClientPosition = (e: MouseEvent | TouchEvent): { x: number; y: number } => {
            if ('touches' in e) {
                return {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY
                }
            }
            return {
                x: e.clientX,
                y: e.clientY
            }
        }

        const onStart = (e: MouseEvent | TouchEvent) => {
            if (binding.value === false) return

            const { x, y } = getClientPosition(e)
            el._dragState!.isDragging = true
            el._dragState!.initialX = x
            el._dragState!.initialY = y
            el._dragState!.offsetX = x - el.offsetLeft
            el._dragState!.offsetY = y - el.offsetTop

            document.addEventListener('mousemove', onMove)
            document.addEventListener('touchmove', onMove, { passive: false })
            document.addEventListener('mouseup', onEnd)
            document.addEventListener('touchend', onEnd)

            e.preventDefault()
        }

        const onMove = (e: MouseEvent | TouchEvent) => {
            if (!el._dragState?.isDragging) return

            const { x, y } = getClientPosition(e)
            const newX = x - el._dragState.offsetX
            const newY = y - el._dragState.offsetY

            // Apply constraints if provided
            if (binding.arg === 'constrained') {
                const rect = el.getBoundingClientRect()
                const parentRect = el.parentElement?.getBoundingClientRect()

                if (parentRect) {
                    const maxX = parentRect.width - rect.width
                    const maxY = parentRect.height - rect.height

                    el.style.left = `${Math.min(Math.max(0, newX), maxX)}px`
                    el.style.top = `${Math.min(Math.max(0, newY), maxY)}px`
                }
            } else {
                el.style.left = `${newX}px`
                el.style.top = `${newY}px`
            }

            e.preventDefault()
        }

        const onEnd = () => {
            if (!el._dragState?.isDragging) return

            el._dragState.isDragging = false
            document.removeEventListener('mousemove', onMove)
            document.removeEventListener('touchmove', onMove)
            document.removeEventListener('mouseup', onEnd)
            document.removeEventListener('touchend', onEnd)
        }

        el._dragHandlers = { onMouseDown: onStart, onMouseMove: onMove, onMouseUp: onEnd }
        el.addEventListener('mousedown', onStart)
        el.addEventListener('touchstart', onStart, { passive: false })
    },

    updated(el, binding) {
        // Update draggable state based on binding value
        if (binding.value === false) {
            el.style.cursor = 'default'
        } else {
            el.style.cursor = 'move'
        }
    },

    unmounted(el) {
        if (el._dragHandlers) {
            el.removeEventListener('mousedown', el._dragHandlers.onMouseDown)
            el.removeEventListener('touchstart', el._dragHandlers.onMouseDown)
            document.removeEventListener('mousemove', el._dragHandlers.onMouseMove)
            document.removeEventListener('touchmove', el._dragHandlers.onMouseMove)
            document.removeEventListener('mouseup', el._dragHandlers.onMouseUp)
            document.removeEventListener('touchend', el._dragHandlers.onMouseUp)
            delete el._dragHandlers
            delete el._dragState
        }
    }
}

export default vDraggable
