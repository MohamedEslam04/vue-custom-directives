// directives/v-draggable.ts
export default {
    mounted(el: HTMLElement) {
        el.style.position = 'absolute';
        el.style.cursor = 'move';

        let offsetX = 0, offsetY = 0;

        const onMouseDown = (e: MouseEvent) => {
            offsetX = e.clientX - el.offsetLeft;
            offsetY = e.clientY - el.offsetTop;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };

        const onMouseMove = (e: MouseEvent) => {
            el.style.left = `${e.clientX - offsetX}px`;
            el.style.top = `${e.clientY - offsetY}px`;
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        el.addEventListener('mousedown', onMouseDown);
    }
}
  