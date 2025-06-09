# Contributing to Vue Custom Directives

Thank you for your interest in contributing to Vue Custom Directives! This document provides guidelines and information for contributors.

## Development Setup

### Prerequisites

- Node.js 18+ 
- npm 8+
- Git

### Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/vue-custom-directives.git
   cd vue-custom-directives
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### Code Quality

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Check formatting
npm run format:check

# Fix formatting
npm run format
```

### Building

```bash
# Build the package
npm run build

# Type checking
npm run type-check
```

## Creating a New Directive

1. Create the directive file in `src/directives/`:
   ```typescript
   // src/directives/v-your-directive.ts
   import type { Directive } from 'vue'

   const vYourDirective: Directive = {
     mounted(el, binding) {
       // Implementation
     },
     unmounted(el) {
       // Cleanup
     }
   }

   export default vYourDirective
   ```

2. Add it to the main index file:
   ```typescript
   // src/directives/index.ts
   import vYourDirective from './v-your-directive'

   export default {
     install(app: App) {
       // ... other directives
       app.directive('your-directive', vYourDirective)
     }
   }
   ```

3. Create comprehensive tests:
   ```typescript
   // tests/directives/v-your-directive.test.ts
   import { describe, it, expect } from 'vitest'
   import { mount } from '@vue/test-utils'
   import vYourDirective from '@/directives/v-your-directive'

   describe('v-your-directive', () => {
     it('should work correctly', () => {
       // Test implementation
     })
   })
   ```

4. Update documentation in README.md

## Code Style Guidelines

### TypeScript

- Use strict TypeScript configuration
- Provide proper type annotations
- Use interfaces for complex types
- Avoid `any` type

### Vue Directives

- Always provide cleanup in `unmounted` hook
- Handle edge cases gracefully
- Add proper error handling
- Use meaningful variable names

### Testing

- Write tests for all new features
- Aim for 80%+ code coverage
- Test both happy path and edge cases
- Mock external dependencies

### Documentation

- Update README.md for new directives
- Include usage examples
- Document all options and parameters
- Add TypeScript examples

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(directives): add v-auto-resize directive
fix(v-copy): handle clipboard API errors gracefully
docs(readme): update installation instructions
test(v-debounce): add edge case tests
```

## Pull Request Process

1. Ensure all tests pass
2. Update documentation if needed
3. Add tests for new features
4. Follow the code style guidelines
5. Create a clear PR description

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added tests for new features
- [ ] Updated documentation

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated
- [ ] Documentation updated
```

## Release Process

Releases are automated using semantic-release:

1. Commits to `main` trigger automatic releases
2. Version numbers follow semantic versioning
3. Changelog is automatically generated
4. NPM package is published automatically

## Getting Help

- Create an issue for bugs or feature requests
- Join discussions in existing issues
- Ask questions in pull requests

## Code of Conduct

Please be respectful and inclusive in all interactions. We want this to be a welcoming community for everyone.

Thank you for contributing! 🎉