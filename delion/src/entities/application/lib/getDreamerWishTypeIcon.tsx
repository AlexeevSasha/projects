import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
// eslint-disable-next-line boundaries/element-types
import { DreamerWishType } from '@entities/dreamer/@x/application';
import { MaterialWishIcon, NonMaterialWishIcon, SurpriseWishIcon } from '@shared/assets';

export const getDreamerWishTypeIcon = (
  wishType?: DreamerWishType,
  iconProps?: Partial<CustomIconComponentProps>,
) => {
  switch (wishType) {
    case DreamerWishType.MATERIAL:
      return <MaterialWishIcon {...iconProps} />;

    case DreamerWishType.NON_MATERIAL:
      return <NonMaterialWishIcon {...iconProps} />;

    case DreamerWishType.SUPRISE:
      return <SurpriseWishIcon {...iconProps} />;
    default:
      break;
  }
};
