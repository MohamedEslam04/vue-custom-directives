// directives/v-ripple.ts
export default {
    mounted(el: HTMLElement) {
        el.style.position = 'relative';
        el.style.overflow = 'hidden';

        el.addEventListener('click', (e: MouseEvent) => {
            const ripple = document.createElement('span');
            const size = Math.max(el.clientWidth, el.clientHeight);
            const rect = el.getBoundingClientRect();
            ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          top: ${e.clientY - rect.top - size / 2}px;
          left: ${e.clientX - rect.left - size / 2}px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
          z-index: 1000;
        `;
            el.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    }
}
  