import type { AxiosInstance } from 'axios';
import { makeAutoObservable, toJS } from 'mobx';
import type { Application, ApplicationStore } from '@entities/application';
import { prepareApplicationData } from '@entities/application/lib/prepareApplicationData';
import type {
  ApplicationsWithPagination,
  PartnerApplicationsFilter,
  PartnerApplicationsForm,
  TFilterTag,
} from '@entities/application/model/application';
import type { PartnerDreamCategory } from '@features/application/partner';
import type { GetFilterParams } from '@shared/api/models';
import { messageError } from '@shared/lib';
import { RequestStore } from '@shared/model';

type TProps = {
  axiosInstance: AxiosInstance;
  applicationS: ApplicationStore;
};

const BASE_URL = '/dreams/partner/';

export class PartnerStore {
  client: AxiosInstance;
  request;

  dreamCategory?: PartnerDreamCategory;
  applicationS: ApplicationStore;
  _reservedApplication: Application | null;
  filterTags: TFilterTag[];

  constructor(props: TProps) {
    this.client = props.axiosInstance;
    this.applicationS = props.applicationS;

    this.filterTags = [];
    this._reservedApplication = null;

    this.request = {
      getPartnerApplications: new RequestStore<ApplicationsWithPagination>({
        client: this.client,
        url: BASE_URL,
        method: 'get',
      }),

      getApplication: new RequestStore<Application>({
        client: this.client,
        url: BASE_URL + '${id}/',
        method: 'get',
      }),

      getAvailableApplications: new RequestStore<Application>({
        client: this.client,
        url: BASE_URL + 'available_dreams/',
        method: 'get',
      }),
    };

    makeAutoObservable(this, {
      client: false,
    });
  }

  public setFilterTags(filters: PartnerApplicationsForm) {
    const result: TFilterTag[] = [];
    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'settlement' && value) {
        result.push({
          label: value.value,
          value: value.value,
          formName: key,
          dadata: value.data,
        });
        return;
      }
      if (value) {
        result.push({
          label: typeof value === 'number' ? value : value.label,
          value: typeof value === 'number' ? value : value.value,
          formName: key,
        });
      }
    });
    this.filterTags = result;
  }

  public setDreamCategory(dreamCategory: PartnerDreamCategory | undefined) {
    this.dreamCategory = dreamCategory;
  }

  public clearFilterTags() {
    this.filterTags = [];
  }

  public setReservedApplication(data: Application | null) {
    this._reservedApplication = data ? prepareApplicationData(data) : null;
  }

  public get reservedApplication(): Application | null {
    return toJS(this._reservedApplication);
  }

  public async getApplications(params?: Partial<GetFilterParams>) {
    return this.request.getPartnerApplications.request({ data: params }).then(() => {
      const { status, data, errorData } = this.request.getPartnerApplications.result;

      if (status && data) {
        const { results, ...pagination } = data;

        this.applicationS.setApplications(results);
        this.applicationS.setApplicationsPagination(pagination);
      } else {
        messageError(errorData?.message);
      }
    });
  }

  convertFormToFilter(form: PartnerApplicationsForm): PartnerApplicationsFilter {
    const filter: PartnerApplicationsFilter = {};
    for (const key in form) {
      // @ts-ignore
      if (form[key] && form[key].data) {
        // @ts-ignore
        filter[key] =
          // @ts-ignore
          form[key].data.fias_id;
        continue;
      }
      // @ts-ignore
      if (form[key]) {
        // @ts-ignore
        filter[key] = form[key].value || form[key];
      }
    }

    return filter;
  }

  public async getPublicAvailableApplication(params?: PartnerApplicationsForm) {
    return this.request.getAvailableApplications
      .request({ data: params ? this.convertFormToFilter(params) : this.filterTags })
      .then(() => {
        const { status, data, errorData } = this.request.getAvailableApplications.result;

        if (!status || !data) {
          messageError(errorData?.message);
        } else {
          if (params) {
            this.setFilterTags(params);
          }

          // this.setReservedApplication(data);
        }
      });
  }
}
