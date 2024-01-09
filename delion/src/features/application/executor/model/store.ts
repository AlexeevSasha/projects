import type { AxiosInstance } from 'axios';
import { makeAutoObservable, toJS } from 'mobx';
import type { ApplicationStore } from '@entities/application';
import { prepareApplicationData } from '@entities/application/lib/prepareApplicationData';
import type {
  Application,
  ApplicationsWithPagination,
  GetPublicApplicationParams,
} from '@entities/application/model/application';
import type { UserStore } from '@entities/user';
import type { GetFilterParams } from '@shared/api/models';
import { messageError, messageSuccess } from '@shared/lib';
import { RequestStore } from '@shared/model';
import type {
  LeaveFeedbackParams,
  RejectApplicationParams,
  TakeAvailableApplicationParams,
  UploadReportParams,
} from './executor';

type Props = {
  axiosInstance: AxiosInstance;
  applicationS: ApplicationStore;
  userS: UserStore;
};

const BASE_URL = '/dreams/executor/';

export class ExecutorStore {
  client: AxiosInstance;
  request;

  userS: UserStore;
  applicationS: ApplicationStore;
  _reservedApplication: Application | null;
  applicationFilters: Partial<GetPublicApplicationParams> | null;

  constructor(props: Props) {
    this.client = props.axiosInstance;
    this.applicationS = props.applicationS;
    this.userS = props.userS;

    this.applicationFilters = null;
    this._reservedApplication = null;

    this.request = {
      getExecutorApplications: new RequestStore<ApplicationsWithPagination>({
        client: this.client,
        url: BASE_URL,
        method: 'get',
      }),

      takeApplication: new RequestStore({
        client: this.client,
        url: BASE_URL + '${id}/take/',
        method: 'get',
      }),

      rejectApplication: new RequestStore({
        client: this.client,
        url: BASE_URL + '${id}/reject/',
        method: 'post',
      }),

      getApplication: new RequestStore<Application>({
        client: this.client,
        url: BASE_URL + '${id}/',
        method: 'get',
      }),

      getPublicAvailableApplication: new RequestStore<Application>({
        client: this.client,
        url: '/dreams/public/get/',
        method: 'get',
      }),

      changeExecutionType: new RequestStore<Application>({
        client: this.client,
        url: BASE_URL + '${id}/change_execution_type/',
        method: 'get',
      }),

      toggleDreamStatus: new RequestStore({
        client: this.client,
        url: BASE_URL + '${dream_application_id}/dreamers/${id}/toggle_status/',
        method: 'get',
      }),

      uploadReport: new RequestStore({
        client: this.client,
        url: BASE_URL + '${dream_application_id}/dreamers/${id}/upload_report/',
        method: 'post',
      }),

      leaveFeedback: new RequestStore({
        client: this.client,
        url: BASE_URL + '${id}/leave_feedback/',
        method: 'post',
      }),

      takeDreamersByUuid: new RequestStore<{ id: string }>({
        client: this.client,
        url: 'dreams/dreamers/${uuid}/take/',
        method: 'get',
      }),

      getDreamersByUuid: new RequestStore<Application>({
        client: this.client,
        url: 'dreams/dreamers/${uuid}/',
        method: 'get',
      }),

      takeDreamPublicByUuid: new RequestStore<{ id: string }>({
        client: this.client,
        url: 'dreams/public/${uuid}/take/',
        method: 'get',
      }),

      getDreamPublicByUuid: new RequestStore<Application>({
        client: this.client,
        url: 'dreams/public/${uuid}/',
        method: 'get',
      }),

      cancelPayment: new RequestStore<unknown>({
        client: this.client,
        url: 'billing/payments/${id}/refund/',
        method: 'post',
      }),
    };

    makeAutoObservable(this, {
      client: false,
    });
  }

  public setReservedApplication(data: Application | null) {
    this._reservedApplication = data ? prepareApplicationData(data) : null;
  }

  public get reservedApplication(): Application | null {
    return toJS(this._reservedApplication);
  }

  public setApplicationFilters(data: Partial<GetPublicApplicationParams> | null) {
    this.applicationFilters = { ...this.applicationFilters, ...data };
  }

  public async getApplication(id: number) {
    return this.request.getApplication.request({ urlProps: { id } }).then(() => {
      const { status, data, errorData } = this.request.getApplication.result;

      if (!status || !data) {
        return messageError(errorData?.message);
      }

      this.applicationS.setApplication(data);
    });
  }

  public async getApplications(params?: Partial<GetFilterParams>) {
    return this.request.getExecutorApplications.request({ data: params }).then(() => {
      const { status, data, errorData } = this.request.getExecutorApplications.result;

      if (status && data) {
        const { results, ...pagination } = data;

        this.applicationS.setApplications(results);
        this.applicationS.setApplicationsPagination(pagination);
      } else {
        messageError(errorData?.message);
      }
    });
  }

