import { Menu } from 'antd';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export interface IMainPageMenuProps {
  route: string;
  setRoute: React.Dispatch<React.SetStateAction<string>>;
}

export const MainPageMenu: FC<IMainPageMenuProps> = (props) => (
  <Menu
    style={{
      textAlign: 'center',
    }}
    selectedKeys={[props.route]}
    items={[
      {
        label: 'Debug',
        key: '/debug',
        onClick: () => {
          props.setRoute('//debug');
        },
      },
      {
        label: 'Subgraph',
        key: '/subgraph',
        onClick: () => {
          props.setRoute('/subgraph');
        },
      },
    ]}
    mode="horizontal"
  />
);
