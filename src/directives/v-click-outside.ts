import type { Directive } from 'vue';
interface ClickOutsideElement extends HTMLElement {
    _clickOutside?: (event: MouseEvent) => void;
}

const clickOutside: Directive<ClickOutsideElement> = {
    mounted(el, binding) {
        el.dataset.clickOutside = 'true';
        const handler = (event: MouseEvent) => {
            if (!el.contains(event.target as Node) && el !== event.target) {
                binding.value(event);
            }
        };
        el._clickOutside = handler;
        document.addEventListener('click', handler, { passive: true });
    },
    unmounted(el) {
        if (el._clickOutside) {
            document.removeEventListener('click', el._clickOutside);
            delete el._clickOutside;
        }
    },
};

export default clickOutside;