import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { theme } from "assets/theme/theme";
import { BannerEntity } from "common/interfaces/banners";
import styled from "styled-components";

interface IProps {
  onClick: () => void;
  value: BannerEntity["IsHidden"];
}

export const IconEye = (props: IProps) => {
  return <Container onClick={props.onClick}>{props.value ? <EyeInvisibleOutlined /> : <EyeOutlined />}</Container>;
};

const Container = styled.div`
  margin-right: 16px;
  color: ${theme.colors.red};
  cursor: pointer;
`;
