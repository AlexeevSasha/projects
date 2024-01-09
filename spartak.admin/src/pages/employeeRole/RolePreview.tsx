import { Modal, Typography } from "antd";
import { EmployeeRoleType } from "common/interfaces/employee";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const { Paragraph } = Typography;

type Props = {
  role?: EmployeeRoleType;
  onClose: () => void;
};

export const RolePreview = ({ role, onClose }: Props) => {
  const { t } = useTranslation();

  return (
    <Modal title={role?.Name} visible={!!role} footer={null} onCancel={onClose}>
      {role?.Policies.includes("fullAccess") ? (
        <ItemLaw style={{ maxWidth: "250px" }}>
          <UpText>{t("roles.fullAccess")}</UpText>
          <DownText>{t("roles.fullAccessDescription")}</DownText>
        </ItemLaw>
      ) : (
        <CustomModel>
          {role?.Policies.map((value) => (
            <Typography.Text key={value}>{t(`roles.policies.${value}`)}</Typography.Text>
          ))}
        </CustomModel>
      )}
    </Modal>
  );
};

const CustomModel = styled.div`
  display: flex;
  flex-flow: column;
`;

const ItemLaw = styled.div`
  width: 100%;
  max-width: 220px;
  margin-right: 35px;
`;

const UpText = styled(Paragraph)`
  font-size: 16px;
  line-height: 24px;
`;

const DownText = styled(Paragraph)`
  font-size: 14px;
  line-height: 22px;
`;
