import React from 'react';
import { Grid } from 'antd';
import cx from 'classnames';
import { observer } from 'mobx-react';
import type { TFilterTag } from '@entities/application/model/application';
import { partnerFilterNames } from '@features/application/partner';
import { FilterIcon } from '@shared/assets';
import { countNonUndefinedObjectValues } from '@shared/lib';
import { Button, Paragraph } from '@shared/ui';
import { FilterTag } from '@widgets/partner';
import css from './PartnerFilters.module.scss';

type TProps = {
  onFilterButtonClick: () => void;
  onDelete: (tag: TFilterTag | TFilterTag[]) => void;
  filterTags: TFilterTag[];
};

export const PartnerFilters = observer((props: TProps) => {
  const breakpoints = Grid.useBreakpoint();
  const { onFilterButtonClick, onDelete, filterTags } = props;

  if (!countNonUndefinedObjectValues(filterTags)) {
    return null;
  }

  const filterAndAddTags = (
    tagsCopy: TFilterTag[],
    min: string,
    max: string,
    result: React.ReactNode[],
  ) => {
    const tags = tagsCopy.filter((tag) => tag.formName === min || tag.formName === max);

    if (tags.length > 1) {
      tagsCopy = tagsCopy.filter((tag) => !tags.includes(tag));

      result.push(<FilterTag key={min + max} item={tags} onDelete={() => onDelete(tags)} />);
    }

    return tagsCopy;
  };

  const renderTags = () => {
    const result: React.ReactNode[] = [];
    let copyFilterTags = Array.from(filterTags);

    copyFilterTags = filterAndAddTags(
      copyFilterTags,
      partnerFilterNames.amount_min,
      partnerFilterNames.amount_max,
      result,
    );

    copyFilterTags = filterAndAddTags(
      copyFilterTags,
      partnerFilterNames.dreamers_count_min,
      partnerFilterNames.dreamers_count_max,
      result,
    );

    copyFilterTags.forEach((x, i) => {
      result.push(<FilterTag key={i} item={x} onDelete={() => onDelete(x)} />);
    });

    return result.map((item) => {
      return item;
    });
  };

  return (
    <div className={css.filters}>
      <div className={css.tags}>{renderTags()}</div>
      <div className={cx(css.filters__mask, { [css.isMobile]: breakpoints.xs })} />
      <Button
        className={cx(css.filterButton, { [css.isMobile]: breakpoints.xs })}
        icon={<FilterIcon />}
        type='primary'
        onClick={onFilterButtonClick}
      >
        {!breakpoints.xs && 'Настроить фильтр'}
        <div className={css.indicator}>
          <Paragraph>{countNonUndefinedObjectValues(filterTags)}</Paragraph>
        </div>
      </Button>
    </div>
  );
});