  public async takeApplication(params: TakeAvailableApplicationParams) {
    return this.request.takeApplication.request({ urlProps: params }).then(() => {
      const { status, errorData } = this.request.takeApplication.result;

      if (!status) {
        messageError(errorData?.message ?? 'Не удалось взять мечту на исполнение');

        return false;
      } else {
        messageSuccess('Заявка успешно взята на исполнение');

        this.clearReservedApplicationSearchData();

        return true;
      }
    });
  }

  public async getPublicAvailableApplication(params?: Partial<GetPublicApplicationParams>) {
    return this.request.getPublicAvailableApplication
      .request({ data: params ? params : this.applicationFilters })
      .then(() => {
        const { status, data, errorData } = this.request.getPublicAvailableApplication.result;
        if (!status || !data) {
          messageError(errorData?.message || 'Произошла ошибка');
        } else {
          params && this.setApplicationFilters(params);
          this.setReservedApplication(data);
        }
      });
  }

  public changeExecutionType(id: number) {
    return this.request.changeExecutionType.request({ urlProps: { id } }).then(() => {
      const { status, data, errorData } = this.request.changeExecutionType.result;

      if (status && data) {
        this.applicationS.setApplication(data);
      } else {
        messageError(errorData?.message);
      }
    });
  }

  public async toggleExecutorDreamStatus(id: number) {
    return this.request.toggleDreamStatus
      .request({
        urlProps: { dream_application_id: this.applicationS.application.id, id },
      })
      .then(() => {
        const { status, errorData } = this.request.toggleDreamStatus.result;

        if (!status) {
          return messageError(errorData?.message ?? 'Что-то пошло не так');
        }

        this.getApplication(this.applicationS.application.id);
      });
  }

  public async rejectApplication(params: RejectApplicationParams): Promise<boolean> {
    const { id, ...data } = params;

    return this.request.rejectApplication.request({ urlProps: { id }, data: data }).then(() => {
      const { errorData } = this.request.rejectApplication.result;

      if (errorData) {
        messageError(errorData?.message ?? 'Не удалось отказаться от заявки.');
        return false;
      }

      return true;
    });
  }

  public async uploadReport(params: UploadReportParams) {
    const { id, ...data } = params;

    return this.request.uploadReport
      .request({
        urlProps: { dream_application_id: this.userS.user?.dream_application_id, id },
        data,
      })
      .then(() => {
        const { status, errorData } = this.request.uploadReport.result;

        if (!status) {
          return messageError(errorData?.message ?? 'Не удалось прикрепить отчёт');
        }

        messageSuccess('Отчёт успешно прикреплён');
        this.getApplication(this.applicationS.application.id);

        return true;
      });
  }

  public async leaveFeedback(params: LeaveFeedbackParams) {
    const { id, ...data } = params;
    return this.request.leaveFeedback.request({ urlProps: { id }, data }).then(() => {
      const { status, errorData } = this.request.leaveFeedback.result;

      if (!status) {
        return messageError(errorData?.message ?? 'Не удалось оставить отзыв');
      }

      this.getApplication(id);
      return true;
    });
  }

  public getDreamerById(id: number) {
    return this.applicationS.application.dreamers.find((dreamer) => dreamer.id === id);
  }

  public clearReservedApplicationSearchData() {
    this.applicationFilters = null;
    this.setReservedApplication(null);
  }

  public async takeDreamersByUuid(uuid: string) {
    await this.request.takeDreamersByUuid.request({ urlProps: { uuid } });
    const { data, status, errorData } = this.request.takeDreamersByUuid.result;
    if (!status || !data) {
      messageError(errorData?.message ?? 'Желание уже взял кто-то другой');
      return;
    }

    return data;
  }

  public async getDreamersByUuid(uuid: string) {
    await this.request.getDreamersByUuid.request({ urlProps: { uuid } });
    const { data, status } = this.request.getDreamersByUuid.result;
    if (!status) {
      messageError('Желание уже взял кто-то другой');
    }
    data && this.setReservedApplication(data);
    return data;
  }

  public async takeDreamPublicByUuid(uuid: string) {
    await this.request.takeDreamPublicByUuid.request({ urlProps: { uuid } });
    const { data, status, errorData } = this.request.takeDreamPublicByUuid.result;
    if (!status || !data) {
      messageError(errorData?.message ?? 'Заявку уже взял кто-то другой');
      return;
    }

    return data;
  }

  public async getDreamPublicByUuid(uuid: string) {
    await this.request.getDreamPublicByUuid.request({ urlProps: { uuid } });
    const { data, status } = this.request.getDreamPublicByUuid.result;
    if (!status) {
      messageError('Заявку уже взял кто-то другой');
    }
    data && this.setReservedApplication(data);
    return data;
  }

  public async cancelPayment() {
    await this.request.cancelPayment.request({
      urlProps: { id: this.applicationS.application.id },
    });
    const { data } = this.request.cancelPayment.result;

    return data;
  }
}
