import { html, LitElement } from "lit";
import { SearchCancelEvent } from "./events";

export class MyComponent extends LitElement {
  override firstUpdated() {
    this.dispatchEvent(new SearchCancelEvent());
  }
  override render() {
    return html``;
  }
}
