import { useRouter } from "next/router";
import { useContext, useMemo } from "react";
import styled from "styled-components";
import { lang } from "../../../../../public/locales/lang";
import { IMatchDto } from "../../../../api/dto/IMatchDto";
import { IconAirplane } from "../../../../assets/icon/iconAirplane";
import { IconFindApartament } from "../../../../assets/icon/iconFindApartament";
import { IconHouse } from "../../../../assets/icon/iconHouse";
import { IconTicket } from "../../../../assets/icon/iconTicket";
import { IconYandexGo } from "../../../../assets/icon/iconYandexGo";
import { theme } from "../../../../assets/theme/theme";
import { CustomButton } from "../../../../components/buttons/customButton";
import { DataContext } from "../../../../core/dataProvider";

interface IProps {
  ownTeamIsHome?: boolean;
  withIcon?: boolean;
  type?: IMatchDto["ButtonEnum"];
  typeMatch: "old" | "new";
  size: "small" | "big";
  link?: string;
  matchInStatId?: number;
  className?: string;
}

export const ColumnButton = (props: IProps) => {
  const { locale = "ru" } = useRouter();
  const { setLoading } = useContext(DataContext);

  const renderButton = useMemo(() => {
    switch (props.type) {
      case "Fly": {
        return (
          <RestyledCustomButton
            type={"opacity"}
            withGap={props.size === "big"}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              window.open("https://sutochno.ru/?utm_source=spartak&utm_medium=site&utm_campaign=footer", "_blank");
            }}
          >
            {props.size === "big" ? <span>{lang[locale].button.findApartament}</span> : null} <IconFindApartament />
          </RestyledCustomButton>
        );
      }

      case "Buy": {
        return props.matchInStatId ? (
          <RestyledCustomButton
            type={"red"}
            withGap={props.size === "big"}
            onClick={(e) => {
              e.stopPropagation();
              setLoading(true);
              location.assign(`${process.env.NEXT_PUBLIC_TICKETS_URL}/view-available-zones/${props.matchInStatId}`);
            }}
          >
            <IconTicket /> {props.size === "big" ? <span>{lang[locale].button.buyTicket}</span> : null}
          </RestyledCustomButton>
        ) : null;
      }

      case "Taxi": {
        return (
          <RestyledCustomButton
            type={"opacity"}
            withGap={props.size === "big"}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              window.open("https://taxi.yandex.ru", "_blank");
            }}
          >
            {props.size === "big" ? <span>{lang[locale].button.orderTaxi}</span> : null}
            <IconYandexGo />
          </RestyledCustomButton>
        );
      }

      case "None": {
        return <div />;
      }

      default: {
        console.log("warn: Нет обработчика для ", props.type);
        return <div />;
      }
    }
  }, [props.type, locale]);

  const renderIcon = useMemo(() => {
    return (
      <IconContainer>
        {props.ownTeamIsHome ? <IconHouse color={theme.colors.gray} /> : <IconAirplane color={theme.colors.gray} />}
      </IconContainer>
    );
  }, [props.ownTeamIsHome]);

  return (
    <ContainerButton className={props.className}>
      {renderButton}
      {props.withIcon && renderIcon}
    </ContainerButton>
  );
};

const ContainerButton = styled.div`
  text-decoration: none;
  white-space: nowrap;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    justify-content: flex-end;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    justify-content: center;
  }
`;

const IconContainer = styled.div`
  display: flex;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
`;

export const RestyledCustomButton = styled(CustomButton)`
  padding: 0.7vw 1.25vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 1.7vw 2.85vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    min-height: 10.13vw;
    padding: 0 5.8vw;

    span {
      display: none;
    }
  }

  &[type="opacity"] {
    svg {
      color: ${({ theme }) => theme.colors.white_black};
    }
  }

  &[type="red"] {
    svg {
      color: ${theme.colors.white};
    }
  }
`;
