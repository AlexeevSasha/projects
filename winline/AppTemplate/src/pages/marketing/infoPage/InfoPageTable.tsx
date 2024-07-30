import { useCallback, useEffect, useState } from "react";
import { Button, Modal, Table } from "antd";
import { useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { SorterResult } from "antd/lib/table/interface";
import { debounce } from "lodash";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { getInfoPageEntities } from "../../../modules/content/infoPage/infoPage/infoPageSelector";
import { IInfoPage } from "../../../api/dto/content/IInfoPage";
import { IFilterContent } from "../../../api/dto/content/IContent";
import { StateType, useAppDispatch } from "../../../core/redux/store";
import { getAllInfoPageThunk, removeInfoPageThunk } from "../../../modules/content/infoPage/infoPage/infoPageActionAsync";
import { infoPage } from "../../../modules/content/infoPage/infoPage/infoPageSlice";
import { routePaths } from "../../../common/constants/routePaths";
import { generateColumnsInfoPage } from "../../../ui/tableColumnsGenerator/content/infoPage/generateColumnsInfoPage";
import { Loader } from "../../../ui/Loader";
import { FiltersButtonBlock } from "../../../ui/commonComponents";
import { FiltersHeaderInputDate } from "../../../ui/customFilters/FiltersHeaderInputDate";
import { onChangeDataTable, onChangePaginationTable } from "../../../common/helpers/tablesPropsHelpers";
import { InfoPageDescription } from "./modal/InfoPageDescription";

export const InfoPageTable = ({ access }: { access: boolean }) => {
  const { t } = useTranslation();
  const [infoPageFilters, setInfoPageFilters] = useState<IFilterContent>({
    pagination: 1,
    sorting: "",
    contentType: "InfoPage",
    name: "",
    date: null
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state: StateType) => state.infoPage.isLoading);
  const infoPageCount = useSelector((state: StateType) => state.infoPage.count);
  const infoPages = useSelector(getInfoPageEntities);
  const [infoPageDescription, setInfoPageDescription] = useState<IInfoPage | null>(null);

  const changeFilters = useCallback(
    debounce((nameField: string, value: unknown) => {
      setInfoPageFilters((prev) => ({ ...prev, pagination: 1, [nameField]: value }));
    }, 400),
    [setInfoPageFilters]
  );

  const resetFilters = useCallback(() => {
    setInfoPageFilters({ ...infoPageFilters, name: "", date: null });
  }, [setInfoPageFilters, infoPageFilters]);

  useEffect(() => {
    dispatch(getAllInfoPageThunk(infoPageFilters));
  }, [
    getAllInfoPageThunk,
    infoPageFilters.sorting,
    infoPageFilters.pagination,
    infoPageFilters.contentType,
    infoPageFilters.name,
    infoPageFilters.date,
    infoPageCount
  ]);

  const showFormInfoPage = (dataInfoPage: IInfoPage) => {
    dispatch(infoPage.actions.setCurrentInfoPage({ infoPage: dataInfoPage }));
    navigate(routePaths.tableContent.marketing.infoPages.form);
  };

  const showDescriptionInfoPage = (infoPageDes: IInfoPage | null) => {
    setInfoPageDescription(infoPageDes);
  };

  const showDeleteModal = (id: string) => {
    Modal.confirm({
      title: t("common.modal.title") + " " + t("common.modal.delete") + "?",
      maskClosable: true,
      content: t("marketing.infoPages.entity") + " " + t("common.modal.contentFemale"),
      okText: t("common.buttonsText.confirm"),
      cancelText: t("common.buttonsText.cancel"),
      onOk: () => dispatch(removeInfoPageThunk(id))
    });
  };

  const columns = generateColumnsInfoPage(access, {
    showFormInfoPage,
    showDeleteModal,
    showDescriptionInfoPage,
    translation: t
  });

  return (
    <>
      {isLoading && <Loader />}
      <FiltersButtonBlock>
        <FiltersHeaderInputDate
          inputPlaceholder={t("marketing.infoPages.filters.search")}
          inputName="name"
          dateName="date"
          dateValue={infoPageFilters.date}
          onChange={changeFilters}
          resetFilters={resetFilters}
          isDisabledResetFilters={false}
        />
        {access ? (
          <NavLink to={routePaths.tableContent.marketing.infoPages.form}>
            <Button type="primary" icon={<PlusOutlined />}>
              {t("common.buttonsText.create")}
            </Button>
          </NavLink>
        ) : null}
      </FiltersButtonBlock>
      <Table
        columns={columns}
        dataSource={infoPages}
        rowKey={(entity: IInfoPage) => entity.id}
        onChange={(pagination, filters, sorter: SorterResult<IInfoPage> | SorterResult<IInfoPage>[]) =>
          onChangeDataTable<IInfoPage, IFilterContent>(pagination, sorter, infoPageFilters, setInfoPageFilters)
        }
        pagination={onChangePaginationTable(infoPageCount, infoPageFilters.pagination)}
        scroll={{ x: 1585 }}
        sticky
      />
      <InfoPageDescription onClose={() => showDescriptionInfoPage(null)} infoPageDes={infoPageDescription} />
    </>
  );
};
