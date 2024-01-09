import React from "react";
import { IconLoading } from "../../../components/Icon/IconLoading";
import { components, NoticeProps } from "react-select";

export const useSelectComponents = (asyncError?: boolean) => {
  const LoadingMessage = () => {
    return <IconLoading width={40} height={40} hidePadding={true} />;
  };

  const NoOptionsMessage = (optProps: NoticeProps) => {
    return (
      // eslint-disable-next-line react/no-children-prop
      <components.NoOptionsMessage {...optProps} children={<> {asyncError ? "Ошибка загрузки" : "Список пуст"}</>} />
    );
  };
  const LoadingIndicator = () => {
    return <IconLoading width={20} height={20} hidePadding={true} />;
  };

  return { LoadingMessage, LoadingIndicator, NoOptionsMessage };
};
