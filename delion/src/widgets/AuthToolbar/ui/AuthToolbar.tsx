import { useCallback } from 'react';
import {
  SettingOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Flex, Grid, theme, Divider, Space } from 'antd';
import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { knowledgeData } from '@features/const';
import { APP_ROUTES } from '@shared/const';
import { useStores } from '@shared/lib';
import { Paragraph } from '@shared/ui';
import type { CustomButtonsProps } from '@shared/ui/LegacyInput/CustomButton';
import { CustomButton } from '@shared/ui/LegacyInput/CustomButton';
import { drawer } from '@shared/ui/popup';
import { userDeclinationRole } from '../const/userDeclinationRole';
import css from './AuthToolbar.module.scss';

export const AuthToolbar = () => {
  const breakpoints = Grid.useBreakpoint();
  const { userS, authS, modalS } = useStores();
  const router = useRouter();

  const {
    token: { fontSizeIcon },
  } = theme.useToken();

  const handleLogoutClick = useCallback(() => {
    userS.logoutUser().then(() => {
      router.push('/');
    });
  }, [userS, router]);

  const onFAQClick = useCallback(() => {
    if (userS?.user?.userRole) {
      drawer.openKnowledge({
        title: 'Часто задаваемые вопросы',
        dataSource: knowledgeData[userS.user.userRole],
      });
    }
  }, [userS.user?.userRole]);

  const actions: CustomButtonsProps[] = [
    {
      icon: <SettingOutlined style={{ fontSize: fontSizeIcon }} />,
      hrefProps: {
        href: APP_ROUTES.PROFILE_SETTINGS,
      },
      type: 'link',
    },
    {
      icon: <MessageOutlined style={{ fontSize: fontSizeIcon }} />,
      onClick: () => modalS.openFeedbackModal(),
      type: 'link',
    },
    {
      icon: <QuestionCircleOutlined style={{ fontSize: fontSizeIcon }} />,
      onClick: onFAQClick,
      type: 'link',
    },
    {
      icon: <LogoutOutlined style={{ fontSize: fontSizeIcon }} />,
      onClick: handleLogoutClick,
      type: 'link',
    },
  ];

  return (
    <Space
      align='center'
      className={css.wrapper}
      split={<Divider type='vertical' className={css.divider} />}
    >
      {breakpoints.md ? (
        <Link href={authS.afterLoginUrlBasedOnRole}>
          <Flex vertical align='flex-end'>
            <Paragraph level={breakpoints.md ? 5 : 4} className={css.userRole}>
              {`Личный кабинет ${
                userS?.user?.userRole ? userDeclinationRole[userS?.user?.userRole] : ''
              }`}
            </Paragraph>
            <Paragraph level={6} className={css.userName}>
              {userS?.user?.first_name} {userS?.user?.last_name ?? ''}
            </Paragraph>
          </Flex>
        </Link>
      ) : null}
      <Flex align='center' justify='center' gap={breakpoints.md ? 24 : 12}>
        {actions.map((action, index) => (
          <CustomButton
            className={cx(css.action, {
              [css.isActive]: router.pathname === action.hrefProps?.href,
            })}
            key={index}
            {...action}
          />
        ))}
      </Flex>
    </Space>
  );
};
