import React, { useEffect, useState } from "react";
import { message, Table } from "antd";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../core/redux/store";
import { Loader } from "../../../ui/Loader";
import { generateColumnsLoyaltyProgram } from "../../../ui/tableColumnsGenerator/pointsSystem/generateColumnsLoyaltyProgram";
import { onChangeDataTable, onChangePaginationTable } from "../../../common/helpers/tablesPropsHelpers";
import LoyaltyForm from "./modal/LoyaltyForm";
import LoyaltyDescription from "./modal/LoyaltyDescription";
import { exportFile } from "../../../modules/exportFiles/exportFiles";
import type { ILoyaltyProgram, ILoyaltyProgramFilters } from "../../../api/dto/pointsSystem";
import { getLoyaltyPrograms, updateLoyaltyPrograms } from "../../../api/requests/pointsSystem";
import { getFormatedDate } from "../../../common/helpers/getFormatedDate";

const Loyalty = ({ access }: { access: boolean }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ILoyaltyProgram[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleDesc, setVisibleDesc] = useState<boolean>(false);
  const [selected, setSelected] = useState<ILoyaltyProgram | null>(null);
  const [reload, setReload] = useState<boolean>(false);
  const [filterValues, setFilterValues] = useState<ILoyaltyProgramFilters>({
    pagination: 1
  });

  useEffect(() => {
    setIsLoading(true);
    getLoyaltyPrograms(filterValues)
      .then((result) => setData(result.data))
      .then(() => setIsLoading(false));
  }, [reload]);

  const showForm = (value = null) => {
    setVisible(!visible);
    setTimeout(() => setSelected(value), value ? 0 : 100);
  };

  const handleSave = (payload: ILoyaltyProgram) => {
    setIsLoading(true);
    updateLoyaltyPrograms(payload).then(() => {
      setVisible(false);
      message.success(t("success.update.loyalty"));
      setReload(!reload);
    });
  };

  const showDescription = (value = null) => {
    setVisibleDesc(!visibleDesc);
    setSelected(value);
  };

  const downloadReport = (report: ILoyaltyProgram) => {
    dispatch(
      exportFile({
        path: `${process.env.REACT_APP_MOBILE}/odata/LoyaltyProgram?exportType=csv&$filter=id eq ${report.id}`,
        fileName: `${t(`pointsSystem.loyalty.${report.type}`)}--${getFormatedDate(report.startDate)}`
      })
    ).then(() => message.success(t("successExport")));
  };

  const columns = generateColumnsLoyaltyProgram(access, {
    showForm,
    showDescription,
    downloadReport,
    translation: t
  });

  return (
    <>
      {isLoading ? <Loader /> : ""}
      <Table
        rowKey={(entity) => entity.id}
        onChange={(pagination, filters, sorter) => onChangeDataTable(pagination, sorter, filterValues, setFilterValues)}
        pagination={onChangePaginationTable(data?.length, filterValues.pagination)}
        columns={columns}
        dataSource={data}
        scroll={{ x: 1120 }}
        sticky
      />
      <LoyaltyForm data={selected} visible={visible} onClose={showForm} onSave={handleSave} />
      <LoyaltyDescription data={selected} visible={visibleDesc} onClose={() => showDescription()} />
    </>
  );
};

export default Loyalty;
