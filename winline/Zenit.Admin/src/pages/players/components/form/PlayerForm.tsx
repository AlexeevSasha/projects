import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Divider, Drawer, Form, Input, InputNumber, Row, Select } from "antd";
import { Store } from "antd/lib/form/interface";
import TextArea from "antd/lib/input/TextArea";
import { profile } from "console";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { StateType, useAppDispatch } from "../../../../core/redux/store";
import styled from "styled-components";
import { IPlayer, IPlayerFilters } from "../../../../api/dto/IPlayer";
import { ISelect } from "../../../../api/dto/ISelect";
import { getPositions, getSeasons, getTeams } from "../../../../api/requests/players";
import { formsConstantsValidation } from "../../../../common/constants/formsConstantsValidation";
import { validationStatistics } from "../../../../common/helpers/commonValidators/validationStatistics";
import { addPlayerThunk, getAllPlayersThunk, updatePlayerThunk } from "../../../../modules/players/playersActionAsync";
import { SubTitle } from "../../../../ui/commonComponents";
import { ImageUpload } from "../../../../ui/formItemComponents/ImageUpload";
import { validationHyperLink } from "../../../../common/helpers/commonValidators/validationHyperLink";

interface IProps {
  data: IPlayer | null;
  onClose: () => void;
  visible: boolean;
  isEdit: boolean;
  setIsEdit: Function;
  filters: IPlayerFilters;
  seasons: ISelect[];
  teams: ISelect[];
  positions: ISelect[];
}
const { Option } = Select;

const image = formsConstantsValidation.entity.player.image;
const uploadAction = `${process.env.REACT_APP_MOBILE}${process.env.REACT_APP_ADMIN}/Player/AddImage`;

interface IStatistics {
  id: string | null;
  tournament: string;
  average: {
    points: number;
    selections: number;
    transfers: number;
    effectiveness: number;
  };
  total: {
    points: number;
    selections: number;
    transfers: number;
    effectiveness: number;
  };
}
interface ICareer {
  id: string | null;
  period: string;
  club: string;
}

