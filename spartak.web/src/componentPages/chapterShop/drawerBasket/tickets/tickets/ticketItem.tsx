import { useMemo, useState } from "react";
import styled from "styled-components";
import { lang } from "../../../../../../public/locales/lang";
import { DeleteCartTicketsDto, ITicket } from "../../../../../api/dto/ITickets";
import { ChecksIcon } from "../../../../../assets/icon/checksIcon";
import { ClearCartIcon } from "../../../../../assets/icon/clearCartIcon";
import { theme } from "../../../../../assets/theme/theme";
import { CustomSelect } from "../../../../../components/select/select";
import { NextImage } from "../../../../../ui/nextImage/nextImage";
import { useRouter } from "next/router";
import { CaretRight } from "../../../../../assets/icon/caretRight";
import { CrossIcon } from "../../../../../assets/icon/CrossIcon";
import { InputPhoneEmailCode } from "../../../../../components/input/inputPhoneEmailCode";

interface IProps {
  ticketInfo: ITicket;
  onDelete: (id: DeleteCartTicketsDto) => void;
  onChangeCategory: (body?: { id: string; categoryId: string }) => void;
  fanIdHandler: (body?: { id: string; fanId: string }) => Promise<boolean>;
}

export const TicketItem = ({ ticketInfo, onDelete, onChangeCategory, fanIdHandler }: IProps) => {
  const wordOfName = ticketInfo.name.split(" ");
  const [fanId, setFanId] = useState<string | undefined>(ticketInfo.fanId ?? undefined);
  const [fanIdcheckFailed, setFanIdCheckFailed] = useState(false);
  const { locale = "ru" } = useRouter();

  const checkFanId = () => {
    if (fanId) {
      fanIdHandler({ id: ticketInfo.id, fanId: fanId })?.then((isChecked) => {
        setFanIdCheckFailed(!isChecked);
      });
    }
  };

  const ticketDate = useMemo(() => {
    // const tickeckDate = new Date(ticketInfo.calendarDay);
    return (
      ticketInfo.calendarDay.split(".")[0] +
      " " +
      lang[locale].monthList.declination[Number(ticketInfo.calendarDay.split(".")[1]) - 1]
    ); //tickeckDate.toLocaleDateString(locale, { day: "2-digit", month: "long" });
  }, [ticketInfo]);

  return (
    <Content>
      <LeftContainer>
        <Head>
          <ContainerImg>
            {ticketInfo.logo ? (
              <NextImage
                alt={ticketInfo.calendarName}
                src={`${process.env.NEXT_PUBLIC_TICKETS_URL}/${ticketInfo.logo}`}
              />
            ) : null}
          </ContainerImg>

          <Text>{ticketInfo.calendarName}</Text>
        </Head>

        <Description>
          {ticketDate}, {ticketInfo.calendarTime}
        </Description>
      </LeftContainer>

      <MiddleContainer>
        <div>
          <Text>
            {wordOfName[1]} {wordOfName[0].toLowerCase()}
          </Text>

          <Text>
            {wordOfName[3]} {wordOfName[2].toLowerCase()}, {wordOfName[5]} {wordOfName[4].toLowerCase()}
          </Text>
        </div>
        {ticketInfo.requestFanId === 1 ? (
          <InputPhoneEmailCode
            lightStyle={true}
            paddingPosition={"right"}
            phoneWithoutFlag={true}
            onChange={(e) => {
              setFanId(e.target.value);
              setFanIdCheckFailed(false);
            }}
            value={fanId}
            placeholder={lang[locale].tickets.noFanId}
            error={fanIdcheckFailed ? lang[locale].tickets.fanIfCheckError : undefined}
            icon={
              fanIdcheckFailed ? (
                <NoFanIdIconWrapperTransparent>
                  <CrossIcon
                    color={theme.colors.gray}
                    onClick={() => {
                      setFanId("");
                      setFanIdCheckFailed(false);
                    }}
                  />
                </NoFanIdIconWrapperTransparent>
              ) : (!ticketInfo.fanId || fanId !== ticketInfo.fanId) && ticketInfo.requestFanId === 1 ? (
                <NoFanIdIconWrapper>
                  <CaretRight color={theme.colors.white} onClick={checkFanId} />
                </NoFanIdIconWrapper>
              ) : (
                <NoFanIdIconWrapperTransparent>
                  <ChecksIcon color={theme.colors.green2} />
                </NoFanIdIconWrapperTransparent>
              )
            }
          />
        ) : (
          <></>
        )}
      </MiddleContainer>

      <RightContainer>
        <Price>{parseInt(ticketInfo.price)} ₽</Price>

        <ContainerDeleteIcon>
          <ClearCartIcon onClick={() => onDelete({ id: ticketInfo.id })} />
        </ContainerDeleteIcon>

        <SelectContainer>
          <CustomSelect
            lightStyle
            options={ticketInfo.categories.map((item) => ({ label: item.name, value: item.id }))}
            defaultValue={ticketInfo.categories
              .map((item) => ({ label: item.name, value: item.id }))
              .find((item) => item.value === ticketInfo.categoryId)}
            onSelect={(value) => (value ? onChangeCategory({ id: ticketInfo.id, categoryId: value.value }) : undefined)}
          />
        </SelectContainer>
      </RightContainer>
    </Content>
  );
};

