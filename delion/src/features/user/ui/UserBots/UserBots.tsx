import { Flex } from 'antd';
import { EmailConnect } from '../EmailConnect/EmailConnect';
import { TelegramConnect } from '../TelegramConnect/TelegramConnect';

export const UserBots = () => {
  return (
    <Flex vertical gap={24}>
      <EmailConnect />
      <TelegramConnect />
    </Flex>
  );
};
