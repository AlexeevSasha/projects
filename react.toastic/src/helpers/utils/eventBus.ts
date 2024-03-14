import { EventBusNames } from '../../interfaces/enum';

class EventBus {
  private eventTarget: EventTarget;

  constructor(comment = '') {
    this.eventTarget = document.appendChild(document.createComment(comment));
  }

  on(type: EventBusNames, listener: (even: CustomEvent) => void) {
    this.eventTarget.addEventListener(type, listener as EventListener);
  }

  once(type: EventBusNames, listener: (even: CustomEvent) => void) {
    this.eventTarget.addEventListener(type, listener as EventListener, { once: true });
  }

  off(type: EventBusNames, listener: (even: CustomEvent) => void) {
    this.eventTarget.removeEventListener(type, listener as EventListener);
  }

  emit(type: EventBusNames, detail: unknown) {
    return this.eventTarget.dispatchEvent(new CustomEvent(type, { detail }));
  }
}

export { EventBus };
