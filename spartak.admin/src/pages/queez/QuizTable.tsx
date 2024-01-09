import { PlusOutlined, QuestionCircleOutlined, RedoOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Modal, Table, Typography } from "antd";
import { quizRepository } from "api/quizRepository";
import { routePaths } from "common/constants/routePaths";
import { IQuiz } from "common/interfaces/IQuiz";
import { FilterChangeValue } from "common/interfaces/common";
import debounce from "lodash/debounce";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { noticeActions } from "store/notice/notice";
import { getQuizByFilter } from "store/quiz/quizActionAsync";
import { quizSelector } from "store/quiz/quizSelectors";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";
import { theme } from "../../assets/theme/theme";
import { onChangeDataTable, onChangePaginationTable } from "../../common/helpers/tablesPropsHelpers";
import {
  SpecialOffer,
  SpecialOfferFilter,
  SpecialOfferFilterEntity,
  SpecialOfferRequest,
} from "../../common/interfaces/specialOffer";
import { NoDataTable } from "../../ui/NoDataTable";
import { QuizFilters } from "./QuizFilters";
import { QuizPreview } from "./QuizPreview";
import { quizColumns } from "./quizColumns";

const { confirm } = Modal;

const { Header, Content } = Layout;
const { Title } = Typography;

const initialValues = {
  pagination: 1,
  pageSize: 10,
  withOutDeletedUtc: true,
  sorting: "CreatedUtc desc",
};

interface IProps {
  access: boolean;
}

export const QuizTable = ({ access }: IProps) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<SpecialOfferFilter>(initialValues);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { isLoading, quizList, count } = useSelector(quizSelector);
  const needsListUpdate = pathname.endsWith(routePaths.specialOffer);
  const [quiz, setQuiz] = useState<IQuiz>();

  const handleDelete = (id: SpecialOffer["Id"]) => {
    confirm({
      title: <HeaderText>{t("allPages.deleteConfirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t("loyalty.deleteConfirm"),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: async () =>
        quizRepository
          .remove(id)
          .then(() => {
            dispatch(getQuizByFilter(filters));
            dispatch(noticeActions.add({ message: t("loyalty.deleteSuccess") }));
          })
          .catch(() =>
            dispatch(
              noticeActions.add({
                message: t("loyalty.deleteFail"),
                type: "error",
              })
            )
          ),
    });
  };

  const changeFilters = useCallback(
    debounce((value: FilterChangeValue) => setFilters((prev) => ({ ...prev, ...value, pagination: 1 })), 400),
    [setFilters]
  );

  const download = async (Id: string) => {
    const a = document.createElement("a");
    const file = await quizRepository.fetchExportReport(Id);
    a.href = URL.createObjectURL(file);
    a.download = "voting_result";
    a.click();
  };

  const openPreview = (Id: string) => {
    quizRepository.fetchById(Id).then((res) => setQuiz(res));
  };

  const columns = useMemo(
    () =>
      quizColumns({
        access,
        handleDelete,
        download,
        openPreview,
      }),
    [access, filters]
  );

  useEffect(() => {
    dispatch(getQuizByFilter(filters));
  }, [filters, needsListUpdate]);

  return (
    <>
      {isLoading ? <Loader /> : ""}

      <HeaderContent>
        <CardTitle level={4}>{t("queez.main")}</CardTitle>
        <div>
          <Button
            type="primary"
            icon={<RedoOutlined rotate={-90} />}
            onClick={() => dispatch(getQuizByFilter(filters))}
            style={{ marginRight: "16px" }}
          >
            {t("allPages.update")}
          </Button>
          {access && (
            <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate(routePaths.form.create)}>
              {t("queez.create")}
            </Button>
          )}
        </div>
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <QuizFilters onChange={changeFilters} resetFilters={() => setFilters(initialValues)} />

          <Table
            columns={columns}
            dataSource={quizList}
            //@ts-ignore
            rowKey={(offer) => offer?.Id}
            locale={{ emptyText: <NoDataTable /> }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<SpecialOfferRequest, SpecialOfferFilterEntity>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination, filters.pageSize)}
            sticky
            scroll={{ x: 1142 }}
          />
        </Card>
      </Content>

      <QuizPreview quiz={quiz} onClose={() => setQuiz(undefined)} />
    </>
  );
};

const CardTitle = styled(Title)`
  margin-bottom: 0 !important;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px !important;
`;

const HeaderContent = styled(Header)`
  padding: 0 24px;
  background-color: ${theme.colors.white};
  flex-basis: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
