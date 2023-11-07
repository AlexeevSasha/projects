import { IconCalendar } from "../../../common/components/icons/IconCalendar";
import { IconViews } from "../../../common/components/icons/IconViews";
import { IconTime } from "../../../common/components/icons/IconTime";
import styled from "astroturf/react";
import { ArticleT } from "../interfaces/article";

type Props = Pick<ArticleT, "time" | "date" | "view">;

export const DateAndView = ({ time, view, date }: Props) => {
  return (
    <Info>
      {date ? (
        <ContainerIcon icon={"calendar"}>
          <IconCalendar />
          <span>{date}</span>
        </ContainerIcon>
      ) : null}
      {view ? (
        <ContainerIcon className={"only-hover-charity"}>
          <IconViews />
          <span>{view}</span>
        </ContainerIcon>
      ) : null}
      {time ? (
        <ContainerIcon className={"only-hover-charity"}>
          <IconTime />
          <span>{time}</span>
        </ContainerIcon>
      ) : null}
    </Info>
  );
};

const Info = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: repeat(3, fit-content(100px));
  grid-column-gap: 16px;
  color: rgb($black, 0.4);
  font-weight: 500;
  font-size: 14px;
  line-height: 126%;
`;

const ContainerIcon = styled.div<{ icon?: "calendar" }>`
  @import "variables";

  transition: all 0.1s ease-in-out;
  display: flex;
  align-items: center;
  white-space: nowrap;
  height: 24px;

  span {
    margin-left: 8px;
    margin-top: 2px;
    font-weight: 500;
    font-size: 14px;
    line-height: 126%;
  }

  svg {
    g {
      opacity: 0.1;
    }
  }

  &.icon-calendar svg {
    width: 20px;
    height: 20px;
  }
`;
