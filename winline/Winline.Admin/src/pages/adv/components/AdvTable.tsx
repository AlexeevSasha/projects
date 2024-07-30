import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Loader } from "../../../ui/Loader";
import { useTranslation } from "react-i18next";
import { Select, Table, Modal } from "antd";
import { FiltersInputTwoSelects } from "../../../ui/customFilters/FiltersInputTwoSelects";
import debounce from "lodash/debounce";
import { onChangeDataTable, onChangePaginationTable } from "../../../common/helpers/tablesPropsHelpers";
import { bannersSelectorEntities } from "../../../modules/adv/AdvSelector";
import { deleteBannerThunk, getBannersThunk } from "../../../modules/adv/advActionAsync";
import { generateColumnsAdv } from "../../../ui/tableColumnsGenerator/generateColumnsAdv";
import { AdvForm } from "./forms/AdvForm";
import { AdvDescription } from "../modal/AdvDescription";
import { FiltersButtonBlock } from "../../../ui/commonComponents";
import type { SorterResult } from "antd/es/table/interface";
import { StateType, useAppDispatch } from "../../../core/redux/store";
import type { IAdv, IAdvFilters } from "../../../api/dto/adv/IAdv";
import type { IClub } from "../../../api/dto/IClub";
import { validationCheckCountToPages } from "../../../common/helpers/commonValidators/validationCheckCountToPages";

const { Option } = Select;

export const AdvTable = ({
  access,
  author,
  statuses,
  isWinline,
  showFormAdv,
  selectedForm,
  visible,
  projects
}: {
  access: boolean;
  author: string;
  statuses: string[];
  isWinline: boolean;
  visible: boolean;
  selectedForm: IAdv | null;
  showFormAdv: Function;
  projects: IClub[];
}) => {
  const initialFilterParams = { pagination: 1, author };

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { isLoading, count } = useSelector((state: StateType) => state.adv);
  const data = useSelector(bannersSelectorEntities);

  const [selectedDesc, setSelectedDesc] = useState<IAdv | null>(null);

  const [visibleDesc, setVisibleDesc] = useState<boolean>(false);
  const [filterValues, setFilterValues] = useState<IAdvFilters>(initialFilterParams);

  useEffect(() => {
    dispatch(getBannersThunk(filterValues));
  }, [filterValues.clubId, filterValues.name, filterValues.pagination, filterValues.sorting, filterValues.status, author]);

  useEffect(() => {
    validationCheckCountToPages(count, filterValues.pagination, setFilterValues);
  }, [count]);

  const deleteModal = (id: string) => {
    Modal.confirm({
      title: t("common.modal.title") + " " + t("common.modal.delete") + "?",
      maskClosable: true,
      content: t("adv.entity") + " " + t("common.modal.content"),
      okText: t("common.buttonsText.confirm"),
      cancelText: t("common.buttonsText.cancel"),
      onOk: () => {
        dispatch(deleteBannerThunk(id)).then(() => dispatch(getBannersThunk(filterValues)));
      }
    });
  };

  const showDescriptionAdv = (value = null) => {
    setSelectedDesc(value);
    setVisibleDesc(!visibleDesc);
  };

  const changeFilters = useCallback(
    debounce((nameField: string, value: unknown) => {
      setFilterValues((prev) => ({ ...prev, pagination: 1, [nameField]: value }));
    }, 300),
    [setFilterValues]
  );

  const resetFilters = useCallback(() => {
    setFilterValues((prev) => ({ ...initialFilterParams, sorting: prev.sorting }));
  }, [setFilterValues]);

  const columns = generateColumnsAdv(
    access,
    {
      showFormAdv,
      showDescriptionAdv,
      deleteModal,
      translation: t
    },
    isWinline
  );

  const projectOptions = useMemo(
    () =>
      projects.map((project: IClub) => (
        <Option key={project.id} value={project.id}>
          {project.clubName}
        </Option>
      )),
    [projects]
  );

  const statusesOptions = useMemo(
    () =>
      statuses.map((value: string) => (
        <Option key={value} value={value}>
          {t(`common.statuses.neutral.${value}`)}
        </Option>
      )),
    [statuses]
  );

  return (
    <>
      {isLoading ? <Loader /> : ""}
      <FiltersButtonBlock>
        <FiltersInputTwoSelects
          inputPlaceholder={t("adv.filters.placeholders.title")}
          inputName={"name"}
          firstSelectPlaceholder={t("adv.filters.placeholders.status")}
          firstSelectValue={filterValues.status}
          firstSelectName={"status"}
          firstSelectOptions={statusesOptions}
          secondSelectPlaceholder={t("common.filters.placeholders.project")}
          secondSelectValue={filterValues.clubId}
          secondSelectName={"clubId"}
          secondSelectOptions={projectOptions}
          onChange={changeFilters}
          resetFilters={resetFilters}
          isDisabledResetFilters={isLoading}
        />
        {/* {access && isWinline && (
          <Button onClick={() => showFormAdv()} type="primary" icon={<PlusOutlined />}>
            {t("common.buttonsText.create")}
          </Button>
        )} */}
        {/*TODO раскомментировать при необходимости*/}
        {/*<ExportFileButton exportFileHandler={exportFileHandler}/>*/}
      </FiltersButtonBlock>
      <Table
        rowKey={(entity) => entity.id}
        onChange={(pagination, filters, sorter: SorterResult<IAdv> | SorterResult<IAdv>[]) =>
          onChangeDataTable<IAdv, IAdvFilters>(pagination, sorter, filterValues, setFilterValues)
        }
        pagination={onChangePaginationTable(count, filterValues.pagination)}
        columns={columns}
        dataSource={data}
        scroll={{ x: 1120 }}
        sticky
      />
      <AdvForm filterValues={filterValues} data={selectedForm} visible={visible} onClose={() => showFormAdv()} />
      <AdvDescription data={selectedDesc} visible={visibleDesc} onClose={() => showDescriptionAdv()} />
    </>
  );
};

export default AdvTable;
