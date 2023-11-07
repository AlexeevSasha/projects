import { IconHeart } from "../../../common/components/icons/IconHeart";
import { memo, MouseEvent, useCallback, useContext, useMemo } from "react";
import styled from "astroturf/react";
import { AppContext } from "../../../common/components/ContextProvider";

type Props = {
  id: string;
  isPharmacy?: boolean;
  isAbsolute?: boolean;
};

export const Favorites = memo(({ id, isPharmacy, isAbsolute }: Props) => {
  const { addFavourites, deleteFavourites, favourites } = useContext(AppContext);
  const isActive = useMemo(() => !!favourites.find((el) => el.id === id), [favourites.length]);

  const toggleHeart = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      isActive ? deleteFavourites(id) : addFavourites(id, isPharmacy);
    },
    [isActive]
  );

  return (
    <Svg isAbsolute={isAbsolute} isActive={isActive} onClick={(e) => toggleHeart(e)}>
      <IconHeart />
    </Svg>
  );
});

const Svg = styled.div<{ isActive: boolean; isAbsolute?: boolean }>`
  @import "variables";

  @include transition();

  display: inline-block;
  position: relative;
  height: 24px;
  cursor: pointer;
  z-index: 2;

  &:hover {
    svg path {
      fill: rgb($blue1, 0.5);
    }
  }

  &.isAbsolute {
    position: absolute;
    top: 20px;
    right: 20px;
  }

  &.isActive {
    svg path {
      fill: $orange3;
    }
  }
`;
