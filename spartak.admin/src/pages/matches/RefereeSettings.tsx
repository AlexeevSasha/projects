import { Button, Divider, Form, Input } from "antd";
import { LineUpReferee } from "common/interfaces/matches";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { RowLabel } from "ui/RowLabel";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { noticeActions } from "../../store/notice/notice";
import { useSelector } from "react-redux";
import { noticeSelector } from "../../store/notice/noticeSelector";

type Props = {
  lang: "Ru" | "En";
  referee: LineUpReferee;
  onSave: (referee: LineUpReferee) => void;
  baseLocal: number;
  setBaseLocal: Function;
  isTeamsIds: boolean;
};

export const RefereeSettings = ({ referee, onSave, lang, baseLocal, setBaseLocal, isTeamsIds }: Props) => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const notice = useSelector(noticeSelector);
  const isCreate = pathname.includes("create");
  const { t } = useTranslation();
  const [form] = Form.useForm<LineUpReferee>();

  useEffect(() => {
    baseLocal &&
      form.setFieldsValue({
        Name: { ...form.getFieldValue("Name"), En: form.getFieldValue("Name")?.Ru },
        Position: { ...form.getFieldValue("Position"), En: form.getFieldValue("Position")?.Ru },
      });
  }, [baseLocal]);

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Form form={form} requiredMark={false} labelAlign="left" initialValues={referee}>
      <Row>
        <RowLabel label={t("matches.judges")} />

        <Form.Item shouldUpdate noStyle>
          {() =>
            Object.values(form.getFieldsValue(["Name", "Position"])).some((value: any) => value?.[lang]) &&
            JSON.stringify(form.getFieldsValue(["Name", "Position"])) !== JSON.stringify(referee) ? (
              <>
                <RowLabel label={t("matches.saveChanges")} prompt={t("matches.unsavedChanges")} />

                <BtnContainer>
                  <Button
                    type="primary"
                    onClick={() => {
                      if (isCreate || !isTeamsIds) {
                        !notice.length &&
                          dispatch(
                            noticeActions.add({ message: t("validations.fillMatchFieldsMessage"), type: "error" })
                          );
                      } else {
                        onSave(form.getFieldsValue(["Name", "Position"]));
                        setBaseLocal(0);
                      }
                    }}
                  >
                    {t("allPages.buttonsText.save")}
                  </Button>

                  <Button onClick={handleReset}>{t("allPages.buttonsText.cancel")}</Button>
                </BtnContainer>
              </>
            ) : null
          }
        </Form.Item>
      </Row>

      <Row>
        <TeamJudge>
          <Form.Item name={["Position", lang]}>
            <Input style={{ width: 256 }} placeholder={t("allPages.role")} />
          </Form.Item>

          <Form.Item name={["Name", lang]}>
            <Input style={{ width: 256 }} placeholder={t("matches.judgeFio")} />
          </Form.Item>
        </TeamJudge>
      </Row>
      <Divider style={{ marginBottom: 40 }} />
    </Form>
  );
};

const Row = styled.div`
  display: flex;
  grid-gap: 40px;
  margin-bottom: 40px;
`;

const TeamJudge = styled.div`
  display: flex;
  grid-gap: 16px;
  margin-left: 270px;
`;

const BtnContainer = styled.div`
  display: flex;
  grid-gap: 8px;
`;
