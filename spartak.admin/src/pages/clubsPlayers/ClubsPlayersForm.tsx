import { MinusOutlined, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Select,
  Tabs,
  Tag,
  Tooltip,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { imageRepository } from "api/imageRepository";
import { theme } from "assets/theme/theme";
import { statusColors } from "common/constants/status";
import { deepMerge } from "common/helpers/deepMerge";
import { toISOString } from "common/helpers/toISOString";
import { birthdayValidator } from "common/helpers/validators/birthdayValidator";
import { countryValidator } from "common/helpers/validators/countryValidator";
import { fullNameValidator } from "common/helpers/validators/fullNameValidator";
import { playerNumberValidator } from "common/helpers/validators/playerNumberValidator";
import { required, requiredWithoutMessage } from "common/helpers/validators/required";
import { roleValidator } from "common/helpers/validators/roleValidator";
import { Player, PlayerType } from "common/interfaces/players";
import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { clubsPlayersActions } from "store/clubsPlayers/clubsPlayers";
import { draftClubsPlayer, getClubsPlayerById, publishClubsPlayer } from "store/clubsPlayers/clubsPlayersActionAsync";
import { clubsPlayerSelector } from "store/clubsPlayers/clubsPlayersSelectors";
import {
  ampluaOptionsSelector,
  countriesOptionsSelector,
  ownTeamsOptionsSelector,
} from "store/dictionary/dictionarySelectors";
import { noticeActions } from "store/notice/notice";
import styled from "styled-components";
import { ImageField } from "ui/ImageField";
import { Loader } from "ui/Loader";
import { SelectField, SelectFieldOption } from "ui/SelectField";
import { UploadDesc } from "ui/UploadDesc";
import { Wysiwyg } from "ui/Wisiwyg/Wysiwyg";
import { mockPeriodOptions } from "../../common/constants/mockPeriodOptions";
import { selectProps } from "../../common/helpers/customMulti";

const { confirm } = Modal;

const imageConfig = {
  style: { background: theme.colors.gray, height: 30, display: "inline" },
  preview: false,
};

const achivments: SelectFieldOption[] = [
  { value: "flag", label: <Image {...imageConfig} src="/images/Flag.svg" /> },
  { value: "medal", label: <Image {...imageConfig} src="/images/Medal.svg" /> },
  {
    value: "trophy",
    label: <Image {...imageConfig} src="/images/Trophy.svg" />,
  },
];

export const ClubsPlayersForm = React.memo(() => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const isCreate = pathname.endsWith("create");
  const [form] = Form.useForm<Player>();
  const { t } = useTranslation();
  const [lang, setLang] = useState("Ru");
  const [visible, setVisible] = useState(true);
  const [values, setValues] = useState<Player | undefined>();
  const dispatch = useAppDispatch();
  const player = useSelector(clubsPlayerSelector);
  const amplua = useSelector(ampluaOptionsSelector);
  const countries = useSelector(countriesOptionsSelector);
  const teams = useSelector(ownTeamsOptionsSelector);

  const closeDrawer = () => {
    form.resetFields();
    setVisible(false);
    setTimeout(() => navigate(-1), 150);
  };

  const handleTabClick = (key: string) => {
    setValues(form.getFieldsValue());
    setLang(key);
  };

  const submitForm = async (draft?: boolean) => {
    if (!draft && !(await form.validateFields().then(() => true))) {
      dispatch(noticeActions.add({ message: t("allPages.formError"), type: "error" }));

      return;
    }
    const formValues = deepMerge<Player>({ ...values, PlayerType: PlayerType.own, Id: id }, form.getFieldsValue());
    formValues.Achievements = formValues.Achievements.filter(({ ImageUrl, Name }) => ImageUrl && Name);
    dispatch((draft ? draftClubsPlayer : publishClubsPlayer)(formValues))
      .unwrap()
      .then(() => {
        dispatch(
          noticeActions.add({
            message: t(`clubsPlayers.${draft ? "successHide" : "successPublish"}`),
            closable: true,
          })
        );
        closeDrawer();
      });
  };

  useEffect(() => {
    if (!isCreate && id) {
      dispatch(getClubsPlayerById(id)).unwrap().then(setValues);
    }

    return () => {
      dispatch(clubsPlayersActions.resetPlayer());
    };
  }, [id]);

  const showConfirm = (draft?: boolean) => {
    confirm({
      title: <TitleText>{t(`allPages.${draft ? "hideConfirmTitle" : "confirmTitle"}`)}</TitleText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t(`clubsPlayers.${draft ? "hideConfirmText" : "confirmText"}`),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: () => submitForm(draft),
    });
  };

  return (
    <Drawer
      title={
        <>
          <TitleText>{isCreate ? t("clubsPlayers.createPlayer") : t("clubsPlayers.editPlayer")}</TitleText>

          <Divider style={{ margin: "20px 0 0" }} />

          <TitleContent>
            <Tabs defaultActiveKey={lang} onChange={handleTabClick}>
              <Tabs.TabPane tab={t("allPages.ru")} key="Ru" />
              <Tabs.TabPane tab={t("allPages.en")} key="En" />
            </Tabs>

            {player && (
              <Status>
                {t("allPages.status")}:{" "}
                <Tag color={statusColors[player?.Status || "None"]}>
                  {t(`allPages.statuses.${player?.Status || "None"}`)}
                </Tag>
              </Status>
            )}
          </TitleContent>
        </>
      }
      closable={false}
      destroyOnClose={true}
      getContainer={false}
      onClose={closeDrawer}
      visible={visible}
      width="785px"
      bodyStyle={{ padding: "0 30px 130px" }}
      headerStyle={{ border: 0, padding: 0 }}
      footer={
        <Footer>
          <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
            {t("allPages.buttonsText.cancel")}
          </Button>

          <Button
            onClick={() => showConfirm(true)}
            style={{
              marginRight: 8,
              color: theme.colors.red1,
              borderColor: theme.colors.red1,
            }}
          >
            {t("allPages.buttonsText.draft")}
          </Button>

          <Button
            onClick={() => (isCreate || player?.Status === "Draft" ? showConfirm : submitForm)()}
            type="primary"
            htmlType="submit"
          >
            {isCreate || player?.Status === "Draft"
              ? t("allPages.buttonsText.publish")
              : t("allPages.buttonsText.save")}
          </Button>
        </Footer>
      }
    >
      {!isCreate && !player ? (
        <Loader />
      ) : (
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          validateTrigger="onBlur"
          initialValues={{
            ...player,
            Achievements: player?.Achievements.length ? player.Achievements : [{}],
            PlayerCareer: player?.PlayerCareer.length
              ? [...player.PlayerCareer]
                  .sort((a, b) => a.Position - b.Position)
                  .map((career) => ({ ...career, TeamId: career?.Team?.Id }))
              : [],
          }}
        >
          <Form.Item
            rules={[{ validator: (_, value) => fullNameValidator(_, value) }]}
            name={["FullName", lang]}
            label={t("allPages.fio") + " *"}
          >
            <Input name="clubsPlayerFio" placeholder={t("clubsPlayers.namePlaceholder")} />
          </Form.Item>
          <Row>
            <Form.Item
              name="AmpluaId"
              label={t("clubsPlayers.roleField") + " *"}
              rules={[{ validator: roleValidator }]}
            >
              <SelectField
                placeholder={t("clubsPlayers.roleFieldPlaceholder")}
                options={amplua}
                style={{ width: "256px" }}
              />
            </Form.Item>

            <Form.Item
              name="PlayerNumber"
              label={t("clubsPlayers.numberField") + " *"}
              rules={[{ validator: playerNumberValidator }]}
            >
              <InputNumber
                name="clubsPlayerNumber"
                placeholder={t("clubsPlayers.numberFieldPlaceholder")}
                style={{ width: "179px" }}
                min={1}
                max={99}
              />
            </Form.Item>

            <Form.Item
              name="CitizenshipId"
              label={t("allPages.form.citizenship") + " *"}
              rules={[{ validator: countryValidator }]}
            >
              <SelectField
                placeholder={t("allPages.form.citizenshipPlaceholder")}
                options={countries}
                style={{ width: "256px" }}
              />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              name="Birthday"
              label={t("allPages.form.dateOfBirth") + " *"}
              getValueFromEvent={(date) => (date ? toISOString((date as Moment).set({ hour: 0 })) : undefined)}
              getValueProps={(date) => ({ value: date ? moment(date) : undefined })}
              rules={[{ validator: birthdayValidator }]}
            >
              <DatePicker
                getPopupContainer={(triggerNode) => triggerNode}
                showToday={false}
                name="clubsPlayersDteOfBirth"
                placeholder={t("allPages.form.dateOfBirthPlaceholder")}
                style={{ width: "256px" }}
              />
            </Form.Item>

            <Form.Item
              name="InClubFrom"
              label={t("clubsPlayers.onTeam") + " *"}
              getValueFromEvent={(date) => date?.toISOString()}
              getValueProps={(date) => ({
                value: date ? moment(date) : undefined,
              })}
              rules={[{ validator: required }]}
            >
              <DatePicker
                getPopupContainer={(triggerNode) => triggerNode}
                showToday={false}
                name="ClubsPlayersOnTeam"
                placeholder={t("clubsPlayers.onTeamPlaceholder")}
                style={{ width: "143px" }}
              />
            </Form.Item>

            <Form.Item name="Height" label={t("clubsPlayers.height")}>
              <InputNumber
                min={1}
                name="clubsPlayerHeight"
                placeholder={t("clubsPlayers.heightPlaceholder")}
                style={{ width: "141px" }}
              />
            </Form.Item>

            <Form.Item name="Weight" label={t("clubsPlayers.weight")}>
              <InputNumber
                min={1}
                name="clubsPlayerWeight"
                placeholder={t("clubsPlayers.weightPlaceholder")}
                style={{ width: "141px" }}
              />
            </Form.Item>
          </Row>
          <Form.Item name="TeamIds" label={t("clubsPlayers.teamBinding") + " *"} rules={[{ validator: required }]}>
            <Select
              style={{ width: "100%" }}
              {...selectProps({
                options: teams || [],
                fieldName: "TeamIds",
                form,
              })}
            />
          </Form.Item>
          <Form.Item style={{ paddingBottom: "10px" }} name={["Biography", lang]} label={t("allPages.form.biography")}>
            <Wysiwyg uploadRequest={imageRepository.upload} />
          </Form.Item>
          <Form.List name="Achievements">
            {(fields, { add, remove }) =>
              fields.map(({ key, name, ...field }, i) => {
                const isLastOrSingle = fields.length === 1 || i === fields.length - 1;

                return (
                  <Achivment key={key}>
                    <Form.Item
                      {...field}
                      key={`icon${key}`}
                      name={[name, "ImageUrl"]}
                      label={t("clubsPlayers.achivmentIcon")}
                      style={{ width: "216px" }}
                    >
                      <SelectField options={achivments} />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      key={`text${key}`}
                      name={[name, "Name", lang]}
                      label={t("clubsPlayers.achivment")}
                      style={{ width: "100%" }}
                    >
                      <TextArea placeholder={t("clubsPlayers.specifyAchievements")} rows={1} />
                    </Form.Item>

                    <ActionBlock>
                      <Tooltip title={t("allPages.add")}>
                        {isLastOrSingle ? (
                          <Button icon={<PlusOutlined />} onClick={() => add({})} />
                        ) : (
                          <Button icon={<MinusOutlined />} onClick={() => remove(i)} />
                        )}
                      </Tooltip>
                    </ActionBlock>
                  </Achivment>
                );
              })
            }
          </Form.List>

          <Row style={{ paddingTop: "16px" }}>
            <Coll>
              <Form.Item name="ImageUrl" label={t("clubsPlayers.playerLogo") + " *"} rules={[{ validator: required }]}>
                <ImageField
                  validation={{
                    width: 914,
                    height: 836,
                    size: 2048,
                    format: ["png"],
                    exact: true,
                  }}
                />
              </Form.Item>

              <UploadDesc>
                {t("allPages.form.uploadDesc", {
                  width: "914",
                  height: "836",
                  size: "2",
                  format: "png",
                })}
              </UploadDesc>
            </Coll>

            <Coll border>
              <Title>Привязка игрока</Title>
              <Form.Item name="InStatId" label="InStat">
                <InputNumber
                  min={1}
                  name="clubsPlayerInStat"
                  placeholder={t("clubsPlayers.inStatPlaceholder")}
                  style={{ width: "141px" }}
                />
              </Form.Item>

              <Form.Item name="ShopId" label={t("clubsPlayers.market")}>
                <InputNumber
                  min={1}
                  name="clubsPlayerMarket"
                  placeholder={t("clubsPlayers.marketPlaceholder")}
                  style={{ width: "141px" }}
                />
              </Form.Item>
            </Coll>
          </Row>

          <CareerBlock>
            <Title>
              Игровая карьера&nbsp; (
              <AddText
                onClick={() => form.setFieldsValue({ PlayerCareer: [...form.getFieldValue("PlayerCareer"), {}] })}
              >
                Добавить
              </AddText>
              ) *
            </Title>
            <Form.List name={"PlayerCareer"}>
              {(fields, { remove }) =>
                fields.map(({ key, name, ...field }, i) => (
                  <CareerItem key={`career${key}`}>
                    <Form.Item
                      rules={[{ validator: requiredWithoutMessage }]}
                      {...field}
                      key={`position${key}`}
                      name={[name, "Position"]}
                      label={t("Сортировка")}
                    >
                      <InputNumber min="0" style={{ width: "80px" }} />
                    </Form.Item>

                    <Form.Item
                      rules={[{ validator: requiredWithoutMessage }]}
                      {...field}
                      key={`period${key}`}
                      name={[name, "Period"]}
                      label={t("Период")}
                    >
                      <SelectField
                        options={mockPeriodOptions.map((option) => ({ label: option, value: option }))}
                        style={{ width: "125px" }}
                      />
                    </Form.Item>

                    <Form.Item
                      rules={[{ validator: requiredWithoutMessage }]}
                      {...field}
                      key={`team${key}`}
                      name={[name, "TeamId"]}
                      label={t("Команда")}
                    >
                      <SelectField options={teams} style={{ width: "170px" }} />
                    </Form.Item>

                    <Form.Item
                      rules={[{ validator: requiredWithoutMessage }]}
                      {...field}
                      key={`championship${key}`}
                      name={[name, "Championship"]}
                      label={t("Чемпионат")}
                    >
                      <InputNumber min="0" style={{ width: "76px" }} />
                    </Form.Item>

                    <Form.Item
                      rules={[{ validator: requiredWithoutMessage }]}
                      {...field}
                      key={`cup${key}`}
                      name={[name, "Cup"]}
                      label={t("Кубок")}
                    >
                      <InputNumber min="0" style={{ width: "76px" }} />
                    </Form.Item>

                    <Form.Item
                      rules={[{ validator: requiredWithoutMessage }]}
                      {...field}
                      key={`euroCup${key}`}
                      name={[name, "EuroCup"]}
                      label={t("Еврокубок")}
                    >
                      <InputNumber min="0" style={{ width: "76px" }} />
                    </Form.Item>

                    <Button style={{ marginTop: "23px" }} icon={<MinusOutlined />} onClick={() => remove(i)} />
                  </CareerItem>
                ))
              }
            </Form.List>
          </CareerBlock>
        </Form>
      )}
    </Drawer>
  );
});

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Coll = styled.div<{ border?: boolean }>`
  padding: 8px;
  border: ${({ border }) => (border ? "1px" : 0)} dashed #000000;
  width: 310px;
`;

const Achivment = styled.div`
  display: flex;
  justify-content: space-between;
  grid-gap: 18px;
`;

const CareerBlock = styled.div`
  margin-top: 8px;
`;

const Title = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
`;

const AddText = styled.span`
  color: ${theme.colors.red1};
  font-weight: 600;
  cursor: pointer;
`;

const CareerItem = styled.div`
  display: flex;
  justify-content: space-between;
  grid-gap: 8px;

  .ant-form-item-with-help .ant-form-item-explain {
    min-height: 0;
  }
`;

const ActionBlock = styled.div`
  min-width: 32px;
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const Status = styled.div`
  margin-bottom: 8px;

  & > *:last-child {
    margin-left: 8px;
  }
`;

const TitleText = styled.span`
  font-weight: 600;
  font-size: 16px;
  padding: 16px 24px 0;
  display: block;
`;

const TitleContent = styled.div`
  padding: 0 24px;
`;
