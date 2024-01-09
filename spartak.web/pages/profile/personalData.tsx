import { GetServerSideProps } from "next";
// @ts-ignore
import { ReCaptchaProvider } from "next-recaptcha-v3";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import styled from "styled-components";
import seodata from "../../public/seo/seoData.json";
import { theme } from "../../src/assets/theme/theme";
import { ChangePasswordForm } from "../../src/componentPages/pageProfile/personalDataForm/changePasswordForm";
import { FanCardForm } from "../../src/componentPages/pageProfile/personalDataForm/fanCardForm";
import { FanIdForm } from "../../src/componentPages/pageProfile/personalDataForm/fanIdForm";
import { PrivateForm } from "../../src/componentPages/pageProfile/personalDataForm/privateForm";
import { getProfileLayout } from "../../src/componentPages/pageProfile/profileLayout";
import { ContainerContent } from "../../src/components/containers/containerContent";
import { DataContext } from "../../src/core/dataProvider";

export default function PersonalData() {
  const [isRfUser, setIsRfUser] = useState(true);
  const { locale = "ru" } = useRouter();
  const { auth: { user = undefined } = {} } = useContext(DataContext);

  return (
    <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} useRecaptchaNet={true}>
      <StyledContainer>
        {/* {user?.chairPlottingStatus === "Available" ? <Nameplate /> : null} */}
        <FanIdForm />
        <PrivateForm isRfUser={isRfUser} setIsRfUser={setIsRfUser} />
        <ChangePasswordForm />
        {isRfUser && locale === "ru" && <FanCardForm />}
      </StyledContainer>
    </ReCaptchaProvider>
  );
}

PersonalData.getLayout = getProfileLayout;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Cache-Control", "private, no-cache, no-store, max-age=0, must-revalidate");
  return {
    props: {
      metaTags: (seodata as Record<string, any>)["/profile/personalData"] || null,
    },
  };
};

const StyledContainer = styled(ContainerContent)`
  flex-direction: column;
  color: ${theme.colors.white};
  padding: 3.49vw 0 5.21vw;
  gap: 0.68vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.22vw 0 10.43vw;
    gap: 0;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 10.67vw 0 10.67vw;
  }
`;
