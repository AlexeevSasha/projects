export enum EventBusNames {
  'OPEN_DRAWER' = 'OPEN_DRAWER',
  'CLOSE_DRAWER' = 'CLOSE_DRAWER',
}

export class EventBus<T> {
  private eventTarget: EventTarget | null;

  constructor() {
    if (typeof document !== 'undefined') {
      this.eventTarget = document?.appendChild(document.createComment(''));
    } else {
      this.eventTarget = null;
    }
  }

  on(type: EventBusNames, listener: (even: CustomEvent<T>) => void) {
    this.eventTarget?.addEventListener(type, listener as EventListener);
  }

  protected once(type: EventBusNames, listener: (even: CustomEvent<T>) => void) {
    this.eventTarget?.addEventListener(type, listener as EventListener, { once: true });
  }

  off(type: EventBusNames, listener: (even: CustomEvent<T>) => void) {
    this.eventTarget?.removeEventListener(type, listener as EventListener);
  }

  protected emit<E>(type: EventBusNames, detail: E extends unknown ? E : T) {
    return this.eventTarget?.dispatchEvent(new CustomEvent(type, { detail }));
  }
}
