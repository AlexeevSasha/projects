import { useState, type FC } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import type { SiderProps } from 'antd';
import { FloatButton, Layout } from 'antd';

const { Sider: AntdSider } = Layout;

export const Sider: FC<SiderProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { children, trigger = null, theme = 'light', collapsible = !trigger, ...rest } = props;

  return (
    <>
      <AntdSider
        collapsible={collapsible}
        collapsed={collapsed}
        trigger={trigger}
        theme={theme}
        {...rest}
      >
        {children}
      </AntdSider>
      <FloatButton
        shape='circle'
        type='primary'
        style={{ left: 12, bottom: 18 }}
        icon={<MenuOutlined />}
        onClick={() => setCollapsed(!collapsed)}
      />
    </>
  );
};
