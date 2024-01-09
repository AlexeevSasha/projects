import React, { useEffect, useState } from "react";
import { CriterionExecuteResultEnum } from "../../../common/interfaces/CriterionExecuteResultEnum";
import { IconContainerFloatingmes } from "../../../common/components/Table/UIcomponent/UIcomponent";
import { IconSuccessViolation } from "../../../common/components/Icon/IconSuccessViolation";
import { IconUnknownViolation } from "../../../common/components/Icon/IconUnknownViolation";
import { IconErrorViolation } from "../../../common/components/Icon/IconErrorViolation";
import { FlexContainer } from "../../../common/ui/FlexContainer";

interface IProps {
  items: (CriterionExecuteResultEnum | null | undefined)[];
}

export const StatusCounter = (props: IProps) => {
  const [statusObj, setStatusObj] = useState<{
    MetRequirement: number;
    NotMetRequirement: number;
    NotEnoughDataRequirement: number;
  }>();

  useEffect(() => {
    setStatusObj({
      MetRequirement: props.items?.filter((item) => item === CriterionExecuteResultEnum.MetRequirement).length,
      NotMetRequirement: props.items?.filter((item) => item === CriterionExecuteResultEnum.NotMetRequirement).length,
      NotEnoughDataRequirement: props.items?.filter(
        (item) => item === CriterionExecuteResultEnum.NotEnoughDataRequirement
      ).length,
    });
  }, [props.items]);

  return (
    <FlexContainer direction={"row"}>
      <FlexContainer direction={"row"}>
        <IconContainerFloatingmes title={"Нарушено"}>
          <IconErrorViolation />
        </IconContainerFloatingmes>
        {` : ${statusObj?.NotMetRequirement ?? 0}`}
      </FlexContainer>
      <FlexContainer direction={"row"}>
        <IconContainerFloatingmes title={"Выполнено"}>
          <IconSuccessViolation />
        </IconContainerFloatingmes>
        {` : ${statusObj?.MetRequirement ?? 0}`}
      </FlexContainer>
      <FlexContainer direction={"row"}>
        <IconContainerFloatingmes title={"Нет Данных"}>
          <IconUnknownViolation />
        </IconContainerFloatingmes>
        {` : ${statusObj?.NotEnoughDataRequirement ?? 0}`}
      </FlexContainer>
    </FlexContainer>
  );
};
