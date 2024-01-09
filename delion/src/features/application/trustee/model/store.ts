import type { AxiosInstance } from 'axios';
import dayjs from 'dayjs';
import { makeAutoObservable } from 'mobx';
import type {
  Application,
  ApplicationStore,
  ContactsFields,
  CreateApplication,
} from '@entities/application';
import type { TrusteeFeedback } from '@entities/application';
import { type ModerationError } from '@entities/application/model/application';
import type {
  Dreamer,
  DreamerAboutFields,
  DreamerCategoryFields,
  DreamerGoodDeedFields,
  DreamerInfoFields,
  DreamerWishFields,
} from '@entities/dreamer';
import type { TrusteeUploadReport } from '@features/application/trustee/model/trustee';
import { messageError, messageSuccess } from '@shared/lib';
import { RequestStore } from '@shared/model';

type Props = {
  axiosInstance: AxiosInstance;
  applicationS: ApplicationStore;
};

const BASE_URL = '/dreams/trustee/';

export class TrusteeStore {
  client: AxiosInstance;
  request;
  applicationS: ApplicationStore;

  constructor(props: Props) {
    this.client = props.axiosInstance;
    this.applicationS = props.applicationS;

    this.request = {
      createApplication: new RequestStore<Application>({
        client: this.client,
        url: BASE_URL,
        method: 'post',
      }),
      getApplication: new RequestStore<Application>({
        client: this.client,
        url: BASE_URL + '${id}/',
        method: 'get',
      }),
      updateContacts: new RequestStore<Application>({
        client: this.client,
        url: BASE_URL + '${id}/contact/',
        method: 'post',
      }),
      createDreamer: new RequestStore<Dreamer>({
        client: this.client,
        url: BASE_URL + '${id}/dreamers/',
        method: 'post',
      }),
      deleteDreamer: new RequestStore<Dreamer>({
        client: this.client,
        url: BASE_URL + '${id}/dreamers/${dreamer_id}/delete/',
        method: 'post',
      }),
      updateDreamerAbout: new RequestStore<Dreamer>({
        client: this.client,
        url: BASE_URL + '${id}/dreamers/${dreamer_id}/information/',
        method: 'post',
      }),
      updateDreamerCategory: new RequestStore<Dreamer>({
        client: this.client,
        url: BASE_URL + '${id}/dreamers/${dreamer_id}/category/',
        method: 'post',
      }),
      updateDreamerInfo: new RequestStore<Dreamer>({
        client: this.client,
        url: BASE_URL + '${id}/dreamers/${dreamer_id}/additional_info/',
        method: 'post',
      }),
      updateDreamerGoodDeed: new RequestStore<Dreamer>({
        client: this.client,
        url: BASE_URL + '${id}/dreamers/${dreamer_id}/good_deed/',
        method: 'post',
      }),
      updateDreamerWish: new RequestStore<Dreamer>({
        client: this.client,
        url: BASE_URL + '${id}/dreamers/${dreamer_id}/dream/',
        method: 'post',
      }),
      checkDream: new RequestStore<Application>({
        client: this.client,
        url: BASE_URL + '${id}/check/',
        method: 'post',
      }),
      moderationResult: new RequestStore<ModerationError[]>({
        client: this.client,
        url: BASE_URL + '${id}/moderation_result/',
        method: 'get',
      }),
      cancelDreams: new RequestStore<Application>({
        client: this.client,
        url: BASE_URL + '${id}/cancel/',
        method: 'post',
      }),
      feedback: new RequestStore<TrusteeFeedback>({
        client: this.client,
        url: BASE_URL + '${id}/feedback/',
        method: 'post',
      }),
      uploadReport: new RequestStore<Application>({
        client: this.client,
        url: BASE_URL + '${id}/upload_report/',
        method: 'post',
      }),
    };

    makeAutoObservable(this, {
      client: false,
      applicationS: false,
    });
  }

  public async getApplication(applicationId: Application['id']) {
    await this.request.getApplication.request({
      urlProps: {
        id: applicationId,
      },
    });
    const { status, data, errorData } = this.request.getApplication.result;

    if (!status || !data) {
      messageError(errorData?.message ?? 'Что-то пошло не так.');
      return;
    }

    this.applicationS.setApplication(data);

    return data;
  }

  private setDreamer(dreamer?: Dreamer) {
    if (!dreamer) return;

    const applicationCopy = { ...this.applicationS.application };

    applicationCopy.dreamers = applicationCopy.dreamers.map((item) => {
      if (item.id === dreamer.id) return dreamer;
      return item;
    });

    this.applicationS.setApplication(applicationCopy);
  }

  public async createApplication(payload: CreateApplication): Promise<void> {
    await this.request.createApplication.request({ data: payload });
    const { status, data, errorData } = this.request.createApplication.result;

    if (!status || !data) {
      messageError(errorData?.message ?? 'Что-то пошло не так.');
      return;
    }

    this.applicationS.setApplication(data);
  }

  public async updateContacts(payload: ContactsFields, needShowMessage?: boolean) {
    if (this.applicationS.isContactDisabled) return;

    await this.request.updateContacts.request({
      urlProps: {
        id: this.applicationS.application.id,
      },
      data: payload,
      isNullable: true,
    });

    const { result } = this.request.updateContacts;

    if (result.data) {
      this.applicationS.setApplication(result.data);
    }

    if (needShowMessage) {
      messageSuccess('Ваши контактные данные изменены');
    }

    return result;
  }

