import { Modal, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SorterResult } from "antd/lib/table/interface";
import { debounce } from "lodash";
import { IFilterContent } from "../../../../api/dto/content/IContent";
import { StateType, useAppDispatch } from "../../../../core/redux/store";
import { getBannerEntities } from "../../../../modules/content/banner/bannerSelector";
import { IBanner } from "../../../../api/dto/content/IBanner";
import {
  deleteBannerThunk,
  getAllBannersThunk,
  updatePublishDataBannerThunk,
  updateStatusBannerThunk
} from "../../../../modules/content/banner/bannerActionAsync";
import { Loader } from "../../../../ui/Loader";
import { onChangeDataTable, onChangePaginationTable } from "../../../../common/helpers/tablesPropsHelpers";
import { generateColumnsBanner } from "../../../../ui/tableColumnsGenerator/content/banner/generateColumnsBanner";
import { FormBanner } from "./form/FormBanner";
import { BannerDescription } from "../modal/BannerDescription";
import { useTranslation } from "react-i18next";
import { FiltersButtonBlock } from "../../../../ui/commonComponents";
import { FiltersInputWithDate } from "../../../../ui/customFilters/FiltersInputWithData";

interface IProps {
  access: boolean;
  visible: boolean;
  showBannerForm: Function;
  selectedForm: IBanner | null;
}

export default ({ access, selectedForm, showBannerForm, visible }: IProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [filterValues, setFilterValues] = useState<IFilterContent>({
    pagination: 1,
    sorting: "",
    contentStatus: "Hidden",
    contentType: "Banner",
    date: null,
    name: ""
  });

  const { count, disabledResetFilters, isLoading } = useSelector((state: StateType) => state.banner);
  const banner = useSelector(getBannerEntities);
  const [bannerDescription, setBannerDescription] = useState<IBanner | null>(null);

  const showDeleteModal = (id: string) => {
    Modal.confirm({
      title: t("common.modal.title") + " " + t("common.modal.delete") + "?",
      maskClosable: true,
      content: t("marketing.banner.entity") + " " + t("common.modal.content"),
      okText: t("common.buttonsText.confirm"),
      cancelText: t("common.buttonsText.cancel"),
      onOk: () => dispatch(deleteBannerThunk(id))
    });
  };

  useEffect(() => {
    dispatch(getAllBannersThunk({ filters: filterValues }));
  }, [
    getAllBannersThunk,
    filterValues.sorting,
    filterValues.pagination,
    filterValues.contentStatus,
    filterValues.date,
    filterValues.name,
    count
  ]);

  const showUpdateModal = (key: string, entity: IBanner) => {
    Modal.confirm({
      title: t("common.modal.title") + " " + t("common.modal.publish") + "?",
      maskClosable: true,
      content: t("marketing.banner.modal.publish"),
      okText: t("common.buttonsText.confirm"),
      cancelText: t("common.buttonsText.cancel"),
      onOk: () => {
        dispatch(updateStatusBannerThunk({ entity, status: key })).then(() => dispatch(getAllBannersThunk({ filters: filterValues })));
      }
    });
  };

  const updatePublishDataCurrentBannerWithToken = (entity: IBanner) => {
    dispatch(updatePublishDataBannerThunk(entity));
  };

  const showDescriptionBanner = (bannerDes: IBanner | null) => {
    setBannerDescription(bannerDes);
  };

  const changeFilters = useCallback(
    debounce((nameField: string, value: unknown) => {
      setFilterValues((prev) => ({ ...prev, pagination: 1, [nameField]: value }));
    }, 400),
    [setFilterValues]
  );

  const resetFilters = useCallback(() => {
    setFilterValues({ ...filterValues, name: "", contentStatus: "Hidden", date: null });
  }, [setFilterValues, filterValues]);

  const columns = generateColumnsBanner(false, access, {
    showDeleteModal,
    showBannerForm,
    showUpdateModal,
    updatePublishDataCurrentBannerWithToken,
    showDescriptionBanner,
    translation: t
  });

  return (
    <>
      {isLoading && <Loader />}
      <FiltersButtonBlock>
        <FiltersInputWithDate
          inputPlaceholder={t("marketing.banner.filters.search")}
          inputName="name"
          dateName="date"
          dateValue={filterValues.date}
          onChange={changeFilters}
          resetFilters={resetFilters}
          isDisabledResetFilters={disabledResetFilters}
        />
      </FiltersButtonBlock>
      <Table
        columns={columns}
        dataSource={banner}
        rowKey={(entity: IBanner) => entity.id}
        onChange={(pagination, filters, sorter: SorterResult<IBanner> | SorterResult<IBanner>[]) =>
          onChangeDataTable<IBanner, IFilterContent>(pagination, sorter, filterValues, setFilterValues)
        }
        pagination={onChangePaginationTable(count, filterValues.pagination)}
        scroll={{ x: 1585 }}
        sticky
      />
      <FormBanner bannerForUpdate={selectedForm} visible={visible} onClose={() => showBannerForm()} />
      <BannerDescription onClose={() => showDescriptionBanner(null)} bannerDes={bannerDescription} />
    </>
  );
};
