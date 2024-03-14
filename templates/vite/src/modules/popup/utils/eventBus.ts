import { EventBusNamesEnum } from "@/modules/popup/interfaces/eventBusNames";

export class EventBus<T> {
  private eventTarget: EventTarget;

  constructor(comment = "") {
    this.eventTarget = document.appendChild(document.createComment(comment));
  }

  on(type: EventBusNamesEnum, listener: (even: CustomEvent<T>) => void) {
    this.eventTarget.addEventListener(type, listener as EventListener);
  }

  once(type: EventBusNamesEnum, listener: (even: CustomEvent<T>) => void) {
    this.eventTarget.addEventListener(type, listener as EventListener, { once: true });
  }

  off(type: EventBusNamesEnum, listener: (even: CustomEvent<T>) => void) {
    this.eventTarget.removeEventListener(type, listener as EventListener);
  }

  emit(type: EventBusNamesEnum, detail: T) {
    return this.eventTarget.dispatchEvent(new CustomEvent(type, { detail }));
  }
}
