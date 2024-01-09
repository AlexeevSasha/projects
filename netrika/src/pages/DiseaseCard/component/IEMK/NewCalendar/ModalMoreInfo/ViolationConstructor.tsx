import { CriterionExecuteResultEnum } from "common/interfaces/CriterionExecuteResultEnum";
import { theme } from "common/styles/theme";
import React, { FC, Fragment, useCallback, useState } from "react";
import { IconErrorViolation } from "common/components/Icon/IconErrorViolation";
import { IconSuccessViolation } from "common/components/Icon/IconSuccessViolation";
import { IconUnknownViolation } from "common/components/Icon/IconUnknownViolation";
import { styled } from "../../../../../../common/styles/styled";
import { IconArrowViolation } from "../../../../../../common/components/Icon/IconArrowViolation";
import { IMedicalViolationsCaseDetailsStatuses } from "../../../../../../common/interfaces/medical/IMedicalViolationsCaseDetails";

interface IProps {
  data: IMedicalViolationsCaseDetailsStatuses[];
  parentId: number;
  visible?: boolean;
  show: boolean;
  bizKey?: number;
}

export const ViolationConstructor: FC<IProps> = (props) => {
  const [openBlocks, setOpenBlocks] = useState<string[]>([]);

  const isOpen = useCallback((value: string) => openBlocks.indexOf(value) !== -1, [openBlocks]);

  const setOpen = useCallback(
    (value: string) => {
      setOpenBlocks((prev) => (isOpen(value) ? prev.filter((item) => item !== value) : [...prev, value]));
    },
    [isOpen]
  );

  return (
    <Container show={props.show}>
      {props.data
        ? props.data.map((item) => (
            <Fragment key={item.id}>
              {item.parentId === props.parentId && (
                <>
                  <Block onClick={() => setOpen("block" + item.id)}>
                    {props.data.filter((child) => child.parentId === item.id).length > 0 ? (
                      <span>
                        <IconArrowViolation rotate={isOpen("block" + item.id) ? "0" : "-90deg"} />
                      </span>
                    ) : (
                      <span>
                        <Point />
                      </span>
                    )}

                    <span key={item.id}>
                      {item.status === CriterionExecuteResultEnum.MetRequirement && <IconSuccessViolation />}
                      {item.status === CriterionExecuteResultEnum.NotEnoughDataRequirement && <IconUnknownViolation />}
                      {item.status === CriterionExecuteResultEnum.NotMetRequirement && <IconErrorViolation />}
                    </span>
                    <Name>
                      {item.qualityName}
                      <Description>{item.qualityDescription}</Description>
                    </Name>
                  </Block>

                  {props.data.filter((child) => child.parentId === item.id).length > 0 ? (
                    <ViolationConstructor
                      bizKey={props.bizKey}
                      data={props.data}
                      parentId={item.id}
                      show={isOpen("block" + item.id)}
                    />
                  ) : null}
                </>
              )}
            </Fragment>
          ))
        : "Нет данных"}
    </Container>
  );
};

const Container = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? "block" : "none")};
  margin-left: 20px;
  margin-top: 15px;
  margin-bottom: 15px;
  max-height: 80%;
  overflow: auto;

  cursor: pointer;
`;

const Block = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Name = styled.div`
  line-height: 130%;
  color: ${theme.colors.hightBlue};
  margin: 0 15px;
`;

const Description = styled.span`
  line-height: 130%;
  color: ${theme.colors.black};
  margin-left: 15px;
`;

const Point = styled.div`
  background: ${theme.colors.black};
  border-radius: 50%;
  width: 4px;
  height: 4px;
  margin-right: 15px;
  margin-left: 7px;
`;
