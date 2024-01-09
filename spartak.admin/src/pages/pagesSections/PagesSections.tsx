import { Card, Layout, Table, Typography } from "antd";
import { ISectionData } from "common/interfaces/pagesSections";
import { theme } from "assets/theme/theme";
import { onChangeDataTable, onChangePaginationTable } from "common/helpers/tablesPropsHelpers";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { NoDataTable } from "ui/NoDataTable";
import { PagesSectionForm } from "./pageSectionForm/pagesSectionForm";
import { getPagesSectionsColumns } from "./pagesSectionsColumns";
import { webSitePageList } from "./webSitePageList";
import { Route, Routes } from "react-router";
import { routePaths } from "common/constants/routePaths";
import { IPagesSectionsFilters } from "common/interfaces/IPagesSection";
import { Redirect } from "../../ui/Redirect";
import { useLocation } from "react-router-dom";

const { Header, Content } = Layout;
const { Title } = Typography;

export const PagesSections = ({ access }: { access: boolean }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const [filtersValue, setFiltersValue] = useState<IPagesSectionsFilters>({
    pagination: 1,
  });

  const columns = useMemo(() => getPagesSectionsColumns(access), [access]);

  return (
    <>
      <HeaderContent>
        <CardTitle level={4}>{t("pagesSections.title")}</CardTitle>
      </HeaderContent>

      <Content
        style={{
          padding: 24,
          margin: 0,
        }}
      >
        <Card>
          <Table
            locale={{
              emptyText: <NoDataTable />,
            }}
            rowKey={(entity) => entity.schema}
            onChange={(pagination, _, sorter) =>
              onChangeDataTable<ISectionData, IPagesSectionsFilters>(pagination, sorter, filtersValue, setFiltersValue)
            }
            pagination={onChangePaginationTable(webSitePageList.length, filtersValue.pagination)}
            columns={columns}
            dataSource={webSitePageList}
            scroll={{ x: 1120 }}
            sticky
          />
        </Card>
      </Content>

      <Routes>
        <Route path="/">
          {access && <Route path={routePaths.form.edit()} element={<PagesSectionForm />} />}
          {pathname !== `/${routePaths.pagesSections}` && (
            <Route path="*" element={<Redirect path={`/${routePaths.employee}`} />} />
          )}
        </Route>
      </Routes>
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
