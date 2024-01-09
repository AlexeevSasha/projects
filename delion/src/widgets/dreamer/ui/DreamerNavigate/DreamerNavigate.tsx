import type { ReactNode } from 'react';
import { useCallback, useMemo } from 'react';
import { PhoneTwoTone } from '@ant-design/icons';
import { Avatar, Grid } from 'antd';
import { observer } from 'mobx-react';
import { DreamersMenuAnchor } from '@features/dreamer';
import { useStores } from '@shared/lib';
import { Divider, FloatingButton, Paragraph } from '@shared/ui';
import { drawer } from '@shared/ui/popup';
import css from './DreamerNavigate.module.scss';

interface IDreamerNavigateProps {
  step: ReactNode;
  title: ReactNode;
  hiddenAnchor?: boolean;
}

export const DreamerNavigate = observer(({ step, title, hiddenAnchor }: IDreamerNavigateProps) => {
  const breakpoint = Grid.useBreakpoint();
  const { applicationS } = useStores();

  const anchor = useMemo(() => {
    if (!applicationS.application.dreamers.length || hiddenAnchor) return null;
    const dreamers = applicationS.application.dreamers.map((dreamer) => ({
      id: dreamer.id,
      name: `${dreamer.first_name} ${dreamer.last_name}`,
      image: <Avatar size={16} src={dreamer?.photo?.file} />,
    }));

    const contact = {
      id: 'contacts',
      name: 'Контакты',
      image: <PhoneTwoTone />,
    };

    return (
      <div className={css.menu}>
        <DreamersMenuAnchor dreamers={[contact, ...dreamers]} />
      </div>
    );
  }, [applicationS.application.dreamers, hiddenAnchor]);

  const openMobileMenu = useCallback(() => {
    drawer.open(
      <div>
        {step}
        <div className={css.anchor}>
          {step && <Divider marginBottom={24} />}
          {anchor}
        </div>
      </div>,
      { title },
    );
  }, [anchor, step, title]);

  return breakpoint.md ? (
    <div className={css.container}>
      <Paragraph className={css.container__title} strong>
        {title}
      </Paragraph>
      {step && (
        <>
          <Divider marginBottom={24} marginTop={24} />
          {step}
        </>
      )}
      {anchor && (
        <div className={css.anchor}>
          <Divider marginBottom={24} marginTop={step ? 0 : 24} />
          {anchor}
        </div>
      )}
    </div>
  ) : (
    <FloatingButton onClick={openMobileMenu} />
  );
});
