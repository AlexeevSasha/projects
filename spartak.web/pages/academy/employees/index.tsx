import { GetStaticProps } from "next";
import React from "react";
import seodata from "../../../public/seo/seoData.json";
import { coachesRepository } from "../../../src/api/coachesRepository";
import { ICoach } from "../../../src/api/dto/ICoach";
import { ILeadership } from "../../../src/api/dto/ILeadership";
import { leadershipRepository } from "../../../src/api/leadershipRepository";
import { staffRepository } from "../../../src/api/staffRepository";
import { AcademyLayout } from "../../../src/componentPages/pageAcademy/academyLayout/academyLayout";
import { TeamLineUp } from "../../../src/componentPages/pageAcademy/employees/employeesLineUp";

interface IProps {
  leadership?: ILeadership[];
  coaches?: ICoach[];
  staff?: ICoach[];
}

export default function Index({ leadership, coaches, staff }: IProps) {
  return <TeamLineUp leadership={leadership} coaches={coaches} staff={staff} />;
}
Index.getLayout = AcademyLayout;

export const getStaticProps: GetStaticProps = async () => {
  const [leadershipRes, coachesRes, staffRes] = await Promise.allSettled([
    leadershipRepository.fetchLeadership({
      Status: "Published",
      sorting: "SortOrder asc",
      Section: "Academy",
    }),
    coachesRepository.fetchCoaches({
      coachSection: "Academy",
      Status: "Published",
      sorting: "SortOrder asc",
    }),
    staffRepository.fetchStaff({
      Status: "Published",
      sorting: "SortOrder asc",
      StaffSection: "Academy",
    }),
  ]);
  const leadership = leadershipRes.status === "fulfilled" ? leadershipRes?.value?.value : [];
  const coaches = coachesRes.status === "fulfilled" ? coachesRes?.value?.value : [];
  const staff = staffRes.status === "fulfilled" ? staffRes?.value?.value : [];

  return {
    props: {
      leadership,
      coaches,
      staff,
      metaTags: (seodata as Record<string, any>)["/academy/employee"] || null,
      title: (seodata as Record<string, any>)["/academy/employee"].h1,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_LONG),
  };
};
