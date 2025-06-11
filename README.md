# Vue Custom Directives Kit

A collection of useful Vue 3 custom directives for common UI interactions and behaviors.

## Installation

```bash
npm install vue-directives-kit
```

## Usage

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import {
  vCopy,
  vDebounce,
  vLazy,
  vLongpress,
  vPermission,
  vResize,
  vScrollLock,
  vScrollTo,
  vTooltip,
  vClickOutside,
  vDraggable,
  vFocus,
  vRipple,
  vUppercase,
} from 'vue-directives-kit'

const app = createApp(App)

// Register individual directives
app.directive('copy', vCopy)
app.directive('debounce', vDebounce)
app.directive('lazy', vLazy)
app.directive('longpress', vLongpress)
app.directive('permission', vPermission)
app.directive('resize', vResize)
app.directive('scroll-lock', vScrollLock)
app.directive('scroll-to', vScrollTo)
app.directive('tooltip', vTooltip)
app.directive('click-outside', vClickOutside)
app.directive('draggable', vDraggable)
app.directive('focus', vFocus)
app.directive('ripple', vRipple)
app.directive('uppercase', vUppercase)

app.mount('#app')
```

## Available Directives

### v-copy

Copy text to clipboard when element is clicked.

```vue
<template>
  <!-- Basic usage -->
  <button v-copy="'Hello World!'">Copy Text</button>

  <!-- Dynamic text -->
  <button v-copy="dynamicText">Copy Dynamic Text</button>

  <!-- With callbacks -->
  <button
    v-copy="{
      text: 'Hello World!',
      onSuccess: () => showToast('Copied!'),
      onError: (err) => showToast('Copy failed'),
    }"
  >
    Copy with Feedback
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dynamicText = ref('Dynamic content')
const showToast = (message: string) => {
  // Your toast implementation
  console.log(message)
}
</script>
```

### v-debounce

Debounce input events to improve performance.

```vue
<template>
  <!-- Basic usage with default 300ms delay -->
  <input v-debounce="handleSearch" placeholder="Search..." />

  <!-- Custom delay -->
  <input
    v-debounce="{ callback: handleSearch, delay: 500 }"
    placeholder="Search with 500ms delay..."
  />

  <!-- Custom event type -->
  <input
    v-debounce:keyup="{ callback: handleKeyup, delay: 200 }"
    placeholder="Search on keyup..."
  />

  <!-- Immediate execution -->
  <input
    v-debounce="{ callback: handleSearch, immediate: true }"
    placeholder="Search with immediate execution..."
  />
</template>

<script setup lang="ts">
const handleSearch = (e: Event) => {
  const target = e.target as HTMLInputElement
  console.log('Searching for:', target.value)
}

const handleKeyup = (e: Event) => {
  const target = e.target as HTMLInputElement
  console.log('Keyup:', target.value)
}
</script>
```

### v-lazy

Lazy load images when they enter the viewport.

```vue
<template>
  <!-- Basic usage -->
  <img v-lazy="'https://example.com/image.jpg'" alt="Lazy loaded image" />

  <!-- With loading and error placeholders -->
  <img
    v-lazy="{
      src: 'https://example.com/image.jpg',
      loading: 'https://example.com/loading.gif',
      error: 'https://example.com/error.jpg',
    }"
    alt="Lazy loaded image with placeholders"
  />

  <!-- With custom threshold and root margin -->
  <img
    v-lazy="{
      src: 'https://example.com/image.jpg',
      threshold: 0.5,
      rootMargin: '100px',
    }"
    alt="Lazy loaded image with custom options"
  />
</template>
```

### v-longpress

Trigger action on long press (800ms default).

```vue
<template>
  <!-- Basic usage -->
  <button v-longpress="handleLongPress">Long Press Me</button>

  <!-- With custom duration -->
  <button
    v-longpress="{
      duration: 1000,
      onStart: () => console.log('Started'),
      onEnd: () => console.log('Ended'),
    }"
  >
    Long Press (1s)
  </button>
</template>

<script setup lang="ts">
const handleLongPress = () => {
  console.log('Long press detected!')
}
</script>
```

### v-permission

Show/hide elements based on user permissions.

```vue
<template>
  <!-- Basic usage -->
  <button v-permission="'admin'">Admin Only Button</button>

  <!-- Multiple permissions -->
  <div v-permission="['admin', 'editor']">Admin or Editor Content</div>

  <!-- With mode -->
  <button
    v-permission="{
      permissions: 'admin',
      mode: 'disable',
    }"
  >
    Admin Button (Disabled if not admin)
  </button>
</template>
```

### v-resize

Trigger callback when element is resized.

```vue
<template>
  <!-- Basic usage -->
  <div v-resize="handleResize" class="resizable">Resize me!</div>

  <!-- With options -->
  <div
    v-resize="{
      callback: handleResize,
      immediate: true,
      passive: true,
    }"
    class="resizable"
  >
    Resize me with options!
  </div>
