import { Modal, Typography } from "antd";
import { LogType } from "common/interfaces/systemLog";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { getEmployeeById } from "../../store/employeeView/employeeViewActionAsync";
import { employeeViewActions } from "../../store/employeeView/employeeView";
import { useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { employeeSelector } from "../../store/employeeView/employeeViewSelectors";
import { formatInMoscowDate } from "../../common/helpers/getFormatedDate";

type Props = {
  log?: LogType;
  onClose: () => void;
};

export const EmployeeVeiw = ({ log, onClose }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const employee = useSelector(employeeSelector);

  useEffect(() => {
    if (log) {
      dispatch(getEmployeeById(log.UserId)).unwrap();
    }

    return () => {
      dispatch(employeeViewActions.resetEmployee());
    };
  }, [log]);

  return (
    <Modal title={null} visible={!!log} footer={null} onCancel={onClose}>
      <Title>{t("systemLog.employeeCard")}</Title>
      {employee ? (
        <>
          <ModalRow>
            <Typography.Text>{t("systemLog.employeeName")}</Typography.Text>
            <Typography.Text type="secondary">{employee.Name}</Typography.Text>
          </ModalRow>
          <ModalRow>
            <Typography.Text>{t("systemLog.mail")}</Typography.Text>
            <Typography.Text type="secondary">{employee.Email}</Typography.Text>
          </ModalRow>
          <ModalRow>
            <Typography.Text>{t("allPages.createdUtc")}</Typography.Text>
            <Typography.Text type="secondary">{formatInMoscowDate(employee.CreatedUtc)}</Typography.Text>
          </ModalRow>
        </>
      ) : (
        <>
          <ModalRow>
            <Typography.Text>{t("systemLog.employeeName")}</Typography.Text>
          </ModalRow>
          <ModalRow>
            <Typography.Text>{t("systemLog.mail")}</Typography.Text>
          </ModalRow>
          <ModalRow>
            <Typography.Text>{t("allPages.createdUtc")}</Typography.Text>
          </ModalRow>
        </>
      )}
    </Modal>
  );
};

const Title = styled.div`
  font-size: 16px;
  margin-bottom: 32px;
`;

const ModalRow = styled.div`
  margin-bottom: 8px;
  display: flex;
  grid-gap: 8px;

  & > *:first-child::after {
    content: ": ";
  }
`;
