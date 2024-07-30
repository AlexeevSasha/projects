import styled from "styled-components";
import { DeleteOutlined, DownloadOutlined, EditOutlined, FlagOutlined } from "@ant-design/icons";
import { theme } from "../assets/theme/theme";
import { Button } from "antd";

export const EditAction = styled(EditOutlined)`
  cursor: pointer;
  color: ${theme.colors.default};
`;

export const DownLoadAction = styled(DownloadOutlined)`
  cursor: pointer;
  color: ${theme.colors.default};
`;

export const EndAction = styled(FlagOutlined)`
  cursor: pointer;
  color: ${theme.colors.default};
`;

export const EditActionWithoutText = styled(EditOutlined)`
  cursor: pointer;
  color: ${theme.colors.blue};
`;

export const DeleteAction = styled(Button)`
  color: ${theme.colors.red};
`;