</template>

<script setup lang="ts">
const handleResize = () => {
  console.log('Element resized!')
}
</script>

<style>
.resizable {
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  resize: both;
  overflow: auto;
}
</style>
```

### v-scroll-lock

Lock/unlock body scroll.

```vue
<template>
  <!-- Basic usage -->
  <div v-scroll-lock class="modal">Modal content</div>

  <!-- With options -->
  <div
    v-scroll-lock="{
      enabled: true,
      preserveScrollbar: true,
    }"
    class="modal"
  >
    Modal content with preserved scrollbar
  </div>

  <!-- Conditional scroll lock -->
  <div v-scroll-lock="{ enabled: isModalOpen }" class="modal">Modal content</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}
</script>

<style>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
```

### v-scroll-to

Smooth scroll to target element.

```vue
<template>
  <!-- Basic usage -->
  <button v-scroll-to="'#section-1'">Scroll to Section 1</button>

  <!-- With options -->
  <button
    v-scroll-to="{
      target: '#section-2',
      behavior: 'smooth',
      offset: 100,
    }"
  >
    Scroll to Section 2
  </button>

  <div id="section-1">Section 1</div>
  <div id="section-2">Section 2</div>
</template>
```

### v-tooltip

Add tooltip to elements.

```vue
<template>
  <!-- Basic usage -->
  <button v-tooltip="'This is a tooltip'">Hover me</button>

  <!-- With options -->
  <button
    v-tooltip="{
      content: 'Custom tooltip',
      placement: 'top',
      delay: 200,
      class: 'custom-tooltip',
    }"
  >
    Hover me (with options)
  </button>
</template>

<style>
.custom-tooltip {
  background: #333;
  color: white;
  padding: 8px;
  border-radius: 4px;
}
</style>
```

### v-click-outside

Trigger action when clicking outside the element.

```vue
<template>
  <!-- Basic usage -->
  <div v-click-outside="closeModal" class="modal">Click outside to close</div>

  <!-- With options -->
  <div
    v-click-outside="{
      handler: closeModal,
      ignore: ['.ignore-click'],
      enabled: isModalOpen,
    }"
    class="modal"
  >
    Click outside to close (with ignored elements)
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isModalOpen = ref(true)

const closeModal = () => {
  isModalOpen.value = false
}
</script>
```

### v-draggable

Make elements draggable.

```vue
<template>
  <!-- Basic usage -->
  <div v-draggable class="draggable-box">Drag me!</div>

  <!-- With constraints -->
  <div v-draggable:constrained class="draggable-box">Drag me (constrained)!</div>

  <!-- Disable dragging -->
  <div v-draggable="false" class="draggable-box">Can't drag me!</div>
</template>

<style>
.draggable-box {
  width: 100px;
  height: 100px;
  background: #4caf50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: move;
}
</style>
```

### v-focus

Auto-focus element when mounted.

```vue
<template>
  <!-- Basic usage -->
  <input v-focus type="text" placeholder="Auto-focused input" />

  <!-- With options -->
  <input
    v-focus="{
      enabled: true,
      delay: 100,
      select: true,
      preventScroll: true,
      focusVisible: true,
    }"
    type="text"
    placeholder="Focused with options"
  />

  <!-- Conditional focus -->
  <input
    v-focus="{ enabled: shouldFocus }"
    type="text"
    placeholder="Focused when shouldFocus is true"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const shouldFocus = ref(false)

setTimeout(() => {
  shouldFocus.value = true
}, 1000)
</script>
```

### v-ripple

Add Material Design ripple effect.

```vue
<template>
  <!-- Basic usage -->
  <button v-ripple class="ripple-button">Click for Ripple</button>

  <!-- With options -->
  <button
    v-ripple="{
      color: 'rgba(0, 0, 0, 0.1)',
      duration: 800,
      disabled: false,
    }"
    class="ripple-button"
  >
    Custom Ripple
  </button>
</template>

<style>
.ripple-button {
  position: relative;
  overflow: hidden;
  padding: 12px 24px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

### v-uppercase

Convert input text to uppercase.

```vue
<template>
  <!-- Basic usage -->
  <input v-uppercase type="text" placeholder="Type in lowercase..." />

  <!-- With initial value -->
  <input v-uppercase type="text" v-model="text" placeholder="Type in lowercase..." />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
</script>
```

## TypeScript Support

All directives are written in TypeScript and include proper type definitions. The package exports the following types:

```typescript
import type {
  CopyOptions,
  DebounceOptions,
  LazyOptions,
  LongpressOptions,
  PermissionOptions,
  ResizeOptions,
  ScrollLockOptions,
  TooltipOptions,
  RippleOptions,
  FocusOptions,
} from 'vue-directives-kit'
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
