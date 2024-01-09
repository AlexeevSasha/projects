import { theme } from "common/styles/theme";
import React, { FC, useCallback } from "react";
import moment from "moment";
import { IconContainerFloatingmes } from "../../../../common/components/Table/UIcomponent/UIcomponent";
import { IconEye } from "../../../../common/components/Icon/IconEye";
import { IDocumentDiseaseCard } from "../../../../common/interfaces/IDocumentDiseaseCard";
import { IntegralDiseaseEpicrisisApiRequest } from "../../../../api/integralDiseaseEpicrisisApiRequest";
import { saveAs } from "file-saver";
import { errorPopup } from "../../../../common/helpers/toast/error";
import styled from "styled-components";

interface IProps {
  document: IDocumentDiseaseCard;
  textFloat?: string;
}

export const DocumentItem: FC<IProps> = ({ document: item, ...props }) => {
  const onDownloadDocument = useCallback(async (medDocViewId: string, fileName = "Без имени") => {
    try {
      const result = await new IntegralDiseaseEpicrisisApiRequest().getViewDocument(medDocViewId);
      // @ts-ignore
      if (result?.isError) {
        throw result;
      } else {
        if (result) {
          saveAs(result as Blob, fileName);
        }
      }
    } catch (error) {
      errorPopup(error.message);
    }
  }, []);

  return (
    <DocumentBlockLine>
      {item.documentName && <NameParam style={{ width: "65%" }}>{item.documentName}</NameParam>}
      {item.documentDate && (
        <ValueParam style={{ width: "25%" }}>{moment(item.documentDate).format("DD MMMM YYYY")}</ValueParam>
      )}
      {item.medDocViewId && (
        <LinkWrapper style={{ width: "16px" }}>
          <IconContainerFloatingmes
            id={"open_settings"}
            title={props.textFloat || "Открыть вложение"}
            position="left"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              item.medDocViewId && onDownloadDocument(item.medDocViewId, item.documentName || "");
            }}
          >
            <IconEye />
          </IconContainerFloatingmes>
        </LinkWrapper>
      )}
    </DocumentBlockLine>
  );
};
const DocumentBlockLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;
const NameParam = styled.span`
  color: ${theme.colors.black};
`;

const ValueParam = styled.span`
  justify-self: flex-end;
`;

const LinkWrapper = styled.div`
  width: 20px;
  align-items: flex-end;

  .iconFloatingmes {
    justify-content: flex-end;
    margin: 0;

    svg {
      width: 30px;

      path {
        fill: ${theme.colors.green};
      }
    }
  }
`;
