import type { AxiosInstance } from 'axios';
import { makeAutoObservable } from 'mobx';
import { RequestStore } from '@shared/model';

type Props = {
  axiosInstance: AxiosInstance;
};

type FeatureFlags = {
  // Выдача желаний с витрины исполнителям (ФЛ)
  dreams_on_showcase_available_flag?: boolean;
  // Выдача желаний из новых регионов исполнителям (ФЛ)
  dreams_from_new_regions_available_flag?: boolean;
  // Отказ от исполнения
  send_reject_executor_available_flag?: boolean;
  // Бронирование желаний
  reservations_dreams_available_flag?: boolean;
  // Флаг включает оплату и исполнение желаний с помощью организаторов
  payments_available_flag?: boolean;
  // 	Флаг включает функцию возврата средств
  refunds_payments_available_flag?: boolean;
  // Enable Django Rest Framework Browsable API
  allow_drf_browsable_api?: boolean;
  // Включена ли авторизация мечтателя
  trustee_auth_flag?: boolean;
  // Включена ли авторизация исполнителя
  executor_auth_flag?: boolean;
};

export class FeatureFlagsStore {
  client: AxiosInstance;
  request;

  public constructor(props: Props) {
    this.client = props.axiosInstance;
    this.request = {
      getFeatureFlags: new RequestStore<FeatureFlags>({
        client: this.client,
        url: '/featureflags/',
        method: 'get',
      }),
    };
    makeAutoObservable(this);
  }

  private _featureFlags: FeatureFlags = {};

  public get featureFlags(): FeatureFlags {
    return this._featureFlags;
  }

  private setFeatureFlags(values: FeatureFlags) {
    this._featureFlags = values;
  }

  public async fetchFeatureFlags() {
    await this.request.getFeatureFlags.request().then(() => {
      const { data, status } = this.request.getFeatureFlags.result;
      if (!status || !data) {
        return;
      }

      this.setFeatureFlags(data);
    });
  }
}
