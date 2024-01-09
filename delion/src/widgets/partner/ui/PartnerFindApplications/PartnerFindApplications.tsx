import { observer } from 'mobx-react';
import { PartnerApplicationTable, PartnerEmptyFilters } from '@widgets/partner';

type TProps = {
  onFilterButtonClick: () => void;
  filterIsEmpty: number;
};

export const PartnerFindApplications = observer((props: TProps) => {
  const { onFilterButtonClick, filterIsEmpty } = props;

  const renderContent = () => {
    if (!filterIsEmpty) {
      return <PartnerEmptyFilters onFilterButtonClick={onFilterButtonClick} />;
    } else {
      return <PartnerApplicationTable />;
    }
  };

  return <>{renderContent()}</>;
});
