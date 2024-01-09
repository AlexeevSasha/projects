import { useRouter } from "next/router";
import styled from "styled-components";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { RedInfoBanner } from "../../../components/redInfoBanner/redInfoBanner";
import { ITextOnRedBackground } from "../interfaces/ITextOnRedBackground";

interface IProps {
  info?: ITextOnRedBackground;
}

// Экспортировать вне модуля только через конструкцию CMS.[Component]
export const TextOnRedBackground = (props: IProps) => {
  const { locale } = useRouter();

  return getLocalValue(props.info?.text1, locale) && getLocalValue(props.info?.text2, locale) ? (
    <RedInfoBanner>
      <InfoBlock>
        <div
          dangerouslySetInnerHTML={{
            __html: getLocalValue(props.info?.text1, locale) || "",
          }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: getLocalValue(props.info?.text2, locale) || "",
          }}
        />
      </InfoBlock>
    </RedInfoBanner>
  ) : null;
};

const InfoBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 0;
  padding: 2.08vw;
  gap: 3.54vw;

  p {
    margin: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 3.13vw;
    padding: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 1fr;
    gap: 4.27vw;
    padding: 4.27vw;
  }
`;