export const PlayerForm = ({ data, onClose, visible, isEdit, setIsEdit, filters, positions, seasons, teams }: IProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { isLoading } = useSelector((state: StateType) => state.players);
  const [imageUrl, setImageUrl] = useState<string | undefined>("");
  const [newCareer, setNewCareer] = useState<number[]>([]);
  const [newStatistics, setNewStatistics] = useState<number[]>([]);

  const closeDrawer = () => {
    setTimeout(() => {
      form.resetFields();
      setIsEdit(false);
    }, 300);
    onClose();
  };

  const numberValidator = async (_: any, value: string) => {
    if (/^\d+$/.test(value)) {
      return Promise.resolve();
    }
    if (!value) {
      return Promise.reject(t("validations.required"));
    }

    return Promise.reject(t("validations.onlyNumbers"));
  };

  const positionsOptions = useMemo(
    () =>
      positions.map((value) => (
        <Option key={value.id} value={value.id}>
          {value.name}
        </Option>
      )),
    [positions]
  );

  const teamsOptions = useMemo(
    () =>
      teams.map((value: ISelect) => (
        <Option key={value.id} value={value.id}>
          {value.name}
        </Option>
      )),
    [teams]
  );
  const seasonsOptions = useMemo(
    () =>
      seasons.map((value) => (
        <Option key={value.id} value={value.id}>
          {value.name}
        </Option>
      )),
    [seasons]
  );

  const careerValues = data?.profile.career.map((item) => {
    const career = {
      id: item.id,
      club: item.club,
      period: item.period
    };

    return career;
  });

  const statisticValues = data?.statistics.map((item) => {
    const statistic = {
      id: item.id,
      tournament: item.tournament,
      points: item.average.points,
      selections: item.average.selections,
      transfers: item.average.transfers,
      effectiveness: item.average.effectiveness,
      pointsTotal: item.total.points,
      selectionsTotal: item.total.selections,
      transfersTotal: item.total.transfers,
      effectivenessTotal: item.total.effectiveness
    };

    return statistic;
  });

  useEffect(() => {
    setImageUrl("");
    if (data) {
      form.setFieldsValue({
        firstName: data.firstName,
        lastName: data.lastName,
        teamId: data.team.id,
        seasonId: data.season.id,
        positionId: data.position.id,
        // eslint-disable-next-line id-blacklist
        number: data.number,
        country: data.country,
        birthday: moment(data.birthday),
        height: data.height,
        weight: data.weight,
        avatarUri: data.avatarUri,
        biography: data.profile.biography,
        productUrl: data.productUrl,
        career: careerValues,
        statistics: statisticValues
      });
      setImageUrl(data.avatarUri);
    }
  }, [data, form]);

  const validationLink = async (_: unknown, value: string) => {
    if (value && !/^https?:\/\/[^\/]{1}.+$/.test(value)) {
      return Promise.reject(new Error(t("validations.invalidUri")));
    } else if (value && value.length > formsConstantsValidation.link.max) {
      return Promise.reject(new Error(t("validations.maxLengthExceeded", { max: formsConstantsValidation.link.max })));
    }

    return Promise.resolve();
  };

  const submitForm = () => {
    form.validateFields().then((values) => {
      const { biography, career, statistics, ...playerData } = values;

      const allStatistics: IStatistics[] = statistics
        ? statistics.map((item: any, index: any) => {
            const stat = {
              id: newStatistics.includes(index) && isEdit && !item.id ? null : item.id,
              tournament: item.tournament,
              average: {
                points: item.points,
                selections: item.selections,
                transfers: item.transfers,
                effectiveness: item.effectiveness
              },
              total: {
                points: item.pointsTotal,
                selections: item.selectionsTotal,
                transfers: item.transfersTotal,
                effectiveness: item.effectivenessTotal
              }
            };

            return stat;
          })
        : [];

      const allCareer: ICareer[] = career
        ? career.map((item: any, index: any) => {
            const oneCareer = {
              id: newCareer.includes(index) && isEdit && !item.id ? null : item.id,
              period: item.period,
              club: item.club
            };

            return oneCareer;
          })
        : [];

      const dataInPayload = {
        ...playerData,
        profile: { biography: values.biography, career: allCareer },
        statistics: allStatistics
      };

      if (data) {
        // eslint-disable-next-line id-blacklist
        dispatch(updatePlayerThunk({ id: data.id, ...dataInPayload, number: String(dataInPayload.number) })).then(() =>
          dispatch(getAllPlayersThunk(filters))
        );
      } else {
        // eslint-disable-next-line id-blacklist
        dispatch(addPlayerThunk({ ...dataInPayload, number: String(dataInPayload.number) })).then(() =>
          dispatch(getAllPlayersThunk(filters))
        );
      }
      setIsEdit(false);
      closeDrawer();
    });
  };

  return (
    <Drawer
      title={data ? t("common.buttonsText.edit") : t("common.buttonsText.create")}
      closable={false}
      destroyOnClose={true}
      onClose={closeDrawer}
      visible={visible}
      width={400}
      footer={
        <div
          style={{
            textAlign: "right"
          }}
        >
          <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
            {t("common.buttonsText.cancel")}
          </Button>
          <Button disabled={isLoading} onClick={submitForm} type="primary" htmlType={"submit"}>
            {t("common.buttonsText.save")}
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={t("players.firstName")}
          required={false}
          name={"firstName"}
          rules={[
            {
              required: true,
              message: t("validations.required")
            },
            {
              max: formsConstantsValidation.entity.player.max,
              message: t("validations.maxLengthExceeded", { max: formsConstantsValidation.entity.player.max })
            }
          ]}
        >
          <Input size={"middle"} placeholder={t("players.form.placeholders.firstName")} />
        </Form.Item>
        <Form.Item
          label={t("players.lastName")}
          required={false}
          name={"lastName"}
          rules={[
            {
              required: true,
              message: t("validations.required")
            },
            {
              max: formsConstantsValidation.entity.player.max,
              message: t("validations.maxLengthExceeded", { max: formsConstantsValidation.entity.player.max })
            }
          ]}
        >
          <Input size={"middle"} placeholder={t("players.form.placeholders.lastName")} />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              required={false}
              label={t("players.team")}
              name={"teamId"}
              rules={[
                {
                  required: true,
                  message: t("validations.required")
                }
              ]}
            >
              <Select placeholder={t("common.selectPlaceholder")} showSearch={false} size={"middle"}>
                {teamsOptions}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              required={false}
              label={t("players.season")}
              name={"seasonId"}
              rules={[
                {
                  required: true,
                  message: t("validations.required")
                }
              ]}
            >
              <Select placeholder={t("common.selectPlaceholder")} showSearch={false} size={"middle"}>
                {seasonsOptions}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              required={false}
              label={t("players.position")}
              name={"positionId"}
              rules={[
                {
                  required: true,
                  message: t("validations.required")
                }
              ]}
            >
              <Select placeholder={t("common.selectPlaceholder")} showSearch={false} size={"middle"}>
                {positionsOptions}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t("players.squadNumber")}
              required={false}
              name={"number"}
              rules={[
                {
                  max: formsConstantsValidation.entity.player.number.max,
                  message: t("validations.maxLengthExceeded", { max: formsConstantsValidation.entity.player.number.max })
                },
                {
                  validator: numberValidator
                }
              ]}
            >
              <Input size={"middle"} placeholder={"0"} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label={t("players.country")}
          required={false}
          name={"country"}
          rules={[
            {
              required: true,
              message: t("validations.required")
            },
            {
              max: formsConstantsValidation.entity.player.max,
              message: t("validations.maxLengthExceeded", { max: formsConstantsValidation.entity.player.max })
            }
          ]}
        >
          <Input size={"middle"} placeholder={t("players.form.placeholders.country")} />
        </Form.Item>
        <Form.Item
          required={false}
          label={t("players.birthday")}
          name={"birthday"}
          rules={[
            {
              required: true,
              type: "date",
              message: t("validations.required")
            }
          ]}
        >
          <DatePicker
            style={{ width: "100%" }}
            placeholder={t("players.form.placeholders.date")}
            format={formsConstantsValidation.dateFormat}
            disabledDate={(current) => {
              const customDate = 1900;

              return (current && current < moment(customDate, "YYYY-MM-DD")) || current > moment().subtract(1, "days");
            }}
            showToday={false}
          />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              required={false}
              label={t("players.height") + " " + t("players.sm")}
              name={"height"}
              rules={[
                {
                  required: true,
                  message: t("validations.required")
                }
              ]}
            >
              <NumberInput min={1} max={1000} size={"middle"} placeholder={"0"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t("players.weight") + " " + t("players.kg")}
              required={false}
              name={"weight"}
              rules={[
                {
                  required: true,
                  message: t("validations.required")
                }
              ]}
            >
              <NumberInput min={1} max={1000} size={"middle"} placeholder={"0"} />
            </Form.Item>
          </Col>
        </Row>
        <ImageUpload
          action={uploadAction}
          label={t("common.image")}
          updateImage={imageUrl}
          form={form}
          name={"avatarUri"}
          entity={image}
          mimeTypes={["image/jpeg", "image/png"]}
          config={image}
          validationDependence
        />
        <Form.Item
          name={"biography"}
          required={false}
          rules={[
            {
              required: true,
              message: t("validations.required")
            },
            {
              max: formsConstantsValidation.entity.player.biography.max,
              message: t("validations.maxLengthExceeded", { max: formsConstantsValidation.entity.player.biography.max })
            }
          ]}
          label={t("players.biography")}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label={t("common.link") + " " + t("players.productUrl")}
          required={false}
          rules={[{ validator: validationLink }]}
          name={"productUrl"}
        >
          <Input size={"middle"} />
        </Form.Item>
        <Divider />
        <SubTitle>{t("players.career")}</SubTitle>
        <Form.List name="career">
          {(career, { add, remove }) => {
            return (
              <div>
                {career.map((item, index) => (
                  <div key={index}>
                    <Form.Item
                      label={t("players.period")}
                      required={false}
                      rules={[
                        {
                          required: true,
                          message: t("validations.required")
                        },
                        {
                          max: formsConstantsValidation.entity.player.max,
                          message: t("validations.maxLengthExceeded", { max: formsConstantsValidation.entity.player.max })
                        }
                      ]}
                      name={[index, "period"]}
                    >
                      <Input placeholder={t("players.form.placeholders.period")} size={"middle"} />
                    </Form.Item>
                    <Form.Item
                      label={t("players.club")}
                      required={false}
                      rules={[
                        {
                          required: true,
                          message: t("validations.required")
                        },
                        {
                          max: formsConstantsValidation.entity.player.max,
                          message: t("validations.maxLengthExceeded", { max: formsConstantsValidation.entity.player.max })
                        }
                      ]}
                      name={[index, "club"]}
                    >
                      <Input placeholder={t("players.form.placeholders.club")} size={"middle"} />
                    </Form.Item>
                    <ButtonContainer>
                      <Button
                        size="small"
                        danger
                        style={{ marginBottom: "16px" }}
                        onClick={() => {
                          remove(item.name);
                        }}
                      >
                        {t("common.delete")}
                      </Button>
                    </ButtonContainer>
                  </div>
                ))}
                <ButtonContainer>
                  <Button
                    size="small"
                    type="primary"
                    ghost
                    onClick={() => {
                      add();
                      newCareer.push(career.length);
                    }}
                    icon={<PlusOutlined />}
                  >
                    {t("common.buttonsText.add")}
                  </Button>
                </ButtonContainer>
              </div>
            );
          }}
        </Form.List>

        <Divider />
        <SubTitle>{t("players.statistics")}</SubTitle>
        <Form.List name="statistics">
          {(statistics, { add, remove }) => {
            return (
              <div>
                <div>
                  {statistics.map((item, index) => (
                    <div key={index}>
                      <Form.Item
                        label={t("players.tournament")}
                        required={false}
                        rules={[
                          {
                            required: true,
                            message: t("validations.required")
                          },
                          {
                            max: formsConstantsValidation.entity.player.max,
                            message: t("validations.maxLengthExceeded", { max: formsConstantsValidation.entity.player.max })
                          }
                        ]}
                        name={[index, "tournament"]}
                      >
                        <Input placeholder={t("players.form.placeholders.tournament")} size={"middle"} />
                      </Form.Item>
                      <Label>{t("players.average")}</Label>
                      <Row gutter={12}>
                        <Col span={6}>
                          <Form.Item
                            required={false}
                            label={t("players.points")}
                            name={[index, "points"]}
                            rules={[
                              {
                                validator: validationStatistics
                              }
                            ]}
                          >
                            <Input size={"middle"} placeholder={"0"} />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            label={t("players.selections")}
                            required={false}
                            name={[index, "selections"]}
                            rules={[
                              {
                                validator: validationStatistics
                              }
                            ]}
                          >
                            <Input size={"middle"} placeholder={"0"} />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            required={false}
                            label={t("players.transfers")}
                            name={[index, "transfers"]}
                            rules={[
                              {
                                validator: validationStatistics
                              }
                            ]}
                          >
                            <Input size={"middle"} placeholder={"0"} />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            required={false}
                            label={t("players.effectivenessShort")}
                            name={[index, "effectiveness"]}
                            rules={[
                              {
                                validator: validationStatistics
                              }
                            ]}
                          >
                            <Input size={"middle"} placeholder={"0"} />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Label>{t("common.total")}</Label>
                      <Row gutter={12}>
                        <Col span={6}>
                          <Form.Item
                            required={false}
                            label={t("players.points")}
                            name={[index, "pointsTotal"]}
                            rules={[
                              {
                                validator: validationStatistics
                              }
                            ]}
                          >
                            <Input size={"middle"} placeholder={"0"} />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            label={t("players.selections")}
                            required={false}
                            name={[index, "selectionsTotal"]}
                            rules={[
                              {
                                validator: validationStatistics
                              }
                            ]}
                          >
                            <Input size={"middle"} placeholder={"0"} />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            required={false}
                            label={t("players.transfers")}
                            name={[index, "transfersTotal"]}
                            rules={[
                              {
                                validator: validationStatistics
                              }
                            ]}
                          >
                            <Input size={"middle"} placeholder={"0"} />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            required={false}
                            label={t("players.effectivenessShort")}
                            name={[index, "effectivenessTotal"]}
                            rules={[
                              {
                                validator: validationStatistics
                              }
                            ]}
                          >
                            <Input size={"middle"} placeholder={"0"} />
                          </Form.Item>
                        </Col>
                      </Row>
                      <ButtonContainer>
                        <Button
                          size="small"
                          danger
                          style={{ marginBottom: "16px" }}
                          onClick={() => {
                            remove(item.name);
                          }}
                        >
                          {t("common.delete")}
                        </Button>
                      </ButtonContainer>
                    </div>
                  ))}
                  <ButtonContainer>
                    <Button
                      size="small"
                      type="primary"
                      ghost
                      onClick={() => {
                        add();
                        newStatistics.push(statistics.length);
                      }}
                      icon={<PlusOutlined />}
                    >
                      {t("common.buttonsText.add")}
                    </Button>
                  </ButtonContainer>
                </div>
              </div>
            );
          }}
        </Form.List>
      </Form>
    </Drawer>
  );
};

const Label = styled(SubTitle)`
  font-weight: 400 !important;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const NumberInput = styled(InputNumber)`
  width: 100% !important;
`;
