import { IOrderBlock } from "common/interfaces/order/IOrderBlock";
import { IOrderConfChapters } from "common/interfaces/order/IOrderConfChapters";
import { OrderConfiguratorCardApiRequest } from "api/orderConfiguratorCardApiRequest";
import { IOrderConfAttribute } from "../../common/interfaces/order/IOrderConfAttribute";
import { IOrderConfBlock } from "../../common/interfaces/order/IOrderConfBlock";
import { IOrderConfGroup } from "../../common/interfaces/order/IOrderConfGroup";
import { IOrderConfSubGroup } from "../../common/interfaces/order/IOrderConfSubGroup";
import { ISortElements } from "../../common/interfaces/ISortElements";
import { IAddDiseaseInfo } from "../../common/interfaces/IAddDiseaseInfo";
import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { ICustomSelect } from "../../common/interfaces/ISelect";
import { successPopup } from "../../common/helpers/toast/success";
import { ProposalDiseaseCardAction } from "./proposalDiseaseCardAction";
import { IOrderConfInfo } from "../../common/interfaces/order/IOrderConfInfo";
import { IControllerResponse } from "../../common/interfaces/response/IControllerResponse";

export const ProposalDiseaseCardThunk = {
  getList(id: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalDiseaseCardAction.list.started(null));
      try {
        const result = await new OrderConfiguratorCardApiRequest().getOrderConfiguratorInfo(id);
        dispatch(ProposalDiseaseCardAction.list.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(ProposalDiseaseCardAction.list.failed({ params: null, error }));
        errorPopup("Ошибка при загрузке данных.");
      }
    };
  },

  updateGroupSort(data: IOrderConfGroup, param: "top" | "bottom"): IThunkAction {
    return async (dispatch: IAppDispatch, getState): Promise<void> => {
      dispatch(ProposalDiseaseCardAction.updateList.started(null));
      try {
        let request = {} as ISortElements;
        const result = JSON.parse(JSON.stringify(getState().proposalDiseaseCard.data));

        getState().proposalDiseaseCard.data.orderConfChapters.forEach((chapters, indexChapters) => {
          chapters.orderConfBlocks.forEach((block, indexBlock) => {
            block.orderConfGroups.forEach((group, indexGroup) => {
              if (group.id === data.id) {
                request = {
                  currentId: group.id,
                  newCurrentSort:
                    param === "bottom"
                      ? block.orderConfGroups[indexGroup + 1].sort
                      : block.orderConfGroups[indexGroup - 1].sort,
                  adjacentId:
                    param === "bottom"
                      ? block.orderConfGroups[indexGroup + 1].id
                      : block.orderConfGroups[indexGroup - 1].id,
                  newAdjacentSort: group.sort,
                };
                const sort = group.sort;
                result.orderConfChapters[indexChapters].orderConfBlocks[indexBlock].orderConfGroups[indexGroup].sort =
                  param === "bottom"
                    ? chapters.orderConfBlocks[indexBlock].orderConfGroups[indexGroup + 1].sort
                    : chapters.orderConfBlocks[indexBlock].orderConfGroups[indexGroup - 1].sort;
                if (param === "bottom") {
                  result.orderConfChapters[indexChapters].orderConfBlocks[indexBlock].orderConfGroups[
                    indexGroup + 1
                  ].sort = sort;
                } else {
                  result.orderConfChapters[indexChapters].orderConfBlocks[indexBlock].orderConfGroups[
                    indexGroup - 1
                  ].sort = sort;
                }
              }
            });
          });
        });

        result.orderConfChapters.map((chapters: IOrderConfChapters) =>
          chapters.orderConfBlocks.map((block) =>
            block.orderConfGroups.sort((a: IOrderConfGroup, b: IOrderConfGroup) => {
              return a.sort - b.sort;
            })
          )
        );
        await new OrderConfiguratorCardApiRequest().updateGroupSort(request);
        dispatch(ProposalDiseaseCardAction.updateList.done({ params: null, result: result }));
        successPopup("Положение группы успешно изменено.");
      } catch (error) {
        dispatch(ProposalDiseaseCardAction.updateList.failed({ params: null, error }));
        errorPopup("Ошибка при изменении положения.");
      }
    };
  },
  updateSubGroupSort(data: IOrderConfSubGroup, param: "top" | "bottom"): IThunkAction {
    return async (dispatch: IAppDispatch, getState): Promise<void> => {
      dispatch(ProposalDiseaseCardAction.updateList.started(null));
      try {
        let request = {} as ISortElements;
        const result = JSON.parse(JSON.stringify(getState().proposalDiseaseCard.data));

        getState().proposalDiseaseCard.data.orderConfChapters.forEach((chapters, indexChapters) => {
          chapters.orderConfBlocks.forEach((block, indexBlock) => {
            block.orderConfGroups.forEach((group, indexGroup) => {
              group.orderConfSubGroups.forEach((subGroup, indexSubGroup) => {
                if (subGroup.id === data.id) {
                  request = {
                    currentId: subGroup.id,
                    newCurrentSort:
                      param === "bottom"
                        ? group.orderConfSubGroups[indexSubGroup + 1].sort
                        : group.orderConfSubGroups[indexSubGroup - 1].sort,
                    adjacentId:
                      param === "bottom"
                        ? group.orderConfSubGroups[indexSubGroup + 1].id
                        : group.orderConfSubGroups[indexSubGroup - 1].id,
                    newAdjacentSort: subGroup.sort,
                  };
                  const sort = subGroup.sort;
                  result.orderConfChapters[indexChapters].orderConfBlocks[indexBlock].orderConfGroups[
                    indexGroup
                  ].orderConfSubGroups[indexSubGroup].sort =
                    param === "bottom"
                      ? block.orderConfGroups[indexGroup].orderConfSubGroups[indexSubGroup + 1].sort
                      : block.orderConfGroups[indexGroup].orderConfSubGroups[indexSubGroup - 1].sort;
                  if (param === "bottom") {
                    result.orderConfChapters[indexChapters].orderConfBlocks[indexBlock].orderConfGroups[
                      indexGroup
                    ].orderConfSubGroups[indexSubGroup + 1].sort = sort;
                  } else {
                    result.orderConfChapters[indexChapters].orderConfBlocks[indexBlock].orderConfGroups[
                      indexGroup
                    ].orderConfSubGroups[indexSubGroup - 1].sort = sort;
                  }
                }
              });
            });
          });
        });

        result.orderConfChapters.map((chapters: IOrderConfChapters) =>
          chapters.orderConfBlocks.map((block) =>
            block.orderConfGroups.map((group) =>
              group.orderConfSubGroups.sort((a: IOrderConfSubGroup, b: IOrderConfSubGroup) => {
                return a.sort - b.sort;
              })
            )
          )
        );

        await new OrderConfiguratorCardApiRequest().updateSubGroupSort(request);
        dispatch(ProposalDiseaseCardAction.updateList.done({ params: null, result: result }));
        successPopup("Положение подгруппы успешно изменено.");
      } catch (error) {
        dispatch(ProposalDiseaseCardAction.updateList.failed({ params: null, error }));
        errorPopup("Ошибка при изменении положения.");
      }
    };
  },

  updateAttributeSort(data: IOrderConfAttribute, param: "top" | "bottom"): IThunkAction {
    return async (dispatch: IAppDispatch, getState): Promise<void> => {
      dispatch(ProposalDiseaseCardAction.updateList.started(null));
      try {
        let request = {} as ISortElements;
        const result = JSON.parse(JSON.stringify(getState().proposalDiseaseCard.data));

        getState().proposalDiseaseCard.data.orderConfChapters.forEach((chapters, indexChapters) => {
          chapters.orderConfBlocks.forEach((block, indexBlock) => {
            block.orderConfGroups.forEach((group, indexGroup) => {
              group.orderConfSubGroups.forEach((subGroup, indexSubGroup) => {
                subGroup.orderConfAttributes.forEach((attribute, indexAttribute) => {
                  if (attribute.id === data.id) {
                    request = {
                      currentId: attribute.id,
                      newCurrentSort:
                        param === "bottom"
                          ? subGroup.orderConfAttributes[indexAttribute + 1].sort
                          : subGroup.orderConfAttributes[indexAttribute - 1].sort,
                      adjacentId:
                        param === "bottom"
                          ? subGroup.orderConfAttributes[indexAttribute + 1].id
                          : subGroup.orderConfAttributes[indexAttribute - 1].id,
                      newAdjacentSort: attribute.sort,
                    };
                    const sort = attribute.sort;
                    result.orderConfChapters[indexChapters].orderConfBlocks[indexBlock].orderConfGroups[
                      indexGroup
                    ].orderConfSubGroups[indexSubGroup].orderConfAttributes[indexAttribute].sort =
                      param === "bottom"
                        ? block.orderConfGroups[indexGroup].orderConfSubGroups[indexSubGroup].orderConfAttributes[
                            indexAttribute + 1
                          ].sort
                        : block.orderConfGroups[indexGroup].orderConfSubGroups[indexSubGroup].orderConfAttributes[
                            indexAttribute - 1
                          ].sort;
                    if (param === "bottom") {
                      result.orderConfChapters[indexChapters].orderConfBlocks[indexBlock].orderConfGroups[
                        indexGroup
                      ].orderConfSubGroups[indexSubGroup].orderConfAttributes[indexAttribute + 1].sort = sort;
                    } else {
                      result.orderConfChapters[indexChapters].orderConfBlocks[indexBlock].orderConfGroups[
                        indexGroup
                      ].orderConfSubGroups[indexSubGroup].orderConfAttributes[indexAttribute - 1].sort = sort;
                    }
                  }
                });
              });
            });
          });
        });

        result.orderConfChapters.map((chapters: IOrderConfChapters) =>
          chapters.orderConfBlocks.map((block) =>
            block.orderConfGroups.map((group) =>
              group.orderConfSubGroups.map((subGroup) =>
                subGroup.orderConfAttributes.sort((a: IOrderConfAttribute, b: IOrderConfAttribute) => {
                  return a.sort - b.sort;
                })
              )
            )
          )
        );

        await new OrderConfiguratorCardApiRequest().updateAttributeSort(request);
        dispatch(ProposalDiseaseCardAction.updateList.done({ params: null, result: result }));
        successPopup("Положение элемента успешно изменено.");
      } catch (error) {
        dispatch(ProposalDiseaseCardAction.updateList.failed({ params: null, error }));
        errorPopup("Ошибка при изменении положения.");
      }
    };
  },
  //TODO нужен отдельный метод для бэка  нагрузка на  перфоманс

  updateVisibleAllBlock(data: IOrderConfInfo): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalDiseaseCardAction.updateList.started(null));
      try {
        const isCheckedAll = data.orderConfChapters
          .map((elem) => elem.orderConfBlocks.filter((el) => !el.isChecked))
          .map((el) =>
            el.map((el) =>
              new OrderConfiguratorCardApiRequest().updateBlock(el.id, {
                ...el,
                isChecked: true,
              })
            )
          );
        if (!isCheckedAll.flat().length) return;
        await Promise.all(isCheckedAll);
        const result = data.orderConfChapters.map((elem) => ({
          ...elem,
          orderConfBlocks: elem.orderConfBlocks.map((el) => ({ ...el, isChecked: true })),
        }));

        dispatch(
          ProposalDiseaseCardAction.updateList.done({
            params: null,
            result: { orderConfChapters: result },
          })
        );
        successPopup("Параметры блока успешно обновлены.");
      } catch (error) {
        dispatch(ProposalDiseaseCardAction.updateList.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  updateCheckboxBlock(data: IOrderConfBlock, type: "isChecked" | "isPreview"): IThunkAction {
    return async (dispatch: IAppDispatch, getState): Promise<void> => {
      dispatch(ProposalDiseaseCardAction.updateList.started(null));
      try {
        const result = JSON.parse(JSON.stringify(getState().proposalDiseaseCard.data));

        getState().proposalDiseaseCard.data.orderConfChapters.forEach((chapters, indexChapters) =>
          chapters.orderConfBlocks.forEach((block, indexBlock) => {
            if (block.id === data.id) {
              result.orderConfChapters[indexChapters].orderConfBlocks[indexBlock][type] = !data[type];
            }
          })
        );

        const updateBlockResult = await new OrderConfiguratorCardApiRequest().updateBlock(data.id, {
          ...data,
          [type]: !data[type],
        });
        if (updateBlockResult.isError) {
          throw updateBlockResult;
        }
        dispatch(ProposalDiseaseCardAction.updateList.done({ params: null, result: result }));
        successPopup("Параметры блока успешно обновлены.");
      } catch (error) {
        dispatch(ProposalDiseaseCardAction.updateList.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  updateBlock(data: IOrderConfBlock, successCallback: () => void, errorCallback: () => void): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new OrderConfiguratorCardApiRequest().updateBlock(data.id, data);
        if (result.isError) {
          throw result;
        }
        successPopup("Название блока успешно изменено.");
        successCallback();
      } catch (error) {
        errorPopup(error.message);
        errorCallback();
      }
    };
  },
  deleteBlock(data: number): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new OrderConfiguratorCardApiRequest().deleteBlock(data);
        if (result.isError) {
          throw result;
        }
        successPopup(result.message);
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  updateAttribute(data: IOrderConfAttribute): IThunkAction {
    return async (dispatch: IAppDispatch, getState): Promise<void> => {
      dispatch(ProposalDiseaseCardAction.updateList.started(null));
      dispatch(ProposalDiseaseCardAction.loadingPopup.started(null));
      try {
        const result = JSON.parse(JSON.stringify(getState().proposalDiseaseCard.data));
        getState().proposalDiseaseCard.data.orderConfChapters.forEach((chapters, indexChapters) =>
          chapters.orderConfBlocks.forEach((block, indexBlock) => {
            block.orderConfGroups.forEach((group, indexGroup) => {
              group.orderConfSubGroups.forEach((subGroup, indexSubGroup) => {
                subGroup.orderConfAttributes.forEach((attribute, indexAttribute) => {
                  if (attribute.id === data.id) {
                    result.orderConfChapters[indexChapters].orderConfBlocks[indexBlock].orderConfGroups[
                      indexGroup
                    ].orderConfSubGroups[indexSubGroup].orderConfAttributes[indexAttribute].useHistory =
                      data.useHistory;
                  }
                });
              });
            });
          })
        );

        const resultRequest = await new OrderConfiguratorCardApiRequest().updateAttribute(data.id, { ...data });
        if (resultRequest.isError) {
          throw resultRequest;
        } else {
          dispatch(ProposalDiseaseCardAction.loadingPopup.done({ params: null, result: false }));
          dispatch(ProposalDiseaseCardAction.updateList.done({ params: null, result: result }));
          successPopup("Атрибут успешно изменён.");
        }
      } catch (error) {
        dispatch(ProposalDiseaseCardAction.loadingPopup.failed({ params: null, error }));
        dispatch(ProposalDiseaseCardAction.updateList.failed({ params: null, error }));

        errorPopup(error.message);
      }
    };
  },

  getListSection(id: number, type: "group" | "subGroup" | "attribute", firstSubGroupName = ""): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalDiseaseCardAction.listAttribute.started(firstSubGroupName));
      try {
        let result;
        let formatResult: ICustomSelect[] = [];
        if (type === "attribute") {
          result = await new OrderConfiguratorCardApiRequest().getAttributesNsiDict(id);
          if (result.isError) {
            throw result;
          }
          formatResult = result.result.map((item) => {
            return { value: item.code || "", label: item.description || "" };
          });
        }
        if (type === "subGroup") {
          result = await new OrderConfiguratorCardApiRequest().getSubGroupsNsiDict(id, firstSubGroupName);
          if (result.isError) {
            throw result;
          }
          formatResult = result.result.map((item) => {
            return { value: item.code || "", label: item.description || "" };
          });
        }
        if (type === "group") {
          result = await new OrderConfiguratorCardApiRequest().getConfGroups(id);
          if (result.isError) {
            throw result;
          }
          formatResult = result.result.map((item) => {
            return { value: item.id || "", label: item.name || "" };
          });
        }

        dispatch(
          ProposalDiseaseCardAction.listAttribute.done({
            params: firstSubGroupName,
            result: formatResult,
          })
        );
      } catch (error) {
        dispatch(ProposalDiseaseCardAction.listAttribute.failed({ params: null, error }));
        errorPopup("Ошибка при загрузке данных.");
      }
    };
  },

  createCustomBlock(data: IOrderBlock, callBack: () => void): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalDiseaseCardAction.loadingPopup.started(null));
      try {
        const result = await new OrderConfiguratorCardApiRequest().createCustomBlock(data);
        if (result.isError) {
          throw result;
        } else {
          dispatch(ProposalDiseaseCardAction.setIdNewBlock(result.result));
          dispatch(ProposalDiseaseCardAction.loadingPopup.done({ params: null, result: false }));
          successPopup("Настраиваемый блок успешно добавлен.");
          callBack();
          dispatch(ProposalDiseaseCardThunk.getList(data.idOrder));
        }
      } catch (error) {
        dispatch(ProposalDiseaseCardAction.loadingPopup.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  createGroup(data: IAddDiseaseInfo): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalDiseaseCardAction.loadingPopup.started(null));
      try {
        const request = {
          idOrderConfBlock: data.idParent,
          idConfGroup: data.id,
          description: data.description,
        } as IOrderConfGroup;
        const result = await new OrderConfiguratorCardApiRequest().createGroup(request);
        if (result.isError) {
          throw result;
        } else {
          dispatch(ProposalDiseaseCardAction.setIdNewGroup(result.result));
          dispatch(ProposalDiseaseCardAction.loadingPopup.done({ params: null, result: false }));
          successPopup("Группа заболевания успешно добавлена.");
        }
      } catch (error) {
        dispatch(ProposalDiseaseCardAction.loadingPopup.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  createSubGroup(data: IAddDiseaseInfo): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalDiseaseCardAction.loadingPopup.started(null));
      try {
        const request = {
          idOrderConfGroup: data.idParent,
          nsiCode: data.id.toString(),
          description: data.description,
        } as IOrderConfSubGroup;
        const result = await new OrderConfiguratorCardApiRequest().createSubGroup(request);
        if (result.isError) {
          throw result;
        } else {
          dispatch(ProposalDiseaseCardAction.setIdNewSubGroup(result.result));
          dispatch(ProposalDiseaseCardAction.loadingPopup.done({ params: null, result: false }));
          successPopup("Подгруппа заболевания успешно добавлена.");
        }
      } catch (error) {
        dispatch(ProposalDiseaseCardAction.loadingPopup.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },
  updateSubGroup(subGroupId: number, data: IOrderConfSubGroup): IThunkAction {
    return async (dispatch: IAppDispatch, getState): Promise<void> => {
      dispatch(ProposalDiseaseCardAction.loadingPopup.started(null));
      try {
        const state = JSON.parse(JSON.stringify(getState().proposalDiseaseCard.data));
        getState().proposalDiseaseCard.data.orderConfChapters.forEach((chapters, indexChapters) =>
          chapters.orderConfBlocks.forEach((block, indexBlock) => {
            block.orderConfGroups.forEach((group, indexGroup) => {
              group.orderConfSubGroups.forEach((subGroup, indexSubGroup) => {
                if (subGroup.id === subGroupId) {
                  state.orderConfChapters[indexChapters].orderConfBlocks[indexBlock].orderConfGroups[
                    indexGroup
                  ].orderConfSubGroups[indexSubGroup].allAttributes = data.allAttributes;
                }
              });
            });
          })
        );

        const result = await new OrderConfiguratorCardApiRequest().updateSubGroup(subGroupId, data);
        if (result.isError) {
          throw result;
        } else {
          dispatch(ProposalDiseaseCardAction.loadingPopup.done({ params: null, result: false }));
          dispatch(ProposalDiseaseCardAction.updateList.done({ params: null, result: state }));
          successPopup("Подгруппа успешно изменена.");
        }
      } catch (error) {
        dispatch(ProposalDiseaseCardAction.loadingPopup.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  createDefaultSubGroup(id: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalDiseaseCardAction.loadingPopup.started(null));
      try {
        const result = await new OrderConfiguratorCardApiRequest().createDefaultSubGroup(id);
        if (result.isError) {
          throw result;
        } else {
          dispatch(ProposalDiseaseCardAction.loadingPopup.done({ params: null, result: false }));
          successPopup("Подгруппа успешно добавлена.");
        }
      } catch (error) {
        dispatch(ProposalDiseaseCardAction.loadingPopup.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  createAttribute(data: IAddDiseaseInfo): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalDiseaseCardAction.loadingPopup.started(null));
      try {
        const request = {
          idOrderConfSubGroup: data.idParent,
          nsiCode: data.id.toString(),
          description: data.description,
          useHistory: data.useHistory,
        } as IOrderConfAttribute;
        const result = await new OrderConfiguratorCardApiRequest().createAttribute(request);
        if (result.isError) {
          throw result;
        } else {
          dispatch(ProposalDiseaseCardAction.setIdNewAttribute(result.result));
          dispatch(ProposalDiseaseCardAction.loadingPopup.done({ params: null, result: false }));
          successPopup("Атрибут заболевания успешно добавлен.");
        }
      } catch (error) {
        dispatch(ProposalDiseaseCardAction.loadingPopup.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  delete(id: number, orderId: number, element: "group" | "subGroup" | "attribute"): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      try {
        let result = {} as IControllerResponse<any>;
        switch (element) {
          case "group":
            result = await new OrderConfiguratorCardApiRequest().deleteGroup(id);
            break;
          case "subGroup":
            result = await new OrderConfiguratorCardApiRequest().deleteSubGroup(id);
            break;
          case "attribute":
            result = await new OrderConfiguratorCardApiRequest().deleteAttribute(id);
            break;
        }
        if (result.isError) {
          throw result;
        }

        dispatch(ProposalDiseaseCardThunk.getList(orderId));
        successPopup(result.message);
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  getShowBtnAddCustomBlock(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      try {
        const result = await new OrderConfiguratorCardApiRequest().isActiveCreateButton();
        if (result.isError) {
          throw result;
        }
        dispatch(ProposalDiseaseCardAction.showBtnAddCustomBlock(result.result));
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  updateGroupDescription(groupId: number, description: string): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new OrderConfiguratorCardApiRequest().updateGroupDescription(groupId, description);
        if (result.isError) {
          throw result;
        }
        successPopup(result.result);
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },
};
