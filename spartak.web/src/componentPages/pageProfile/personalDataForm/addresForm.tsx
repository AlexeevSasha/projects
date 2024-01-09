import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useFormContext, useController } from "react-hook-form";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { SaveFanDataDto } from "../../../api/userRepository";
import { theme } from "../../../assets/theme/theme";
import { Input } from "../../../components/input/input";
import { CustomMenuList } from "../../../components/select/customMenuList";
import { CustomOption } from "../../../components/select/customOption";
import { CustomSelect, SelectOption } from "../../../components/select/select";
import { useWindowSize } from "../../../core/hooks/UseWindowSize";
import { ThemeContext } from "../../../core/themeProvider";

type Props = {
  field: "RegistrationAddress" | "ActualAddress";
  regionOptions: SelectOption[];
  cityOptions: SelectOption[];
};

export const AddresForm = ({ field, regionOptions, cityOptions }: Props) => {
  const { locale = "ru" } = useRouter();
  const { control } = useFormContext<SaveFanDataDto>();
  const { isDarkTheme } = useContext(ThemeContext);

  const rules = { required: lang[locale].form.validation.required };

  const { field: region, fieldState: regionState } = useController({ control, name: `${field}.RegionId` });
  const { field: city, fieldState: cityState } = useController({ control, name: `${field}.CityId` });
  const { field: street, fieldState: streetState } = useController({ control, name: `${field}.Street` });
  const { field: house, fieldState: houseState } = useController({ control, name: `${field}.House` });
  const { field: block, fieldState: blockState } = useController({ control, name: `${field}.Block` });
  const { field: flat, fieldState: flatState } = useController({ control, name: `${field}.Flat` });
  const { field: index, fieldState: indexState } = useController({ control, name: `${field}.Index`, rules });

  const { width = 1920 } = useWindowSize(true);

  return (
    <>
      <InputBlock>
        <Select
          lightStyle={!isDarkTheme}
          error={regionState.error?.message}
          value={regionOptions.find(({ value }) => value === region.value)}
          onChange={region.onChange}
          label={lang[locale].pagePersonalData.questionnaire.region}
          options={regionOptions}
          isSearchable
          maxMenuHeight={width > 1199 ? (282 / 19.2) * (width / 100) : undefined}
        />

        <CitiInputWrapper hidden={locale === "en"}>
          <Select
            lightStyle={!isDarkTheme}
            value={cityOptions.find(({ value }) => value === city.value)}
            error={cityState.error?.message}
            onChange={city.onChange}
            onBlur={city.onBlur}
            label={lang[locale].pagePersonalData.questionnaire.town}
            options={cityOptions}
            isSearchable
            captureMenuScroll={false}
            maxMenuHeight={width > 1199 ? (182 / 19.2) * (width / 100) : undefined}
            components={{
              Option: CustomOption,
              MenuList: CustomMenuList,
            }}
          />
        </CitiInputWrapper>
      </InputBlock>

      <InputBlock>
        <Input
          lightStyle={!isDarkTheme}
          error={streetState.error?.message}
          value={street.value}
          onChange={street.onChange}
          onBlur={street.onBlur}
          label={lang[locale].pagePersonalData.questionnaire.street}
        />

        <SmallInputsBlock>
          <Input
            lightStyle={!isDarkTheme}
            error={houseState.error?.message}
            value={house.value}
            onChange={house.onChange}
            onBlur={house.onBlur}
            label={lang[locale].pagePersonalData.questionnaire.house}
          />

          <Input
            lightStyle={!isDarkTheme}
            error={blockState.error?.message}
            value={block.value}
            onChange={block.onChange}
            onBlur={block.onBlur}
            label={lang[locale].pagePersonalData.questionnaire.frame}
          />

          <Input
            lightStyle={!isDarkTheme}
            error={flatState.error?.message}
            value={flat.value}
            onChange={flat.onChange}
            onBlur={flat.onBlur}
            label={lang[locale].pagePersonalData.questionnaire.flat}
          />

          <Input
            lightStyle={!isDarkTheme}
            error={indexState.error?.message}
            value={index.value}
            onChange={index.onChange}
            onBlur={index.onBlur}
            label={`${lang[locale].pagePersonalData.questionnaire.postIndex} *`}
          />
        </SmallInputsBlock>
      </InputBlock>
    </>
  );
};

const SmallInputsBlock = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  gap: 1.25vw;
  padding-bottom: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 3.13vw;
    margin-bottom: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 6.4vw;
    margin-bottom: 6.4vw;
  }
`;

const InputBlock = styled.div`
  padding-bottom: 1.25vw;

  & > label {
    margin-bottom: 1.25vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-bottom: 0;

    & > label {
      margin-bottom: 3.13vw;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    & > label {
      margin-bottom: 6.4vw;
    }
  }
`;

const Select = styled(CustomSelect)``;

const CitiInputWrapper = styled.div<{ hidden?: boolean }>`
  visibility: ${({ hidden }) => (hidden ? "hidden" : "visible")};
`;
