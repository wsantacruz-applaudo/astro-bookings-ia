---
description: Best practices for TypeScript code style and conventions.
applyTo: '**/*.ts, **/*.tsx'
---
# Clean Code Practices for TypeScript

## 1. Naming Conventions
- Use `camelCase` for variable and function names.
- Use `PascalCase` for class and interface names.
- Use named constants instead of magic numbers or strings.

## Functions and complexity
- Keep functions small and focused on a single task.
- Avoid deep nesting of code blocks; consider early returns to reduce complexity.
- Use early returns to simplify conditional logic.

## Classes and modules
- Avoid primitive obsession by defining types.
- Favor composition over inheritance when designing classes.
- Keep dependencies to a minimum.
- Use the adapter pattern to decouple from external systems.

## Error handling and comments
- Handle errors gracefully with try-catch blocks and meaningful error messages.
- Write comments to explain why code exists, not what it does. Use comments sparingly and only when necessary.

## General principles
- Keep it simple and avoid over-engineering.
- Try to keep it DRY (Don't Repeat Yourself) by reusing code and creating utility functions.


## Typescript specific practices
- Use ES module syntax (import/export) instead of CommonJS (require/module.exports).
- Favor named exports over default exports for better tree-shaking and clarity.
- File names follow `kebab-case` for consistency and readability.
- Declare `types` and `interfaces` for complex objects to improve type safety and code clarity.