  public async createDreamer() {
    await this.request.createDreamer.request({
      urlProps: { id: this.applicationS.application.id },
    });

    const { data } = this.request.createDreamer.result;

    if (!data) return;

    const appendDreamer = { ...this.applicationS.application };

    appendDreamer.dreamers.push(data);

    this.applicationS.setApplication(appendDreamer);

    return data;
  }

  public async deleteDreamer(dreamer: Dreamer) {
    await this.request.deleteDreamer.request({
      urlProps: {
        id: this.applicationS.application.id,
        dreamer_id: dreamer.id,
      },
    });

    const { status } = this.request.deleteDreamer.result;

    if (!status) return;

    const appendDreamer = { ...this.applicationS.application };

    appendDreamer.dreamers = appendDreamer.dreamers?.filter((item) => dreamer.id !== item.id);

    this.applicationS.setSelectedDreamer(undefined);
    this.applicationS.setDeletingDreamer(undefined);

    this.applicationS.setApplication(appendDreamer);
  }

  public async updateDreamerAbout(payload: DreamerAboutFields) {
    if (this.applicationS.selectedDreamer?.is_approved_moderation) return;

    if (payload.birth_date) {
      payload.birth_date = dayjs(payload.birth_date).format('YYYY-MM-DD');
    }

    await this.request.updateDreamerAbout.request({
      urlProps: {
        id: this.applicationS.application.id,
        dreamer_id: this.applicationS.selectedDreamer?.id,
      },
      data: payload,
      isNullable: true,
      avoidErrors: true,
    });

    const { result } = this.request.updateDreamerAbout;

    this.setDreamer(result.data);

    return result;
  }

  public async updateDreamerCategory(payload: DreamerCategoryFields) {
    if (this.applicationS.selectedDreamer?.is_approved_moderation) return;

    if (payload.parent_birth_date) {
      payload.parent_birth_date = dayjs(payload.parent_birth_date).format('YYYY-MM-DD');
    }

    await this.request.updateDreamerCategory.request({
      urlProps: {
        id: this.applicationS.application.id,
        dreamer_id: this.applicationS.selectedDreamer?.id,
      },
      data: payload,
      isNullable: true,
      avoidErrors: true,
    });

    const { result } = this.request.updateDreamerCategory;

    this.setDreamer(result.data);

    return result;
  }

  public async updateDreamerInfo(payload: DreamerInfoFields) {
    if (this.applicationS.selectedDreamer?.is_approved_moderation) return;

    await this.request.updateDreamerInfo.request({
      urlProps: {
        id: this.applicationS.application.id,
        dreamer_id: this.applicationS.selectedDreamer?.id,
      },
      data: payload,
      isNullable: true,
      avoidErrors: true,
    });

    const { result } = this.request.updateDreamerInfo;

    this.setDreamer(result.data);

    return result;
  }

  public async updateDreamerGoodDeed(payload: DreamerGoodDeedFields) {
    if (this.applicationS.selectedDreamer?.is_approved_moderation) return;

    await this.request.updateDreamerGoodDeed.request({
      urlProps: {
        id: this.applicationS.application.id,
        dreamer_id: this.applicationS.selectedDreamer?.id,
      },
      data: payload,
      isNullable: true,
      avoidErrors: true,
    });

    const { result } = this.request.updateDreamerGoodDeed;

    this.setDreamer(result.data);

    return result;
  }

  public async updateDreamerWish(payload: DreamerWishFields) {
    if (this.applicationS.selectedDreamer?.is_approved_moderation) return;

    await this.request.updateDreamerWish.request({
      urlProps: {
        id: this.applicationS.application.id,
        dreamer_id: this.applicationS.selectedDreamer?.id,
      },
      data: payload,
      isNullable: true,
      avoidErrors: true,
    });

    const { result } = this.request.updateDreamerWish;

    this.setDreamer(result.data);

    return result;
  }

  public async checkDream() {
    await this.request.checkDream.request({
      urlProps: {
        id: this.applicationS.application.id,
      },
      isNullable: true,
    });
    const { data } = this.request.checkDream.result;
    return data;
  }

  public async getModerationResult() {
    await this.request.moderationResult.request({
      urlProps: {
        id: this.applicationS.application.id,
      },
    });

    const { data } = this.request.moderationResult.result;

    return data || [];
  }

  public async cancelDreams() {
    await this.request.cancelDreams.request({
      urlProps: {
        id: this.applicationS.application.id,
      },
      isNullable: true,
    });

    const { data } = this.request.cancelDreams.result;
    data && this.applicationS.setApplication(data);

    return !!data;
  }

  public async feedback(id: number, payload: TrusteeFeedback) {
    await this.request.feedback.request({
      urlProps: { id },
      data: payload,
    });

    const { data, status, errorData } = this.request.feedback.result;

    if (!status) {
      messageError(errorData?.message ?? 'Не удалось оставить отзыв');
    } else {
      messageSuccess('Отзыв успешно отправлен');
    }

    return data || null;
  }

  public async uploadReport(payload: TrusteeUploadReport) {
    await this.request.uploadReport.request({
      urlProps: {
        id: this.applicationS.application.id,
      },
      data: payload,
    });

    const { data, status, errorData } = this.request.uploadReport.result;

    if (!status) {
      messageError(errorData?.message ?? 'Не удалось отправить отчёт');
    } else {
      messageSuccess('Отчёт успешно отправлен');
      data && this.applicationS.setApplication(data);
    }

    return data || null;
  }
}
