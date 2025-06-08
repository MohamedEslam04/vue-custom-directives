// directives/v-uppercase.ts
export default {
    mounted(el: HTMLInputElement) {
        el.addEventListener('input', () => {
            el.value = el.value.toUpperCase();
            el.dispatchEvent(new Event('input'));
        });
    }
}
  