import ReactDOM from "react-dom/client";
import { PopupContainer } from "@/PopupContainer";
import { modalEvent } from "@/module/modal/utils/modalEvent";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const Test1 = () => {
  return <div style={{ background: "white", padding: "20px" }}>закрыть предыдущию</div>;
};

const Test = (props) => {
  console.log(props);
  return (
    <div onClick={() => modalEvent.open(<Test1 />, { closePrevious: true })} style={{ background: "white", padding: "20px" }}>
      новая а
    </div>
  );
};

root.render(
  <div>
    <div
      onClick={() =>
        modalEvent.open(
          <div onClick={() => modalEvent.open(<Test />)} style={{ background: "white", padding: "20px" }}>
            test
          </div>,
          {
            closeBackdropClick: true,
            callbackAfterClose: () => console.log(5),
          },
        )
      }
    >
      click me
    </div>
    <PopupContainer />
  </div>,
);
