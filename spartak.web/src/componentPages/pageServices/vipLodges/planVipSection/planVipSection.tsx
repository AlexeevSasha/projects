import { useRouter } from "next/router";
import styled from "styled-components";
import { IServicesVip } from "../../../../api/dto/IServicesVip";
import { getLocalValue } from "../../../../assets/helpers/getLocalValue";
import { theme } from "../../../../assets/theme/theme";
import { ContainerContent } from "../../../../components/containers/containerContent";
import { NextImage } from "../../../../ui/nextImage/nextImage";

interface IProps {
  planImage?: IServicesVip["planImage"];
}

export const PlanVipSection = (props: IProps) => {
  const { locale = "ru" } = useRouter();

  return props.planImage ? (
    <StyledContainer>
      <StyledPlan>
        <NextImage src={getLocalValue(props.planImage, locale)} />
      </StyledPlan>
    </StyledContainer>
  ) : null;
};

const StyledContainer = styled(ContainerContent)`
  flex-direction: column;

  p {
    margin: 0;
  }
`;

const StyledPlan = styled.section`
  background-size: 100% auto;
  height: 26.3vw;
  width: 100%;
  margin-bottom: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 4.27vw;
  }
`;
