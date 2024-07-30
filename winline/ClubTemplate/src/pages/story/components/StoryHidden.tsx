import { useCallback, useEffect, useState } from "react";
import { message, Modal, Table } from "antd";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { SorterResult } from "antd/es/table/interface";
import debounce from "lodash/debounce";
import type { IFilterContent } from "../../../api/dto/content/content";
import type { IStory } from "../../../api/dto/content/story/story";
import { FiltersButtonBlock } from "../../../ui/commonComponents";
import { FiltersInputWithDate } from "../../../ui/customFilters/FiltersInputWithData";
import { StateType, useAppDispatch } from "../../../core/redux/store";
import { NewFormStory } from "./form/NewFormStory";
import { getStoryEntities } from "../../../modules/story/storySelector";
import { Loader } from "../../../ui/Loader";
import { StoryDescription } from "../modal/StoryDescription";
import { validationCheckCountToPages } from "../../../common/helpers/commonValidators/validationCheckCountToPages";
import { generateColumnsStoryHidden } from "../../../ui/tableColumnsGenerator/story/generateColumnsStoryHidden";
import { getAllStoryThunk, removeStoryThunk, updateStatusStoryThunk } from "../../../modules/story/storyActionAsync";
import { useTranslation } from "react-i18next";
import { onChangeDataTable, onChangePaginationTable } from "../../../common/helpers/tablesPropsHelpers";

interface IProps {
  access: boolean;
  visible: boolean;
  showStoryForm: Function;
  selectedForm: IStory | null;
}

export const StoryHidden = ({ access, selectedForm, showStoryForm, visible }: IProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [storyDescription, setStoryDescription] = useState<IStory | null>(null);
  const [filterValues, setFilterValues] = useState<IFilterContent>({
    pagination: 1,
    sorting: "",
    contentType: "Story",
    name: "",
    date: null,
    contentStatus: "Hidden"
  });

  const allStories = useSelector(getStoryEntities);
  const { isLoading, count, disabledResetFilters } = useSelector((state: StateType) => state.story);

  useEffect(() => {
    validationCheckCountToPages(count, filterValues.pagination, setFilterValues);
  }, [count]);

  useEffect(() => {
    dispatch(getAllStoryThunk(filterValues));
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

  const showDescriptionStory = (name: string) => {
    setStoryDescription(allStories.find((item) => item.name === name) as IStory);
  };
  const showUpdateModal = (key: string, entity: IStory) => {
    Modal.confirm({
      title: <span style={{ whiteSpace: "nowrap" }}>{t("common.modal.title") + " " + t("common.modal.publish") + "?"}</span>,
      maskClosable: true,
      content: t("story.modal.publish"),
      okText: t("common.buttonsText.confirm"),
      cancelText: t("common.buttonsText.cancel"),
      onOk: () => {
        dispatch(updateStatusStoryThunk({ entity, status: key })).then(() => dispatch(getAllStoryThunk(filterValues)));
      }
    });
  };

  const showDeleteModal = (entity: IStory) => {
    Modal.confirm({
      title: t("common.modal.title") + " " + t("common.modal.delete") + "?",
      maskClosable: true,
      content: t("story.title") + " " + t("common.modal.contentFemale"),
      okText: t("common.buttonsText.confirm"),
      cancelText: t("common.buttonsText.cancel"),
      onOk: () => {
        if (entity.contentStatus === "Published") {
          message.error(t("validations.deletedPublishError"));
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
          inputPlaceholder={t("story.filters.placeholders.title")}
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
        rowKey={(entity: IStory) => entity.id}
        onChange={(pagination, filters, sorter: SorterResult<IStory> | SorterResult<IStory>[]) =>
          onChangeDataTable<IStory, IFilterContent>(pagination, sorter, filterValues, setFilterValues)
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
