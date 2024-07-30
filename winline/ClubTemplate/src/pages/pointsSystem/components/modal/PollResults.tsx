import React, { useEffect, useState } from "react";
import { Button, Divider, Drawer, Form, Typography, Radio, Space, Checkbox, RadioChangeEvent } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import i18next from "i18next";
import styled from "styled-components";
import type { IFiveEvents, IPoll } from "../../../../api/dto/pointsSystem";
import type { ISelect } from "../../../../api/dto/ISelect";
import { getPlayers, getTeamsByMatchId } from "../../../../api/requests/pointsSystem";

interface IProps {
  data: IPoll | null | undefined;
  onClose: Function;
  onSave: (payload: Partial<IPoll>) => void;
  visible: boolean;
}

const { Text } = Typography;

const PollResults = ({ data, onClose, onSave, visible }: IProps) => {
  const [form] = Form.useForm();
  const [startingFive, setStartingFive] = useState<number[]>();
  const [matchWinner, setMatchWinner] = useState<number>();

  useEffect(() => {
    form.resetFields();
  }, [data, visible]);

  const closeDrawer = () => {
    form.resetFields();
    onClose();
  };

  const submitForm = () => {
    form.validateFields().then(async (values) => {
      if (data) {
        let payload: any;
        if (data.type === "FiveEvents") {
          payload = {
            fiveEvents: data?.fiveEvents?.map((item: IFiveEvents, index) => {
              return { id: item.id, answer: values.fiveEvents[index] };
            })
          };
        } else if (data?.type === "StartingFive") {
          payload = { startingFive };
        } else {
          payload = { matchWinner };
        }
        onSave({ id: data.id, type: data.type, ...payload });
      }
    });
  };

  return (
    <Drawer
      title={i18next.t(`pointsSystem.poll.results`)}
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
            {i18next.t("common.buttonsText.cancel")}
          </Button>
          <Button onClick={submitForm} type="primary" htmlType={"submit"}>
            {i18next.t("common.buttonsText.save")}
          </Button>
        </div>
      }
    >
      <Text strong>{i18next.t("common.match")}</Text>: {data?.match.name}
      <Divider />
      <Form form={form} layout="vertical">
        {data?.type === "FiveEvents" && <FiveEvents data={data.fiveEvents} />}
        {data?.type === "StartingFive" && <StatingFive setData={setStartingFive} dataId={data.id} />}
        {data?.type === "MatchWinner" && <MatchWinner matchId={data.match.id} setData={setMatchWinner} />}
      </Form>
    </Drawer>
  );
};

const validationRadio = async (_: unknown, value: any) => {
  const answer = JSON.parse(value);
  if (answer === null) {
    return Promise.reject();
  }

  return Promise.resolve();
};

const FiveEvents = ({ data }: { data: IFiveEvents[] }) => {
  return (
    <Form.List name={"fiveEvents"} initialValue={data}>
      {(fields) => (
        <div>
          {fields.map((field, i) => (
            <Form.Item
              {...field}
              label={i18next.t("pointsSystem.poll.event") + ` ${i + 1}` + ": " + data[field.name].question}
              required={false}
              rules={[
                {
                  required: true,
                  message: i18next.t("validations.required"),
                  validator: validationRadio
                }
              ]}
            >
              <Radio.Group value={false}>
                <Space direction="vertical">
                  <Radio value={true}>{i18next.t("common.yes")}</Radio>
                  <Radio value={false}>{i18next.t("common.no")}</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          ))}
        </div>
      )}
    </Form.List>
  );
};

const StatingFive = ({ setData, dataId }: { setData: Function; dataId: string }) => {
  const [players, setPlayers] = useState<{ label: string; value: string }[]>();

  useEffect(() => {
    getPlayers(dataId).then((result) =>
      setPlayers(
        result.map((player) => {
          return { value: player.id, label: player.firstName + " " + player.lastName };
        })
      )
    );
  }, []);

  const handleCheckBoxChange = (values: CheckboxValueType[]) => {
    setData(values);
  };

  const validationStartingFive = async (_: unknown, value: any) => {
    if (!value) {
      return Promise.reject(new Error(i18next.t("validations.required")));
    }
    if (value.length < 5 || value.length > 5) {
      return Promise.reject(new Error(i18next.t("validations.startingFive")));
    }

    return Promise.resolve();
  };

  return (
    <>
      <Form.Item name={"startingFive"} required={false} rules={[{ required: true, validator: validationStartingFive }]}>
        <PlayersList options={players} defaultValue={[]} onChange={handleCheckBoxChange} />
      </Form.Item>
    </>
  );
};
const MatchWinner = ({ matchId, setData }: { matchId: string; setData: Function }) => {
  const [teams, setTeams] = useState<ISelect[]>();
  const [value, setValue] = useState();

  useEffect(() => {
    getTeamsByMatchId(matchId).then((result) => setTeams(result));
  }, []);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    setData(e.target.value);
  };

  return (
    <>
      <Form.Item
        name={"matchWinner"}
        label={i18next.t("pointsSystem.poll.winner")}
        required={false}
        rules={[
          {
            required: true,
            message: i18next.t("validations.required")
          }
        ]}
      >
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            {teams?.map((team) => (
              <Radio key={team.id} value={team.id}>
                {team.name}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>
    </>
  );
};

export default PollResults;

const PlayersList = styled(Checkbox.Group)`
  display: grid;
  line-height: 2.15;
`;
