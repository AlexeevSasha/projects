import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { message, Modal, Table } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { Loader } from "../../../ui/Loader";
import { validationCheckCountToPages } from "../../../common/helpers/commonValidators/validationCheckCountToPages";
import { onChangeDataTable, onChangePaginationTable } from "../../../common/helpers/tablesPropsHelpers";
// eslint-disable-next-line max-len
import { generateColumnsNotificationsAwait } from "../../../ui/tableColumnsGenerator/users/userNotifications/generateColumnsNotificationsAwait";
import { StateType, useAppDispatch } from "../../../core/redux/store";
import type { INotificationFilters, TUnionNotification } from "../../../api/dto/users/INotificationAwait";
import { deleteNotificationAwait, getNotificationsAwait } from "../../../modules/usersNotifications/notificationsActionAsync";
import { usersNotificationsSelectorEntities } from "../../../modules/usersNotifications/usersNotificationsSelector";
import { NotificationDescription } from "./modal/NotificationDescription";
import { NotificationForm } from "./forms/NotificationForm";
import { validationDataPresent } from "../../../common/helpers/commonValidators/validationDataPresent";

interface IProps {
  access: boolean;
  isHistory: boolean;
  setShowForm?: Function;
  showForm?: null | { type: string };
  cities: { value: string; label: string }[];
}

export const NotificationsTable = ({ access, isHistory, setShowForm, showForm, cities }: IProps) => {
  const [filterValues, setFilterValues] = useState<INotificationFilters>({
    sorting: "",
    pagination: 1
  });
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [showDescription, setShowDescription] = useState<TUnionNotification | undefined>();
  const { count, isLoading } = useSelector((state: StateType) => state.usersNotifications);
  const allNotificationsAwait = useSelector(usersNotificationsSelectorEntities);

  const showDeleteModal = (entity: TUnionNotification) => {
    if (!validationDataPresent(entity.sendTime)) {
      Modal.confirm({
        title: t("common.modal.title") + " " + t("common.modal.delete") + "?",
        maskClosable: true,
        content: t("users.notifications.delete"),
        okText: t("common.buttonsText.confirm"),
        cancelText: t("common.buttonsText.cancel"),
        onOk: () => {
          dispatch(deleteNotificationAwait(entity.id)).then(() => dispatch(getNotificationsAwait({ filters: filterValues, isHistory })));
        }
      });
    } else {
      message.error(t("validations.dateDeleteNotificationError"));
    }
  };

  const showFormNotification = (notification = null) => {
    setShowForm?.(notification);
  };

  const showDescriptionNotification = (notification?: TUnionNotification) => {
    setShowDescription(notification);
  };

  useEffect(() => {
    dispatch(getNotificationsAwait({ filters: filterValues, isHistory }));
  }, [filterValues.pagination, filterValues.sorting]);

  useEffect(() => {
    validationCheckCountToPages(count, filterValues.pagination, setFilterValues);
  }, [count]);

  const columns = generateColumnsNotificationsAwait(
    access,
    {
      showDeleteModal,
      showDescriptionNotification,
      showFormNotification,
      translation: t
    },
    isHistory
  );

  return (
    <>
      {isLoading && <Loader />}
      <Table
        columns={columns}
        dataSource={allNotificationsAwait}
        onChange={(pagination, filters, sorter: SorterResult<TUnionNotification> | SorterResult<TUnionNotification>[]) =>
          onChangeDataTable<TUnionNotification, INotificationFilters>(pagination, sorter, filterValues, setFilterValues)
        }
        pagination={onChangePaginationTable(count, filterValues.pagination)}
        rowKey={(entity) => entity.id}
        scroll={{ x: 1320 }}
        sticky
      />
      <NotificationForm
        // filterValues={filterValues}
        // isHistory={isHistory}
        notification={showForm}
        onClose={() => showFormNotification()}
        selectOptions={cities}
        multiOptions={[]}
      />
      <NotificationDescription notification={showDescription} onClose={() => showDescriptionNotification()} /* cities={cities}*/ />
    </>
  );
};
