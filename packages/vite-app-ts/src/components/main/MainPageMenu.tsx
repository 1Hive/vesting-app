import { Menu } from 'antd';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';

export const MainPageMenu: FC = () => {
  const history = useHistory();
  return (
    <Menu
      style={{
        textAlign: 'center',
      }}
      selectedKeys={[history.location.pathname]}
      items={[
        {
          label: 'Home',
          key: '/',
          onClick: () => {
            history.push('/');
          },
        },
        {
          label: 'Subgraph',
          key: '/subgraph',
          onClick: () => {
            history.push('/subgraph');
          },
        },
      ]}
      mode="horizontal"
    />
  );
};
