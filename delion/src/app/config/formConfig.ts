import type { ConfigProviderProps } from 'antd/es/config-provider';

export const formConfig: ConfigProviderProps['form'] = {
  validateMessages: {
    required: 'Это поле обязательно!',
  },
};
