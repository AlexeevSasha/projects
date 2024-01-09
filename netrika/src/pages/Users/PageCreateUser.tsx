import { IUser, IUserForm } from "common/interfaces/user/IUser";
import { UserApiRequest } from "api/userApiRequest";
import { validateRu } from "common/constants/validate";
import { DownloadFileContainer } from "pages/Register/PageRegisterCheckList";
import { theme } from "common/styles/theme";
import { profileSelector, rolesSelector, usersListSelector } from "module/usersList/usersListSelector";
import { UserListThunk } from "module/usersList/usersListThunk";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { MetaTags } from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { IconLoading } from "common/components/Icon/IconLoading";
import { CheckBox } from "common/ui/Input/CheckBox";
import { errorPopup } from "common/helpers/toast/error";
import { Footer } from "common/components/Footer";
import { styled } from "../../common/styles/styled";
import { IconEye } from "../../common/components/Icon/IconEye";
import { css } from "styled-components";
import { useLocation } from "react-router";
import { UsersListAction } from "../../module/usersList/usersListAction";
import { configurationSelector } from "../../module/configuration/configurationSelector";
import { BreadCrumbs } from "../../common/ui/BreadCrumbs/BreadCrumbs";
import { successPopup } from "../../common/helpers/toast/success";
import { useSelectsCreateUsers } from "./hooks/useSelectsCreateUsers";
import { getObjectUser } from "./helpers/getObjectUser";
import { authorizationSelector } from "../../module/authorization/authorizationSelector";
import { UserRolesEnum } from "../../common/interfaces/user/UserRolesEnum";
import { AppSettings } from "../../common/constants/appSettings";
import { Input } from "../../common/ui/Input/Input";
import { ButtonStyles } from "../../common/ui/Button/styles/ButtonStyles";

