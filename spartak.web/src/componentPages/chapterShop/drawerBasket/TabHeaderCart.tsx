import React from "react";
import { EnumCartTabs } from "../../../common/interfaces/EnumDrawerTabs";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { useRouter } from "next/router";
import { lang } from "../../../../public/locales/lang";

interface Props {
  setCurrentStep: React.Dispatch<React.SetStateAction<EnumCartTabs>>;
  currentStep: EnumCartTabs;
  steps: (keyof typeof EnumCartTabs)[];
}

export const TabHeaderCart = ({ setCurrentStep, currentStep, steps }: Props) => {
  const { locale = "ru" } = useRouter();

  return (
    <Tabs>
      {steps.map((step, index) => (
        <TabButton
          onClick={() => setCurrentStep(EnumCartTabs[step])}
          key={index}
          active={currentStep === EnumCartTabs[step]}
        >
          {lang[locale].shop[step]}
        </TabButton>
      ))}
    </Tabs>
  );
};
const Tabs = styled.nav`
  display: flex;
  flex-basis: min-content;
  padding: 0 1.25vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 600;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 0 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 0 4.27vw;
  }
`;
const TabButton = styled.a<{ active: boolean }>`
  width: 100%;
  font-size: 0.73vw;
  font-weight: 500;
  text-transform: uppercase;
  color: ${theme.colors.black};
  padding: 0.83vw 1.67vw;

  text-decoration: none;
  text-align: center;
  cursor: pointer;
  margin-bottom: 1.35vw;
  box-shadow: ${({ active }) => active && "inset 0px -4px 0px #cc122d;"};

  &:hover {
    box-shadow: ${({ active }) => active && "inset 0px -4px 0px #cc122d;"};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
    margin-bottom: 3.13vw;
    padding-bottom: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    margin-bottom: 6.4vw;
    padding-bottom: 4.27vw;
  }
`;
