import { CalendarEventTypeEnum } from "common/interfaces/CalendarEventTypeEnum";
import React from "react";
import { IconDeath } from "common/components/Icon/IconDeath";
import { IconHosp } from "common/components/Icon/IconHosp";
import { IconShape } from "common/components/Icon/IconShape";
import { IconAmb } from "../../../common/components/Icon/IconAmb";

export const getIconCareCase = (calendarCaseType: CalendarEventTypeEnum) => {
  switch (calendarCaseType) {
    case CalendarEventTypeEnum.Amb: {
      return <IconAmb size={20} />;
    }
    case CalendarEventTypeEnum.Stat: {
      return <IconHosp size={20} />;
    }
    case CalendarEventTypeEnum.Death: {
      return <IconDeath size={20} />;
    }
    case CalendarEventTypeEnum.MCase: {
      return <IconDeath size={20} />;
    }
    case CalendarEventTypeEnum.Emerg: {
      return <IconShape size={20} />;
    }
    default:
      return null;
  }
};
