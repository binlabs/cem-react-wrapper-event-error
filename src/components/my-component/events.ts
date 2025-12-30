import { type SearchResult } from './interfaces';

export class SearchInputEvent extends Event {
  query: string;
  categories: string[];

  // define the parameters of the event using the constructor
  constructor(query: string, categories: string[]) {
    // pass the event name and any options to the base Event class
    super('universal-search-input', {
      bubbles: true,
      composed: true,
    });

    // initialize public property values
    this.query = query;
    this.categories = categories;
  }
}

export class SearchCancelEvent extends Event {
  constructor() {
    super('universal-search-cancel', {
      bubbles: true,
      composed: true,
    });
  }
}

export class SearchSelectEvent extends Event {
  result: SearchResult;

  constructor(result: SearchResult) {
    super('universal-search-select', {
      bubbles: true,
      composed: true,
    });
    this.result = result;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'universal-search-input': SearchInputEvent;
    'universal-search-select': SearchSelectEvent;
    'universal-search-cancel': SearchCancelEvent;
  }
}
