import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Modal, Table, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { getMediaSection } from "common/constants/media";
import { routePaths } from "common/constants/routePaths";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import { FilterChangeValue } from "common/interfaces/common";
import { Media, MediaFilters } from "common/interfaces/media";
import debounce from "lodash/debounce";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { rightsSelector } from "store/auth/authSelectors";
import { deleteMedia, getMediaByFilter } from "store/media/mediaActionAsync";
import { mediaCountSelector, mediaListSelector, mediaLoadingSelector } from "store/media/mediaSelectors";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";
import { NoDataTable } from "ui/NoDataTable";
import { noticeActions } from "../../store/notice/notice";
import { getMediaColumns } from "./mediaColumns";
import { MediaFilter } from "./MediaFilter";

const { confirm } = Modal;
const { Header, Content } = Layout;
const { Title } = Typography;

const initialValues = {
  pagination: 1,
  sorting: "",
  pageSize: 10,
};

interface IProps {
  access: boolean;
}

export const MediaTable = ({ access }: IProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<MediaFilters>(initialValues);
  const dispatch = useAppDispatch();
  const isLoading = useSelector(mediaLoadingSelector);
  const count = useSelector(mediaCountSelector);
  const media = useSelector(mediaListSelector);
  const rights = useSelector(rightsSelector);
  const needsListUpdate = useLocation().pathname.endsWith(routePaths.media);

  const changeFilters = useCallback(
    debounce((value: FilterChangeValue) => setFilters((prev) => ({ ...prev, ...value, pagination: 1 })), 400),
    [setFilters]
  );

  const handleDelete = (id: Media["Id"]) => {
    confirm({
      title: <HeaderText>{t("allPages.deleteConfirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t("media.deleteConfirm"),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: () =>
        dispatch(deleteMedia(id))
          .unwrap()
          .then(() => {
            dispatch(getMediaByFilter({ ...filters, Section: getMediaSection(rights) }));
            dispatch(noticeActions.add({ message: t("media.successDeleteMessage") }));
          }),
    });
  };

  const columns = useMemo(() => getMediaColumns({ onDelete: handleDelete, access }), [access, filters]);

  useEffect(() => {
    needsListUpdate && dispatch(getMediaByFilter({ Section: getMediaSection(rights), ...filters }));
  }, [filters, needsListUpdate]);

  return (
    <>
      {isLoading && <Loader />}

      <HeaderContent>
        <CardTitle level={4}>{t("media.title")}</CardTitle>
        {access && (
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate(routePaths.form.create + "/info")}>
            {t("allPages.buttonsText.add")}
          </Button>
        )}
      </HeaderContent>

      <Content style={{ padding: 24, margin: 0 }}>
        <Card>
          <MediaFilter onChange={changeFilters} resetFilters={() => setFilters(initialValues)} />

          <Table
            columns={columns}
            dataSource={media}
            rowKey={(entity) => entity.Id}
            locale={{ emptyText: <NoDataTable /> }}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<Media, MediaFilters>(pagination, sorter, filters, setFilters)
            }
            pagination={onChangePaginationTable(count, filters.pagination, filters.pageSize)}
            scroll={{ x: 1320 }}
            sticky
          />
        </Card>
      </Content>
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
