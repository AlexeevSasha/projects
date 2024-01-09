import React from "react";
import { WorkSection } from "common/components/Container/WorkSection";
import { IconLoading } from "../common/components/Icon/IconLoading";

interface IProps {
  text?: string;
}

export const PageLoading: React.FC<IProps> = ({ text = "Загрузка доступа" }) => {
  return (
    <>
      <WorkSection hideMenu>
        {text}
        <IconLoading />
      </WorkSection>
    </>
  );
};
