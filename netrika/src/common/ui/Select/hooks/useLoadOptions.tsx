import { useCallback } from "react";
import { errorPopup } from "../../../helpers/toast/error";
import { RegisterSettingsCheckListAction } from "../../../../module/registerSettingsCheckList/registerSettingsCheckListAction";
import { useDispatch } from "react-redux";
import { IConfiguratorValue } from "../../../interfaces/IConfiguratorValue";
import { IOrderQualityCriterion } from "../../../interfaces/order/IOrderQualityCriterion";

interface IItem {
  description: string;
  code: string;
}

interface IConstructorItem {
  value: string;
  key: string;
  fillingRule: string;
}

interface IProps {
  withPaginateConstructorApiCallback?: Function;
  withPaginateConstructorRegisterQualityCriterion?: Function;
  withPaginateApiCallback?: Function;
  withPaginateConstructorDictionary?: Function;
  fieldID?: string;
  setAsyncError: Function;
}

export const useLoadOptions = (props: IProps) => {
  const dispatch = useDispatch();
  return useCallback(
    async (searchQuery: string, loadedOptions: any, { page }: any) => {
      if (props.withPaginateConstructorApiCallback && props.fieldID) {
        try {
          const response: IConstructorItem[] =
            (await props.withPaginateConstructorApiCallback({
              pageIndex: page,
              pageSize: 15,
              search: searchQuery,
              id: props.fieldID,
            })) ?? ([] as IConstructorItem[]);
          props.setAsyncError(false);
          return {
            options: response.map((item) => ({
              label: item.value,
              value: item.key,
              fillingRule: item.fillingRule,
            })),
            hasMore: response?.length >= 15,
            additional: {
              page: page + 1,
            },
          };
        } catch (error) {
          props.setAsyncError(true);
          errorPopup(error.message);
          return {
            options: [],
            hasMore: false,
            additional: {
              page: page + 1,
            },
          };
        }
      } else if (props.withPaginateConstructorRegisterQualityCriterion && props.fieldID) {
        try {
          const response: IOrderQualityCriterion[] =
            (await props.withPaginateConstructorRegisterQualityCriterion({
              pageIndex: page,
              pageSize: 10,
              searchName: searchQuery,
              registerId: props.fieldID,
            })) ?? ([] as IConstructorItem[]);

          props.setAsyncError(false);
          dispatch(RegisterSettingsCheckListAction.getQualityCurrentCriterion({ result: response }));
          return {
            options: response.map((item) => ({ label: item.name, value: item.id })),
            hasMore: response.length >= 10,
            additional: {
              page: page + 1,
            },
          };
        } catch (error) {
          props.setAsyncError(true);
          errorPopup(error.message);
          return {
            options: [],
            hasMore: false,
            additional: {
              page: page + 1,
            },
          };
        }
      } else if (props.withPaginateConstructorDictionary && props.fieldID) {
        const response: IConfiguratorValue[] =
          (await props.withPaginateConstructorDictionary?.({
            pageIndex: page,
            pageSize: 15,
            search: searchQuery,
            id: props.fieldID,
          })) ?? ([] as IItem[]);
        return {
          options: response.map((item) => ({ label: item.description, value: item.code })),
          hasMore: response.length >= 15,
          additional: {
            page: page + 1,
          },
        };
      } else {
        const response: IConfiguratorValue[] =
          (await props.withPaginateApiCallback?.({
            pageIndex: page,
            pageSize: 15,
            search: searchQuery,
            id: props.fieldID,
          })) ?? ([] as IItem[]);
        return {
          options: response.map((item) => ({ label: item.description, value: item.code })),
          hasMore: response.length >= 15,
          additional: {
            page: page + 1,
          },
        };
      }
    },
    [props, dispatch]
  );
};
