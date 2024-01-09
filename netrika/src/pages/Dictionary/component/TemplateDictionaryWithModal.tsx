import React, { ChangeEvent, useCallback, useState } from "react";
import { ru } from "common/lang/ru";
import { BreadCrumbs } from "common/ui/BreadCrumbs/BreadCrumbs";
import { ButtonCreateElem } from "common/ui/Button/ButtonCreateElem";
import { Container, ContainerWithFooter, StatementData } from "common/components/Container/Container";
import { TableBody } from "common/components/Table/TableBody";
import { TableHead } from "common/components/Table/TableHead";
import { styled } from "../../../common/styles/styled";
import { IconLoading } from "../../../common/components/Icon/IconLoading";
import { Footer } from "../../../common/components/Footer";
import { Pagination } from "../../../common/ui/Pagination/Pagination";
import { InputSearch } from "../../../common/ui/Input/InputSearch";
import { IconEye } from "../../../common/components/Icon/IconEye";
import { theme } from "../../../common/styles/theme";
import { AppSettings } from "../../../common/constants/appSettings";
import { Title } from "../../../common/ui/Title/Title";

interface IProps {
  title: string;
  tableHead: { name: string; value: string }[];
  data: any[];
  isPatientReport?: boolean;

  loading: boolean;

  selectPageCount: (value: string | number) => void;
  pageCount: number;
  newPageNumber: (value: number) => void;
  pageNumber: number;

  allCount: number;
  search?: (value: ChangeEvent<HTMLInputElement>) => void;
  select?: (value: number | string) => void;

  clickDelete?: (value: number[]) => void;
  clickShow: (id?: number) => void;

  hideButtonAdd?: boolean;

  access: boolean;
  onOpenModal?: () => void;

  noWordBreak?: boolean;
}

export const TemplateDictionaryWithModal: React.FC<IProps> = (props) => {
  const [breadCrumsData] = useState([
    { name: "Справочники", link: `${AppSettings.get("REACT_APP_ROOT_FOLDER")}/dictionary` },
    { name: props.title, link: "" },
  ]);
  const [archive, setArchive] = useState<number[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isErrorSearch, setIsErrorSearch] = useState(false);

  const clearArchive = useCallback(() => {
    setArchive([]);
  }, [setArchive]);

  const addAllElementToArchive = () => {
    setArchive(props.data.map((item) => item.id));
    setIsAllSelected(true);
  };

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setIsErrorSearch(false);
    if (props.search) props.search(event);
  };

  return (
    <ContainerWithFooter>
      <Container>
        <StatementData>
          <BreadCrumbs elem={breadCrumsData} id={`Template_Dictionary_${props.title}`} />
        </StatementData>
        <StatementData>
          <Title id={"dictionary_title"}>{props.title}</Title>

          {props.search && !props.isPatientReport && (
            <InputSearch onChange={onSearch} maxLength={70} error={isErrorSearch} />
          )}
        </StatementData>
        {props.isPatientReport && (
          <BlockFunction>
            <Title style={{ margin: "33px 0" }} level={2}>
              Функции для расчёта отчётов по контингенту
            </Title>
            <BlockFunctionList onClick={props.onOpenModal}>
              <div>Список функций для расчёта отчётов по контингенту</div>
              <IconEye />
            </BlockFunctionList>
          </BlockFunction>
        )}
        <CustomPaginationContainer isPatientReport={props.isPatientReport || false}>
          {props.isPatientReport && (
            // eslint-disable-next-line react/no-unescaped-entities
            <Title level={2}>patient_report : "Результат вычисления функций (patient_report)"</Title>
          )}
          {props.access && !props.hideButtonAdd ? (
            <ButtonCreateElem onClick={() => props.clickShow()} text={ru.button.addNewElem} />
          ) : (
            <div /> // костыль что бы сдвинуть кнопки пагинации в право
          )}
          <Pagination
            allCount={props.allCount}
            countFromPage={props.pageCount}
            page={props.pageNumber}
            onClick={props.newPageNumber}
            selectPageCount={props.selectPageCount}
          />
        </CustomPaginationContainer>

        <StatementData />
        {props.loading ? (
          <IconLoading />
        ) : (
          props.data && (
            <TableHead
              tableHead={props.tableHead}
              group={props.clickDelete ? archive.length : undefined}
              isAllSelected={isAllSelected}
              clearGroup={clearArchive}
              selectAllGroup={addAllElementToArchive}
              control={props.access}
            >
              <TableBody noWordBreak={props.noWordBreak} tableHead={props.tableHead} tableBody={props.data} />
            </TableHead>
          )
        )}
      </Container>
      <Footer />
    </ContainerWithFooter>
  );
};

const BlockFunction = styled.div`
  display: flex;
  flex-direction: column;
`;

const BlockFunctionList = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background: ${theme.colors.white};

  :hover {
    svg {
      path {
        fill: ${theme.colors.green};
      }
    }

`;
const CustomPaginationContainer = styled.div<{ isPatientReport: boolean }>`
  display: flex;
  align-items: center;

  justify-content: ${(props) => (props.isPatientReport ? "space-between" : "end")};
  margin: 12px 0 10px;
  gap: 16px;

  & > div {
    margin: 0;
  }
`;
