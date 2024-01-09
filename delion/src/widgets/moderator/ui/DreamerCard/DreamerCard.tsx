import { Divider } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import type { DreamModerationRate } from '@entities/dreamer';
import { DreamerGoodDeed } from '../../dreamer/DreamerGoodDeed/DreamerGoodDeed';
import { DreamerMoreInfo } from '../../dreamer/DreamerMoreInfo/DreamerMoreInfo';
import { DreamerPersonalInfo } from '../../dreamer/DreamerPersonalInfo/DreamerPersonalInfo';
import { DreamersCategory } from '../../dreamer/DreamersCategory/DreamersCategory';
import { DreamerWish } from '../../dreamer/DreamerWish/DreamerWish';

interface IDreamerCardProps {
  info: DreamModerationRate;
  name: NamePath;
}

export const DreamerCard = ({ info, name }: IDreamerCardProps) => {
  return (
    <>
      <DreamerPersonalInfo name={name} dreamer={info.dreamer} />
      <Divider />
      <DreamersCategory name={name} dreamer={info.dreamer} />
      <Divider />
      <DreamerMoreInfo {...info.dreamer} />
      <Divider />
      <DreamerGoodDeed name={name} dreamer={info.dreamer} />
      <Divider />
      <DreamerWish name={name} dreamer={info.dreamer} />
    </>
  );
};
