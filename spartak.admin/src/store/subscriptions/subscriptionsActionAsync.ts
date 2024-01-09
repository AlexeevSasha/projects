import { createAsyncThunk } from "@reduxjs/toolkit";
import { subscriptionRepository } from "../../api/subscriptionRepository";
import { validationSearchUserName } from "../../common/helpers/validators/validationSearchUserName";
import { ThunkApiType } from "../../common/interfaces/common";
import { ISubscriptionsResponse, SubscriptionEntity, SubscriptionsFilterTypes } from "common/interfaces/subscriptions";

export const getSubscriptionsData = createAsyncThunk<ISubscriptionsResponse, SubscriptionsFilterTypes>(
  "subscriptions/byFilter",
  async (filters, { rejectWithValue }) => {
    validationSearchUserName(filters.FullName);

    return await subscriptionRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }));
  }
);
export const getSubscriptionById = createAsyncThunk<SubscriptionEntity, SubscriptionEntity["Id"], ThunkApiType>(
  "subscriptions/byId",
  async (id, { rejectWithValue }) =>
    await subscriptionRepository.fetchById(id).catch((error) => rejectWithValue({ error }))
);

export const updateSubscription = createAsyncThunk<void, SubscriptionEntity, ThunkApiType>(
  "subscriptions/update",
  async (Id, { rejectWithValue }) => {
    return await subscriptionRepository.updateSubscription(Id).catch((error) => rejectWithValue({ error }));
  }
);

export const hideSubscription = createAsyncThunk<
  void,
  { id: SubscriptionEntity["Id"]; isHidden: SubscriptionEntity["IsHidden"] },
  ThunkApiType
>("banner/hide", (params, { rejectWithValue }) =>
  params.isHidden
    ? subscriptionRepository.hiddenEvent(params.id).catch((error) => rejectWithValue({ error }))
    : subscriptionRepository.publishEvent(params.id).catch((error) => rejectWithValue({ error }))
);
