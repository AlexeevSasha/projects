import type { AxiosInstance } from 'axios';
import { enableStaticRendering } from 'mobx-react';
import { FeatureFlagsStore } from '@app/store/FeatureFlagsStore';
import { LoaderStore } from '@app/store/LoaderStore';
import { MenuItemsStore } from '@app/store/MenuItemsStore';
import { ApplicationStore } from '@entities/application';
import { CatalogueStore } from '@entities/catalogue';
import { UserStore } from '@entities/user';
import { ExecutorStore } from '@features/application/executor';
import { PartnerStore } from '@features/application/partner';
import { TrusteeStore } from '@features/application/trustee';
import { AuthStore } from '@features/auth';
import { DadataStore } from '@features/dadata';
import { ModeratorStore } from '@features/moderator';
import { axiosInstance } from '@shared/api';
import { TokenStore, UiStore } from '@shared/model';
import { ModalStore } from './ModalStore';

export class RootStore {
  featureFlags: FeatureFlagsStore;
  mainLoaderS: LoaderStore;
  $axios: AxiosInstance;
  tokenS: TokenStore;
  uiS: UiStore;
  dadataS: DadataStore;
  userS: UserStore;
  catalogueS: CatalogueStore;
  menuItemsS: MenuItemsStore;
  authS: AuthStore;
  applicationS: ApplicationStore;
  executorS: ExecutorStore;
  partnerS: PartnerStore;
  moderatorS: ModeratorStore;
  trusteeS: TrusteeStore;
  modalS: ModalStore;

  constructor(initialData: RootStore) {
    this.mainLoaderS = new LoaderStore();
    this.tokenS = new TokenStore();
    this.$axios = axiosInstance(this.tokenS);
    this.uiS = new UiStore();
    this.modalS = new ModalStore();

    this.featureFlags = new FeatureFlagsStore({
      axiosInstance: this.$axios,
    });
    this.userS = new UserStore({
      axiosInstance: this.$axios,
      tokenS: this.tokenS,
      initialData: initialData?.userS,
    });
    this.catalogueS = new CatalogueStore({
      initialData: initialData?.catalogueS,
      axiosInstance: this.$axios,
    });
    this.dadataS = new DadataStore({
      initialData: initialData?.dadataS,
      axiosInstance: this.$axios,
    });
    this.menuItemsS = new MenuItemsStore();
    this.authS = new AuthStore({
      axiosInstance: this.$axios,
      userS: this.userS,
      tokenS: this.tokenS,
    });
    this.applicationS = new ApplicationStore({
      axiosInstance: this.$axios,
    });
    this.executorS = new ExecutorStore({
      axiosInstance: this.$axios,
      applicationS: this.applicationS,
      userS: this.userS,
    });
    this.partnerS = new PartnerStore({
      axiosInstance: this.$axios,
      applicationS: this.applicationS,
    });
    this.trusteeS = new TrusteeStore({
      axiosInstance: this.$axios,
      applicationS: this.applicationS,
    });
    this.moderatorS = new ModeratorStore({
      axiosInstance: this.$axios,
      applicationS: this.applicationS,
    });
  }
}

let store: RootStore | null = null;

export const initRootStore = (initialData: RootStore) => {
  const isServer = typeof window === 'undefined';
  enableStaticRendering(isServer);

  if (isServer) {
    return new RootStore(initialData);
  }
  if (store === null) {
    store = new RootStore(initialData);
    store.featureFlags.fetchFeatureFlags();
  }

  return store;
};
