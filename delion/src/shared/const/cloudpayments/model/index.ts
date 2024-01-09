export interface CloudCompletedData {
  success: boolean;
  message: string;
  code: number;
  email: string | null;
}

export interface CloudPayOptions {
  publicId: string;
  description: string;
  amount: number;
  currency: string; //RUB/USD/EUR/GBP
  data?: unknown;
  accountId?: string;
  invoiceId?: string;
  email?: string;
  skin?: 'mini' | 'classic' | 'modern';
  retryPayment?: boolean;
  payerServiceFee?: number;
  autoClose?: number;
}

export interface CloudCallback {
  onSuccess?: (options: CloudPayOptions, cryptogram?: string, email?: string) => void; // действие при успешной оплате
  onFail?: (reason: undefined | string, options: CloudPayOptions, code: undefined | string) => void; // действие при ошибки
  onComplete?: (data: CloudCompletedData, options: CloudPayOptions) => void; // Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции
}
