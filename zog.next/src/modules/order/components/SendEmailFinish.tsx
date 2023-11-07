import { useState } from "react";
import axios from "axios";

export const SendEmailFinish = () => {
  const [disable, setDisable] = useState(false);

  const handlerClick = () => {
    setDisable(true);
    axios.get("/api/clients/finishConsult");
  };
  return (
    <div className={"m-10 "}>
      {disable ? null : (
        <button
          onClick={handlerClick}
          className={
            "whitespace-nowrap  rounded-lg bg-blue-500 p-2 text-white duration-200 hover:bg-blue-700"
          }
        >
          Отправить
        </button>
      )}
    </div>
  );
};
