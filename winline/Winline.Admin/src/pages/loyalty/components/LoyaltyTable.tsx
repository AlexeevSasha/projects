import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card, Layout, message, Modal, Select, Table, Typography } from "antd";
import debounce from "lodash/debounce";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Loader } from "../../../ui/Loader";
import { onChangeDataTable, onChangePaginationTable } from "../../../common/helpers/tablesPropsHelpers";
import { SorterResult } from "antd/lib/table/interface";
import { theme } from "../../../assets/theme/theme";
import { StateType, useAppDispatch } from "../../../core/redux/store";
import { useTranslation } from "react-i18next";
import { generateColumnLoyalty } from "../../../ui/tableColumnsGenerator/loyalty/generateColumnLoyalty";
import type { ILoyalty, ILoyaltyFilters } from "../../../api/dto/loyalty/ILoyalty";
import { getLoyaltyEntities } from "../../../modules/loyalty/loyaltySelector";
import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { routePaths } from "../../../common/constants/routePaths";
import { deleteLoyaltyThunk, endLoyaltyThunk, getAllLoyalties, getLoyaltyTypeThunk } from "../../../modules/loyalty/loyaltyActionAsync";
import { IClub } from "../../../api/dto/IClub";
import { getClubsThunk } from "../../../modules/commons/commonsActionAsync";
import { getAvailability, getLoyaltyStatuses } from "../../../api/requests/loyalty";
import { exportFile } from "../../../modules/exportFiles/exportFiles";
import { FiltersButtonBlock } from "../../../ui/commonComponents";
import { FiltersHeaderInputTwoSelectsDate } from "../../../ui/customFilters/FiltersHeaderInputTwoSelectsDate";
import { LoyaltyDescription } from "./modal/LoyaltyDescription";
import { validationCheckCountToPages } from "../../../common/helpers/commonValidators/validationCheckCountToPages";
import { formsConstantsValidation } from "../../../common/constants/formsConstantsValidation";
import { getFormatedDate } from "../../../common/helpers/getFormatedDate";

