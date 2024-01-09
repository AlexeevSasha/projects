import { useMemo } from 'react';
import { CheckCircleTwoTone, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import { Divider, Flex, Typography, Grid } from 'antd';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { EmailIcon, TelegramIcon } from '@shared/assets';
import { APP_ROUTES } from '@shared/const';
import { useStores } from '@shared/lib';
import { Button, Paragraph } from '@shared/ui';
import { CustomButton } from '@shared/ui/LegacyInput/CustomButton';
import css from './NotificationSidebar.module.scss';

export type NotificationSidebarProps = {
  title?: string;
  mobileTitle?: string;
  description?: string;
  withBorder?: boolean;
  isSticky?: boolean;
};

export const NotificationSidebar = observer((props: NotificationSidebarProps) => {
  const {
    title = 'Настройте уведомления',
    mobileTitle = 'Подписаться: ',
    description = 'Чтобы обладать актуальной информацией о статусе вашей заявки, предлагаем вам воспользоваться нашими ботами в Telegram и ВКонтакте',
    withBorder = false,
    isSticky = true,
  } = props;
  const { userS, modalS } = useStores();
  const breakpoints = Grid.useBreakpoint();
  const notifications = useMemo(
    () => [
      {
        name: 'email',
        icon: <EmailIcon width={40} height={40} fill='#2D51DA' />,
        isActive: !!userS.user?.notify_via_email,
      },
      {
        name: 'telegram',
        icon: <TelegramIcon />,
        isActive: !!userS.user?.telegram_profile?.subscribe_status,
      },
      // {
      //   name: 'vk',
      //   icon: <VKIcon />,
      //   isActive: false,
      // },
    ],
    [userS.user?.notify_via_email, userS.user?.telegram_profile?.subscribe_status],
  );

  const topBlock = (
    <Flex vertical>
      <Typography.Title level={5}>{title}</Typography.Title>
      <Paragraph>{description}</Paragraph>
    </Flex>
  );

  const mobileTitleBlock = (
    <Paragraph level={4} className={css.caption}>
      {mobileTitle}
    </Paragraph>
  );

  const bottomBlock = (
    <>
      <Divider className={css.horizontalDivider} />
      <Button icon={<MessageOutlined />} fullWidth onClick={() => modalS.openFeedbackModal()}>
        Связаться с нами
      </Button>
    </>
  );

  return (
    <div
      className={classNames({
        [css.wrapperSticky]: isSticky,
      })}
    >
      <Flex
        className={classNames(css.container, {
          [css.containerBorder]: withBorder,
          [css.containerNotSticky]: !isSticky,
        })}
        gap={24}
        vertical
      >
        {isSticky ? breakpoints.lg && topBlock : topBlock}

        <Flex className={css.block} align='center'>
          {isSticky && !breakpoints.lg && mobileTitleBlock}

          <Flex className={css.iconsWrapper} align='center'>
            {notifications.map((notification) => (
              <div
                className={classNames(css.iconBlock, {
                  [css.active]: notification.isActive,
                })}
                key={notification.name}
              >
                {notification.icon}
                {notification.isActive && (
                  <CheckCircleTwoTone
                    className={css.icon}
                    style={{ fontSize: 16 }}
                    twoToneColor={['#fff', '#52C41A']}
                  />
                )}
              </div>
            ))}
          </Flex>
          <Divider className={css.dividerVertical} type='vertical' />
          <CustomButton
            hrefProps={{
              href: `${APP_ROUTES.PROFILE_SETTINGS}?category=bots`,
            }}
            type='link'
            className={css.btn}
            icon={<SettingOutlined className={css.settings} />}
          />
        </Flex>

        {isSticky ? breakpoints.lg && bottomBlock : bottomBlock}
      </Flex>
    </div>
  );
});
