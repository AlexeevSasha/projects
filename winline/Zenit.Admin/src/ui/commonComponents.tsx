import styled from "styled-components";
import { Card, Layout, Menu, Space, Typography } from "antd";
import { theme } from "../assets/theme/theme";

const { Header, Content } = Layout;
const { Title } = Typography;

export const HeaderStyled = styled(Header)<{ submenu?: boolean }>`
  justify-content: space-between;
  display: flex;
  align-items: center;
  padding: 0 24px;
  background-color: ${theme.colors.white};
`;

export const TitleStyled = styled(Title)`
  margin: 0 !important;
`;

export const ContentStyled = styled(Content)`
  padding: 24px;
  margin: 0;
`;

export const FallBack = styled.div`
  background-color: rgb(240, 242, 245);
`;

export const SubTitle = styled(TitleStyled)`
  font-size: 14px !important;
  margin-bottom: 8px !important;
  margin-top: 8px !important;
`;

export const MainCard = styled(Space)<{ alignSelf?: string }>`
  & > div.ant-space-item:nth-of-type(2) {
    align-self: ${({ alignSelf }) => (alignSelf === "flex-start" ? "flex-start" : "initial")};
  }
  & > div.ant-space-item:last-child {
    align-self: ${({ alignSelf }) => (!alignSelf ? "stretch" : "initial")};
  }
`;

export const CardBody = styled(Card)`
  & .ant-card-body {
    padding: 24px 24px 0 !important;
  }
`;

export const UploadText = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 30%;
  left: 30%;

  & svg {
    margin-bottom: 10px;
    width: 32px;
    height: 32px;
    fill: ${theme.colors.middleGray};
  }
`;

export const MenuItemStyles = styled(Menu.Item)`
  margin: 0 !important;
  background: ${theme.colors.neroGray};
  color: ${theme.colors.white};
`;

export const CardTitle = styled(Title)`
  font-weight: 600;
  font-size: 20px;
  line-height: 28px !important;
`;

export const ImgBlock = styled.div`
  display: flex;
  grid-gap: 10%;
`;

export const FiltersButtonBlock = styled.div`
  display: flex;
  justify-content: space-between;
  grid-gap: 24px;
  @media (max-width: 1000px) {
    flex-direction: column;
    grid-gap: 0;
  }
`;
