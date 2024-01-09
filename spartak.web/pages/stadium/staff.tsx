import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import seodata from "../../public/seo/seoData.json";
import { cmsRepository } from "../../src/api/cmsRepository";
import { IStadiumStaff } from "../../src/api/dto/IStadiumStaff";
import { getLocalValue } from "../../src/assets/helpers/getLocalValue";
import { StadiumBanner } from "../../src/componentPages/pageStadium/stadiumBanner/stadiumBanner";
import { AnswerQuestionDropdownList } from "../../src/componentPages/pageStadium/staffTeam/answerQuestionDropDown";
import { ConditionsDropdownList } from "../../src/componentPages/pageStadium/staffTeam/conditionsDropDown";
import { SpartakEventTeam } from "../../src/componentPages/pageStadium/staffTeam/spartakEventTeam";
import { GetLayout } from "../../src/components/layout/getLayout";
import { SendFormProposal } from "../../src/components/sendFormProposal/sendFormPropposal";

interface IProps {
  staff?: IStadiumStaff;
}

export default function Staff(props: IProps) {
  const { locale = "ru" } = useRouter();

  return (
    <>
      <StadiumBanner
        title={getLocalValue(props.staff?.mainInfo?.title, locale)}
        banner={getLocalValue(props.staff?.mainInfo?.previewImg, locale) || "/images/stadium/about/banner_v1.0.0.png"}
      />
      <SpartakEventTeam eventTeamData={props.staff} />
      <AnswerQuestionDropdownList answerQuestionData={props.staff?.questionAnswer} />
      <ConditionsDropdownList admissionConditions={props.staff?.admissionConditions} />
      <SendFormProposal
        title={"Связаться с менеджером"}
        description="Оставьте ваши контакты и мы свяжемся для уточнения деталей."
        image={"/images/services/StaffForm_v1.0.0.png"}
        inputOfBirthDay
        feedbackType="personnel"
      />
    </>
  );
}

Staff.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async () => {
  const res = (await cmsRepository.fetchCms({ Type: "stadiumStaff" })).value[0];
  const staff = res?.JsonData ? JSON.parse(res.JsonData) : null;

  const dataJSON = require("../../public/mockJSON/staff.json");
  staff.partOfTeam = { ...dataJSON?.partOfTeam };

  return {
    props: {
      metaTags: staff?.metaTags || (seodata as Record<string, any>)["/stadium/staff"] || null,
      staff,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};
