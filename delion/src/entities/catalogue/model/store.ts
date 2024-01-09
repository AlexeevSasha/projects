import type { AxiosInstance } from 'axios';
import { makeAutoObservable } from 'mobx';
import { RequestStore } from '@shared/model';
import type { DreamCategory, DreamerCategoryOption } from './catalogue';

type Props = {
  initialData: CatalogueStore;
  axiosInstance: AxiosInstance;
};

export class CatalogueStore {
  client: Props['axiosInstance'];
  request;
  private _dreamCategory?: DreamCategory;
  private _feedbackCategories: Option[] | null;
  private _dreamCategories: DreamCategory[] | null;

  constructor(props: Props) {
    this.client = props.axiosInstance;
    this._feedbackCategories = null;
    this._dreamCategories = null;

    this.request = {
      getDreamerCategories: new RequestStore<DreamerCategoryOption[]>({
        client: this.client,
        url: '/catalogues/dream_application_dreamer_category/',
        method: 'get',
      }),
      getDreamApplicationThemeSpecifications: new RequestStore<Option[]>({
        client: this.client,
        url: '/catalogues/dream_application_theme_specifications/',
        method: 'get',
      }),
      getDreamApplicationThemes: new RequestStore<Option[]>({
        client: this.client,
        url: '/catalogues/dream_application_themes/',
        method: 'get',
      }),
      getDreamCategories: new RequestStore<DreamCategory[]>({
        client: this.client,
        url: '/catalogues/dream_categories/',
        method: 'get',
      }),
      getDreamerInterests: new RequestStore<Option[]>({
        client: this.client,
        url: '/catalogues/dreamer_interests/',
        method: 'get',
      }),
      getGoodDeedCategories: new RequestStore<Option[]>({
        client: this.client,
        url: '/catalogues/good_deed_category/',
        method: 'get',
      }),
      getNosologies: new RequestStore<Option[]>({
        client: this.client,
        url: '/catalogues/nosologies/',
        method: 'get',
      }),
      getNewRegionSettlements: new RequestStore<Option[]>({
        client: this.client,
        url: '/catalogues/new_region_settlements/',
        method: 'get',
      }),
      getModerationSnils: new RequestStore<Option[]>({
        client: this.client,
        url: '/catalogues/moderation_snils/',
        method: 'get',
      }),
      getModerationAgreement: new RequestStore<Option[]>({
        client: this.client,
        url: '/catalogues/moderation_agreement/',
        method: 'get',
      }),
      getModerationBirthday: new RequestStore<Option[]>({
        client: this.client,
        url: '/catalogues/moderation_birthday/',
        method: 'get',
      }),
      getModerationCategoryDocument: new RequestStore<Option[]>({
        client: this.client,
        url: '/catalogues/moderation_category_document/',
        method: 'get',
      }),
      getModerationDocument: new RequestStore<Option[]>({
        client: this.client,
        url: '/catalogues/moderation_document/',
        method: 'get',
      }),
      getModerationDreamCategory: new RequestStore<Option[]>({
        client: this.client,
        url: '/catalogues/moderation_dream_category/',
        method: 'get',
      }),
      getModerationPresentLink: new RequestStore<Option[]>({
        client: this.client,
        url: '/catalogues/moderation_present_link/',
        method: 'get',
      }),
      getModerationThemeSpecification: new RequestStore<Option[]>({
        client: this.client,
        url: '/catalogues/moderation_theme_specification/',
        method: 'get',
      }),
      getModerationParentInfo: new RequestStore<Option[]>({
        client: this.client,
        url: '/catalogues/moderation_parent_info/',
        method: 'get',
      }),
      getFeedbackCategories: new RequestStore<Option[]>({
        client: this.client,
        url: '/catalogues/feedback_categories/',
        method: 'get',
      }),
    };

    makeAutoObservable(this, {
      client: false,
      request: false,
    });
  }

  public set dreamCategory(dreamCategory: typeof this._dreamCategory) {
    this._dreamCategory = dreamCategory;
  }

  public get dreamCategory(): typeof this._dreamCategory {
    return this._dreamCategory;
  }

  public get feedbackCategories(): typeof this._feedbackCategories {
    return this._feedbackCategories;
  }

  private setFeedbackCategories(feedbackCategories: typeof this._feedbackCategories) {
    this._feedbackCategories = feedbackCategories;
  }

  public async getFeedbackCategories() {
    return await this.request.getFeedbackCategories.request().then(() => {
      const { data, status } = this.request.getFeedbackCategories.result;

      if (!status || !data) {
        return;
      }

      this.setFeedbackCategories(data);
    });
  }

  public get dreamCategories(): typeof this._dreamCategories {
    return this._dreamCategories;
  }

  private setDreamCategories(dreamCategories: typeof this._dreamCategories) {
    this._dreamCategories = dreamCategories;
  }

  public async getDreamCategories() {
    return await this.request.getDreamCategories.request().then(() => {
      const { data, status } = this.request.getDreamCategories.result;

      if (!status || !data) {
        return;
      }

      this.setDreamCategories(data);
    });
  }
}
