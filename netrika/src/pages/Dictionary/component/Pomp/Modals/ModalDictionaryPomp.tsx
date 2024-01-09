import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useController, useForm } from "react-hook-form";
import { Input } from "../../../../../common/ui/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { dictionaryClinrecPompSelector } from "../../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompSelector";
import { CustomSelect } from "../../../../../common/ui/Select/CustomSelect";
import { ICustomBaseSelect } from "../../../../../common/interfaces/ISelect";
import { FlexContainer } from "../../../../../common/ui/FlexContainer";
import { RangeSwitch } from "../../../../DiseaseCard/component/RangeSwitch";
import { DictionaryClinrecPompThunk } from "../../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompThunk";
import { IDictionaryPomp } from "../../../../../common/interfaces/dictionary/IDictionaryPomp";
import { InputDate } from "../../../../../common/ui/Input/InputDate/InputDate";
import { CreatePompBasedOnFields } from "./CreatePompBasedOnFields";
import { modal } from "../../../../../common/helpers/event/modalEvent";
import { ButtonsModalForm } from "../../../../../common/ui/Button/ButtonsModalForm";
import { LabelStyle } from "../../../../../common/ui/Input/styles/labelStyles";
import { ModalContainer } from "../../../../../common/components/Popup/components/ModalContainer";
import { theme } from "../../../../../common/styles/theme";

interface IProps {
  currentPomp?: IDictionaryPomp;
  disabled: boolean;
}

export interface IFormDictionaryPomp {
  isCustom: boolean;
  basedName?: string;
  name: string;
  revisionBdate?: Date | string;
  revisionEdate?: Date | string;
  revisionId?: number;
  idMz: string;
  profile: ICustomBaseSelect;
  BasedOn?: ICustomBaseSelect;
}

