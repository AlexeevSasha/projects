import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StateType, useAppDispatch } from "../../core/redux/store";
import { Loader } from "../../ui/Loader";
import { useTranslation } from "react-i18next";
import { Button, Card, Table, message, Modal } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { matchesSelectorEntities } from "../../modules/matches/matchesSelector";
import { getMatchesThunk } from "../../modules/matches/matchesActionAsync";
import { IMatch, IMatchFilters } from "../../api/dto/IMatch";
import debounce from "lodash/debounce";
import { SorterResult } from "antd/es/table/interface";
import { onChangeDataTable, onChangePaginationTable } from "../../common/helpers/tablesPropsHelpers";
import { MatchForm } from "./components/forms/MatchForm";
import { generateColumnsMatches } from "../../ui/tableColumnsGenerator/matches/generateColumnsMatches";
import { ReloadStatisticMatches, SendTicketsNotification } from "../../api/requests/matches";
import { ContentStyled, HeaderStyled, TitleStyled, FiltersButtonBlock } from "../../ui/commonComponents";
import { FiltersHeaderTwoInputsDate } from "../../ui/customFilters/FiltersHeaderTwoInputsDate";
import { validationCheckCountToPages } from "../../common/helpers/commonValidators/validationCheckCountToPages";
import moment from "moment";

export const MatchesTable = ({ access }: { access: boolean }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { isLoading, count } = useSelector((state: StateType) => state.matches);
  const matches = useSelector(matchesSelectorEntities);

  const [visible, setVisible] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [idEntityChanged, setIdEntityChanged] = useState<number | null>(null);
  const [filterValues, setFilterValues] = useState<IMatchFilters>({
    homeTeamName: undefined,
    guestTeamName: undefined,
    sorting: "",
    pagination: 1,
    date: null
  });

  useEffect(() => {
    dispatch(getMatchesThunk(filterValues));
  }, [filterValues.homeTeamName, filterValues.guestTeamName, filterValues.date, filterValues.sorting, filterValues.pagination]);

  useEffect(() => {
    validationCheckCountToPages(count, filterValues.pagination, setFilterValues);
  }, [count]);

  const showForm = (id = null) => {
    setIdEntityChanged(id);
    setVisible(!visible);
  };
  const handleSendTicketsNotification = (id: string) => {
    Modal.confirm({
      title: t("matches.titleModal"),
      maskClosable: true,
      content: t("matches.contentModal"),
      okText: t("common.buttonsText.confirm"),
      cancelText: t("common.buttonsText.cancel"),
      onOk: () => {
        SendTicketsNotification(id).then(() => {
          message.success(t("matches.successMessage"));
          dispatch(getMatchesThunk(filterValues));
        });
      }
    });
  };

  const changeFilters = useCallback(
    debounce((nameField: string, value: unknown) => {
      setFilterValues((prev) => ({ ...prev, pagination: 1, [nameField]: value }));
    }, 300),
    [setFilterValues]
  );

  const resetFilters = useCallback(() => {
    setFilterValues((prev) => ({ ...prev, homeTeamName: undefined, guestTeamName: undefined, pagination: 1, date: null }));
  }, [setFilterValues]);

  const columns = generateColumnsMatches(access, {
    showForm,
    handleSendTicketsNotification,
    translation: t
  });

  const reloadStatistics = () => {
    setReload(true);
    ReloadStatisticMatches()
      .then(() => {
        dispatch(getMatchesThunk(filterValues));
        setReload(false);
        message.info(t("matches.reloadStatistics"));
      })
      .catch(() => setReload(false));
  };

  return (
    <>
      {isLoading ? <Loader /> : ""}
      <HeaderStyled>
        <TitleStyled level={4}>{t("matches.title")}</TitleStyled>
      </HeaderStyled>
      <ContentStyled>
        <Card>
          <FiltersButtonBlock>
            <FiltersHeaderTwoInputsDate
              inputName="homeTeamName"
              inputPlaceholder={t("matches.filters.placeholders.homeTeamName")}
              secondInputName="guestTeamName"
              secondInputPlaceholder={t("matches.filters.placeholders.guestTeamName")}
              dateName="date"
              dateValue={filterValues.date}
              disabledDate={(current) => {
                return current && current <= moment().subtract(2, "days");
              }}
              isDisabledResetFilters={isLoading}
              onChange={changeFilters}
              resetFilters={resetFilters}
            />
            {access && (
              <Button onClick={reloadStatistics} type="primary" icon={<ReloadOutlined />} loading={reload}>
                {t("common.buttonsText.refresh")}
              </Button>
            )}
          </FiltersButtonBlock>
          <Table
            rowKey={(entity) => entity.id}
            onChange={(pagination, filters, sorter: SorterResult<IMatch> | SorterResult<IMatch>[]) =>
              onChangeDataTable<IMatch, IMatchFilters>(pagination, sorter, filterValues, setFilterValues)
            }
            pagination={onChangePaginationTable(count, filterValues.pagination)}
            columns={columns}
            dataSource={matches}
            scroll={{ x: 1120 }}
            sticky
          />
        </Card>
      </ContentStyled>
      <MatchForm idEntityChanged={idEntityChanged} visible={visible} onClose={showForm} />
    </>
  );
};
