import { IntegralDiseaseEpicrisisApiRequest } from "api/integralDiseaseEpicrisisApiRequest";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IconLoading } from "common/components/Icon/IconLoading";
import { Title } from "../../common/ui/Title/Title";

export const PagePatientDashboard = () => {
  const { registerId, patientId } = useParams<{ registerId: string; patientId: string }>();

  const [authUrl, setAuthUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    new IntegralDiseaseEpicrisisApiRequest().getPatientRouteLink(Number(registerId), patientId).then((request) => {
      setAuthUrl(request.result?.authUrl || "");
      setLoading(false);
    });
  }, [patientId, registerId]);

  if (loading) return <IconLoading />;

  return (
    <>
      {authUrl ? (
        <iframe
          id="frame"
          src={authUrl}
          frameBorder="0"
          style={{ marginTop: "30px", height: "600px" }}
          title={"frame"}
        />
      ) : (
        <Title style={{ marginTop: "30px" }}>Отсутствует настройка отображения отчёта по маршруту</Title>
      )}
      <div id="openModal" />
    </>
  );
};
