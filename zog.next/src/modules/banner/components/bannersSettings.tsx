import { BannerCard } from "./bannerCard";
import { IBanner } from "../interfaces/banner";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { AddBanner } from "./addBanner/addBanner";
import { changeOrderBanner, removeBanner } from "../../../api/banner";
import { changeOrder, changeOrderDelete } from "../utils/changeOrder";

interface IProps {
  banners: IBanner[];
}

export const BannersSettings = (props: IProps) => {
  const [bannerLists, setBannerLists] = useState(props.banners);

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;
    const prev = bannerLists;
    const banners = changeOrder(bannerLists, result.source.index, result.destination.index);
    setBannerLists(banners);
    const response = await changeOrderBanner(banners);
    response?.error && setBannerLists(prev);
  };

  const deleteBanner = async (id: string) => {
    await removeBanner(id);
    const banners = changeOrderDelete(id, bannerLists);
    const response = await changeOrderBanner(banners);
    if (response.banners) {
      setBannerLists(response.banners);
    }
  };

  return (
    <div className={"mb-5 p-4"}>
      <AddBanner setBanners={setBannerLists} />
      <div className={bannerLists.length ? "mt-10" : ""}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="banners">
            {(provided) => (
              <div
                className={" flex flex-col gap-4"}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {bannerLists.map((el, index) => (
                  <Draggable key={el.id} draggableId={el.id} index={index}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <BannerCard
                            deleteBanner={deleteBanner}
                            classNames={snapshot.isDragging ? "bg-white border-orange-500" : ""}
                            {...el}
                          />
                        </div>
                      );
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};
