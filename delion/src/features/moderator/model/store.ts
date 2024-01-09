import type { AxiosInstance } from 'axios';
import { makeAutoObservable } from 'mobx';
import type { ApplicationStore } from '@entities/application';
import type { Application } from '@entities/application';
import type { DreamModerationRate } from '@entities/dreamer';
import type { ModeratorRates } from '@features/moderator/model/moderator';
import { messageError } from '@shared/lib';
import { RequestStore } from '@shared/model';

type Props = {
  applicationS: ApplicationStore;
  axiosInstance: AxiosInstance;
};

export class ModeratorStore {
  private readonly BASE_URL = '/dreams/moderator';
  client: Props['axiosInstance'];
  applicationS: ApplicationStore;
  request;

  constructor(props: Props) {
    this.client = props.axiosInstance;
    this.applicationS = props.applicationS;
    this.request = {
      getDreamsModeratorTake: new RequestStore<Application>({
        client: this.client,
        url: `${this.BASE_URL}/take`,
        method: 'get',
        hideErrorMessageBlock: true,
      }),
      getDreamsModerator: new RequestStore<Application[]>({
        client: this.client,
        url: this.BASE_URL,
        method: 'get',
      }),
      saveDreamsModeratorSubmit: new RequestStore<Application>({
        client: this.client,
        url: this.BASE_URL + '/${id}/submit/',
        method: 'post',
      }),
      rejectDreamsModeratorReject: new RequestStore({
        client: this.client,
        url: this.BASE_URL + '/${id}/reject/',
        method: 'post',
      }),
      finalizeDreamsModerator: new RequestStore({
        client: this.client,
        url: this.BASE_URL + '/${id}/finalize/',
        method: 'post',
      }),
      getDreamsModeratorExtendBooking: new RequestStore({
        client: this.client,
        url: `${this.BASE_URL}/extend_booking/`,
        method: 'get',
      }),
    };
    makeAutoObservable(this, {
      client: false,
      applicationS: false,
    });
  }

  // если пользователь взял заявку, её получаем через этот метод
  public async getDreamsModerator() {
    await this.request.getDreamsModerator.request();
    const { data } = this.request.getDreamsModerator.result;
    data && data[0] && this.applicationS.setApplication(data[0]);
    return !!data?.[0];
  }

  //метод для получения заявки
  public async getDreamsModeratorTake() {
    await this.request.getDreamsModeratorTake.request();
    const { data,  errorData } = this.request.getDreamsModeratorTake.result;

    if (!data) {
      messageError(errorData?.message ?? 'Произошла ошибка');
    } else {
      this.applicationS.setApplication(data);
    }
    return !!data
  }

  public async submitRates(id: DreamModerationRate['id'], rates: ModeratorRates[]) {
    await this.request.saveDreamsModeratorSubmit.request({
      urlProps: { id },
      data: { rates },
    });
    const { data, status } = this.request.saveDreamsModeratorSubmit.result;
    if (!status || !data) return null;
    this.applicationS.setApplication(data);
    return true;
  }

  public async finalizeDreams(id: DreamModerationRate['id']) {
    await this.request.finalizeDreamsModerator.request({
      urlProps: { id },
    });
    const { status } = this.request.finalizeDreamsModerator.result;

    if (status) {
      this.applicationS.setApplication({
        ...this.applicationS.application,
        id: 0,
        dream_application_id: 0,
        dreamer_moderation_rate: [],
      });
    }
  }

  public async rejectDreams(id: DreamModerationRate['id'], comment: string) {
    await this.request.rejectDreamsModeratorReject.request({
      urlProps: { id },
      data: { comment },
    });
    const { status } = this.request.rejectDreamsModeratorReject.result;

    if (status) {
      this.applicationS.setApplication({
        ...this.applicationS.application,
        id: 0,
        dream_application_id: 0,
        dreamer_moderation_rate: [],
      });
    }

    return status;
  }

  public async extendBooking() {
    await this.request.getDreamsModeratorExtendBooking.request();
  }
}
