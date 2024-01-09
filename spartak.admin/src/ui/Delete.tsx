import { DeleteOutlined } from "@ant-design/icons";
import { Button, ButtonProps, Tooltip } from "antd";
import { theme } from "assets/theme/theme";
import { t } from "i18next";
import styled from "styled-components";

type Props = ButtonProps & {
  color?: string;
};

export const Delete = ({ color, ...props }: Props) => {
  return (
    <Tooltip title={t("allPages.delete")}>
      <DeleteBtn shape="circle" icon={<DeleteOutlined style={{ color: color || theme.colors.red }} />} {...props} />
    </Tooltip>
  );
};

const DeleteBtn = styled(Button)`
  border: 0;
`;
