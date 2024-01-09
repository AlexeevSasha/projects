import { useCallback, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
import type { CollapseProps } from 'antd/lib';
import { observer } from 'mobx-react';
import { getDreamerWishTypeIcon } from '@entities/application/lib/getDreamerWishTypeIcon';
import { useStores } from '@shared/lib';
import type { ExtendedButtonProps } from '@shared/ui/Button/Button';
import { DreamersAccordionContent } from './DreamersAccordionContent/DreamersAccordionContent';
import { DreamersAccordionTitle } from './DreamersAccordionTitle/DreamersAccordionTitle';

type DreamersAccordionProps = {
  isInfoMode: boolean;
  onShowAttachReportModal(id: number): void;
  onDreamExecutionToggle(id: number): void;
};

export const DreamersAccordion = observer((props: DreamersAccordionProps) => {
  const { applicationS } = useStores();

  const { isInfoMode = false, onShowAttachReportModal, onDreamExecutionToggle } = props;

  const {
    token: { colorWhite, borderRadiusLG },
  } = theme.useToken();

  const [active, setActive] = useState<string[] | string | null>(null);

  const items: CollapseProps['items'] = applicationS.application.dreamers.map((item) => {
    const wishIcon = getDreamerWishTypeIcon(item.dream_category?.type, { width: 24, height: 24 });

    const isActive = active?.includes(item.first_name);

    const getItemActions = (): ExtendedButtonProps[] | null => {
      if (!applicationS.application.isApplicationExecutionTypeIndependent || isInfoMode) {
        return null;
      }

      switch (true) {
        case item.isDreamHasReportAttached:
          return [
            {
              title: 'Посмотреть отчет',
              type: 'default',
              fullWidth: true,
              onClick: () => onShowAttachReportModal(item.id),
            },
          ];
        case item.isDreamExecuted:
          return [
            {
              title: 'Я не исполнил',
              type: 'default',
              fullWidth: true,
              disabled: !item.can_toggle_status,
              onClick: () => onDreamExecutionToggle(item.id),
            },
            {
              title: 'Прикрепить отчет',
              type: 'primary',
              fullWidth: true,
              onClick: () => onShowAttachReportModal(item.id),
            },
          ];
        case item.isDreamNotStarted:
          return [
            {
              title: 'Я исполнил',
              type: 'primary',
              fullWidth: true,
              disabled: !item.can_toggle_status,
              onClick: () => onDreamExecutionToggle(item.id),
            },
          ];
      }

      return null;
    };

    return {
      key: item.first_name,
      label: (
        <DreamersAccordionTitle
          {...item}
          wishIcon={wishIcon}
          isActive={isActive}
          isInfoMode={isInfoMode}
        />
      ),
      children: (
        <DreamersAccordionContent
          {...item}
          wishIcon={wishIcon}
          isActive={isActive}
          actions={getItemActions()}
        />
      ),
      style: {
        marginBottom: 24,
        background: colorWhite,
        borderRadius: borderRadiusLG,
        border: 'none',
        boxShadow: 'none',
      },
    };
  });

  const handleChange = useCallback((activeKeys: string | string[]) => {
    setActive(activeKeys);
  }, []);

  const defaultActiveKey = applicationS.application.dreamers?.[0].first_name;

  return (
    <Collapse
      style={{ backgroundColor: 'transparent' }}
      items={items}
      expandIconPosition='end'
      expandIcon={({ isActive }) => (
        <DownOutlined style={{ fontSize: 18 }} rotate={isActive ? 180 : 0} />
      )}
      bordered={false}
      size='large'
      onChange={handleChange}
      defaultActiveKey={defaultActiveKey}
    />
  );
});
