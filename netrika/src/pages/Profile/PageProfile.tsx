import { theme } from "common/styles/theme";
import { profileSelector } from "module/usersList/usersListSelector";
import React from "react";
import { MetaTags } from "react-meta-tags";
import { useSelector } from "react-redux";
import { IconLoading } from "common/components/Icon/IconLoading";
import { Footer } from "common/components/Footer";
import { ICustomSelect } from "../../common/interfaces/ISelect";
import { styled } from "../../common/styles/styled";
import { CustomSelect } from "../../common/ui/Select/CustomSelect";
import { BreadCrumbs } from "../../common/ui/BreadCrumbs/BreadCrumbs";
import { AppSettings } from "../../common/constants/appSettings";

export const PageProfile: React.FC = () => {
  const { profile, loading } = useSelector(profileSelector);

  return (
    <Container>
      <MetaTags>
        <title>Профиль</title>
      </MetaTags>
      {loading ? (
        <IconLoading />
      ) : (
        <>
          <MenuBreadCrumbs>
            <MenuText color={theme.colors.black}>
              <BreadCrumbs
                elem={[
                  { name: "Пользователи", link: `${AppSettings.get("REACT_APP_ROOT_FOLDER")}/users` },
                  { name: "Профиль", link: "" },
                ]}
                id={"profile"}
              />
            </MenuText>
          </MenuBreadCrumbs>
          <Title>Данные пользователя:</Title>
          <FormContainer>
            <FormLine>
              <Text>СНИЛС:</Text>
              <InputContainer>{profile?.snils}</InputContainer>
            </FormLine>
            <FormLine>
              <Text>Фамилия:</Text>
              <Description>{profile?.familyName}</Description>
            </FormLine>
            <FormLine>
              <Text>Имя:</Text>
              <Description>{profile?.givenName}</Description>
            </FormLine>
            <FormLine>
              <Text>Отчество:</Text>
              <Description>{profile?.middleName}</Description>
            </FormLine>
            <FormLine>
              <Text>МО ФРМР:</Text>
              <Description>{profile.lpuNameFrmr}</Description>
            </FormLine>
            <FormLine>
              <Text>Должность ФРМР:</Text>
              <Description>{profile?.workPositionName}</Description>
            </FormLine>

            <FormLine>
              <Text>Логин:</Text>
              <InputContainer>{profile?.login}</InputContainer>
            </FormLine>

            <FormLine>
              <Text>Дополнительное МО:</Text>
              <SelectContainer>
                {profile?.availableMos?.length > 0 ? (
                  <CustomSelect
                    htmlID={"availableMos"}
                    isDisabled
                    isMulti
                    SelectValue={profile?.availableMos?.map((item) => ({
                      value: item.moName,
                      label: item.moName,
                    }))}
                    options={[] as ICustomSelect[]}
                  />
                ) : (
                  <EmptyBlock>—</EmptyBlock>
                )}
              </SelectContainer>
            </FormLine>

            <FormLine>
              <Text>Доп. должность:</Text>
              <SelectContainer>
                {profile?.availableWorkPositions?.length > 0 ? (
                  <CustomSelect
                    htmlID={"availableWorkPositions"}
                    isDisabled
                    isMulti
                    SelectValue={profile?.availableWorkPositions?.map((item) => ({
                      value: item.name,
                      label: item.name,
                    }))}
                    options={[] as ICustomSelect[]}
                  />
                ) : (
                  <EmptyBlock>—</EmptyBlock>
                )}
              </SelectContainer>
            </FormLine>

            <FormLine>
              <Text>Роль в системе:</Text>
              <InputContainer>{profile?.roleName}</InputContainer>
            </FormLine>

            <FormLine>
              <Text>Группа:</Text>
              <SelectContainer>
                {profile?.availableGroups?.length > 0 ? (
                  <CustomSelect
                    htmlID={"availableGroups"}
                    isDisabled
                    isMulti
                    SelectValue={profile?.availableGroups?.map((item) => ({
                      value: item.groupName,
                      label: item.groupName,
                    }))}
                    options={[] as ICustomSelect[]}
                  />
                ) : (
                  <EmptyBlock>—</EmptyBlock>
                )}
              </SelectContainer>
            </FormLine>
          </FormContainer>
          <Footer />
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 60px;
  margin-right: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Title = styled.h2`
  margin-bottom: 40px;
`;

const FormContainer = styled.div`
  overflow: auto;
  height: 100%;
`;

const FormLine = styled.div`
  display: grid;
  grid-template-columns: 30% 40% 20%;
  margin-bottom: 15px;
  align-items: center;
`;

const InputContainer = styled.span`
  display: grid;
  grid-template-columns: 350px;
`;

const Text = styled.span`
  color: ${theme.colors.hightBlue}; //#878990;
`;

const Description = styled.span`
  color: ${theme.colors.black};
`;

const SelectContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const EmptyBlock = styled.div`
  color: ${theme.colors.hightBlue};
`;

export const MenuBreadCrumbs = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 65px 15px 0;
`;

export const MenuText = styled.div`
  font-weight: 600;
  letter-spacing: 0.005em;
  color: ${theme.colors.black};
  display: flex;
  align-items: center;

  span {
    color: ${theme.colors.hightBlue};
    font-weight: normal;
  }

  svg {
    margin: 0 16px;
  }
`;
