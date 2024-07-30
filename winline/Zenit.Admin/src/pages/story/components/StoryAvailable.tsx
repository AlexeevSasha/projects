import { useCallback, useEffect, useState } from "react";
import { Button, Modal, Table } from "antd";
import { useSelector } from "react-redux";
import debounce from "lodash/debounce";
import { NewFormStory } from "./form/NewFormStory";
import type { IFilterContent } from "../../../api/dto/content/content";
import type { IStory } from "../../../api/dto/content/story/story";
import { FiltersInputWithDate } from "../../../ui/customFilters/FiltersInputWithData";
import { FiltersButtonBlock } from "../../../ui/commonComponents";
import { useTranslation } from "react-i18next";
import { StateType, useAppDispatch } from "../../../core/redux/store";
import { generateColumnsStory } from "../../../ui/tableColumnsGenerator/story/generateColumnsStory";
import { getStoryEntities } from "../../../modules/story/storySelector";
import {
  getAllStoryThunk,
  removeStoryThunk,
  updateBeginningPublicationDateThunk,
  updateEndPublicationDateThunk,
  updateSortOrderThunk,
  updateStatusStoryThunk
} from "../../../modules/story/storyActionAsync";
import { Loader } from "../../../ui/Loader";
import { StoryDescription } from "../modal/StoryDescription";
import { validationCheckCountToPages } from "../../../common/helpers/commonValidators/validationCheckCountToPages";
import type { SortableContainerProps, SortEnd } from "react-sortable-hoc";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";

// -------------------------
const SortableItem = SortableElement((props: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />);
const SortableBody = SortableContainer((props: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />);

// --------------------------------
interface IProps {
  access: boolean;
  visible: boolean;
  showStoryForm: Function;
  selectedForm: IStory | null;
}

export const StoryAvailable = ({ access, selectedForm, showStoryForm, visible }: IProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [data, setData] = useState<IStory[]>([]);

  const [filterValues, setFilterValues] = useState<IFilterContent>({
    pagination: 0,
    sorting: "",
    contentType: "Story",
    name: "",
    date: null,
    contentStatus: "Published"
  });
  const [storyDescription, setStoryDescription] = useState<IStory | null>(null);

  const allStories = useSelector(getStoryEntities);
  const { isLoading, count, disabledResetFilters } = useSelector((state: StateType) => state.story);

  useEffect(() => {
    validationCheckCountToPages(count, filterValues.pagination, setFilterValues);
  }, [count]);

  useEffect(() => {
    dispatch(getAllStoryThunk(filterValues));
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
      setFilterValues((prev) => ({ ...prev, [nameField]: value }));
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
      title: <span style={{ whiteSpace: "nowrap" }}>{t("common.modal.title") + " " + t("common.modal.hidden") + "?"}</span>,
      maskClosable: true,
      content: t("story.modal.hidden"),
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
      onOk: () => dispatch(removeStoryThunk(entity))
    });
  };

  const updateEndPublicationDate = (entity: IStory) => {
    dispatch(updateEndPublicationDateThunk(entity)).then(() => dispatch(getAllStoryThunk(filterValues)));
  };

  const updateBeginningPublicationDate = (entity: IStory) => {
    dispatch(updateBeginningPublicationDateThunk(entity)).then(() => dispatch(getAllStoryThunk(filterValues)));
  };

  useEffect(() => setData(allStories), [allStories]);
  // ===============
  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(data.slice(), oldIndex, newIndex).filter((el: IStory) => !!el);
      setData(newData);
    }
  };

  const DraggableContainer = (props: SortableContainerProps) => (
    <SortableBody useDragHandle disableAutoscroll helperClass="row-dragging" onSortEnd={onSortEnd} {...props} />
  );

  const DraggableBodyRow: React.FC<any> = ({ className, style, ...restProps }) => {
    const indexxx = data.findIndex((x) => x.id === restProps["data-row-key"]);

    return <SortableItem index={indexxx} {...restProps} />;
  };
  // ===============

  const saveOrderStory = () => {
    const orders = data.map((order, index) => {
      const container: any = {};
      container["contentId"] = order.id;
      container["sortOrder"] = index + 1;

      return container;
    });
    const orderData = {
      orders: orders
    };
    dispatch(updateSortOrderThunk(orderData)).then(() => dispatch(getAllStoryThunk(filterValues)));
  };

  const columns = generateColumnsStory(access, {
    showUpdateModal,
    showDeleteModal,
    showDescriptionStory,
    updateEndPublicationDate,
    updateBeginningPublicationDate,
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
        <div style={{ display: "flex" }}>
          <Button
            style={{ marginRight: 16 }}
            onClick={() => setData(allStories)}
            disabled={JSON.stringify(allStories) == JSON.stringify(data)}
          >
            {t("common.buttonsText.cancel")}
          </Button>
          {access && (
            <Button type="primary" onClick={saveOrderStory} disabled={JSON.stringify(allStories) == JSON.stringify(data)}>
              {t("common.buttonsText.save")}
            </Button>
          )}
        </div>
      </FiltersButtonBlock>
      <Table
        style={{ maxHeight: "665px" }}
        columns={columns}
        dataSource={data}
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow
          }
        }}
        rowKey={(entity) => entity.id}
        pagination={false}
        scroll={{ x: 1500, y: 617 }}
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
