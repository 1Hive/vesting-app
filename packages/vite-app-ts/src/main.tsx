import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import { Main } from '@1hive/1hive-ui';
import { Modal as ModalAntd, Skeleton } from 'antd';

import FaqView from './pages/faq';
import { DollarOutlined, HomeOutlined, PlusOutlined, QuestionCircleOutlined, RetweetOutlined } from '@ant-design/icons';
import React, { lazy, Suspense, useState } from 'react';

import './styles/app.less';
import useResponsive from './hooks/use-responsive';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

const Add = lazy(() => import('./components/modals/add-form'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const MyStreams = lazy(() => import('./pages/my-streams'));
const StreamsPack = lazy(() => import('./pages/streams-pack'));

export enum RoutesPath {
  DASHBOARD = '/',
  MY_STREAMS = '/my-streams',
  STREAMS_PACK = '/streams-pack',
  FAQ = '/faq',
}

const MainApp = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const { isConnected } = useAccount();
  const { isMobile } = useResponsive();

  return (
    <Main layout={false} scrollView={false}>
      <BrowserRouter>
        <main>
          <header>
            <a href="/">
              <h1 className="mb-0 text-2xl font-bold">Streaming Bee</h1>
            </a>
            <div className="flex gap-4">
              {isConnected && (
                <>
                  {!isMobile ? (
                    <>
                      <div className="relative flex items-center gap-6">
                        <div>
                          <button
                            className="flex items-center px-3 py-2  font-semibold text-white bg-green-600 pointer-events-auto rounded-md text-[0.8125rem] leading-5 hover:bg-green-500 gap-2"
                            onClick={() => setIsAddModalVisible(!isAddModalVisible)}>
                            <PlusOutlined />
                            Create StreamPack
                          </button>
                        </div>
                      </div>
                      <ModalAntd open={isAddModalVisible} footer={null} onCancel={() => setIsAddModalVisible(false)}>
                        <p className="mb-4 text-base font-bold">Creating new StreamPack</p>
                        <Suspense fallback={<Skeleton />}>
                          <Add />
                        </Suspense>
                      </ModalAntd>
                    </>
                  ) : null}
                </>
              )}
              <ConnectButton />
            </div>
          </header>

          <nav className="bg-teal-500">
            <ul className="grid gap-10">
              <li className="text-center">
                <NavLink
                  to={RoutesPath.DASHBOARD}
                  className="text-xl text-white hover:text-black"
                  exact
                  activeClassName="selected">
                  <HomeOutlined />
                </NavLink>
              </li>
              <li className="text-center">
                <NavLink
                  to={RoutesPath.MY_STREAMS}
                  className="text-xl text-white hover:text-black"
                  activeClassName="selected">
                  <RetweetOutlined />
                </NavLink>
              </li>
              <li className="text-center">
                <NavLink
                  to={RoutesPath.STREAMS_PACK}
                  className="text-xl text-white hover:text-black"
                  activeClassName="selected">
                  <DollarOutlined />
                </NavLink>
              </li>
              <li className="text-center">
                <NavLink to={RoutesPath.FAQ} className="text-xl text-white hover:text-black" activeClassName="selected">
                  <QuestionCircleOutlined />
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="content">
            <Switch>
              <Suspense fallback={<Skeleton />}>
                <Route exact path={RoutesPath.DASHBOARD}>
                  <Dashboard />
                </Route>
                <Route exact path={RoutesPath.MY_STREAMS}>
                  <MyStreams />
                </Route>
                <Route exact path={RoutesPath.STREAMS_PACK}>
                  <StreamsPack />
                </Route>
                <Route exact path={RoutesPath.FAQ}>
                  <FaqView />
                </Route>
              </Suspense>
            </Switch>
          </div>
        </main>
      </BrowserRouter>
    </Main>
  );
};

export default MainApp;
