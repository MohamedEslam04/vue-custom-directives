# Vue Custom Directives

[![npm version](https://badge.fury.io/js/@mohamedeslam04%2Fvue-custom-directives.svg)](https://badge.fury.io/js/@mohamedeslam04%2Fvue-custom-directives)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D.svg)](https://vuejs.org/)

A comprehensive collection of Vue 3 custom directives for enhanced user interactions. Built with TypeScript and designed for modern Vue applications.

## Features

- 🎯 **14 Useful Directives** - Copy, debounce, lazy loading, long press, and more
- 🔧 **TypeScript Support** - Full type safety and IntelliSense
- 🌳 **Tree Shakable** - Import only what you need
- 📱 **Mobile Friendly** - Touch events support
- 🧪 **Well Tested** - Comprehensive test coverage
- 📦 **Zero Dependencies** - Lightweight and fast

## Installation

```bash
npm install @mohamedeslam04/vue-custom-directives
```

```bash
yarn add @mohamedeslam04/vue-custom-directives
```

```bash
pnpm add @mohamedeslam04/vue-custom-directives
```

## Usage

### Install All Directives (Plugin)

```typescript
import { createApp } from 'vue'
import VueCustomDirectives from '@mohamedeslam04/vue-custom-directives'
import App from './App.vue'

const app = createApp(App)
app.use(VueCustomDirectives)
app.mount('#app')
```

### Import Individual Directives (Tree Shaking)

```typescript
import { createApp } from 'vue'
import { vCopy, vDebounce, vLazy } from '@mohamedeslam04/vue-custom-directives'
import App from './App.vue'

const app = createApp(App)
app.directive('copy', vCopy)
app.directive('debounce', vDebounce)
app.directive('lazy', vLazy)
app.mount('#app')
```

## Available Directives

### v-copy
Copy text to clipboard when element is clicked.

```vue
<template>
  <button v-copy="'Hello World!'">Copy Text</button>
  <button v-copy="dynamicText">Copy Dynamic Text</button>
</template>
```

### v-debounce
Debounce input events to improve performance.

```vue
<template>
  <!-- Default: 300ms delay on input event -->
  <input v-debounce="{ callback: handleSearch, delay: 500 }" />
  
  <!-- Custom event type -->
  <input v-debounce:keyup="{ callback: handleKeyup, delay: 200 }" />
</template>

<script setup>
const handleSearch = (event) => {
  console.log('Debounced input:', event.target.value)
}

const handleKeyup = (event) => {
  console.log('Debounced keyup:', event.target.value)
}
</script>
```

### v-lazy
Lazy load images when they enter the viewport.

```vue
<template>
  <img v-lazy="'https://example.com/image.jpg'" alt="Lazy loaded image" />
</template>
```

### v-longpress
Trigger action on long press (800ms default).

```vue
<template>
  <button v-longpress="handleLongPress">Long Press Me</button>
</template>

<script setup>
const handleLongPress = () => {
  console.log('Long press detected!')
}
</script>
```

### v-click-outside
Trigger action when clicking outside the element.

```vue
<template>
  <div v-click-outside="closeModal" class="modal">
    <p>Click outside to close</p>
  </div>
</template>

<script setup>
const closeModal = () => {
  console.log('Clicked outside!')
}
</script>
```

### v-tooltip
Add native tooltip to elements.

```vue
<template>
  <button v-tooltip="'This is a helpful tooltip'">Hover me</button>
  <span v-tooltip="dynamicTooltip">Dynamic tooltip</span>
</template>
```

### v-scroll-lock
Lock/unlock body scroll.

```vue
<template>
  <div v-scroll-lock="isModalOpen">
    <!-- Modal content -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isModalOpen = ref(false)
</script>
```

### v-scroll-to
Smooth scroll to target element.

```vue
<template>
  <button v-scroll-to="'#target-section'">Scroll to Section</button>
  <div id="target-section">Target content</div>
</template>
```

### v-resize
Trigger callback when element is resized.

```vue
<template>
  <div v-resize="handleResize" class="resizable">
    Resize me!
  </div>
</template>

<script setup>
const handleResize = () => {
  console.log('Element resized!')
}
</script>
```

### v-permission
Show/hide elements based on user permissions.

```vue
<template>
  <button v-permission="'admin'">Admin Only Button</button>
  <div v-permission="'editor'">Editor Content</div>
</template>
```

### v-draggable
Make elements draggable.

```vue
<template>
  <div v-draggable class="draggable-box">
    Drag me around!
  </div>
</template>

<style>
.draggable-box {
  width: 100px;
  height: 100px;
  background: #42b883;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
</style>
```

### v-focus
Auto-focus element when mounted.

```vue
<template>
  <input v-focus placeholder="Auto-focused input" />
</template>
```

### v-ripple
Add Material Design ripple effect.

```vue
<template>
  <button v-ripple class="ripple-button">Click for Ripple</button>
</template>

<style>
.ripple-button {
  padding: 12px 24px;
  background: #42b883;
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
  <input v-uppercase placeholder="Type in lowercase..." />
</template>
```

## TypeScript Support

All directives are built with TypeScript and provide full type safety:

```typescript
import type { App } from 'vue'
import { vCopy, vDebounce } from '@mohamedeslam04/vue-custom-directives'

// Type-safe directive registration
const app: App = createApp({})
app.directive('copy', vCopy)
app.directive('debounce', vDebounce)
```

## Browser Support

- Chrome ≥ 61
- Firefox ≥ 60
- Safari ≥ 11
- Edge ≥ 16

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/mohamedeslam04/vue-custom-directives.git

# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build the package
npm run build
```

## License

[MIT](LICENSE) © Mohamed Eslam

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for details about changes in each version.