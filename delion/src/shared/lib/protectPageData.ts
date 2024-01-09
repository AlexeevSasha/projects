// TODO: rewrite to custom hook | support nextjs client side navigation
export class ProtectPageData {
  protected message: string = 'Введённые вами данные могут не сохраниться.';

  constructor(message?: string) {
    this.message = message || this.message;
  }

  public enable() {
    // clear events
    this.disable();

    window.addEventListener('beforeunload', this.beforeUnloadHandler);
  }

  public disable() {
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
  }

  private beforeUnloadHandler(event: BeforeUnloadEvent) {
    event.preventDefault();

    event.returnValue = this.message;

    return event;
  }
}
