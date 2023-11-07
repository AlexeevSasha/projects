type OptionsCompanyT = {
  title: string;
  description: string;
};

type CertificatesAndLicensesT = {
  title: string;
  size: string;
};

export type CompanyT = {
  title: string;
  description: string;
  companyValues: OptionsCompanyT;
  principlesWork: OptionsCompanyT;
  certificatesAndLicenses: {
    title: string;
    files: CertificatesAndLicensesT[];
  };
  contacts: {
    title: string;
    description: string;
    info: {
      type: "phone" | "email";
      title: string;
      description: string;
    }[];
  };
};
