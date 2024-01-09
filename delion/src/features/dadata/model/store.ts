import type { AxiosInstance } from 'axios';
import { makeAutoObservable } from 'mobx';
import { RequestStore } from '@shared/model';
import type { Dadata, DadataRequest } from '../../../shared/model/dadata';

type Props = {
  initialData: DadataStore;
  axiosInstance: AxiosInstance;
};

export class DadataStore {
  client: Props['axiosInstance'];
  request;

  constructor(props: Props) {
    this.client = props.axiosInstance;

    this.request = {
      fetchAddress: new RequestStore<Dadata[]>({
        client: this.client,
        url: '/dadata/',
        method: 'post',
      }),
    };

    makeAutoObservable(this, {
      client: false,
      request: false,
    });
  }

  public async fetchAddress(payload: DadataRequest) {
    await this.request.fetchAddress.request({ data: payload });
    const { data = [] } = this.request.fetchAddress.result;
    return data;
  }
}
