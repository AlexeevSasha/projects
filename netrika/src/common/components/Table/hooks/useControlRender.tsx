import { IControlTable } from "../TableBody";
import React, { useCallback } from "react";
import { ConnectingLine, ContainerControl, IconContainerFloatingmes, Td } from "../UIcomponent/UIcomponent";
import { ru } from "../../../lang/ru";
import { IconEdit } from "../../Icon/IconEdit";
import { IconEye } from "../../Icon/IconEye";
import { IconDownloadLink } from "../../Icon/IconDownloadLink";
import { IconSettings } from "../../Icon/IconSettings";
import { CheckBox } from "../../../ui/Input/CheckBox";
import { IconGroupCheck } from "../../Icon/IconGroupCheck";
import { IconGroupEmpty } from "../../Icon/IconGroupEmpty";
import { IconUpdate } from "../../Icon/IconUpdate";
import { ModalDeleteWIthIcon } from "../../Modal/ModalDeleteWIthIcon";

interface IProps {
  control?: IControlTable[];
  disabledApproveDelete?: boolean;
  checkControl?: ((id: number, check: boolean) => void) | false;
  checkList?: number[];
}

export const useControlRender = (props: IProps) => {
  const clickDelete = useCallback(async (item: any, rowInfo: any) => {
    await item.onClick(item.value ? rowInfo[item.value] : null);
  }, []);

  const controlRender = useCallback(
    (rowInfo: any, ind: number) => {
      return props.control?.length === 1 && props.control?.find((item) => item.name === "clickRow") ? null : (
        <Td id={`column_control_${rowInfo.id || ind + 1}`}>
          <ContainerControl>
            {props.control?.map((item, index) => {
              switch (item.name) {
                case "update":
                  return rowInfo.isDefault ? (
                    <span style={{ width: "36px" }} />
                  ) : (
                    <IconContainerFloatingmes
                      key={index}
                      id={`update_${rowInfo.id || ind + 1}`}
                      title={ru.floatingmes.update}
                      onClick={() => (item.onClick ? item.onClick(item.value ? rowInfo[item.value] : null) : {})}
                    >
                      <IconUpdate />
                    </IconContainerFloatingmes>
                  );
                case "status":
                  return (
                    <IconContainerFloatingmes
                      key={index}
                      id={`status_${rowInfo.id || ind + 1}`}
                      title={ru.floatingmes.edit}
                      onClick={() => (item.onClick ? item.onClick(item.value ? rowInfo[item.value] : null) : {})}
                    >
                      <IconEdit />
                    </IconContainerFloatingmes>
                  );

                case "edit":
                  return rowInfo.isDefault ? (
                    <span style={{ width: "36px" }} />
                  ) : (
                    <IconContainerFloatingmes
                      key={index}
                      id={`edit_${rowInfo.id || ind + 1}`}
                      title={ru.floatingmes.edit}
                      onClick={() => (item.onClick ? item.onClick(item.value ? rowInfo[item.value] : null) : {})}
                    >
                      <IconEdit />
                    </IconContainerFloatingmes>
                  );

                case "watch":
                  return (
                    <IconContainerFloatingmes
                      key={index}
                      id={`watch_${rowInfo.id || ind + 1}`}
                      title={"Открыть"}
                      onClick={() => (item.onClick ? item.onClick(item.value ? rowInfo[item.value] : null) : {})}
                    >
                      <IconEye />
                    </IconContainerFloatingmes>
                  );

                case "download":
                  return (
                    <IconContainerFloatingmes
                      key={index}
                      id={`download_${rowInfo.id || ind + 1}`}
                      title={ru.floatingmes.download}
                      onClick={() =>
                        item.onClick ? item.onClick(item.value ? rowInfo[item.value] : null, rowInfo.name) : {}
                      }
                    >
                      <IconDownloadLink />
                    </IconContainerFloatingmes>
                  );

                case "settings":
                  return (
                    <IconContainerFloatingmes
                      key={index}
                      id={`settings_${rowInfo.id || ind + 1}`}
                      title={ru.floatingmes.settings}
                      onClick={() =>
                        item.onClick ? item.onClick(item.value ? rowInfo[item.value] : null, rowInfo.name) : {}
                      }
                    >
                      <IconSettings />
                    </IconContainerFloatingmes>
                  );
                case "check":
                  return rowInfo.isDefault ? (
                    <span style={{ width: "36px" }} />
                  ) : (
                    <IconContainerFloatingmes
                      key={index}
                      title={"Доступность для пользователей"}
                      id={`check_${rowInfo.id || ind + 1}`}
                      onClick={() => (item.onClick ? item.onClick(rowInfo.id) : {})}
                    >
                      <CheckBox
                        check={item.value ? rowInfo[item.value] : false}
                        checkId={rowInfo.id}
                        hideMarginLeft={true}
                      />
                    </IconContainerFloatingmes>
                  );

                case "delete":
                  return rowInfo.isDefault ? (
                    <span style={{ width: "36px" }} />
                  ) : (
                    <ModalDeleteWIthIcon
                      {...item.modalSettings}
                      key={index}
                      id={`delete_${rowInfo.id || ind + 1}`}
                      onDelete={() => clickDelete(item, rowInfo)}
                    />
                  );

                default:
                  return null;
              }
            })}
          </ContainerControl>
        </Td>
      );
    },
    [props.control, clickDelete]
  );

  const checkControl = useCallback(
    (id: number) => {
      return props.checkControl ? (
        <Td style={{ position: "relative", width: "20px" }}>
          <ConnectingLine />
          {props.checkList && props.checkList.find((item: number) => id === item) ? (
            <span id={"check_register_on"} onClick={() => (props.checkControl ? props.checkControl(id, false) : {})}>
              <IconGroupCheck />
            </span>
          ) : (
            <span id={"check_register_off"} onClick={() => (props.checkControl ? props.checkControl(id, true) : {})}>
              <IconGroupEmpty />
            </span>
          )}
        </Td>
      ) : props.checkControl === false ? (
        <Td style={{ position: "relative", width: "20px" }} />
      ) : null;
    },
    // eslint-disable-next-line
    [props.checkControl, props.checkList]
  );

  const clickRow = useCallback(
    (rowInfo: any) => {
      const control = props.control?.find((item) => item.name === "clickRow");
      if (control?.onClick) control?.onClick(control.value ? rowInfo[control.value] : null);
    },
    [props.control]
  );

  return { controlRender, checkControl, clickRow };
};
