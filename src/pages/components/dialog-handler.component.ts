import { Page, Dialog } from '@playwright/test';

/**
 * XYZ Bank confirms "add customer" / "open account" via native window.alert()
 * instead of an in-page modal (this app has no OTP flow, unlike the reference
 * structure's otp-modal component). Playwright auto-dismisses dialogs unless a
 * handler is registered first, so this must be wired up before the action that
 * triggers the alert.
 */
export class DialogHandlerComponent {
  private lastMessage = '';

  constructor(private readonly page: Page) {
    this.page.on('dialog', this.capture);
  }

  private capture = async (dialog: Dialog): Promise<void> => {
    this.lastMessage = dialog.message();
    await dialog.accept();
  };

  /** Waits for the next alert triggered by `action` and returns its message. */
  async captureNext(action: () => Promise<void>): Promise<string> {
    const dialogPromise = this.page.waitForEvent('dialog');
    await action();
    const dialog = await dialogPromise;
    const message = dialog.message();
    return message;
  }

  get lastCapturedMessage(): string {
    return this.lastMessage;
  }
}
