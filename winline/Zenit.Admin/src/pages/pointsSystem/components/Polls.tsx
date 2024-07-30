import React, { useCallback, useEffect, useState } from "react";
import { Modal, Table, Select, Button, Dropdown, Menu, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../core/redux/store";
import { debounce } from "lodash";
import type { Moment } from "moment";
import { Loader } from "../../../ui/Loader";
import { generateColumnsPoll } from "../../../ui/tableColumnsGenerator/pointsSystem/generateColumnsPoll";
import { onChangeDataTable, onChangePaginationTable } from "../../../common/helpers/tablesPropsHelpers";
import { FiltersHeaderWithDate } from "../../../ui/customFilters/FiltersHeaderWithData";
import { FiltersButtonBlock } from "../../../ui/commonComponents";
import PollDescription from "./modal/PollDescription";
import PollForm from "./modal/PollForm";
import PollResults from "./modal/PollResults";
import { exportFile } from "../../../modules/exportFiles/exportFiles";
import type { IPoll, IBaseFilters } from "../../../api/dto/pointsSystem";
import {
  createPoll,
  deletePoll,
  getPollById,
  getPolls,
  getPollStatuses,
  setResultPoll,
  updatePoll
} from "../../../api/requests/pointsSystem";
import { validationCheckCountToPages } from "../../../common/helpers/commonValidators/validationCheckCountToPages";
import { getFormatedDate } from "../../../common/helpers/getFormatedDate";

const menu = (showTypeForm: (info?: { type: IPoll["type"] } | null) => void) => (
  <Menu>
    <Menu.Item onClick={() => showTypeForm({ type: "MatchWinner" })} key="MatchWinner">
      {i18next.t("pointsSystem.poll.MatchWinner")}
    </Menu.Item>
    <Menu.Item onClick={() => showTypeForm({ type: "StartingFive" })} key="StartingFive">
      {i18next.t("pointsSystem.poll.StartingFive")}
    </Menu.Item>
    <Menu.Item onClick={() => showTypeForm({ type: "FiveEvents" })} key="FiveEvents">
      {i18next.t("pointsSystem.poll.FiveEvents")}
    </Menu.Item>
  </Menu>
);

const { Option } = Select;

const initialFilterParams = {
  name: "",
  date: null,
  status: undefined,
  pagination: 1,
  sorting: ""
};

const Polls = ({ access }: { access: boolean }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IPoll[]>([]);
  const [count, setCount] = useState(0);

  const [visible, setVisible] = useState<boolean>(false);
  const [visibleDesc, setVisibleDesc] = useState<boolean>(false);
  const [selected, setSelected] = useState<Partial<IPoll> | null | undefined>(null);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [visibleResult, setVisibleResult] = useState<boolean>(false);
  const [results, setResults] = useState<IPoll>();
  const [reload, setReload] = useState<boolean>(false);
  const [filterValues, setFilterValues] = useState<IBaseFilters<IPoll>>(initialFilterParams);

  useEffect(() => {
    setIsLoading(true);
    getPolls(filterValues)
      .then((polls) => {
        setData(polls.data);
        setCount(polls.count);
        if (statuses.length == 0) {
          getPollStatuses().then((result) => setStatuses(result));
        }
      })
      .then(() => setIsLoading(false));
  }, [filterValues, reload]);

  useEffect(() => {
    validationCheckCountToPages(count, filterValues.pagination, setFilterValues);
  }, [count]);

  const changeFilters = useCallback(
    debounce((nameField: string, value: string | [Moment, Moment]) => {
      setFilterValues((prevState) => ({ ...prevState, pagination: 1, [nameField]: value }));
    }, 300),
    [filterValues.name, filterValues.status, filterValues.date, filterValues.pagination, filterValues.sorting]
  );
  const resetFilters = useCallback(() => {
    setFilterValues((prev) => ({ ...initialFilterParams, sorting: prev.sorting }));
  }, [setFilterValues]);

  const deleteModal = (id: string) => {
    Modal.confirm({
      title: t("common.modal.title") + " " + t("common.modal.delete") + "?",
      maskClosable: true,
      content: t("pointsSystem.poll.modal.content.delete"),
      okText: t("common.buttonsText.confirm"),
      cancelText: t("common.buttonsText.cancel"),
      onOk: async () => {
        setIsLoading(true);
        deletePoll(id)
          .then(() => {
            message.success(t("success.delete.poll"));
            getPolls(filterValues).then((polls) => {
              setData(polls.data);
              setCount(polls.count);
            });
            setIsLoading(false);
          })
          .catch(() => setIsLoading(false));
      }
    });
  };

  const handleSetResults = (poll: IPoll) => {
    setVisibleResult(true);
    setResults(poll);
  };

  const showForm = (value?: Partial<IPoll> | null) => {
    if (value?.id) {
      setIsLoading(true);
      getPollById(value.id).then((result) => {
        setSelected(result);
        setVisible(true);
        setIsLoading(false);
      });
    } else {
      setSelected(value);
      setVisible(true);
    }
  };

  const showDescription = (value = null) => {
    setVisibleDesc(!visibleDesc);
    setSelected(value);
  };

  const handleClose = () => {
    setSelected(null);
    setVisible(false);
    setVisibleDesc(false);
    setVisibleResult(false);
  };

  const handleSave = (payload: IPoll, update: boolean = false) => {
    setIsLoading(true);
    if (update) {
      updatePoll(payload).then(() => {
        setVisible(false);
        message.success(t("success.update.poll"));
        setReload(!reload);
      });
    } else {
      createPoll(payload).then(() => {
        setVisible(false);
        message.success(t("success.create.poll"));
        setReload(!reload);
      });
    }
  };

  const handleResultSave = (payload: Partial<IPoll>) => {
    Modal.confirm({
      title: t("common.modal.title") + " " + t("common.buttonsText.save").toLowerCase() + "?",
      maskClosable: true,
      content: t("pointsSystem.poll.modal.content.editResults"),
      okText: t("common.buttonsText.confirm"),
      cancelText: t("common.buttonsText.cancel"),
      onOk: () => {
        setResultPoll(payload)
          .then(() => {
            setVisibleResult(false);
            message.success(t("success.create.resultsPoll"));
            setReload(!reload);
          })
          .catch(() => handleClose());
      }
    });
  };

  const downloadReport = (poll: IPoll) => {
    dispatch(
      exportFile({
        path: `${process.env.REACT_APP_MOBILE}/admin/Poll/Report/${poll.id}?exportType=csv`,
        fileName: `${t(`pointsSystem.poll.${poll.type}`)}--${getFormatedDate(poll.startDate)}`
      })
    ).then(() => message.success(t("successExport")));
  };

  const columns = generateColumnsPoll(access, {
    showForm,
    showDescription,
    downloadReport,
    deleteModal,
    handleSetResults,
    translation: t
  });

  return (
    <>
      {isLoading ? <Loader /> : ""}
      <FiltersButtonBlock>
        <FiltersHeaderWithDate
          inputPlaceholder={t("pointsSystem.poll.filters.placeholders.title")}
          inputName="name"
          selectPlaceholder={t("adv.filters.placeholders.status")}
          selectName="status"
          selectValue={filterValues.status}
          selectOptions={statuses.map((status) => (
            <Option key={status} value={status}>
              {t(`common.statuses.neutral.${status.toLowerCase()}`)}
            </Option>
          ))}
          dateName="date"
          dateValue={filterValues.date}
          isDisabledResetFilters={isLoading}
          onChange={changeFilters}
          resetFilters={resetFilters}
        />
        {access && (
          <Dropdown trigger={["click"]} overlay={menu(showForm)}>
            <Button type="primary" icon={<DownOutlined />}>
              {t("common.buttonsText.create")}
            </Button>
          </Dropdown>
        )}
      </FiltersButtonBlock>
      <Table
        rowKey={(entity) => entity.id}
        onChange={(pagination, filters, sorter) => onChangeDataTable(pagination, sorter, filterValues, setFilterValues)}
        pagination={onChangePaginationTable(count, filterValues.pagination)}
        columns={columns}
        dataSource={data}
        scroll={{ x: 1120 }}
        sticky
      />
      <PollForm data={selected} visible={visible} onClose={handleClose} onSave={handleSave} isLoading={isLoading} />
      <PollDescription data={selected} visible={visibleDesc} onClose={() => showDescription()} />
      <PollResults data={results} visible={visibleResult} onClose={handleClose} onSave={handleResultSave} />
    </>
  );
};

export default Polls;
