import { useCallback } from 'react';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { UserRoles } from '@entities/user';
import { ChangePassword, ChangePhone, UserBots, UserDataForm } from '@features/user';
import { schemaUserDataForm } from '@features/user/const/schemaUserDataForm';
import { APP_ROUTES } from '@shared/const';
import { useStores } from '@shared/lib';
import { Paragraph } from '@shared/ui';
import css from './ProfileSettingsTabs.module.scss';

const tabsConfig: Record<UserRoles, TabsProps['items']> = {
  [UserRoles.EXECUTOR]: [
    {
      key: 'data',
      label: <Paragraph className={css.tabLabel}>Данные</Paragraph>,
      children: <UserDataForm schema={schemaUserDataForm[UserRoles.EXECUTOR]} />,
    },
    {
      key: 'password',
      label: <Paragraph className={css.tabLabel}>Пароль</Paragraph>,
      children: <ChangePassword />,
    },
    {
      key: 'bots',
      label: <Paragraph className={css.tabLabel}>Боты</Paragraph>,
      children: <div>Боты</div>,
    },
  ],
  [UserRoles.PARTNER]: [
    {
      key: 'data',
      label: <Paragraph className={css.tabLabel}>Данные</Paragraph>,
      children: <UserDataForm schema={schemaUserDataForm[UserRoles.EXECUTOR]} />,
    },
    {
      key: 'password',
      label: <Paragraph className={css.tabLabel}>Пароль</Paragraph>,
      children: <ChangePassword />,
    },
    {
      key: 'bots',
      label: <Paragraph className={css.tabLabel}>Боты</Paragraph>,
      children: <div>Боты</div>,
    },
  ],
  [UserRoles.DREAMER]: [
    {
      key: 'contacts',
      label: <Paragraph className={css.tabLabel}>Контакты</Paragraph>,
      children: <ChangePhone />,
    },
    {
      key: 'bots',
      label: <Paragraph className={css.tabLabel}>Боты</Paragraph>,
      children: <UserBots />,
    },
  ],
  [UserRoles.MODERATOR]: [
    {
      key: 'data',
      label: <Paragraph className={css.tabLabel}>Данные</Paragraph>,
      children: <UserDataForm schema={schemaUserDataForm[UserRoles.MODERATOR]} />,
    },
    {
      key: 'password',
      label: <Paragraph className={css.tabLabel}>Пароль</Paragraph>,
      children: <ChangePassword />,
    },
  ],
};

export const ProfileSettingsTabs = observer(() => {
  const { userS } = useStores();
  const router = useRouter();

  const userRole = userS?.user?.groups?.[0];

  const tabsItems: TabsProps['items'] = userRole ? tabsConfig[userRole] : [];

  const handleTabClick = useCallback(
    (key: string) => {
      router.replace(`${APP_ROUTES.PROFILE_SETTINGS}?category=${key}`);
    },
    [router],
  );

  return (
    <div className={css.wrapper}>
      <Tabs
        items={tabsItems}
        activeKey={router.query.category as string}
        onTabClick={handleTabClick}
      />
    </div>
  );
});
