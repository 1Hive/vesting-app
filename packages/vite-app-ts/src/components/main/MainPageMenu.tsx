import { Menu } from 'antd';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';

export interface IMainPageMenuProps {}

export const MainPageMenu: FC<IMainPageMenuProps> = (props) => {
  const history = useHistory();
  return (
    <Menu
      style={{
        textAlign: 'center',
      }}
      selectedKeys={[history.location.pathname]}
      items={
        [
          // {
          //   label: 'Home',
          //   key: '/',
          //   onClick: () => {
          //     history.push('/');
          //   },
          // },
          // {
          //   label: 'Subgraph',
          //   key: '/subgraph',
          //   onClick: () => {
          //     history.push('/subgraph');
          //   },
          // },
        ]
      }
      mode="horizontal"
    />
  );
};
