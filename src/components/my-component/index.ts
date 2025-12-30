import { MyComponent } from './my-component.js';

export type * from './my-component.js';
export type * from './events.js';
export type * from './interfaces.js';

customElements.define('my-component', MyComponent);
