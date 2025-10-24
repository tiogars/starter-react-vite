---
applyTo: '**/*.ts'
---
Use the structure of SampleComponent for all new components.

Create a .types.ts file for each component, exporting the props interface.
Declare the component using export const ComponentName = (props: PropsType) => { ... }.
Export the component both as a named and default export.
Import the type with import type { ... } from './ComponentName.types'."