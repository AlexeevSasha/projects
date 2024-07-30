import { useEffect, useState } from "react";
import { Button, Drawer, Form, Input, message, Select } from "antd";
import { useSelector } from "react-redux";
import type { IMatch } from "../../../../api/dto/IMatch";
import type { ISelect } from "../../../../api/dto/ISelect";
import { StateType, useAppDispatch } from "../../../../core/redux/store";
import { useTranslation } from "react-i18next";
import { formsConstantsValidation } from "../../../../common/constants/formsConstantsValidation";
import { updateMatchesThunk } from "../../../../modules/matches/matchesActionAsync";
import { getBiletkaData } from "../../../../api/requests/matches";
import { getFormatedDate } from "../../../../common/helpers/getFormatedDate";
import { unwrapResult } from "@reduxjs/toolkit";

const { Option } = Select;

interface IProps {
  idEntityChanged: number | null;
  onClose: () => void;
  visible: boolean;
}

export const MatchForm = ({ idEntityChanged, onClose, visible }: IProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const matchForChanged = useSelector<StateType, IMatch | undefined>((state: StateType): IMatch | undefined =>
    idEntityChanged ? state.matches.entities[idEntityChanged] : undefined
  );
  const matchDate = getFormatedDate(matchForChanged?.dateTimeStart, formsConstantsValidation.dateTimeFormat);

  const useGetMatchData = (date: string, action: (search: string) => Promise<ISelect[]>) => {
    const [matches, setMatches] = useState<{ label: string; value: string }[]>([]);

    useEffect(() => {
      if (date) {
        action(date).then((result) =>
          setMatches(
            result.map((match) => {
              return { value: match.id, label: match.name };
            })
          )
        );
      }
    }, [date]);

    return matches;
  };

  const searchDate = getFormatedDate(matchForChanged?.dateTimeStart, formsConstantsValidation.dateSearchFormat);
  const biletkaData = useGetMatchData(searchDate, getBiletkaData);

  useEffect(() => {
    if (matchForChanged) {
      form.setFieldsValue({
        statisticEventId: matchForChanged.statisticEventId,
        ticketsEventId: matchForChanged.ticketsEventId
      });
    }
  }, [form, idEntityChanged]);

  const closeDrawer = () => {
    form.resetFields();
    onClose();
  };

  const submitForm = () => {
    form.validateFields().then(async (values) => {
      await dispatch(updateMatchesThunk({ id: matchForChanged?.id, ...values })).then(unwrapResult);
      closeDrawer();
      message.success(t("success.update.default"));
    });
  };

  return (
    <Drawer
      title={t("common.edit") + " " + t("common.match").toLowerCase()}
      closable={false}
      destroyOnClose={true}
      getContainer={false}
      onClose={closeDrawer}
      visible={visible}
      width={426}
      footer={
        <div
          style={{
            textAlign: "right"
          }}
        >
          <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
            {t("common.buttonsText.cancel")}
          </Button>
          <Button onClick={submitForm} type="primary" htmlType={"submit"}>
            {t("common.buttonsText.save")}
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item label={t("matches.homeTeamName")}>
          <Input size={"middle"} disabled={true} value={matchForChanged?.homeTeamName} />
        </Form.Item>
        <Form.Item label={t("matches.guestTeamName")}>
          <Input size={"middle"} disabled={true} value={matchForChanged?.guestTeamName} />
        </Form.Item>
        <Form.Item label={t("common.createdDateTime")}>
          <Input size={"middle"} disabled={true} value={matchDate} />
        </Form.Item>
        <Form.Item label={t("matches.biletka")} name={"ticketsEventId"} initialValue={matchForChanged?.ticketsEventId}>
          <Select placeholder={t("common.selectPlaceholder")} showSearch={false} size={"middle"} allowClear>
            {biletkaData.map((match) => (
              <Option key={match.value} value={`${match.value}`}>
                {match.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name={"statisticEventId"} hidden={true}>
          <Input size={"middle"} disabled={true} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
