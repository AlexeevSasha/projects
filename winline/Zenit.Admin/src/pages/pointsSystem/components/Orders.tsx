import React, { useCallback, useEffect, useState } from "react";
import { Modal, Table, Select, message } from "antd";
import { useTranslation } from "react-i18next";
import type { Moment } from "moment";
import { debounce } from "lodash";
import type { IOrder, IBaseFilters } from "../../../api/dto/pointsSystem";
import { Loader } from "../../../ui/Loader";
import { generateColumnsOrder } from "../../../ui/tableColumnsGenerator/pointsSystem/generateColumnsOrder";
import { onChangeDataTable, onChangePaginationTable } from "../../../common/helpers/tablesPropsHelpers";
import { FiltersHeaderWithDate } from "../../../ui/customFilters/FiltersHeaderWithData";
import { ChangeOrderStatus, getOrders, getOrderStatuses } from "../../../api/requests/pointsSystem";

const { Option } = Select;

const initialFilterParams = {
  name: "",
  date: null,
  status: undefined,
  pagination: 1,
  sorting: ""
};

const Orders = ({ access }: { access: boolean }) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IOrder[]>([]);
  const [count, setCount] = useState(0);
  const [reload, setReload] = useState<boolean>(false);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [filterValues, setFilterValues] = useState<IBaseFilters<IOrder>>(initialFilterParams);

  useEffect(() => {
    getOrderStatuses().then((result) => setStatuses(result));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getOrders(filterValues)
      .then((orders) => {
        setData(orders.data);
        setCount(orders.count);
      })
      .then(() => setIsLoading(false));
  }, [filterValues, reload]);

  const changeFilters = useCallback(
    debounce((nameField: string, value: string | [Moment, Moment]) => {
      setFilterValues((prevState) => ({ ...prevState, pagination: 1, [nameField]: value }));
    }, 300),
    [setFilterValues]
  );
  const resetFilters = useCallback(() => {
    setFilterValues((prev) => ({ ...initialFilterParams, sorting: prev.sorting }));
  }, [setFilterValues]);

  const handleChangeProductOrderStatus = (order: IOrder) => {
    Modal.confirm({
      title: t("common.modal.title") + " " + t(`pointsSystem.orders.modal.${order.status.toLowerCase()}.title`) + "?",
      maskClosable: true,
      content: t(`pointsSystem.orders.modal.${order.status.toLowerCase()}.content`),
      okText: t("common.buttonsText.confirm"),
      cancelText: t("common.buttonsText.cancel"),
      onOk: async () =>
        ChangeOrderStatus(order).then(() => {
          message.success(t(`pointsSystem.orders.modal.${order.status.toLowerCase()}.success`));
          setReload(!reload);
        })
    });
  };

  const columns = generateColumnsOrder(access, {
    handleChangeProductOrderStatus,
    translation: t
  });

  return (
    <>
      {isLoading ? <Loader /> : ""}
      <FiltersHeaderWithDate
        inputPlaceholder={t("common.filters.placeholders.title")}
        inputName="name"
        selectPlaceholder={t("adv.filters.placeholders.status")}
        selectName="status"
        selectValue={filterValues.status}
        selectOptions={statuses.map((status) => (
          <Option key={status} value={status}>
            {t(`common.statuses.male.${status.toLowerCase()}`)}
          </Option>
        ))}
        dateName="date"
        dateValue={filterValues.date}
        isDisabledResetFilters={isLoading}
        onChange={changeFilters}
        resetFilters={resetFilters}
      />
      <Table
        rowKey={(entity) => entity.id}
        onChange={(pagination, filters, sorter) => onChangeDataTable(pagination, sorter, filterValues, setFilterValues)}
        pagination={onChangePaginationTable(count, filterValues.pagination)}
        columns={columns}
        dataSource={data}
        scroll={{ x: 1120 }}
        sticky
      />
    </>
  );
};

export default Orders;
