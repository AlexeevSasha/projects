import { useCallback, useEffect, useState } from "react";
import { Card, Modal, Table } from "antd";
import { useSelector } from "react-redux";
import { StoryDescription } from "../modal/StoryDescription";
import { SorterResult } from "antd/es/table/interface";
import debounce from "lodash/debounce";
import { NewFormStory } from "./form/NewFormStory";
import { IFilterContent } from "../../../../api/dto/content/IContent";
import { IFiltersStory, IStory } from "../../../../api/dto/content/IStory";
import { getStoryEntities } from "../../../../modules/content/story/storySelector";
import { StateType, useAppDispatch } from "../../../../core/redux/store";
import { validationCheckCountToPages } from "../../../../common/helpers/commonValidators/validationCheckCountToPages";
import { getAllStoryThunk, updatePublishDataStoryThunk, updateStatusStoryThunk } from "../../../../modules/content/story/storyActionAsync";
import { Loader } from "../../../../ui/Loader";
import { onChangeDataTable, onChangePaginationTable } from "../../../../common/helpers/tablesPropsHelpers";
import { generateColumnsStory } from "../../../../ui/tableColumnsGenerator/content/story/generateColumnsStory";
import { useTranslation } from "react-i18next";
import { FiltersButtonBlock } from "../../../../ui/commonComponents";
import { FiltersInputWithDate } from "../../../../ui/customFilters/FiltersInputWithData";

interface IProps {
  access: boolean;
  visible: boolean;
  showStoryForm: Function;
  selectedForm: IStory | null;
}

export default ({ access, selectedForm, showStoryForm, visible }: IProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [filterValues, setFilterValues] = useState<IFilterContent>({
    pagination: 1,
    sorting: "",
    contentType: "Story",
    name: "",
    date: null,
    contentStatus: "Published"
  });
  const [storyDescription, setStoryDescription] = useState<IStory | null>(null);
  const allStories = useSelector(getStoryEntities);
  const { count, disabledResetFilters, isLoading } = useSelector((state: StateType) => state.story);

  useEffect(() => {
    validationCheckCountToPages(count, filterValues.pagination, setFilterValues);
  }, [count]);

  useEffect(() => {
    dispatch(getAllStoryThunk({ filters: filterValues }));
  }, [
    filterValues.contentType,
    filterValues.date,
    filterValues.pagination,
    filterValues.sorting,
    filterValues.contentStatus,
    filterValues.name,
    count
  ]);

  const changeFilters = useCallback(
    debounce((nameField: string, value: unknown) => {
      setFilterValues((prev) => ({ ...prev, pagination: 1, [nameField]: value }));
    }, 400),
    [setFilterValues]
  );

  const resetFilters = useCallback(() => {
    setFilterValues({ ...filterValues, contentStatus: "Published", contentType: "Story", date: null, name: "" });
  }, [setFilterValues, filterValues]);

  const showDescriptionStory = (story: IStory) => {
    setStoryDescription(story);
  };
  const showUpdateModal = (key: string, entity: IStory) => {
    Modal.confirm({
      title: t("common.modal.title") + " " + t("common.modal.hidden") + "?",
      maskClosable: true,
      content: t("marketing.story.modal.hidden"),
      okText: t("common.buttonsText.confirm"),
      cancelText: t("common.buttonsText.cancel"),
      onOk: () => {
        dispatch(updateStatusStoryThunk({ entity, status: key })).then(() => dispatch(getAllStoryThunk({ filters: filterValues })));
      }
    });
  };

  const updatePublishDataCurrentStoryWithToken = (entity: IStory) => {
    dispatch(updatePublishDataStoryThunk(entity)).then(() => dispatch(getAllStoryThunk({ filters: filterValues })));
  };

  const columns = generateColumnsStory(access, {
    showUpdateModal,
    showDescriptionStory,
    updatePublishDataCurrentStoryWithToken,
    showStoryForm,
    translation: t
  });

  return (
    <>
      {isLoading && <Loader />}
      <FiltersButtonBlock>
        <FiltersInputWithDate
          inputPlaceholder={t("marketing.story.filters.search")}
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
        dataSource={allStories}
        rowKey={(entity) => entity.id}
        onChange={(pagination, filters, sorter: SorterResult<IStory> | SorterResult<IStory>[]) =>
          onChangeDataTable<IStory, IFiltersStory>(pagination, sorter, filterValues, setFilterValues)
        }
        pagination={onChangePaginationTable(count, filterValues.pagination)}
        scroll={{ x: 1585 }}
        sticky
      />
      <NewFormStory visible={visible} storyUpdate={selectedForm} closeDrawer={() => showStoryForm()} />
      <StoryDescription
        onClose={() => {
          setStoryDescription(null);
        }}
        story={storyDescription}
      />
    </>
  );
};