export const PageCreateUser = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams<{ id?: string }>();
  const isEdit = location.pathname.includes("edit");

  const { user, snilsUser, loading } = useSelector(usersListSelector);
  const { profile } = useSelector(profileSelector);
  const roles = useSelector(rolesSelector).map((item) => ({ value: item.key, label: item.value }));
  const { userPasswordOption } = useSelector(configurationSelector);
  const { login } = useSelector(authorizationSelector);

  const { register, errors, handleSubmit, setValue, control, reset } = useForm<IUserForm>();

  const [frmr, setFrmr] = useState<string>("");
  const [isFRMR, setIsFRMR] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isSysAcc, setIsSysAcc] = useState<boolean>();
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [passwordType, setPasswordType] = useState<"password" | "text">("password");
  const [allAvalableMo, setAllAvalableMo] = useState<boolean>(false);

  const {
    renderRoles,
    renderMainMo,
    renderAvailableMos,
    renderMainWorkPosition,
    renderAvailableWorkPositions,
    renderAvailableGroups,
  } = useSelectsCreateUsers({
    control,
    errors,
    isFRMR,
    allAvalableMo,
  });

  useEffect(() => {
    dispatch(UserListThunk.getRoles());
    dispatch(UserListThunk.getAvailableMoWithFilter({ pageIndex: 1, pageSize: 15, search: "" }));
    dispatch(UserListThunk.getUserGroups());
    dispatch(UserListThunk.getWorkPosition());
    if (id) dispatch(UserListThunk.getUser(+id));
  }, [id, dispatch]);

  useEffect(() => {
    if (user.id) {
      setValue("role", roles.find((item) => item.value === user.role) || { value: 0, label: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  useEffect(() => {
    if (user.id) {
      setIsActive(Boolean(user.isActive));
      setIsSysAcc(user.isSysAcc);
      setFrmr(user.snils);
      if (user.isFrmrUser) {
        setIsFRMR(user.isFrmrUser);
      }
      setAllAvalableMo(user.allMo);

      const avalableMoValue = user?.availableMos.map((item) => ({
        value: item?.moId || "",
        label: item?.moName || "",
      }));

      const workPositionValue = user?.availableWorkPositions.map((item) => ({
        value: item?.id?.toString() || "",
        label: item?.name || "",
      }));

      const userGroupsValue = user?.availableGroups.map((item) => ({
        value: item?.userGroupId?.toString() || "",
        label: item?.groupName || "",
      }));

      reset({
        ...user,
        password: "",
        workPositionName: { value: user.workPositionCodeFrmr, label: user.workPositionName },
        availableWorkPositions: workPositionValue,
        lpuNameFrmr: { value: user.lpuBizKeyFrmr, label: user.lpuNameFrmr } as any,
        role: roles.find((item) => item.value === user.role) || { value: 0, label: "" },
        availableGroups: userGroupsValue,
        availableMos: avalableMoValue,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const generatePassword = async () => {
    const result = await new UserApiRequest().getPassword();
    setValue("password", result.result);
    setPasswordValue(result.result);
  };

  const onSave = (formData: IUserForm) => {
    const objectData = getObjectUser(isFRMR, formData, user, snilsUser, id);
    if (isFRMR) {
      if ((user.id || snilsUser.snils) && formData.role) {
        new UserApiRequest()
          .updateUser({
            ...objectData,
            password: userPasswordOption ? passwordValue : "",
            allMo: allAvalableMo,
            isFrmrUser: isFRMR,
            isActive,
            isSysAcc,
          } as IUser)
          .then((result) => {
            if (result.isError) {
              errorPopup(result.message);
            } else {
              successPopup(result.message);
              history.push(`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/users`);
            }
          })
          .then(() => {
            if (profile.id === user.id) {
              dispatch(UserListThunk.getProfile(Number(user.id)));
            }
          });
      }
    } else {
      if (formData.role && formData.lpuNameFrmr.value && formData.workPositionName.value) {
        new UserApiRequest()
          .updateUser({
            ...objectData,
            password: userPasswordOption
              ? passwordValue
              : !user.id
              ? Math.random()
                  .toString(36)
                  .substring(7)
              : "",
            allMo: allAvalableMo,
            isFrmrUser: isFRMR,
            isActive,
            isSysAcc,
          } as IUser)
          .then((result) => {
            if (result.isError) {
              errorPopup(result.message);
            } else {
              successPopup(result.message);
              history.push(`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/users`);
            }
          })
          .then(() => {
            if (profile.id === user.id) {
              dispatch(UserListThunk.getProfile(Number(user.id)));
            }
          });
      }
    }
  };

  const changeSnils = (value: string) => {
    setFrmr(value.replace(/[- ]{1}/g, ""));
    setValue("snils", value.replace(/[- ]{1}/g, ""));
    dispatch(UsersListAction.clearSnilsUser(null));
  };

  const getDoctorINfo = () => {
    dispatch(UserListThunk.getDoctorINfo(frmr.replace(/[- ]{1}/g, "")));
  };

  const onCheckFrmr = () => {
    setIsFRMR(!isFRMR);
    if (!isFRMR) {
      dispatch(UserListThunk.getDoctorINfo(frmr.replace(/[- ]{1}/g, "")));
    }
  };

  const handlerPasswordType = useCallback(() => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  }, [passwordType]);

  const checkAllAvalableMo = useCallback(() => {
    if (!allAvalableMo) {
      setValue("availableMos", []);
    }
    setAllAvalableMo(!allAvalableMo);
  }, [allAvalableMo, setValue]);

  return (
    <Container>
      <MetaTags>
        <title>{id ? "Редактирование пользователя" : "Создание пользователя"}</title>
      </MetaTags>
      <MenuBreadCrumbs>
        <MenuText color={theme.colors.black}>
          <BreadCrumbs
            elem={[
              { name: "Пользователи", link: `${AppSettings.get("REACT_APP_ROOT_FOLDER")}/users` },
              { name: id ? "Редактирование пользователя" : "Создание пользователя", link: "" },
            ]}
            id={id ? "update_user" : "create_user"}
          />
        </MenuText>
      </MenuBreadCrumbs>
      <Title>Данные пользователя:</Title>
      <FormContainer>
        <FormLine>
          <Text>Пользователь из ФРМР:</Text>
          <CheckBox check={isFRMR} checkId={0} onCheck={onCheckFrmr} hideMarginLeft />
        </FormLine>
        <FormLine>
          <Text>СНИЛС:</Text>
          <InputContainer>
            <InputMask
              mask="999-999-999 99"
              value={frmr}
              onChange={(value: ChangeEvent<HTMLInputElement>) => changeSnils(value.currentTarget.value)}
            >
              {() => (
                <Input
                  fullWidth
                  id={"input_snils"}
                  placeholder="Ввод"
                  name="snils"
                  ref={register({
                    required: true,
                  })}
                  error={!!errors.snils}
                />
              )}
            </InputMask>
          </InputContainer>
          {isFRMR && (
            <WhiteButton id={"verify_frmr"} onClick={getDoctorINfo}>
              Проверить ФРМР
            </WhiteButton>
          )}
        </FormLine>
        <FormLine>
          <Text>Фамилия:</Text>
          {isFRMR ? (
            <Description id={"family_name"}>{snilsUser.familyName || user.familyName}</Description>
          ) : (
            <InputContainer>
              <Input
                fullWidth
                id="familyName"
                placeholder="Фамилия"
                name="familyName"
                ref={register({
                  required: "error message",
                })}
                error={!!errors.familyName}
              />
            </InputContainer>
          )}
        </FormLine>
        <FormLine>
          <Text>Имя:</Text>
          {isFRMR ? (
            <Description id={"name"}>{snilsUser.givenName || user.givenName}</Description>
          ) : (
            <InputContainer>
              <Input
                fullWidth
                id="givenName"
                placeholder="Имя"
                name="givenName"
                ref={register({
                  required: "error message",
                })}
                error={!!errors.givenName}
              />
            </InputContainer>
          )}
        </FormLine>
        <FormLine>
          <Text>Отчество:</Text>
          {isFRMR ? (
            <Description id={"middle_name"}>{snilsUser.middleName || user.middleName}</Description>
          ) : (
            <InputContainer>
              <Input
                fullWidth
                id="middleName"
                placeholder="Отчество"
                name="middleName"
                ref={register({
                  required: true,
                })}
                error={!!errors.middleName}
              />
            </InputContainer>
          )}
        </FormLine>
        {isFRMR ? (
          <FormLine>
            <Text>МО ФРМР:</Text>
            <Description id={"lpu_name_frmr"}>{snilsUser.lpuNameFrmr || user.lpuNameFrmr}</Description>
          </FormLine>
        ) : (
          renderMainMo
        )}
        {isFRMR ? (
          <FormLine>
            <Text>Должность ФРМР:</Text>
            <Description id={"work_position_frmr"}>{snilsUser.workPositionName || user.workPositionName}</Description>
          </FormLine>
        ) : (
          renderMainWorkPosition
        )}
        <FormLine>
          <Text>Логин:</Text>
          <InputContainer>
            <Input
              fullWidth
              id={"input_login"}
              placeholder={"Ввод"}
              maxLength={50}
              name="login"
              ref={register({
                required: "error message",
                validate: (event: string) => {
                  return validateRu.test(event);
                },
                pattern: /^[^а-яё]+$/iu,
              })}
              error={!!errors.login}
            />
          </InputContainer>
        </FormLine>
        {userPasswordOption && (
          <FormLine>
            <Text>Пароль:</Text>
            <PasswordContainer>
              <InputContainer>
                <Input
                  fullWidth
                  disabled
                  type={passwordType}
                  id={"input_password"}
                  placeholder={"Ввод"}
                  maxLength={50}
                  name="password"
                  ref={register({
                    required: !isEdit,
                  })}
                  error={!!errors.password && !isEdit}
                />
              </InputContainer>

              <div onClick={handlerPasswordType}>
                <IconEye />
              </div>
              <Button type={"button"} onClick={generatePassword}>
                Сгенерировать пароль
              </Button>
            </PasswordContainer>
          </FormLine>
        )}
        {renderAvailableMos}
        <FormLine>
          <Text>Все МО:</Text>
          <CheckBox check={allAvalableMo} checkId={0} hideMarginLeft onCheck={checkAllAvalableMo} />
        </FormLine>

        {renderAvailableWorkPositions}
        {renderRoles}
        {renderAvailableGroups}
        <FormLine>
          <Text>Блокировка учетной записи:</Text>
          <CheckBox
            disabled={!!user?.frmrBlock}
            check={user?.frmrBlock || !isActive}
            checkId={1}
            onCheck={() => setIsActive(!isActive)}
            hideMarginLeft
          />
        </FormLine>
        <FormLine>
          <Text>Статус учетной записи:</Text>
          {isActive && !user?.frmrBlock
            ? "Активна"
            : user?.frmrBlock
            ? "Заблокирована на основании информации об увольнении в ФРМР"
            : "Заблокирована"}
        </FormLine>
        {login === UserRolesEnum.RegistrySuperUsr && (
          <FormLine>
            <Text>Системная учетная запись:</Text>
            <CheckBox check={!!isSysAcc} checkId={2} onCheck={() => setIsSysAcc(!isSysAcc)} hideMarginLeft />
          </FormLine>
        )}
      </FormContainer>
      <Footer button onClose={() => history.goBack()} onSave={handleSubmit((d) => onSave(d))} />
      {loading ? (
        <DownloadFileContainer>
          <IconLoading />
        </DownloadFileContainer>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 110px;
  margin-right: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Title = styled.h3`
  color: ${theme.colors.black};
  margin-bottom: 40px;
`;

const FormContainer = styled.form`
  overflow: auto;
  height: 100%;
`;

const FormLine = styled.div`
  display: grid;
  grid-template-columns: 30% 40% 20%;
  margin-bottom: 15px;
  align-items: center;
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 350px;
`;

const WhiteButton = styled.div`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.green};
  box-sizing: border-box;
  border-radius: 20px;
  padding: 10px 15px;

  color: ${theme.colors.green};
  text-align: center;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const Text = styled.p`
  color: #878990;
`;

const Description = styled.p`
  color: ${theme.colors.black};
`;

const PasswordContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Button = styled(ButtonStyles)<{ disabled?: boolean }>`
  background: ${({ disabled }) => (disabled ? theme.colors.lightGray : theme.colors.green)};
  color: ${({ disabled }) => (disabled ? theme.colors.black : theme.colors.white)};
  padding: 10px 40px;
  height: fit-content;

  ${({ disabled }) =>
    !disabled &&
    css`
      :hover {
        opacity: 0.9;
      }
    `}
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
