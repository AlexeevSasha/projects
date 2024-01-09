import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { SelectFieldOption } from "ui/SelectField";

type Props = {
  value?: string[];
  onChange?: (value?: SelectFieldOption["value"][]) => void;
  options: SelectFieldOption[];
};

export const TeamSelector = ({ value, options, onChange }: Props) => {
  const { t } = useTranslation();

  const teams = useMemo(
    () =>
      options.reduce((acc: { [key: string]: SelectFieldOption }, option) => {
        return option.value
          ? { ...acc, [option.value?.toString()]: option }
          : acc;
      }, {}),
    [options]
  );

  const handleDelete = (id: string) => {
    onChange?.(value?.filter((v) => v !== id));
  };

  const handleAdd = () => {
    const newTeam = value ? options[value.length]?.value : options[0]?.value;
    newTeam && onChange?.([...(value || []), newTeam]);
  };

  return (
    <Container>
      <TeamList>
        {value?.map((id) => (
          <Team key={id}>
            <TeamName>{teams[id].label}</TeamName>

            <CloseOutlined onClick={() => handleDelete(id)} />
          </Team>
        ))}
      </TeamList>

      <Tooltip title={t("allPages.buttonsText.add")}>
        <AddBtn shape="circle" icon={<PlusOutlined />} onClick={handleAdd} />
      </Tooltip>
    </Container>
  );
};

const Container = styled.div`
  background: #f9fafb;
  border: 1px solid #e9ecf2;
  border-radius: 4px;
  width: 744px;
  height: 259px;
  outline: 0;
  padding-right: 30px;
  position: relative;

  &:hover {
    border-color: #e82539;
  }

  &:focus-within {
    border-color: #e82539;
    box-shadow: 0 0 0 2px rgb(220 0 31 / 20%);
  }
`;

const TeamList = styled.div`
  display: flex;
`;

const Team = styled.div`
  min-width: 109px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 34px 0 15px;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(46, 48, 51, 0.08);
  border-radius: 2px;
  position: relative;

  & > span.anticon.anticon-close {
    position: absolute;
    right: 10px;
  }
`;

const TeamName = styled.span`
  white-space: nowrap;
`;

const AddBtn = styled(Button)`
  background: #f9fafb;
  border: 0;
  position: absolute;
  right: 5px;
  top: 5px;
  color: #a5acb8;
`;
