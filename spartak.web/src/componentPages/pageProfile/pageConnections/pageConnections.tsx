import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { ChildCardEntity } from "../../../api/dto/ChildCard";
import { UserRelationDto } from "../../../api/dto/UserRelation";
import { userRepository } from "../../../api/userRepository";
import { IconRedCross } from "../../../assets/icon/iconRedCross";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { DataContext } from "../../../core/dataProvider";
import { LoadingScreen } from "../../../ui/LoadingScreen ";
import { AddContactModal } from "./addContactModal";
import { AddChildrenCardModal } from "./addlChildrenCardModal";
import { RemoveRelationModal } from "./removeRelationModal";
import { IconInfo as InfoIcon } from "../../../assets/icon/iconInfo";
import { IconImage } from "../../../components/IconImage";
import tail from "../../../assets/icon/tail.svg";

export const PageConnections = () => {
  const { locale = "ru" } = useRouter();
  const [loading, setLoading] = useState(false);
  const [contactModalIsVisible, setContactModalVisible] = useState(false);
  const [childrenCardModalIsVisible, setChildrenCardModalVisible] = useState(false);
  const [removeRelationId, setRemoveRelationId] = useState<string | undefined>();
  const { auth: { user = undefined } = {} } = useContext(DataContext);
  const showChildCards = !["Детский", "SpartakKids"].includes(user?.data.fanLevel || "");

  const relationsRef = useRef<UserRelationDto[]>([]);
  const childCardsRef = useRef<ChildCardEntity[]>([]);

  const getRelations = async () => await userRepository.fetchRelations().then((res) => (relationsRef.current = res));
  const getChildCards = async () => await userRepository.fetchChildCards().then((res) => (childCardsRef.current = res));
  const getAllRelations = async () => {
    setLoading(true);
    await Promise.all([getRelations(), getChildCards()]);
    setLoading(false);
  };

  const deleteRelation = async (id: string) => {
    setLoading(true);
    await userRepository.deleteRelation(id);
    await getAllRelations();
    setRemoveRelationId(undefined);
    setLoading(false);
  };

  const toggleContactModal = async (needRefresh?: boolean) => {
    needRefresh && (await getAllRelations());
    setContactModalVisible(!contactModalIsVisible);
  };

  const toggleChildrenCardModal = async (needRefresh?: boolean) => {
    needRefresh && (await getChildCards());
    setChildrenCardModalVisible(!childrenCardModalIsVisible);
  };

  useEffect(() => {
    getAllRelations();
  }, []);

  return (
    <Container>
      {loading && <LoadingScreen />}

      <div>
        <Title>{lang[locale].pageProfileConnections.contacts.title}</Title>
        <Description>{lang[locale].pageProfileConnections.contacts.description}</Description>

        {relationsRef.current?.map(({ Id, Type, ContactName }) => (
          <BlockBind key={Id}>
            <BlockSocialAndName>
              <UserName>{ContactName}</UserName>

              <UsersGroup>{lang[locale].pageProfileConnections.types[Type]}</UsersGroup>
            </BlockSocialAndName>

            <StyledButton type={"opacity"} onClick={() => setRemoveRelationId(Id)}>
              {lang[locale].form.validation.untie}
            </StyledButton>
          </BlockBind>
        ))}

        {removeRelationId && (
          <RemoveRelationModal
            onClose={() => setRemoveRelationId(undefined)}
            onConfirm={() => deleteRelation(removeRelationId)}
          />
        )}

        {contactModalIsVisible && <AddContactModal onClose={toggleContactModal} />}

        <AddContact onClick={() => toggleContactModal()}>
          <IconRedCross />

          <span> {lang[locale].pageProfileConnections.contacts.addContact}</span>
        </AddContact>
      </div>

      {showChildCards && (
        <ChildrenCards>
          <Title>
            {lang[locale].pageProfileConnections.childrenCards.title}
            <InfoBlock>
              <IconInfo />
              <HoverInfoBlock>
                <Triangle url={tail.src} />
                {lang[locale].pageProfileConnections.contacts.kidsCardInfo}
              </HoverInfoBlock>
            </InfoBlock>
          </Title>

          <Description>{lang[locale].pageProfileConnections.childrenCards.description}</Description>

          {childCardsRef.current?.map(({ Id, FullName, RelationType, Number }) => (
            <BlockBind key={Id}>
              <BlockSocialAndName>
                <UserName>{FullName}</UserName>

                <UsersGroup>{lang[locale].pageProfileConnections.types[RelationType]}</UsersGroup>
              </BlockSocialAndName>

              <UserNumber>{Number}</UserNumber>
            </BlockBind>
          ))}

          {childrenCardModalIsVisible && (
            <AddChildrenCardModal onClose={toggleChildrenCardModal} allRelations={relationsRef.current} />
          )}

          <AddContact onClick={() => toggleChildrenCardModal()}>
            <IconRedCross />

            <span> {lang[locale].pageProfileConnections.childrenCards.addChildrenCard}</span>
          </AddContact>
        </ChildrenCards>
      )}
    </Container>
  );
};

