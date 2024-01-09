import { BaseApiService } from "./BaseApiService";
import i18n from "i18next";
import { SubscriptionEntity, SubscriptionsFilterTypes } from "common/interfaces/subscriptions";

class SubscriptionRepository extends BaseApiService {
  constructor() {
    super("match");
  }

  fetchByFilter = async (filters: SubscriptionsFilterTypes) => {
    const locale = i18n.language === "ru" ? "Ru" : "En";

    const { value: subscriptions, ["@odata.count"]: count } = await this.get(
      `odata/Event?$count=true&$skip=${filters.pagination * filters.pageSize - filters.pageSize}&$top=${
        filters.pageSize
      }&$orderby=${
        filters.sorting
      }&$filter=Type eq 'Subscription' and contains(tolower(FullName/${locale}), '${filters.FullName.toLowerCase()}')`
    );

    return { subscriptions, count };
  };

  fetchById = async (id: SubscriptionEntity["Id"]) => {
    const { value } = await this.get(`odata/Event?$filter=Id eq ${id}`);

    return value[0];
  };

  updateSubscription = async (subscription: SubscriptionEntity) =>
    await this.post("Event/Update", JSON.stringify(subscription));

  hiddenEvent = async (eventId: string) => {
    await this.get(`Event/HideEvent/${eventId}`);
  };

  publishEvent = async (eventId: string) => {
    await this.get(`Event/PublishEvent/${eventId}`);
  };
}

export const subscriptionRepository = new SubscriptionRepository();
