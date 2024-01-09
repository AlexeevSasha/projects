import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { EnvelopIcon } from "../../../assets/icon/envelop";
import { MinusIcon } from "../../../assets/icon/minus";
import { PlusIcon } from "../../../assets/icon/plus";
import { UploadIcon } from "../../../assets/icon/upload";
import { theme } from "../../../assets/theme/theme";
import { CancelTicket } from "./cancelTicket";
import { TicketSubRow } from "./ticketSubRow";
import { ProfileTicket } from "../../../api/dto/TicketDto";
import { formatDate } from "../../../assets/constants/date";
import { ticketsRepository } from "../../../api/ticketsRepository";
import { SendMail } from "./sendMail";
import Link from "next/link";
import { CrossIcon } from "../../../assets/icon/CrossIcon";
import { MessageModal } from "../../../components/modal/messageModal";
import { LoadingScreen } from "../../../ui/LoadingScreen ";

interface Props {
  ticket: ProfileTicket;
  fetchOrders: () => void;
}

export const TicketRow = ({ ticket, fetchOrders }: Props) => {
  const { locale = "ru" } = useRouter();
  const [loading, setLoading] = useState(false);
  const [subRowVisible, setSubRowVisible] = useState(false);
  const [cancelId, setCancelId] = useState<number | null>(null);
  const [sendMail, setSendMail] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleCancel = useCallback(async () => {
    if (cancelId) {
      setLoading(true);
      await ticketsRepository.deleteTicket(cancelId, ticket?.CompanyId);
    }
    await fetchOrders();
    setCancelId(null);
    setLoading(false);
  }, [cancelId]);

  const handleSendMail = useCallback(async () => {
    if (sendMail) {
      setLoading(true);
      await ticketsRepository.sendOnMail(sendMail, ticket?.CompanyId);
    }

    setSendMail(null);
    setLoading(false);
  }, [sendMail]);

  const handleGetPDF = useCallback(
    async (id: number, type: number) => {
      setLoading(true);
      ticketsRepository
        .getTicketPDF(id, type)
        .then(() => setLoading(false))
        .catch(() => {
          setShowModal(true);
          setLoading(false);
        });
    },
    [sendMail]
  );

  return (
    <Wrapper>
      {loading && <LoadingScreen />}
      <Container>
        <div>{ticket?.Id}</div>

        <div>
          <MobileHead>{lang[locale].profileOrders.orderDate}</MobileHead>
          <DateAndTime>
            <span>{formatDate(ticket?.Created, "dd.MM.yyyy ", locale)}</span>
            <span>{formatDate(ticket?.Created, " HH:mm", locale)}</span>
          </DateAndTime>
        </div>

        <div>
          <MobileHead>{lang[locale].profileOrders.paymentState}</MobileHead>

          <OrderStatus paid={ticket?.PayStatus === "Paid"}>
            {lang[locale].profileOrders.orderStatus[ticket.PayStatus]}
          </OrderStatus>
        </div>

        <div>
          <MobileHead>{lang[locale].profileOrders.price}</MobileHead>
          <div>{ticket?.Price} ₽</div>
        </div>

        <ActionsWrapper>
          {ticket?.PayStatus === "Paid" ? (
            <Action
              onClick={() => {
                setSendMail(ticket?.Id);
              }}
            >
              <EnvelopIcon />
              <span>{lang[locale].profileOrders["mailTicket"]}</span>
            </Action>
          ) : ticket?.Status === "Refused" ? null : (
            <Link
              prefetch={false}
              passHref
              href={`${
                ticket.CompanyId === 2 ? process.env.NEXT_PUBLIC_MUSEUM_URL : process.env.NEXT_PUBLIC_TICKETS_URL
              }/pay-order/${ticket.Id}`}
            >
              <a rel="Nofollow">
                <Action>
                  {"₽"}
                  <span>{lang[locale].profileOrders["toPay"]}</span>
                </Action>
              </a>
            </Link>
          )}

          {sendMail && <SendMail onDelete={handleSendMail} onClose={() => setSendMail(null)} />}

          {ticket?.PayStatus === "Paid" ? (
            <>
              <Action onClick={() => handleGetPDF(ticket.Id, ticket.CompanyId)}>
                <UploadIcon />
                <span>{lang[locale].profileOrders.download}</span>
              </Action>
            </>
          ) : ticket.Status === "Refused" ? null : (
            <>
              <Action onClick={() => setCancelId(ticket?.Id)}>
                <CrossIcon />
                <span>{lang[locale].profileOrders.cancel}</span>
              </Action>
              {cancelId && <CancelTicket onDelete={handleCancel} onClose={() => setCancelId(null)} />}
            </>
          )}

          <Action onClick={() => setSubRowVisible(!subRowVisible)}>
            {subRowVisible ? <MinusIcon /> : <PlusIcon />}
            <span>{lang[locale].profileOrders.more}</span>
          </Action>
        </ActionsWrapper>
      </Container>

      {subRowVisible && ticket?.Tickets && (
        <>
          {ticket?.Tickets?.map((item, index) => (
            <React.Fragment key={index}>
              <TicketSubRow orderDetails={item} status={ticket.Status} />
            </React.Fragment>
          ))}
        </>
      )}
      {showModal ? (
        <MessageModal
          type="alert"
          message={lang[locale].profileOrders.downloadErrorMsg}
          onClose={() => setShowModal(false)}
          withoutTimeout
        />
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.grayDark_gray1}`};
  background: ${({ theme }) => theme.colors.none_whiteGray};
  padding-bottom: 0.41vw;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 4.27vw;
  padding: 0 2.08vw;
  box-sizing: border-box;
  font-weight: 500;
  font-family: "FCSM Text", sans-serif;
  color: ${({ theme }) => theme.colors.white_black};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 6vw;
    padding: 0 2.08vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: unset;
    padding: 2.13vw 0;
    display: grid;
    row-gap: 4.26vw;
    column-gap: 3.2vw;
    align-items: self-start;
    grid: auto auto / repeat(2, 1fr) 26vw;
    grid-template-areas:
      "number empty actions"
      "date status price";
  }

  & > div:not(:last-child) {
    letter-spacing: -0.165px;
    text-transform: uppercase;
    width: 13.4vw;
    font-size: 0.83vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      width: 20%;
      font-size: 1.82vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      width: 100%;
      font-size: 4.8vw;
    }
  }

  & > div:nth-child(1) {
    grid-area: number;
    font-size: 1.25vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 2.09vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 4.8vw;
    }
  }

  & > div:nth-child(2) {
    grid-area: date;
    font-size: 1.25vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 2.09vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 4.27vw;
    }
  }

  & > div:nth-child(3) {
    grid-area: status;
  }

  & > div:nth-child(4) {
    grid-area: price;
    font-size: 1.25vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 2.09vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 4.27vw;
    }
  }
`;

const DateAndTime = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 0.31vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    flex-direction: column;
  }
`;

const ActionsWrapper = styled.div`
  display: flex;
  width: 24.58vw;
  justify-content: flex-end;
  align-items: center;
  white-space: nowrap;
  column-gap: 2.45vw;
  grid-area: actions;

  a {
    text-decoration: none;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 14.6vw;
    column-gap: 3.39vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 100%;
    column-gap: 6.93vw;
  }
`;

const Action = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.94vw;
  color: ${theme.colors.red};
  text-decoration: none;

  & > span {
    font-size: 0.83vw;
    text-transform: uppercase;
    margin-left: 0.5vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      display: none;
    }
  }

  & > svg {
    font-size: 1.04vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 2.6vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 5.33vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.6vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 5.33vw;
  }
`;

const OrderStatus = styled.div<{ paid?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.1px;
  background: ${({ paid }) => (paid ? "rgba(5, 200, 74, 0.1)" : "rgba(240, 90, 79, 0.1)")};
  color: ${({ paid }) => theme.colors[paid ? "green" : "red"]};
  border-radius: 1.04vw;
  width: max-content;
  height: 1.35vw;
  font-size: 0.73vw;
  padding: ${({ paid }) => (paid ? "0 0.65vw" : "0 0.76vw")};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    border-radius: 2.61vw;
    font-size: 1.56vw;
    height: 1.14vw;
    padding: ${({ paid }) => (paid ? "0.91vw 1.57vw" : "0.91vw 1.56vw")};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    border-radius: 5.33vw;
    font-size: 3.2vw;
    height: 5.86vw;
    padding: ${({ paid }) => (paid ? "0 3.2vw" : "0 3.2vw")};
  }
`;

const MobileHead = styled.div`
  margin-bottom: 2.13vw;
  display: none;
  color: ${theme.colors.gray};

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: block;
    font-size: 2.66vw;
  }
`;
