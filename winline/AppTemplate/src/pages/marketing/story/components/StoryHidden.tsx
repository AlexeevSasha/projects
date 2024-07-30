import { useCallback, useEffect, useState } from "react";
import { Card, message, Modal, Table } from "antd";
import { useSelector } from "react-redux";
import debounce from "lodash/debounce";
import { IFilterContent } from "../../../../api/dto/content/IContent";
import { IFiltersStory, IStory } from "../../../../api/dto/content/IStory";
import { getStoryEntities } from "../../../../modules/content/story/storySelector";
import { StateType, useAppDispatch } from "../../../../core/redux/store";
import { validationCheckCountToPages } from "../../../../common/helpers/commonValidators/validationCheckCountToPages";
import { getAllStoryThunk, removeStoryThunk, updateStatusStoryThunk } from "../../../../modules/content/story/storyActionAsync";
import { Loader } from "../../../../ui/Loader";
import { SorterResult } from "antd/lib/table/interface";
import { onChangeDataTable, onChangePaginationTable } from "../../../../common/helpers/tablesPropsHelpers";
import { generateColumnsStoryHidden } from "../../../../ui/tableColumnsGenerator/content/story/generateColumnsStoryHidden";
import { StoryDescription } from "../modal/StoryDescription";
import { NewFormStory } from "./form/NewFormStory";
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
    contentStatus: "Hidden"
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
    filterValues.contentStatus,
    filterValues.date,
    filterValues.pagination,
    filterValues.sorting,
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
    setFilterValues({ ...filterValues, contentStatus: "Hidden", contentType: "Story", date: null, name: "" });
  }, [setFilterValues, filterValues]);

  const showDescriptionStory = (story: IStory) => {
    setStoryDescription(story);
  };
  const showUpdateModal = (key: string, entity: IStory) => {
    Modal.confirm({
      title: t("common.modal.title") + " " + t("common.modal.publish") + "?",
      maskClosable: true,
      content: t("marketing.story.modal.publish"),
      okText: t("common.buttonsText.confirm"),
      cancelText: t("common.buttonsText.cancel"),
      onOk: () => {
        dispatch(updateStatusStoryThunk({ entity, status: key })).then(() => dispatch(getAllStoryThunk({ filters: filterValues })));
      }
    });
  };

  const showDeleteModal = (entity: IStory) => {
    Modal.confirm({
      title: t("common.modal.title") + " " + t("common.modal.delete") + "?",
      maskClosable: true,
      content: t("marketing.story.title") + " " + t("common.modal.contentFemale"),
      okText: t("common.buttonsText.confirm"),
      cancelText: t("common.buttonsText.cancel"),
      onOk: () => {
        if (entity.contentStatus === "Published") {
          message.error(t("validations.deletedPublish"));
        } else {
          dispatch(removeStoryThunk(entity));
        }
      }
    });
  };

  const columns = generateColumnsStoryHidden(access, {
    showUpdateModal,
    showDescriptionStory,
    showDeleteModal,
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
        rowKey={(entity) => entity.id}
        onChange={(pagination, filters, sorter: SorterResult<IStory> | SorterResult<IStory>[]) =>
          onChangeDataTable<IStory, IFiltersStory>(pagination, sorter, filterValues, setFilterValues)
        }
        pagination={onChangePaginationTable(count, filterValues.pagination)}
        columns={columns}
        dataSource={allStories}
        scroll={{ x: 1120 }}
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
