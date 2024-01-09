import { Checkbox, Form, FormInstance, InputNumber, Switch, Typography } from "antd";
import { Match } from "common/interfaces/matches";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { RowLabel } from "ui/RowLabel";

type Props = {
  form: FormInstance<Match>;
};

export const ScoreForm = ({ form }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <Row>
        <RowLabel label={t("matches.score")} prompt={t("matches.TeamOne") + " : " + t("matches.TeamTwo")} />

        <ScoreContainer>
          <FormItem name={["infoHome", "ScoredGoal"]}>
            <InputNumber name="TeamOneScore" style={{ width: 74 }} />
          </FormItem>

          <FormItem name={["infoHome", "ConcededGoal"]}>
            <InputNumber name="TeamTwoScore" style={{ width: 74 }} />
          </FormItem>
        </ScoreContainer>
      </Row>

      <Row>
        <RowLabel label={t("matches.postMatchPenalties")} prompt={t("allPages.prompt")} />

        <div>
          <Form.Item name="IsPenalty" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Typography.Text style={{ padding: "8px 0 16px", display: "block" }}>
            {t("matches.penaltyScore")}
          </Typography.Text>

          <Form.Item shouldUpdate={(prev, current) => prev.IsPenalty !== current.IsPenalty}>
            {() => (
              <ScoreContainer>
                <FormItem name={["infoHome", "ScoredPenaltyGoal"]}>
                  <InputNumber
                    name="PenaltyTeamOne"
                    style={{ width: 74 }}
                    disabled={!form.getFieldValue("IsPenalty")}
                  />
                </FormItem>

                <FormItem name={["infoHome", "ConcededPenaltyGoal"]}>
                  <InputNumber
                    name="PenaltyTeamTwo"
                    style={{ width: 74 }}
                    disabled={!form.getFieldValue("IsPenalty")}
                  />
                </FormItem>
              </ScoreContainer>
            )}
          </Form.Item>
        </div>
      </Row>

      <Row>
        <RowLabel label={t("matches.matchIsOver")} prompt={t("matches.requiredToMove")} />

        <div>
          <Form.Item name="IsMatchOver" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item shouldUpdate={(prev, current) => prev.IsMatchOver !== current.IsMatchOver}>
            {() => (
              <FormItem name="IsTechnicalWin" valuePropName="checked">
                <Checkbox style={{ padding: "8px 0 16px" }} disabled={!form.getFieldValue("IsMatchOver")}>
                  {t("matches.technicalDefeat")}
                </Checkbox>
              </FormItem>
            )}
          </Form.Item>
        </div>
      </Row>
    </>
  );
};

const FormItem = styled(Form.Item)`
  grid-gap: 40px;

  #root & {
    margin-bottom: 40px;
  }

  & > div:first-child {
    display: flex;
    align-items: flex-start;

    & > label::after {
      display: none;
    }
  }
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  grid-gap: 40px;
  width: 1024px;
`;

const ScoreContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  grid-gap: 40px;

  & > div:nth-child(1)::after {
    content: ":";
    align-items: center;
  }
`;
