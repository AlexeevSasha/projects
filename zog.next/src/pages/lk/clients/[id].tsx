import { useSession } from "next-auth/react";
import { DiagnoseDiagram } from "../../../modules/diagnoseDiagram/components/diagnoseDiagram";
import { Layout } from "../../../modules/layout/components/layout";
import { ChooseConsultant } from "../../../modules/сhooseConsultant/components/chooseConsultant";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useEffect } from "react";
import { IFilesGoogleDrive } from "../../../common/interfaces/FilesGoogleDrive";
import { filesGoogleDrive } from "../../../common/constants/filesGoogleDrive";

interface IProps {
  clientsPhoto: IFilesGoogleDrive[];
  clientsAudio: IFilesGoogleDrive[];
}

export default function PageClientId({ clientsPhoto, clientsAudio }: IProps) {
  const { data } = useSession();

  useEffect(() => {
    filesGoogleDrive.setImage(clientsPhoto);
    filesGoogleDrive.setAudio(clientsAudio);
  }, []);

  return (
    <>
      {data?.user?.userRole === "Admin" ? <ChooseConsultant /> : null}
      <DiagnoseDiagram />
    </>
  );
}

PageClientId.getLayout = Layout.Auth;
PageClientId.auth = {
  roles: ["Admin", "Consultant", "Client"],
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { clientsPhoto, clientsAudio } = await axios
    .get(`${process.env.NEXTAUTH_URL}/api/upload/order/get`)
    .then((res) => res.data.data);

  return { props: { clientsPhoto, clientsAudio } };
};