export const ModalDictionaryPomp = (props: IProps) => {
  const dispath = useDispatch();
  const { loadingPompList, loadingPompProfiles, profiles } = useSelector(dictionaryClinrecPompSelector);
  const [createBasedOn, setCreateBasedOn] = useState<boolean>(false);

  const { register, errors, handleSubmit, control, getValues, setValue, setError } = useForm<IFormDictionaryPomp>({
    defaultValues: {
      name: props?.currentPomp?.name || "",
      idMz: props?.currentPomp?.idMz || "",
    },
  });

  const { field: idMz } = useController({
    control,
    name: "idMz",
    defaultValue: props?.currentPomp?.idMz || "",
    rules: {
      maxLength: { value: 5, message: "Максимально допустимое число символов: 5" },
    },
  });
  const { field: profile } = useController({
    control,
    name: "profile",
    defaultValue: profiles?.find((p) => props?.currentPomp?.profile === Number(p.value)) || "",
  });
  const { field: revisionEdate } = useController({
    control,
    name: "revisionEdate",
    defaultValue: props?.currentPomp?.revisionEdate ? new Date(props.currentPomp.revisionEdate) : "Invalid date",
    rules: {
      validate: () => {
        const rB = getValues("revisionBdate");
        const rE = getValues("revisionEdate");
        if (rB && rE && rB !== "Invalid date" && rE !== "Invalid date") {
          if (rB > rE) {
            return "Дата не может быть меньше, чем в поле \"Дата утверждения\"";
          } else return true;
        }
        return true;
      },
    },
  });
  const { field: revisionBdate } = useController({
    control,
    name: "revisionBdate",
    defaultValue: props?.currentPomp?.revisionBdate ? new Date(props.currentPomp.revisionBdate) : "Invalid date",
    rules: {
      validate: () => {
        const rB = getValues("revisionBdate");
        const rE = getValues("revisionEdate");
        if (rB && rE && rB !== "Invalid date" && rE !== "Invalid date") {
          if (rB > rE) {
            return "Дата не может быть больше, чем в поле \"Утратил силу\"";
          } else return true;
        }
        return true;
      },
    },
  });

  const onClose = useCallback(() => {
    modal.close();
  }, []);

  const clickSave = (data: IFormDictionaryPomp) => {
    if (createBasedOn) {
      if (data.basedName && data.BasedOn?.value) {
        dispath(DictionaryClinrecPompThunk.createPompBasedOn(Number(data.BasedOn?.value), data.basedName, onClose));
      } else {
        !data.basedName && setError("basedName", { type: "custom", message: "Обязательное поле" });
        !data.BasedOn?.value && setError("BasedOn", { type: "custom", message: "Обязательное поле" });
      }
    } else {
      delete data.BasedOn;
      if (props?.currentPomp?.idPomp) {
        dispath(
          DictionaryClinrecPompThunk.editPomp(
            {
              ...data,
              idPomp: props.currentPomp.idPomp,
              revisionEdate: data.revisionEdate === "Invalid date" ? undefined : data.revisionEdate,
              revisionBdate: data.revisionBdate === "Invalid date" ? undefined : data.revisionBdate,
              isCustom: true,
              sort: props?.currentPomp.sort || 0,
              profile: data.profile?.value
                ? data.profile?.value === "null"
                  ? null
                  : Number(data.profile?.value)
                : undefined,
            },
            onClose
          )
        );
      } else
        dispath(
          DictionaryClinrecPompThunk.createPomp(
            {
              ...data,
              isCustom: true,
              revisionEdate: data.revisionEdate === "Invalid date" ? undefined : data.revisionEdate,
              revisionBdate: data.revisionBdate === "Invalid date" ? undefined : data.revisionBdate,
              sort: props?.currentPomp?.sort || 0,
              profile: data.profile?.value
                ? data.profile?.value === "null"
                  ? null
                  : Number(data.profile?.value)
                : undefined,
            },
            onClose
          )
        );
    }
  };

  const onChangeEventsDate = (event: string, onChange: (...event: any[]) => void) => {
    const arrDate = event?.split("/") || "";
    const dataValue = new Date(Number(arrDate[2]), Number(arrDate[1]) - 1, Number(arrDate[0]));
    onChange(dataValue);
  };

  return (
    <ModalContainer
      loading={loadingPompList && loadingPompProfiles}
      footer={<ButtonsModalForm disabledSubmit={props.disabled} onSubmit={handleSubmit(clickSave)} onClose={onClose} />}
      width={800}
      title={
        props?.currentPomp?.idPomp
          ? "Настройка порядка оказания медицинской помощи"
          : "Добавить порядок оказания медицинской помощи"
      }
    >
      {!props?.currentPomp?.idPomp && (
        <RangeSwitch
          leftText={"Создать новую"}
          rightText={"Создать на основе существующей"}
          leftTextWidth={"110px"}
          rightTextWidth={"252px"}
          maxWidth={"432px"}
          onChange={(value) => {
            setCreateBasedOn(value);
            setValue("iscustom", !value);
          }}
          defaultValue={createBasedOn}
        />
      )}
      {createBasedOn ? (
        <CreatePompBasedOnFields control={control} errors={errors} />
      ) : (
        <>
          <Input
            styleContainer={{ marginTop: 10 }}
            label={"Название"}
            isRequired
            fullWidth
            name="name"
            ref={register({
              required: "Обязательное поле",
              maxLength: { value: 1000, message: "Максимально допустимое число символов: 1000" },
            })}
            error={!!errors.name}
            disabled={props?.disabled}
            errorMsg={errors.name?.message}
          />

          <Input
            styleContainer={{ marginTop: 10 }}
            label={"Номер"}
            type={"text"}
            fullWidth
            name="idMz"
            value={idMz.value}
            onChange={(event) => {
              const reg = new RegExp(/^[0-9a-zа-яё/-]{0,1000}$/gi);
              reg.test(event.currentTarget.value)
                ? idMz.onChange(event.currentTarget.value)
                : idMz.onChange(event.currentTarget.value.slice(0, -1));
            }}
            error={!!errors.idMz}
            maxLength={1000}
            disabled={props?.disabled}
            errorMsg={errors.idMz?.message}
          />

          {typeof props?.currentPomp?.revisionId === "number" ? (
            <Input
              styleContainer={{ marginTop: 10 }}
              label={"Номер редакции документа"}
              fullWidth
              disabled
              value={props.currentPomp.revisionId}
            />
          ) : null}
          <LabelStyle style={{ marginTop: 10 }}>Профиль медицинской помощи</LabelStyle>
          <CustomSelect
            placeholder={props?.disabled && !profile?.value ? " " : "Выберите из списка..."}
            isError={!!errors.profile}
            htmlID={"field-dictionary"}
            SelectValue={profile?.value || ""}
            options={profiles || []}
            closeMenuOnSelect
            isSearchable={true}
            menuPlacement={"top"}
            onChange={(value) => profile.onChange(value)}
            isDisabled={props?.disabled}
          />
          <FlexContainer direction={"row"} justify={"space-between"}>
            <CustomDateStack alignItems={"start"} style={{ width: "45%" }}>
              <LabelStyle style={{ marginTop: 10 }}>Дата утверждения</LabelStyle>
              <InputDate
                disabled={props?.disabled}
                onChange={(event) => onChangeEventsDate(event, revisionBdate.onChange)}
                defaultValue={revisionBdate.value}
                error={!!errors.revisionBdate}
              />
              {errors.revisionBdate?.message && <ErrorText>{errors.revisionBdate?.message}</ErrorText>}
            </CustomDateStack>
            <CustomDateStack alignItems={"start"} style={{ width: "45%" }}>
              <LabelStyle style={{ marginTop: 10 }}>Утратил силу</LabelStyle>
              <InputDate
                onChange={(event) => onChangeEventsDate(event, revisionEdate.onChange)}
                defaultValue={revisionEdate.value}
                error={!!errors.revisionEdate}
                disabled={props?.disabled}
              />
              {errors.revisionEdate?.message && <ErrorText>{errors.revisionEdate?.message}</ErrorText>}
            </CustomDateStack>
          </FlexContainer>
        </>
      )}
    </ModalContainer>
  );
};

const CustomDateStack = styled(FlexContainer)`
  position: relative;

  #input_date_component {
    position: relative;
  }

  #containerCalendar {
    top: -255px;
    right: -68px;
  }
`;

const ErrorText = styled.div`
  color: ${theme.colors.lightRed};
`;