const Container = styled.section`
  font-family: FCSM text, sans-serif;
  font-weight: 500;
  padding: 2.08vw 29.69vw 5.2vw;
  color: ${({ theme }) => theme.colors.white_black};
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 5.22vw 3.13vw 10.43vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw 4.27vw 10.7vw;
  }
`;

const Title = styled.p`
  font-weight: 700;
  margin: 0;
  font-size: 1.67vw;
  padding-bottom: 0.42vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    padding-bottom: 1.08vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    padding-bottom: 2.13vw;
  }
`;

const Description = styled.div`
  color: ${({ theme }) => theme.colors.gray_grayDark1};
  font-size: 0.94vw;
  padding-bottom: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    padding-bottom: 1.04vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    padding-bottom: 2.13vw;
  }
`;

const BlockBind = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${({ theme }) => `0.05vw solid ${theme.colors.grayDark_gray1}`};
  padding: 1.25vw 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 2.08vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.26vw 0;
    align-items: flex-end;
  }
`;

const BlockSocialAndName = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    align-items: flex-start;
    flex-direction: column;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
  }
`;

const UserNumber = styled.div`
  font-size: 0.93vw;
  padding: 0.78vw 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    padding: 1.96vw 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
    padding: 2.93vw 4.27vw;
  }
`;

const UserName = styled.div`
  font-size: 0.9375vw;
  width: 25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    width: 100%;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
  }
`;

const UsersGroup = styled.div`
  color: ${theme.colors.red};
  text-transform: uppercase;
  background: ${theme.colors.redOpacity};
  border-radius: 20px;
  padding: 0.21vw 0.63vw;
  font-size: 0.73vw;
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.1px;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.825vw;
    border-radius: 1.04vw;
    padding: 0.52vw 1.56vw;
    margin-top: 1.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    border-radius: 1.04vw;
    padding: 1.07vw 3.2vw;
  }
`;

const StyledButton = styled(CustomButton)`
  border-color: ${({ theme }) => theme.colors.white_grayDark};
  color: ${({ theme }) => theme.colors.white_grayDark};
  font-weight: 600;
  letter-spacing: 0.1px;
  justify-content: center;
`;

const ChildrenCards = styled.div`
  padding-top: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-top: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-top: 10.67vw;
  }
`;
const AddContact = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  padding-top: 1.25vw;
  color: ${theme.colors.red};
  text-transform: uppercase;
  gap: 0.42vw;
  font-size: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-top: 3.13vw;
    gap: 1.04vw;
    font-size: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-top: 6.4vw;
    gap: 2.13vw;
    font-size: 3.73vw;
  }
`;

const HoverInfoBlock = styled.div`
  z-index: 5;
  display: none;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 0.73vw;
  position: absolute;
  background-color: ${theme.colors.gray};
  color: ${theme.colors.black};
  padding: 0.42vw 0.63vw;
  text-align: center;
  width: 16.67vw;
  border-radius: 0.1vw;
  left: -1vw;
  bottom: 1.7vw;
  white-space: break-spaces;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.82vw;
    padding: 1vw 1.56vw;
    width: 41.72vw;
    bottom: 4vw;
    left: -1.4vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    padding: 2.13vw 3.2vw;
    width: 72vw;
    bottom: 8vw;
    left: -57vw;
  }
`;

const Triangle = styled(IconImage)`
  position: absolute;
  bottom: -0.5vw;
  width: 1.46vw;
  height: 0.63vw;
  left: 0.8vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 2.09vw;
    bottom: -0.6vw;
    left: 1.6vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    left: auto;
    right: 16vw;
    bottom: -1.5vw;
    width: 3.65vw;
    height: 1.57vw;
  }
`;

const InfoBlock = styled.div`
  position: relative;
  margin-left: 0.52vw;
  display: inline-block;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-left: 1.3vw;
  }

  :hover ${HoverInfoBlock} {
    display: block;
  }
`;

const IconInfo = styled(InfoIcon)`
  width: 1.25vw;
  height: 1.25vw;
  display: block;

  path {
    stroke: ${({ theme }) => theme.colors.white_grayDark1};
  }
  path:nth-of-type(3) {
    fill: ${({ theme }) => theme.colors.white_grayDark1};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 3.13vw;
    height: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 6.4vw;
    height: 6.4vw;
  }
`;