const { Header, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

export const LoyaltyTable = ({ access }: { access: boolean }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [statuses, setStatuses] = useState([]);
  const [descriptionLoyalty, setDescriptionLoyalty] = useState<ILoyalty | undefined>();
  const [availability, setAvailability] = useState([]);
  const [filterValues, setFilterValues] = useState<ILoyaltyFilters>({
    name: "",
    clubId: "",
    date: null,
    status: "",
    pagination: 1,
    sorting: ""
  });

  const clubs = useSelector((state: StateType) => state.commons.clubs);
  const { count, isLoading } = useSelector((state: StateType) => state.loyalty);

  const allLoyalties = useSelector(getLoyaltyEntities);

  const loyaltyTypes = useSelector((state: StateType) => state.loyalty.type);

  useEffect(() => {
    getAvailability().then((value) => setAvailability(value));
  }, []);

  const showDescriptionLoyalty = (loyalty?: ILoyalty) => {
    setDescriptionLoyalty(loyalty);
  };

  const showEntityStepper = (data?: ILoyalty) => {
    localStorage.setItem("loyalty", JSON.stringify(data));
  };

  const exportFileHandler = (fileExtension: string, loyaltyId: string) => {
    dispatch(
      exportFile({
        path: `${process.env.REACT_APP_ADMIN}/Loyalty/Report?exportType=${fileExtension}&loyaltyId=${loyaltyId}`,
        fileName:
          `${allLoyalties.find((item) => item.id === loyaltyId)?.name}` +
          "_" +
          `${allLoyalties.find((item) => item.id === loyaltyId)?.club.clubName}` +
          "_" +
          `${getFormatedDate(allLoyalties.find((item) => item.id === loyaltyId)?.startDate, formsConstantsValidation.dateFormat)}`
      })
    ).then(() => message.success(t("successExport")));
  };

  useEffect(() => {
    validationCheckCountToPages(count, filterValues.pagination, setFilterValues);
  }, [count]);

  useEffect(() => {
    getLoyaltyStatuses().then((value) => setStatuses(value));
    dispatch(getAllLoyalties(filterValues));
  }, [filterValues.clubId, filterValues.date, filterValues.name, filterValues.pagination, filterValues.sorting, filterValues.status]);

  const changeFilters = useCallback(
    debounce((nameField: string, value: unknown) => {
      setFilterValues((prev) => ({ ...prev, pagination: 1, [nameField]: value }));
    }, 300),
    [setFilterValues]
  );

  useEffect(() => {
    dispatch(getClubsThunk());
    dispatch(getLoyaltyTypeThunk());
  }, []);

  const resetFilters = useCallback(() => {
    setFilterValues((prev) => ({
      ...prev,
      name: "",
      clubId: "",
      date: null,
      status: undefined,
      pagination: 1
    }));
  }, [setFilterValues]);

  const showStopModal = (entity: ILoyalty) => {
    Modal.confirm({
      icon: <QuestionCircleOutlined />,
      title: t("loyalty.table.modal.title"),
      maskClosable: true,
      content: t("loyalty.table.modal.content"),
      okText: t("common.buttonsText.stop"),
      cancelText: t("common.buttonsText.cancel"),
      onOk: () => {
        dispatch(endLoyaltyThunk(entity.id)).then(() => dispatch(getAllLoyalties(filterValues)));
      }
    });
  };
  const showDeleteModal = (entity: ILoyalty) => {
    Modal.confirm({
      title: t("common.modal.title") + " " + t("common.modal.delete") + "?",
      maskClosable: true,
      content: t("loyalty.table.modal.delete"),
      okText: t("common.buttonsText.confirm"),
      cancelText: t("common.buttonsText.cancel"),
      onOk: () => {
        dispatch(deleteLoyaltyThunk(entity.id)).then(() => dispatch(getAllLoyalties(filterValues)));
      }
    });
  };

  const columns = generateColumnLoyalty({
    showDescriptionLoyalty,
    showEntityStepper,
    showDeleteModal,
    translation: t,
    access,
    types: loyaltyTypes,
    clubs: clubs,
    navigate,
    showStopModal,
    saveReport: exportFileHandler
  });

  const statusesOptions = useMemo(
    () =>
      statuses.map((value: string) => (
        <Option key={value} value={value}>
          {t(`common.statuses.female.${value}`)}
        </Option>
      )),
    [statuses]
  );

  const projectOptions = useMemo(
    () =>
      clubs.map((project: IClub) => (
        <Option key={project.id} value={project.id}>
          {project.clubName}
        </Option>
      )),
    [clubs]
  );

  return (
    <>
      {isLoading && <Loader />}
      <HeaderContent>
        <CardTitle level={4}>{t("loyalty.table.title")}</CardTitle>
      </HeaderContent>

      <Content
        style={{
          padding: 24,
          margin: 0
        }}
      >
        <Card>
          <FiltersButtonBlock>
            <FiltersHeaderInputTwoSelectsDate
              inputPlaceholder={t("common.filters.placeholders.title")}
              inputName={"name"}
              firstSelectPlaceholder={t("common.filters.placeholders.project")}
              firstSelectValue={filterValues.clubId ? filterValues.clubId : undefined}
              firstSelectName={"clubId"}
              firstSelectOptions={projectOptions}
              secondSelectPlaceholder={t("loyalty.filters.placeholders.status.title")}
              secondSelectValue={filterValues.status ? filterValues.status : undefined}
              secondSelectName={"status"}
              secondSelectOptions={statusesOptions}
              onChange={changeFilters}
              resetFilters={resetFilters}
              isDisabledResetFilters={isLoading}
              dateName={"date"}
              dateValue={filterValues.date}
            />
            {access && (
              <NavLink to={routePaths.tableContent.loyalty.newLoyalty}>
                <Button type="primary" icon={<PlusOutlined />}>
                  {t("common.buttonsText.create")}
                </Button>
              </NavLink>
            )}
          </FiltersButtonBlock>
          <Table
            columns={columns}
            dataSource={allLoyalties}
            rowKey={(entity) => entity.id}
            onChange={(pagination, filters, sorter: SorterResult<ILoyalty> | SorterResult<ILoyalty>[]) =>
              onChangeDataTable<ILoyalty, ILoyaltyFilters>(pagination, sorter, filterValues, setFilterValues)
            }
            pagination={onChangePaginationTable(count, filterValues.pagination)}
            scroll={{ x: 1120 }}
            sticky
          />
        </Card>
        <LoyaltyDescription availability={availability} data={descriptionLoyalty} onClose={() => showDescriptionLoyalty()} />
      </Content>
    </>
  );
};

const HeaderContent = styled(Header)`
  padding: 0 24px;
  background-color: ${theme.colors.white};
  flex-basis: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardTitle = styled(Title)`
  margin-bottom: 0 !important;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px !important;
`;
