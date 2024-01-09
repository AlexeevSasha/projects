import { Button, Checkbox, Divider, Form, Input, InputNumber, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { LineUpTeam, MatchPlayer } from "common/interfaces/matches";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { allAmpluaOptionsSelector } from "store/dictionary/dictionarySelectors";
import styled from "styled-components";
import { Delete } from "ui/Delete";
import { ImageField } from "ui/ImageField";
import { RowLabel } from "ui/RowLabel";
import { SelectField } from "ui/SelectField";
import { deepMerge } from "common/helpers/deepMerge";
import { PlayerType } from "common/interfaces/players";
import { clubsPlayersSelector } from "../../store/clubsPlayers/clubsPlayersSelectors";
import { required } from "../../common/helpers/validators/required";
import { useLocation } from "react-router-dom";
import { noticeActions } from "../../store/notice/notice";
import { useAppDispatch } from "../../store";
import { noticeSelector } from "../../store/notice/noticeSelector";

const { Text } = Typography;

type Props = {
  lang: "Ru" | "En";
  team: LineUpTeam;
  onSave: (players: MatchPlayer[], coach: LineUpTeam["Coach"]) => void;
  baseLocal: number;
};

export const TeamSettings = ({ onSave, team, baseLocal, ...props }: Props) => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const isCreate = pathname.includes("create");
  const notice = useSelector(noticeSelector);
  const { t } = useTranslation();
  const [isClubsPlayer, setIsClubPlayer] = useState<boolean[]>(() =>
    team.Players.map((player) => player.PlayerType === PlayerType.own)
  );
  const [form] = Form.useForm<LineUpTeam>();
  const ampluaOptions = useSelector(allAmpluaOptionsSelector);
  const [lang, setLang] = useState<"Ru" | "En">(props.lang);
  const [values, setValues] = useState(team);

  const plalyerOptions = useSelector(clubsPlayersSelector)
    ?.filter((elem) => elem.Teams?.some((teamVal) => teamVal?.Id === team?.Id))
    ?.map((player) => ({
      value: player.Id,
      label: player.FullName[props.lang],
    }));

  useEffect(() => {
    baseLocal &&
      values &&
      form.setFieldsValue({
        ...values,
        Players: values.Players.map((player) => ({
          ...player,
          Name: player.PlayerType === "OwnPlayer" ? player.Name : { ...player.Name, En: player.Name.Ru },
        })),
      });
  }, [baseLocal]);

  useEffect(() => {
    setValues(deepMerge(values, form.getFieldsValue()));
    setLang(props.lang);
  }, [props.lang]);

  const resetFields = () => {
    form.resetFields();
    setIsClubPlayer(team.Players.map((player) => player.PlayerType === PlayerType.own));
  };

  return (
    <Form form={form} requiredMark={false} labelAlign="left" initialValues={team}>
      <Row>
        <RowLabel label={team.Name?.[props.lang] || t(`matches.${team.IsHomeTeam ? "TeamOne" : "TeamTwo"}`)} />
        <Form.Item shouldUpdate noStyle>
          {() =>
            JSON.stringify(form.getFieldValue("Players")) !== JSON.stringify(team.Players) ||
            JSON.stringify(form.getFieldValue("Coach")) !== JSON.stringify(team.Coach) ? (
              <>
                <RowLabel label={t("matches.saveChanges")} prompt={t("matches.unsavedChanges")} />
                <BtnContainer>
                  <Button
                    type="primary"
                    onClick={async () =>
                      (await form.validateFields()) &&
                      onSave(
                        form
                          .getFieldValue("Players")
                          ?.map((elem: MatchPlayer, i: number) =>
                            isClubsPlayer[i]
                              ? { ...elem, PlayerType: PlayerType.own }
                              : { ...elem, PlayerType: PlayerType.opposite }
                          ),
                        form.getFieldValue("Coach")
                      )
                    }
                  >
                    {t("allPages.buttonsText.save")}
                  </Button>

                  <Button onClick={resetFields}>{t("allPages.buttonsText.cancel")}</Button>
                </BtnContainer>
              </>
            ) : null
          }
        </Form.Item>
      </Row>

      <Form.List name={["Players"]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...field }, i) => {
              const resetRemovePlayerFormItem = (operation: "reset" | "remove") =>
                form.setFieldsValue({
                  Players: form.getFieldValue("Players").map((elem: MatchPlayer, index: number) =>
                    index === i
                      ? (operation === "reset" ? elem.PlayerType === "OwnPlayer" : elem.PlayerType !== "OwnPlayer")
                        ? {
                            ...elem,
                            ImageUrl: undefined,
                            Name: { Ru: undefined, En: undefined },
                            PlayerNumber: undefined,
                            AmpluaId: undefined,
                            Id: undefined,
                          }
                        : team.Players[i]
                      : elem
                  ),
                });

              return (
                <Row key={key}>
                  <DeleteBtn>
                    <Delete
                      color={theme.colors.middleGray}
                      onClick={() => {
                        remove(i);
                        setIsClubPlayer(isClubsPlayer.filter((_, index) => i !== index));
                      }}
                    />
                  </DeleteBtn>

                  <div>
                    {isClubsPlayer[i] ? (
                      <ClubPlayer>
                        <Form.Item rules={[{ validator: required }]} {...field} key={`Id${key}`} name={[name, "Id"]}>
                          <SelectField
                            options={plalyerOptions || []}
                            style={{ width: 256 }}
                            placeholder={t("matches.choosePlayer")}
                          />
                        </Form.Item>

                        <Form.Item
                          rules={[{ validator: required }]}
                          {...field}
                          key={`AmpluaId${key}`}
                          name={[name, "AmpluaId"]}
                        >
                          <SelectField
                            options={ampluaOptions}
                            style={{ width: 256 }}
                            placeholder={t("matches.chooseAmplua")}
                          />
                        </Form.Item>

                        <Form.Item valuePropName="checked" name={[name, "IsSubstitute"]}>
                          <Checkbox>{t("allPages.IsSubstitute")}</Checkbox>
                        </Form.Item>
                      </ClubPlayer>
                    ) : (
                      <>
                        <ImageUploadWrapper>
                          <Form.Item
                            // rules={[{ validator: required }]}
                            {...field}
                            key={`ImageUrl${key}`}
                            name={[name, "ImageUrl"]}
                          >
                            <ImageField
                              validation={{
                                width: 256,
                                height: 256,
                                size: 1024,
                                format: ["png"],
                                exact: true,
                              }}
                            />
                          </Form.Item>

                          <Text type="secondary" style={{ fontSize: 13, maxWidth: 480 }}>
                            {t("allPages.form.uploadDesc", {
                              format: "jpeg, png",
                              width: "256",
                              height: "256",
                              size: "1",
                            })}
                          </Text>
                        </ImageUploadWrapper>

                        <TeamPlayer>
                          <Form.Item
                            rules={[{ validator: required }]}
                            {...field}
                            key={`PlayerNumber${key}`}
                            name={[name, "PlayerNumber"]}
                          >
                            <InputNumber style={{ width: 96 }} placeholder={t("allPages.number")} />
                          </Form.Item>

                          <Form.Item
                            rules={[{ validator: required }]}
                            {...field}
                            key={`Name${key}`}
                            name={[name, "Name", lang]}
                          >
                            <Input placeholder={t("allPages.fio")} />
                          </Form.Item>

                          <Form.Item
                            rules={[{ validator: required }]}
                            {...field}
                            key={`AmpluaId${key}`}
                            name={[name, "AmpluaId"]}
                          >
                            <SelectField
                              options={ampluaOptions}
                              style={{ width: 256 }}
                              placeholder={t("allPages.role")}
                            />
                          </Form.Item>

                          <Form.Item name={[name, "IsSubstitute"]} valuePropName="checked">
                            <Checkbox>{t("allPages.IsSubstitute")}</Checkbox>
                          </Form.Item>
                        </TeamPlayer>
                      </>
                    )}

                    <Checkbox
                      style={{ padding: "8px 0 16px" }}
                      onChange={({ target }) => {
                        setIsClubPlayer(isClubsPlayer.map((p, index) => (i === index ? target.checked : p)));
                        if (!target.checked) {
                          resetRemovePlayerFormItem("reset");
                        } else {
                          resetRemovePlayerFormItem("remove");
                        }
                      }}
                      checked={isClubsPlayer[i]}
                    >
                      {t("matches.chooseFrom")}
                    </Checkbox>
                  </div>
                </Row>
              );
            })}

            <Row>
              <Button
                onClick={() => {
                  if (isCreate || !team.Id) {
                    !notice.length &&
                      dispatch(
                        noticeActions.add({
                          message: t("validations.fillMatchFieldsMessage"),
                          type: "error",
                        })
                      );
                  } else {
                    add({});
                    setIsClubPlayer([...isClubsPlayer, true]);
                  }
                }}
              >
                {t("allPages.buttonsText.add")}
              </Button>
            </Row>
          </>
        )}
      </Form.List>
      <>
        <Row>
          <RowLabel label={t("matches.coaches")} />
          <Form.Item name={["Coach", "FullName", lang]}>
            <Input style={{ width: 256 }} placeholder={t("matches.coachFio")} />
          </Form.Item>
        </Row>

        <Divider style={{ marginBottom: 40 }} />
      </>
    </Form>
  );
};

const DeleteBtn = styled.div`
  width: 230px;
`;

const Row = styled.div`
  display: flex;
  grid-gap: 40px;
  margin-bottom: 40px;
`;

const ImageUploadWrapper = styled.div`
  display: flex;

  #root & .ant-upload.ant-upload-select-picture-card {
    width: 64px;
    height: 64px;

    & > span {
      font-size: 13px;
    }
  }
`;

const TeamPlayer = styled.div`
  display: flex;
  grid-gap: 16px;
`;

const BtnContainer = styled.div`
  display: flex;
  grid-gap: 8px;
`;

const ClubPlayer = styled.div`
  display: flex;
  grid-gap: 16px;
`;
