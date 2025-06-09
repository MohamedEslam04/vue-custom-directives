import type { Directive } from 'vue'

interface DraggableElement extends HTMLElement {
    _dragHandlers?: {
        onMouseDown: (e: MouseEvent) => void
        onMouseMove: (e: MouseEvent) => void
        onMouseUp: () => void
    }
}

const vDraggable: Directive<DraggableElement> = {
    mounted(el) {
        el.style.position = 'absolute'
        el.style.cursor = 'move'
        el.style.userSelect = 'none'

        let offsetX = 0
        let offsetY = 0
        let isDragging = false

        const onMouseDown = (e: MouseEvent) => {
            isDragging = true
            offsetX = e.clientX - el.offsetLeft
            offsetY = e.clientY - el.offsetTop
            document.addEventListener('mousemove', onMouseMove)
            document.addEventListener('mouseup', onMouseUp)
            e.preventDefault()
        }

        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging) return
            el.style.left = `${e.clientX - offsetX}px`
            el.style.top = `${e.clientY - offsetY}px`
        }

        const onMouseUp = () => {
            isDragging = false
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        }

        el._dragHandlers = { onMouseDown, onMouseMove, onMouseUp }
        el.addEventListener('mousedown', onMouseDown)
    },
    unmounted(el) {
        if (el._dragHandlers) {
            el.removeEventListener('mousedown', el._dragHandlers.onMouseDown)
            delete el._dragHandlers
        }
    }
}

export default vDraggable