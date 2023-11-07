import { TitleFilter } from "../TitleFilter";
import { IconArraySmall } from "../../../../common/components/icons/IconArraySmall";
import styled from "astroturf/react";
import { useContext } from "react";
import { MultiFilterT } from "../../interfaces/filters";
import { AppContext } from "../../../../common/components/ContextProvider";
import { ModalNames } from "../../../../common/interfaces/modal";
import { useRouter } from "next/router";
import { FilterTag } from "../FilterTag";
import { removeTagsQuery } from "../../utils/removeTagsQuery";
import { getParamArray } from "../../utils/getParamArray";
import { FilterMobileList } from "./FilterMobileList";

type Props = {
  id: string;
  isRadioInput?: boolean;
  title: string;
  alias: string;
  filters: MultiFilterT[];
};

export const FilterMobile = ({ title, id, filters, alias }: Props) => {
  const { openModal, closeModal } = useContext(AppContext);
  const router = useRouter();

  return (
    <Container>
      <ContainerTitle
        onClick={() => {
          openModal(ModalNames.FILTER_MODAL, {
            title: title,
            children: (
              <FilterMobileList
                onClick={() => closeModal(ModalNames.FILTER_MODAL)}
                filters={filters}
                id={id}
                alias={alias}
              />
            ),
          });
        }}
      >
        <TitleFilter>{title}</TitleFilter>
        <ContainerIcon>
          <IconArraySmall rotate={"-90deg"} />
        </ContainerIcon>
      </ContainerTitle>
      {getParamArray(router?.query[alias]).length ? (
        <ContainerTag>
          {getParamArray(router?.query[alias]).map((value, i) => (
            <FilterTag
              key={i}
              handlerClick={() => removeTagsQuery(alias, value, router)}
              title={value}
            />
          ))}
        </ContainerTag>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  padding: 16px 0;
`;

const ContainerTitle = styled.div`
  @import "variables";

  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ContainerIcon = styled.div`
  z-index: 2;
  cursor: pointer;
  height: 20px;
  svg {
    width: 20px;
    height: 20px;
  }
`;

const ContainerTag = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 6px;

  & > div:not(:last-child) {
    margin-right: 8px;
  }

  & > div {
    margin-top: 6px;
  }
`;
