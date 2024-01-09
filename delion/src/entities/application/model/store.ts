import type { AxiosInstance } from 'axios';
import { makeAutoObservable, toJS } from 'mobx';
// eslint-disable-next-line boundaries/element-types
import type { Dreamer } from '@entities/dreamer/@x/application';
import type { PagiantionResponseParams } from '@shared/api';
import { prepareApplicationData } from '../lib/prepareApplicationData';
import { ApplicationStatus } from './application';
import type { Application } from './application';

type Props = {
  axiosInstance: AxiosInstance;
};

const initialData: {
  application: Application;
  applications: Application[];
  applicationsPagination: PagiantionResponseParams | null;
  reservedApplication: null;
  applicationFilters: null;
  selectedDreamer: undefined;
  deletingDreamer: undefined;
} = {
  application: {
    id: 0,
    dream_application_id: 0,
    dreamers: [],
    status: ApplicationStatus.DRAFT,
    is_new_region: false,
    dreamer_moderation_rate: [],
    moderation_time: new Date(),
    is_waiting_feedback: false,
    isApplicationExecuted: false,
    isApplicationExecutionTypeIndependent: false,
    isApplicationExecutionTypeOrganization: false,
    isApplicationIndependetAndAvailableDelivery: false,
    isApplicationRejectable: false,
    isApplicationInExecute: false,
    attempts_count: 0,
    is_checked: false,
  },
  applications: [],
  applicationsPagination: null,
  selectedDreamer: undefined,
  deletingDreamer: undefined,
  reservedApplication: null,
  applicationFilters: null,
};

export class ApplicationStore {
  client: AxiosInstance;

  private _application: Application;
  private _applications: Application[];
  private _applicationsPagination: PagiantionResponseParams | null;
  private _selectedDreamer: Dreamer | undefined;
  private _deletingDreamer: Dreamer | undefined;

  constructor(props: Props) {
    this.client = props.axiosInstance;
    this._application = initialData.application;
    this._applications = initialData.applications;
    this._applicationsPagination = initialData.applicationsPagination;
    this._selectedDreamer = initialData.selectedDreamer;
    this._deletingDreamer = initialData.deletingDreamer;

    makeAutoObservable(this, {
      client: false,
    });
  }

  public get application(): typeof this._application {
    return toJS(this._application);
  }

  public setApplication(data: Application | null) {
    const updatedData = { ...this.application, ...data };

    this._application = prepareApplicationData(updatedData);

    const selected = this._application.dreamers.find(
      (dreamer) => dreamer.id === this.selectedDreamer?.id,
    );
    if (selected) {
      this.setSelectedDreamer(selected);
    }
  }

  public get applications(): typeof this._applications {
    return toJS(this._applications);
  }

  public setApplications(data: Application[]) {
    this._applications = data.map((item) => prepareApplicationData(item));
  }

  public get applicationsPagination(): typeof this._applicationsPagination {
    return toJS(this._applicationsPagination);
  }

  public setApplicationsPagination(data: PagiantionResponseParams) {
    this._applicationsPagination = { ...this._applicationsPagination, ...data };
  }

  public get selectedDreamer(): typeof this._selectedDreamer {
    return this._selectedDreamer;
  }

  public setSelectedDreamer(data: Dreamer | undefined) {
    this._selectedDreamer = data ? { ...data } : undefined;
  }

  public get deletingDreamer(): typeof this._deletingDreamer {
    return this._deletingDreamer;
  }

  public setDeletingDreamer(data: Dreamer | undefined) {
    this._deletingDreamer = data ? { ...data } : undefined;
  }

  public get isFullFilled() {
    if (!this.application) {
      return false;
    }

    const { dreamers, is_contact_filled } = this.application;

    if (!dreamers.length) return false;

    const isDreamersFilled = dreamers.every(
      ({ is_additional_info, is_dream, is_dreamer_category, is_dreamer_info, is_good_deed }) =>
        is_additional_info && is_dream && is_dreamer_category && is_dreamer_info && is_good_deed,
    );

    return isDreamersFilled && !!is_contact_filled;
  }

  public get hasApplications() {
    if (!this.applications?.length) {
      return false;
    }

    return this.applications?.length > 0;
  }

  public get isContactDisabled() {
    const { status } = this.application;

    if (status === ApplicationStatus.NEED_REVISION) {
      return true;
    }

    if (status === ApplicationStatus.ERROR || status === ApplicationStatus.DRAFT) {
      return this.application.dreamers.some((dreamer) => dreamer.is_approved_moderation);
    }

    return false;
  }
}
