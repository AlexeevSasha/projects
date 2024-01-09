import { DreamerStatus, type Dreamer } from '@entities/dreamer/@x/application';
import { ApplicationExecutionType } from '@shared/api/models';
import { calculateProgress } from '@shared/lib';
import { formatAllPricesToRUB, formatPriceToRUB } from '@shared/lib/formatPrice';
import { ApplicationStatus, type Application } from '../model/application';

export const prepareApplicationData = (data: Application): Application => {
  const dreamers = data.dreamers?.sort((a,b)=> a.id - b.id).map(enrichDreamerWithStatus);

  const isApplicationExecuted = data.status === ApplicationStatus.EXECUTED;
  const isApplicationRejectable = !(
    isApplicationExecuted ||
    dreamers.some((item) => item.isDreamExecuted || item.isDreamHasReportAttached)
  );
  const isApplicationIndependetAndAvailableDelivery =
    (data.execution_type === ApplicationExecutionType.INDEPENDENT && data.is_available_delivery) ??
    false;

  return {
    ...data,
    dreamers,
    isApplicationExecuted,
    isApplicationExecutionTypeIndependent:
      data.execution_type === ApplicationExecutionType.INDEPENDENT,
    isApplicationExecutionTypeOrganization:
      data.execution_type === ApplicationExecutionType.WITH_DELIVERY,
    isApplicationIndependetAndAvailableDelivery,
    applicationProgressInfo: calculateProgress(data?.dreamers_executed_count, data?.dreamers_count),
    isApplicationRejectable,
    isApplicationInExecute: data.status === ApplicationStatus.IN_EXECUTE,
    formattedTotalPriceAmount: formatPriceToRUB(data.total_amount),
    formattedPrice: formatAllPricesToRUB(data.price),
  };
};

const enrichDreamerWithStatus = (dreamer: Dreamer): Dreamer => {
  return {
    ...dreamer,
    isDreamExecuted: dreamer.status === DreamerStatus.EXECUTED,
    isDreamHasReportAttached: dreamer.status === DreamerStatus.REPORT_ATTACHED,
    isDreamNotStarted: dreamer.status === DreamerStatus.NOT_EXECUTED,
  };
};
