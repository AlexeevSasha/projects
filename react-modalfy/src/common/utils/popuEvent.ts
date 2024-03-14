import { PopupEventNames } from "@/common/interfaces/popupEventNames";

export class PopupEvent<T> {
  private eventTarget: EventTarget;

  constructor() {
    this.eventTarget = document.appendChild(document.createComment(""));
  }

  on(type: PopupEventNames, listener: (even: CustomEvent<T>) => void) {
    this.eventTarget.addEventListener(type, listener as EventListener);
  }

  once(type: PopupEventNames, listener: (even: CustomEvent<T>) => void) {
    this.eventTarget.addEventListener(type, listener as EventListener, { once: true });
  }

  off(type: PopupEventNames, listener: (even: CustomEvent<T>) => void) {
    this.eventTarget.removeEventListener(type, listener as EventListener);
  }

  emit<E>(type: PopupEventNames, detail: E extends unknown ? E : T) {
    return this.eventTarget.dispatchEvent(new CustomEvent(type, { detail }));
  }
}
