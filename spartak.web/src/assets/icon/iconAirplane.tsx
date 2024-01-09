import styled from "styled-components";
import { theme } from "../theme/theme";

interface IProps {
  color?: string;
}

export const IconAirplane = (props: IProps) => {
  return (
    <Svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M26.1924 10.0501L21.9859 13.9999L25.9859 24.9999L22.9859 27.9999L17.0099 19.2525L13.9859 21.9999V24.9999L10.9859 27.9999L9.21184 22.7681L3.9859 20.9999L6.9859 17.9999H9.9859L12.9859 14.9999L3.9859 8.99989L6.9859 5.99989L17.9859 9.99989L21.9497 5.8075L21.8646 5.87857C22.143 5.59949 22.4738 5.37804 22.8379 5.22687C23.202 5.0757 23.5923 4.99778 23.9866 4.99756C24.3808 4.99734 24.7712 5.07483 25.1355 5.2256C25.4998 5.37638 25.8308 5.59747 26.1096 5.87624C26.3883 6.15501 26.6094 6.486 26.7602 6.85027C26.911 7.21455 26.9884 7.60497 26.9882 7.99921C26.988 8.39345 26.9101 8.78379 26.7589 9.14789C26.6078 9.512 26.3863 9.84274 26.1072 10.1212L26.1924 10.0501Z"
        stroke={props.color ? props.color : "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const Svg = styled.svg`
  width: 1.67vw;
  height: 1.67vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 4.17vw;
    height: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 8.53vw;
    height: 8.53vw;
  }
`;
