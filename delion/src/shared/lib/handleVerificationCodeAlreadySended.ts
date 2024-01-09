import type { ErrorResponseResult, VerificationCodeData } from '@shared/api';
import { messageError } from './showMessage';

export function handleVerificationCodeAlreadySended(extra?: ErrorResponseResult['extra']) {
  // Retrieving already sended payload and setting it as an actual state.
  const retriedExtra: VerificationCodeData = {
    attempts: 0,
    uuid: null,
    resend_timeout: 0,
  };

  if (extra && extra.length > 0) {
    extra.forEach((item) => {
      if (item.name === 'uuid') {
        // TODO fix logic with error
        if (Array.isArray(item.errors)) {
          retriedExtra.uuid = item.errors[0];
        } else {
          retriedExtra.uuid = item.errors as unknown as string;
        }
      }

      if (item.name === 'resend_timeout') {
        messageError('Код уже был отправлен!');

        retriedExtra.resend_timeout = item.errors as unknown as number;
      }

      if (item.name === 'attempts') {
        retriedExtra.attempts = item.errors as unknown as number;
      }
    });
  }

  if (retriedExtra?.uuid && retriedExtra?.resend_timeout) {
    return retriedExtra;
  } else {
    return;
  }
}
