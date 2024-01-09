import { PopupEventEnum } from "../../interfaces/popup/PopupEventEnum";

export class PopupEvent<T> {
  private eventTarget: EventTarget;

  constructor() {
    this.eventTarget = document.appendChild(document.createComment(""));
  }

  on(type: PopupEventEnum, listener: (even: CustomEvent<T>) => void) {
    this.eventTarget.addEventListener(type, listener as EventListener);
  }

  once(type: PopupEventEnum, listener: (even: CustomEvent<T>) => void) {
    this.eventTarget.addEventListener(type, listener as EventListener, { once: true });
  }

  off(type: PopupEventEnum, listener: (even: CustomEvent<T>) => void) {
    this.eventTarget.removeEventListener(type, listener as EventListener);
  }

  emit<E>(type: PopupEventEnum, detail: E extends unknown ? E : T) {
    return this.eventTarget.dispatchEvent(new CustomEvent(type, { detail }));
  }
}
