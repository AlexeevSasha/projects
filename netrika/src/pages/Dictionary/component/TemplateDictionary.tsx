import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import { ru } from "common/lang/ru";
import { MultipleDelete } from "common/components/MultipleDelete/MultipleDelete";
import { BreadCrumbs } from "common/ui/BreadCrumbs/BreadCrumbs";
import { ButtonCreateElem } from "common/ui/Button/ButtonCreateElem";
import { Container, ContainerWithFooter, StatementData } from "common/components/Container/Container";
import { IControlTable, TableBody } from "common/components/Table/TableBody";
import { TableHead } from "common/components/Table/TableHead";
import { IconLoading } from "../../../common/components/Icon/IconLoading";
import { Footer } from "../../../common/components/Footer";
import { Pagination } from "../../../common/ui/Pagination/Pagination";
import { InputSearch } from "../../../common/ui/Input/InputSearch";
import { AppSettings } from "../../../common/constants/appSettings";
import { Title } from "../../../common/ui/Title/Title";

interface IProps {
  title: string;
  tableHead: { name: string; value: string; sortName?: string }[];
  data: any[];
  filterElem?: JSX.Element;

  loading: boolean;

  selectPageCount: (value: string | number) => void;
  pageCount: number;
  newPageNumber: (value: number) => void;
  pageNumber: number;

  allCount: number;
  search?: (value: ChangeEvent<HTMLInputElement>) => void;
  searchText?: string;
  select?: (value: number | string) => void;
  multiSort?: (FieldName: string) => void;
  multiFieldSort?: Record<string, boolean | undefined>;

  fieldSort?: { field?: string; isDesc: boolean };

  clickDelete?: (value: number[]) => void;
  clickShow: (id?: number) => void;

  hideButtonAdd?: boolean;
  withShowModal?: boolean;
  access: boolean;
}

export const TemplateDictionary: React.FC<IProps> = (props) => {
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

  const addDeleteElementToArchiv = (id: number, check: boolean) => {
    if (check) {
      setIsAllSelected([...archive, id].length === props.data.length);
      setArchive((prev) => [...prev, id]);
    } else {
      setArchive((prev) => prev.filter((item: number) => item !== id));
      setIsAllSelected(false);
    }
  };

  const deleteArchive = () => {
    if (props.clickDelete) props.clickDelete(archive);
    setArchive([]);
    setIsAllSelected(false);
  };

  const deleteElement = useCallback(
    (value: number) => {
      if (props.clickDelete) props.clickDelete([value]);
    },
    [props]
  );

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setIsErrorSearch(false);
    if (props.search) props.search(event);
  };

  const control = useMemo(() => {
    return props.access
      ? [
          {
            name: "edit",
            onClick: props.clickShow,
            value: "id",
          } as IControlTable,
          props.clickDelete
            ? ({
                name: "delete",
                onClick: (value) => deleteElement(Number(value)),
                value: "id",
              } as IControlTable)
            : ({} as IControlTable),
        ]
      : props.withShowModal
      ? [
          {
            name: "watch",
            onClick: props.clickShow,
            value: "id",
          } as IControlTable,
        ]
      : undefined;
  }, [props.access, props.clickDelete, props.clickShow, deleteElement, props.withShowModal]);

  return (
    <ContainerWithFooter>
      <Container>
        <StatementData>
          <BreadCrumbs elem={breadCrumsData} id={`Template_Dictionary_${props.title}`} />
        </StatementData>
        <StatementData>
          <Title id={"dictionary_title"}>{props.title}</Title>

          {props.search && (
            <InputSearch value={props.searchText} onChange={onSearch} maxLength={70} error={isErrorSearch} />
          )}
        </StatementData>

        <StatementData>
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
        </StatementData>

        {props.filterElem ? props.filterElem : null}

        {props.access && props.clickDelete && archive.length > 0 ? (
          <MultipleDelete archive={archive} clearArchive={clearArchive} deleteArchive={deleteArchive} />
        ) : null}
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
              control={props.access || control !== undefined}
              multiSort={props.multiSort}
              multiFieldSort={props.multiFieldSort}
            >
              <TableBody
                tableHead={props.tableHead}
                tableBody={props.data}
                control={control}
                checkList={archive}
                checkControl={props.clickDelete ? addDeleteElementToArchiv : undefined}
              />
            </TableHead>
          )
        )}
      </Container>
      <Footer />
    </ContainerWithFooter>
  );
};
