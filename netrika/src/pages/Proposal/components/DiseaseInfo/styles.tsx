import { theme } from "common/styles/theme";
import { styled } from "../../../../common/styles/styled";

export const ContainerShow = styled.span`
  z-index: 1;
  width: 20px;
`;

export const Container = styled.div``;

export const BlockContainer = styled.div`
  justify-content: space-between;
  background: ${theme.colors.lightGray};
  display: flex;
  padding: 24px;
  border: 1px solid ${theme.colors.gray};
`;

export const TitleContainer = styled.div`
  font-weight: 600;
  margin-left: 20px;
  display: flex;
`;

export const TextContainer = styled.div`
  text-decoration-line: underline;
  color: ${theme.colors.green};
  cursor: pointer;
  margin-left: 20px;
  display: flex;
  align-items: center;
`;

export const GroupContainer = styled.div`
  position: relative;
  background: ${theme.colors.white};
  padding: 24px 24px 24px 48px;
  display: flex;
  transition: height 1s ease-in-out;
`;

export const SubGroupContainer = styled(GroupContainer)`
  padding: 24px 24px 24px 72px;
`;

export const AttributesContainer = styled(GroupContainer)`
  padding: 24px 24px 24px 96px;
`;

export const AttributesText = styled.div`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray};
  box-sizing: border-box;
  border-radius: 5px;
  min-width: 240px;
  padding: 12px 16px;
`;

export const GroupConnectingLine = styled.div<{ first?: boolean; showIconOpenBlock?: boolean; height?: string }>`
  position: absolute;
  border: 1px solid ${theme.colors.grayBlue};
  border-right: none;
  height: ${(props) => (props.first ? props.height || "87%" : "100%")};
  width: ${(props) => (props.showIconOpenBlock ? "14px" : "34px")};
  border-top: none;
  bottom: 39px;
  left: 34px;
`;

export const SubGroupConnectingLine = styled(GroupConnectingLine)`
  bottom: 39px;
  left: 57px;
`;
export const AttributesConnectingLine = styled(GroupConnectingLine)`
  bottom: 47px;
  height: ${(props) => (props.first ? "80%" : "100%")};
  left: 81px;
`;

export const ExternalGroupConnectingLine = styled.div<{ last?: boolean }>`
  position: absolute;
  border-left: 1px solid ${theme.colors.grayBlue};
  border-right: none;
  height: 100%;
  bottom: 39px;
  left: 34px;
  display: ${(props) => (props.last ? "none" : "block")};
`;

export const ExternalSubGroupConnectingLine = styled(ExternalGroupConnectingLine)`
  bottom: 39px;
  left: 34px;
`;

export const ExternalAttributesConnectingLine = styled(ExternalGroupConnectingLine)`
  bottom: 39px;
  left: 57px;
`;

export const AttributeControllerContainer = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
`;

const AttributeIconContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0 8px;

  :before {
    display: none;
    position: absolute;
    transform: translateX(-35%);
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 19px;
    letter-spacing: 0.0025em;
    color: ${theme.colors.hightBlue};

    background: ${theme.colors.white};
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
    border-radius: 2px;
    max-width: 400px;
    z-index: 999;

    top: 70px;
  }

  :hover {
    :before {
      display: block;
    }
  }
`;

export const AttributeIconEditContainer = styled(AttributeIconContainer)`
  :before {
    content: "Редактировать";
  }
`;

export const AttributeIconDeleteContainer = styled(AttributeIconContainer)`
  :before {
    content: "Удалить";
  }
`;
