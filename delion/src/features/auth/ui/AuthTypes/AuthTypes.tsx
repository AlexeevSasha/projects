import { Divider, Grid, Space } from 'antd';
import Link from 'next/link';
import { RddmLogo, TreeLogo, TreeLogoSM } from '@shared/assets';
import css from './AuthTypes.module.scss';

type Props = {
  withResponsiveIcons?: boolean;
  isAuthorized?: boolean;
};

export const AuthTypes = (props: Props) => {
  const { isAuthorized = false } = props;

  const breakpoints = Grid.useBreakpoint();

  const logos = [
    {
      href: '/',
      component: breakpoints.md ? <TreeLogo /> : <TreeLogoSM />,
    },
    {
      href: '/',
      component: <RddmLogo />,
    },
  ];

  return (
    <Space
      direction='horizontal'
      align='center'
      size={12}
      split={<Divider type='vertical' className={css.divider} />}
      className={css.wrapper}
      style={{ justifyContent: isAuthorized ? 'flex-start' : 'center' }}
    >
      {logos.map((logo, index) => (
        <Link key={`${index}-${logo.href}`} href={logo.href} className={css.link}>
          {logo.component}
        </Link>
      ))}
    </Space>
  );
};
