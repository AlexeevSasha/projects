import { BaseRequest } from "./baseRequest";
import { IOrderBlock } from "../common/interfaces/order/IOrderBlock";
import { IOrderConfInfo } from "../common/interfaces/order/IOrderConfInfo";
import { IOrderConfGroup } from "../common/interfaces/order/IOrderConfGroup";
import { IControllerResponse } from "../common/interfaces/response/IControllerResponse";
import { IOrderConfSubGroup } from "../common/interfaces/order/IOrderConfSubGroup";
import { IOrderConfAttribute } from "../common/interfaces/order/IOrderConfAttribute";
import { IOrderConfBlock } from "../common/interfaces/order/IOrderConfBlock";
import { ISortElements } from "../common/interfaces/ISortElements";
import { INamed } from "../common/interfaces/INamed";
import { IConfiguratorValue } from "../common/interfaces/IConfiguratorValue";
import { getObjectFlatter } from "../common/helpers/getObjectFlatter";

export class OrderConfiguratorCardApiRequest extends BaseRequest {
  createCustomBlock(block: IOrderBlock): Promise<IControllerResponse<number>> {
    return this.fetch("/api/OrderConfiguratorCard/CreateCustomBlock", {
      method: "POST",
      body: JSON.stringify(block),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getOrderConfiguratorInfo(orderId: number): Promise<IControllerResponse<IOrderConfInfo>> {
    return this.fetch(`/api/OrderConfiguratorCard/order/${orderId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createGroup(groupDto: IOrderConfGroup): Promise<IControllerResponse<number>> {
    return this.fetch("/api/OrderConfiguratorCard/Group", {
      method: "POST",
      body: JSON.stringify(groupDto),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createSubGroup(subGroupDto: IOrderConfSubGroup): Promise<IControllerResponse<number>> {
    return this.fetch("/api/OrderConfiguratorCard/SubGroup", {
      method: "POST",
      body: JSON.stringify(subGroupDto),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createDefaultSubGroup(idOrderConfGroup: number): Promise<IControllerResponse<number>> {
    return this.fetch(`/api/OrderConfiguratorCard/SubGroup/Default/${idOrderConfGroup}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  createAttribute(attributeDto: IOrderConfAttribute): Promise<IControllerResponse<number>> {
    return this.fetch("/api/OrderConfiguratorCard/Attribute", {
      method: "POST",
      body: JSON.stringify(attributeDto),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateSubGroup(subGroupId: number, groupDto: IOrderConfSubGroup): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/OrderConfiguratorCard/SubGroup/${subGroupId}`, {
      method: "PUT",
      body: JSON.stringify(groupDto),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateAttribute(attributeId: number, attributeDto: IOrderConfAttribute): Promise<IControllerResponse<string>> {
    return this.fetch(`/api/OrderConfiguratorCard/Attribute/${attributeId}`, {
      method: "PUT",
      body: JSON.stringify(attributeDto),
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateBlock(blockId: number, blockDto: IOrderConfBlock): Promise<IControllerResponse<any>> {
    return this.fetch(`/api/OrderConfiguratorCard/Block/${blockId}`, {
      method: "PUT",
      body: JSON.stringify(blockDto),
    }).catch(BaseRequest.handleError);
  }

  updateGroupSort(sortElements: ISortElements): Promise<IControllerResponse<any>> {
    return this.fetch("/api/OrderConfiguratorCard/Sort/Group", {
      method: "PUT",
      body: JSON.stringify(sortElements),
    }).catch(BaseRequest.handleError);
  }

  updateBlockSort(sortElements: ISortElements): Promise<IControllerResponse<any>> {
    return this.fetch("/api/OrderConfiguratorCard/Sort/Block", {
      method: "PUT",
      body: JSON.stringify(sortElements),
    }).catch(BaseRequest.handleError);
  }

  updateSubGroupSort(sortElements: ISortElements): Promise<IControllerResponse<any>> {
    return this.fetch("/api/OrderConfiguratorCard/Sort/SubGroup", {
      method: "PUT",
      body: JSON.stringify(sortElements),
    }).catch(BaseRequest.handleError);
  }

  updateAttributeSort(sortElements: ISortElements): Promise<IControllerResponse<any>> {
    return this.fetch("/api/OrderConfiguratorCard/Sort/Attribute", {
      method: "PUT",
      body: JSON.stringify(sortElements),
    }).catch(BaseRequest.handleError);
  }

  deleteAttribute(attributeId: number): Promise<IControllerResponse<any>> {
    return this.fetch(`/api/OrderConfiguratorCard/Attribute/${attributeId}`, {
      method: "DELETE",
    }).catch(BaseRequest.handleError);
  }

  deleteSubGroup(subGroupId: number): Promise<IControllerResponse<any>> {
    return this.fetch(`/api/OrderConfiguratorCard/SubGroup/${subGroupId}`, {
      method: "DELETE",
    }).catch(BaseRequest.handleError);
  }

  deleteGroup(groupId: number): Promise<IControllerResponse<any>> {
    return this.fetch(
      `/api/OrderConfiguratorCard/Group/${groupId}`,

      {
        method: "DELETE",
      }
    ).catch(BaseRequest.handleError);
  }

  deleteBlock(blockId: number): Promise<IControllerResponse<IControllerResponse<any>>> {
    return this.fetch(`/api/OrderConfiguratorCard/Block/${blockId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getConfGroups(orderConfBlockId: number): Promise<IControllerResponse<INamed[]>> {
    return this.fetch(`/api/OrderConfiguratorCard/Dictionary/ConfGroups/${orderConfBlockId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getAttributesNsiDict(orderConfSubGroupId: number): Promise<IControllerResponse<IConfiguratorValue[]>> {
    return this.fetch(`/api/OrderConfiguratorCard/Dictionary/AttributeNsiDict/${orderConfSubGroupId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getSubGroupsNsiDict(
    orderConfGroupId: number,
    firstSubGroupName: string
  ): Promise<IControllerResponse<IConfiguratorValue[]>> {
    const p: { [key: string]: any } = {};
    p["firstSubGroupName"] = firstSubGroupName;
    return this.fetch(
      `/api/OrderConfiguratorCard/Dictionary/SubGroupNsiDict/${orderConfGroupId}?${getObjectFlatter()(p)}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  isActiveCreateButton(): Promise<IControllerResponse<boolean>> {
    return this.fetch("/api/OrderConfiguratorCard/isActiveCreateButton", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  updateGroupDescription(groupId: number, description: string): Promise<IControllerResponse<string>> {
    return this.fetch(
      `/api/OrderConfiguratorCard/UpdateGroupDescription/${groupId}?description=${encodeURIComponent(description)}`,
      {
        method: "PUT",
      }
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
