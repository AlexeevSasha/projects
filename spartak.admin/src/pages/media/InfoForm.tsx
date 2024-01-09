import { Button, DatePicker, Divider, Form, Select } from "antd";
import { routePaths } from "common/constants/routePaths";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import { saveConfirm } from "pages/media/saveConfirm";
import { Media, MediaType } from "common/interfaces/media";
import i18n from "i18next";
import moment, { Moment } from "moment";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { createMedia, saveMediaInfo } from "store/media/mediaActionAsync";
import { mediaSelector } from "store/media/mediaSelectors";
import styled from "styled-components";
import { Loader } from "ui/Loader";
import { RowLabel } from "ui/RowLabel";
import { SelectField } from "ui/SelectField";
import { selectProps } from "../../common/helpers/customMulti";
import { required } from "../../common/helpers/validators/required";
import { PlayerType } from "../../common/interfaces/players";
import { getClubsPlayersByFilter } from "../../store/clubsPlayers/clubsPlayersActionAsync";
import { clubsPlayersSelector } from "../../store/clubsPlayers/clubsPlayersSelectors";
import { clubsTeamsSelector } from "../../store/clubsTeams/clubsTeamsSelectors";
import { getMatchListByFilter } from "../../store/match/matchActionAsync";
import { matchItemsSelector } from "../../store/match/matchsSelectors";
import { mediaCategoriesSelector } from "../../store/mediaCategories/mediaCategorySelectors";
import { noticeActions } from "../../store/notice/notice";
import { rightsSelector } from "store/auth/authSelectors";
import { getMediaSection } from "common/constants/media";
import { getSeasons } from "store/dictionary/dictionaryActionAsync";
import { seasonsOptionsSelector } from "store/dictionary/dictionarySelectors";

interface IProps {
  publishDraftMethod: Function;
}

