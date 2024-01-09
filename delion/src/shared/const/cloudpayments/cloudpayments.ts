import { setting } from '../../../../config/setting';
import type { CloudCallback, CloudPayOptions } from './model';

interface Widget {
  pay: (type: 'auth' | 'charge', options: CloudPayOptions, callback?: CloudCallback) => void;
}

declare const cp: {
  CloudPayments: new () => Widget;
};

export class Cloudpayments {
  private widget: Widget;
  private readonly publicId: string;

  constructor() {
    this.publicId = String(setting.cloudPayments.publicId);
    this.widget = new cp.CloudPayments();
  }

  pay(options: Omit<CloudPayOptions, 'publicId'>, callback?: CloudCallback) {
    this.widget.pay('charge', { publicId: this.publicId, ...options }, callback);
  }
}
