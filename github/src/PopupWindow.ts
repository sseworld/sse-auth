import { toParams, toQuery } from "./utils";

interface PopupWindowOptions {
  // Add any options you expect here with their types
  [key: string]: any;
}

class PopupWindow {
  public id: string;
  public url: string;
  public options: PopupWindowOptions;
  private window?: Window | null;
  private _iid?: number | null;
  private promise?: Promise<Record<string, string>>;

  constructor(id: string, url: string, options: PopupWindowOptions = {}) {
    this.id = id;
    this.url = url;
    this.options = options;
  }

  public open(): void {
    const { url, id, options } = this;
    this.window = window.open(url, id, toQuery(options, ","));
  }

  public close(): void {
    this.cancel();
    if (this.window) {
      this.window.close();
    }
  }

  public poll(): Promise<Record<string, string>> {
    this.promise = new Promise((resolve, reject) => {
      this._iid = window.setInterval(() => {
        try {
          const popup = this.window;

          if (!popup || popup.closed !== false) {
            this.close();
            reject(new Error("The popup was closed"));
            return;
          }

          if (
            popup.location.href === this.url ||
            popup.location.pathname === "blank"
          ) {
            return;
          }

          const params = toParams(popup.location.search.replace(/^\?/, ""));
          resolve(params);
          this.close();
        } catch (error) {
          // Ignore DOMException
        }
      }, 500);
    });
    return this.promise;
  }

  public cancel(): void {
    if (this._iid) {
      window.clearInterval(this._iid);
      this._iid = null;
    }
  }

  public then(...args: any[]): Promise<any> {
    return this.promise!.then(...args);
  }

  public catch(...args: any[]): Promise<any> {
    return this.promise!.catch(...args);
  }

  public static open(
    ...args: [string, string, PopupWindowOptions]
  ): PopupWindow {
    const popup = new this(...args);
    popup.open();
    popup.poll();
    return popup;
  }
}

export default PopupWindow;