const LeftContainer = styled.div`
  grid-area: asideLeft;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  height: 100%;
`;

const MiddleContainer = styled.div`
  grid-area: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    flex-direction: row;
    gap: 2.13vw;
    & > * {
      width: 50%;
    }
  }
`;

const RightContainer = styled.div`
  grid-area: asideRight;
  display: grid;
  grid-template-columns: auto 1.25vw;
  align-items: center;
  grid-column-gap: 0.83vw;

  font-size: 1.25vw;
  font-weight: 700;

  svg {
    width: 1.25vw;
    height: 1.25vw;
    cursor: pointer;
    &:hover {
      path {
        stroke: ${theme.colors.red};
      }
    }
    path {
      stroke: ${theme.colors.grayDark};
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: auto 3.13vw;
    grid-column-gap: 2.09vw;

    svg {
      width: 3.13vw;
      height: 3.13vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-areas:
      "price delete"
      "select select";
    grid-template-columns: auto auto;
    justify-content: space-between;
    align-items: center;

    svg {
      width: 6.4vw;
      height: 6.4vw;
    }
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: "asideLeft center asideRight";
  grid-column-gap: 0.42vw;
  align-items: center;

  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  border-bottom: 1px solid ${theme.colors.grayLight};
  padding: 1.77vw 1.25vw 1.15vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    //grid-template-columns: auto auto auto;
    grid-column-gap: 1.04vw;
    padding: 3.13vw 3.13vw 2.87vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw 4.27vw 6.13vw;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-columns: 50% 50%;
    grid-template-areas:
      "asideLeft asideRight"
      "center center";
    grid-column-gap: 2.13vw;
    grid-row-gap: 2.13vw;
  }
`;

const SelectContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  margin-top: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 0;
    grid-column-start: 1;
    grid-column-end: 2;
    grid-area: select;
  }
`;

const ContainerDeleteIcon = styled.div`
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-area: delete;
  }
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 0.63vw;
  align-items: center;
  margin-bottom: 0.31vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: auto 1fr;
    grid-column-gap: 1.56vw;
    margin-bottom: 0.78vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: auto 1fr;
    grid-column-gap: 2.13vw;
    margin-bottom: 1.07vw;
  }
`;

const ContainerImg = styled.div`
  height: 2.08vw;
  width: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 5.22vw;
    width: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 10.67vw;
    width: 10.67vw;
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: 0.83vw; //0.94vw;
  color: ${theme.colors.black};
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
  }
`;

const Description = styled.p`
  margin: 0;
  font-size: 0.73vw;
  font-family: Roboto;
  font-weight: 400;
  color: ${theme.colors.grayDark};
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
  }
`;

const Price = styled.p`
  margin: 0;
  font-size: 1.25vw;
  color: ${theme.colors.red};
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    grid-area: price;
  }
`;

const NoFanIdIconWrapper = styled.div`
  background-color: ${theme.colors.fireEngineRed};
  display: flex;
  align-items: center;
  transform: translate(calc(-50% - 0.1vw), 0);
  height: 2.26vw;
  width: 2.26vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 5.75vw;
    height: 5.75vw;
    transform: translate(calc(-50% - 0.4vw), 0);
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 12vw;
    height: 12vw;
    transform: translate(calc(-50% - 0.4vw), 0);
  }
  & > svg {
    margin: auto;
    width: 40%;
    height: 40%;
  }
`;
const NoFanIdIconWrapperTransparent = styled(NoFanIdIconWrapper)`
  background-color: transparent;
`;
