import { theme } from "common/styles/theme";
import { authorizationSelector } from "module/authorization/authorizationSelector";
import { AuthService } from "module/authorization/AuthService";
import { profileSelector } from "module/usersList/usersListSelector";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { styled } from "../../styles/styled";
import { IconLogOut } from "../Icon/IconLogOut";
import { IconProfile } from "../Icon/IconProfile";
import { AppSettings } from "../../constants/appSettings";

export const Header: React.FC = () => {
  const { userId } = useSelector(authorizationSelector);
  const { profile } = useSelector(profileSelector);

  const logOut = useCallback(() => {
    const authService = new AuthService();
    authService.logout();
  }, []);

  return (
    <Container>
      <Text to={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/proposal`}>
        Регистры заболеваний {AppSettings.get("region_name") || ""}
      </Text>
      <Block>
        {profile?.familyName ? (
          <UserName id={"user_name"}>
            {`${profile?.familyName} ${profile?.givenName[0]}. ${profile?.middleName[0]}. (${profile?.roleName})`}
          </UserName>
        ) : null}
        <Link id={"profile"} to={`${`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/profile`}/${userId}`}>
          <IconProfile />
        </Link>
        <SVGContainer onClick={logOut} id={"logout"}>
          <IconLogOut />
        </SVGContainer>
      </Block>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${theme.colors.green};

  padding: 9px 20px;
`;

const Text = styled(Link)`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  display: flex;
  align-items: flex-end;
  letter-spacing: 0.005em;
  color: ${theme.colors.white};
  text-decoration: none;
`;

const Block = styled.div`
  display: flex;
  a {
    cursor: pointer;
    margin-right: 15px;
  }
`;

const UserName = styled.p`
  font-size: 16px;
  margin: 0 15px 0 0;
  color: ${theme.colors.white};
`;
const SVGContainer = styled.div`
  margin-right: 15px;
  cursor: pointer;
`;
