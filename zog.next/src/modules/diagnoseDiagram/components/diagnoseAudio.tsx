import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { OrderT } from "../../order/interfaces/OrderT";
import { getLanguage } from "../../../../public/locales/lang";
import { filesGoogleDrive } from "../../../common/constants/filesGoogleDrive";

export const DiagnoseAudio = () => {
  const { query, locale } = useRouter();
  const [loading, setLoader] = useState(true);
  const [order, setOrder] = useState<OrderT>();

  useEffect(() => {
    if (query.id) {
      axios
        .get(`/api/clients/${query.id}`)
        .then((res) => {
          setOrder(res.data.data);
        })
        .finally(() => setLoader(false));
    }
  }, [query.id]);

  return (
    <div>
      {order?.audio_comment && (
        <div className={"bg-white p-4"}>
          <audio controls src={filesGoogleDrive.getAudioById(order?.audio_comment)} />
        </div>
      )}
      {!loading && !order?.audio_comment && (
        <div className={"p-4"}>{getLanguage(locale).table.not_voice_comments}</div>
      )}
    </div>
  );
};
