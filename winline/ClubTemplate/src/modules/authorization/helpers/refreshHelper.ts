import { refreshApp } from "../../../api/baseRequest";
import { storageNames } from "../constants/storageNames";
import { TimerController } from "../constants/TimerController";

const offset = 60000;

const getDiffSeconds = () => {
  const data = localStorage.getItem(storageNames.localExpAuthData);
  if (data) {
    return Math.ceil((new Date(data).getTime() - Date.now()) / 1000);
  } else {
    return 0;
  }
};

export const intervalRefreshHandler = (exp?: number) => {
  TimerController.clearTimers();

  const thisExp = exp ? exp : getDiffSeconds();
  let currentExp = Number(thisExp) * 1000;

  if (!thisExp || thisExp <= 0) {
    refreshApp();

    return;
  }

  const intervalRefreshTimeExp = setInterval(() => {
    currentExp -= 1000;
    if (currentExp <= 0) {
      clearInterval(intervalRefreshTimeExp);
    }
  }, 1000);

  TimerController.setId("intervalId", intervalRefreshTimeExp);

  const timeoutId = setTimeout(() => {
    console.log("REFRESH");
    refreshApp();
    clearTimeout(timeoutId);
    clearInterval(intervalRefreshTimeExp);
  }, currentExp - offset);

  TimerController.setId("timerId", timeoutId);

  window.addEventListener("beforeunload", () => {
    if (currentExp / 1000 > 0) {
      const prevDate = new Date();
      prevDate.setSeconds(prevDate.getSeconds() + currentExp / 1000);
      localStorage.setItem(storageNames.localExpAuthData, prevDate.toString());
    }
  });
};
