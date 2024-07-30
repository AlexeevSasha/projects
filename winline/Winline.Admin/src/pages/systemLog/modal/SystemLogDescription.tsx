import { Descriptions, Divider, Drawer, Typography } from "antd";
import { getFormatedDate } from "../../../common/helpers/getFormatedDate";
import type { ISystemLogItem } from "../../../api/dto/systemLog/ISystemLog";
import { useTranslation } from "react-i18next";
import { formsConstantsValidation } from "../../../common/constants/formsConstantsValidation";
import styled from "styled-components";

interface IProps {
  descriptionLog?: ISystemLogItem;
  onClose(): void;
}

const typeFields: Record<string, string> = {
  Insert: "systemLog.description.points.dataChanges.insert",
  Update: "systemLog.dataChanges",
  Delete: "systemLog.description.points.dataChanges.delete",
  undefined: "systemLog.description.points.dataChanges.insert"
};

const { Text } = Typography;

export const SystemLogDescription = ({ descriptionLog, onClose }: IProps) => {
  const { t } = useTranslation();

  return (
    <Drawer
      title={t("systemLog.description.title")}
      closable={true}
      destroyOnClose={true}
      onClose={onClose}
      visible={!!descriptionLog}
      width={560}
    >
      <Descriptions column={1}>
        <Descriptions.Item label={t("common.id")}>{descriptionLog?.id}</Descriptions.Item>
        <Descriptions.Item label={t("systemLog.createdUtc")}>
          {getFormatedDate(descriptionLog?.createdUtc, formsConstantsValidation.dateTimeFormat)}
        </Descriptions.Item>
        <Descriptions.Item label={t("systemLog.employee")}>{descriptionLog?.userName}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions column={1}>
        <Descriptions.Item label={t("systemLog.tableName")}>{descriptionLog?.tableName}</Descriptions.Item>
        {descriptionLog?.entityName !== "no name" && (
          <Descriptions.Item label={t("common.title")}>{descriptionLog?.entityName}</Descriptions.Item>
        )}
        <Descriptions.Item label={t("common.action")}>{descriptionLog?.actionName}</Descriptions.Item>
        <Descriptions.Item label={t(typeFields[`${descriptionLog?.actionName}`])}>
          {descriptionLog?.dataChanges && typeof descriptionLog.dataChanges !== "string" ? (
            <div>
              {descriptionLog.dataChanges instanceof Array
                ? descriptionLog.dataChanges.map((change) => {
                    return (
                      <p key={change.ColumnName}>
                        <Text type="secondary">{`${change.ColumnName}: `}</Text>
                        {change.OriginalValue && typeof change.OriginalValue === "object" ? (
                          <StyledContainer key={change.ColumnName}>
                            {Object.entries(change.OriginalValue).map(([column, value]) => (
                              <StyledParagraph key={column}>
                                <Text type="secondary">{`${column}:`}</Text>
                                {` '${value}' → `}{" "}
                                {Object.entries(change.NewValue).map(([nestedColumn, nestedValue]) => (
                                  <Text key={nestedColumn}>{nestedColumn === column ? ` '${nestedValue}' ` : null}</Text>
                                ))}
                              </StyledParagraph>
                            ))}
                          </StyledContainer>
                        ) : (
                          `'${change.OriginalValue}' → '${change.NewValue}'`
                        )}
                      </p>
                    );
                  })
                : Object.entries(descriptionLog.dataChanges).map(([column, value]) => {
                    const actualValue = column === "policies" ? value.replace(/,/g, "\n") : value;

                    return (
                      <p key={column}>
                        <Text type="secondary">{`${column}: `}</Text>
                        {value && typeof value === "object"
                          ? Object.entries(actualValue).map(([nestedColumn, nestedValue]) => {
                              const actualVal = nestedValue;

                              return (
                                <StyledParagraph key={nestedColumn}>
                                  <Text type="secondary">{`${nestedColumn}: `}</Text>
                                  {nestedValue && typeof nestedValue === "object"
                                    ? Object.entries(actualVal).map(([col, val]) => {
                                        return (
                                          <StyledParagraph key={col}>
                                            <Text type="secondary">{`${col}: `}</Text> {`'${val}'`}
                                          </StyledParagraph>
                                        );
                                      })
                                    : `"${actualVal}"`}
                                </StyledParagraph>
                              );
                            })
                          : `"${actualValue}"`}
                      </p>
                    );
                  })}
            </div>
          ) : (
            <span>-</span>
          )}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

const StyledParagraph = styled.p`
  margin-left: 20px;
  :last-child {
    margin-bottom: 0;
  }
`;

const StyledContainer = styled.div`
  display: grid;
`;