export const InfoForm = ({ publishDraftMethod }: IProps) => {
  const locale = i18n.language === "ru" ? "Ru" : "En";
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isCreate = pathname.includes("create");
  const [form] = Form.useForm<Media>();
  const dispatch = useAppDispatch();
  const media = useSelector(mediaSelector);
  const rights = useSelector(rightsSelector);
  const section = getMediaSection(rights);
  const seasons = useSelector(seasonsOptionsSelector);

  const categoryOptions = useSelector(mediaCategoriesSelector)?.map((category) => ({
    value: category.Id,
    label: category.CategoryName[locale],
  }));

  const teamsOptions = useSelector(clubsTeamsSelector)?.map((elem) => ({
    label: elem.FullName[locale],
    value: elem.Id,
  }));

  const playerOptions = useSelector(clubsPlayersSelector)?.map((elem) => ({
    label: elem.FullName[locale],
    value: elem.Id,
  }));

  const matchOptions = useSelector(matchItemsSelector)?.map((elem) => ({
    label: `${formatInMoscowDate(elem.MatchStartDateTime, { format: "DD MMMM yyyy" })} ${
      elem[`TeamHome${locale}Name`]
    } - ${elem[`TeamVisitor${locale}Name`]}`,
    value: elem.Id,
  }));

  const [teams, setTeams] = useState<string[]>();

  const handleChangeTeams = useCallback(
    (values: string[]) => {
      setTeams(values);
      if (
        media &&
        JSON.stringify([...values].sort()) === JSON.stringify([...media?.TeamsIds].sort()) &&
        !form.getFieldValue("PlayersIds")?.length &&
        !form.getFieldValue("MatchId")
      ) {
        form.resetFields();
      } else {
        form.setFieldsValue({ PlayersIds: [], MatchId: undefined });
      }
    },
    [teams]
  );

  useEffect(() => {
    media && setTeams(media.TeamsIds);
  }, [media]);

  useEffect(() => {
    dispatch(getSeasons());
  }, []);

  useEffect(() => {
    console.log(seasons);
    if (teams?.length) {
      dispatch(
        getClubsPlayersByFilter({
          PlayerType: PlayerType.own,
          Status: "Published",
          AnyInTeamArray: teams?.length ? teams : undefined,
          pageSize: 100,
        })
      );
      dispatch(
        getMatchListByFilter({
          sorting: "MatchStartDateTime desc",
          MatchTeamId: teams,
          pageSize: 100,
          IsDraft: "false",
          SeasonId: seasons[0]?.Id,
        })
      );
    }
  }, [teams, seasons]);

  const mediaTypesOptions = useMemo(
    () =>
      Object.entries(MediaType).map(([key, value]) => ({
        label: t(`media.types.${key}`),
        value,
      })),
    []
  );

  const onReset = useCallback(() => {
    form.resetFields();
    setTeams(media ? media.TeamsIds : []);
  }, [form, teams]);

  const submitForm = async (draft?: boolean) => {
    if (
      !draft &&
      !(await form
        .validateFields()
        .then(() => true)
        .catch(() => false))
    ) {
      return;
    }
    const Id = media?.Id || (await dispatch(createMedia()).unwrap()).Id;

    await dispatch(saveMediaInfo({ ...form.getFieldsValue(), Id, IsDraft: !!draft }))
      .unwrap()
      .then(() => {
        isCreate && navigate(`/${routePaths.media}/${routePaths.form.edit(Id)}/info`);
        dispatch(noticeActions.add({ message: t("allPages.saveSuccess") }));
      });
  };

  const isTouchedRef = useRef(false);

  const handleFinish = async () => {
    isTouchedRef.current && (await saveConfirm()) && (await submitForm(!media || media.IsDraft));
    publishDraftMethod();
  };

  return !isCreate && !media ? (
    <Loader />
  ) : (
    <Form
      form={form}
      requiredMark={false}
      labelAlign="left"
      validateTrigger="onBlur"
      onFinish={handleFinish}
      initialValues={media}
      id="mediaForm"
    >
      <FormHeader>
        <RowLabel label={t("allPages.main")} />

        <Form.Item shouldUpdate style={{ height: "62.84px" }}>
          {() =>
            (isTouchedRef.current = form.isFieldsTouched()) && (
              <BtnContainer>
                <RowLabel label={t("matches.saveChanges")} prompt={t("matches.unsavedChanges")} />

                <Button type="primary" onClick={() => submitForm(!media || media.IsDraft)}>
                  {t("allPages.buttonsText.save")}
                </Button>

                <Button onClick={onReset}>{t("allPages.buttonsText.cancel")}</Button>
              </BtnContainer>
            )
          }
        </Form.Item>
      </FormHeader>
      <FormItem
        required={true}
        label={<RowLabel label={t("media.dateTime")} prompt={t("allPages.dateTimeHelp")} />}
        name="PublishDateTime"
        rules={[{ validator: required }]}
        getValueFromEvent={(date: Moment) => date?.zone(-180).toISOString()}
        getValueProps={(date) => ({ value: date ? moment(date).zone(-180) : undefined })}
      >
        <DatePicker showTime placeholder={t("media.dateTime")} style={{ width: 256 }} />
      </FormItem>
      <FormItem
        required={true}
        rules={[{ validator: required }]}
        name="MediaType"
        label={<RowLabel label={t("media.mediaType") + " *"} />}
      >
        <SelectField options={mediaTypesOptions} style={{ width: 256 }} />
      </FormItem>
      <FormItem
        required={true}
        rules={[{ validator: required }]}
        name="MediaCategoryId"
        label={<RowLabel label={t("media.category") + " *"} />}
      >
        <SelectField options={categoryOptions || []} style={{ width: 256 }} />
      </FormItem>

      <FormItem
        required={true}
        rules={[{ validator: required }]}
        name="Section"
        label={<RowLabel label={t("media.section") + " *"} />}
        initialValue={section}
      >
        <SelectField
          disabled={!!section}
          options={[
            { value: "Academy", label: t("media.academy") },
            { value: "Site", label: t("media.site") },
          ]}
          style={{ width: 256 }}
        />
      </FormItem>

      <Divider style={{ marginBottom: 40 }} />

      <FormItem
        required={true}
        name="TeamsIds"
        rules={[{ validator: required }]}
        label={<RowLabel label={t("media.team") + " *"} />}
      >
        <Select
          onChange={handleChangeTeams}
          style={{ width: 256 }}
          {...selectProps({
            options: teamsOptions || [],
            fieldName: "TeamsIds",
            form,
            setValue: setTeams,
          })}
        />
      </FormItem>

      <WithDividerBlock>
        <CustomDivider type={"vertical"} />

        <DependencySelectsBlock>
          <FieldWithArrowBlock>
            <CustomImage src="/images/RightArrow.svg" />

            <FormItem
              required={true}
              name="PlayersIds"
              label={<RowLabel label={t("media.player")} prompt={"Список игроков зависит от привязки к команде(ам)"} />}
            >
              <Select
                disabled={!teams?.length}
                style={{ width: 256 }}
                {...selectProps({
                  options: playerOptions || [],
                  fieldName: "PlayersIds",
                  form,
                })}
              />
            </FormItem>
          </FieldWithArrowBlock>

          <FieldWithArrowBlock>
            <CustomImage src="/images/RightArrow.svg" />

            <FormItem
              required={true}
              name="MatchId"
              label={<RowLabel label={t("media.match")} prompt={"Список матчей зависит от привязки к команде(ам)"} />}
            >
              <SelectField allowClear disabled={!teams?.length} options={matchOptions || []} style={{ width: 256 }} />
            </FormItem>
          </FieldWithArrowBlock>
        </DependencySelectsBlock>
      </WithDividerBlock>
    </Form>
  );
};

const FormHeader = styled.div`
  display: flex;
  grid-gap: 40px;
  margin-bottom: 40px;
  width: 1024px;
`;

const BtnContainer = styled.div`
  display: flex;
  grid-gap: 8px;
`;

const FormItem = styled(Form.Item)`
  grid-gap: 40px;

  & > div:first-child {
    display: flex;
    align-items: flex-start;

    & > label::after {
      display: none;
    }

    & > label {
      height: auto;

      & span {
        white-space: normal;
      }
    }
  }

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

  & label > div:first-child::after {
    display: none;
  }
`;

const WithDividerBlock = styled.div`
  display: flex;
  gap: 20px;
  margin-left: 15px;
`;

const DependencySelectsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const FieldWithArrowBlock = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .ant-row,
  .ant-form-item,
  .sc-cZMNgc,
  .htdrlW {
    margin-bottom: 0 !important;
  }
`;

const CustomImage = styled.img`
  position: absolute;
  top: 8px;
  left: -28px;
`;

const CustomDivider = styled(Divider)`
  height: 161.5px;
  margin-top: -45px;
  border-left: 2px solid rgba(0, 0, 0, 0.06);

  @media screen and (max-width: 749px) {
    height: 193px;
  }

  @media screen and (max-width: 700px) {
    margin-top: -38px;
    height: 186.5px;
  }
`;
