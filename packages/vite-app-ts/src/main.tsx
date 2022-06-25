import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Main } from '@1hive/1hive-ui';

import { useEthersContext } from 'eth-hooks/context';
import { asEthersAdaptor } from 'eth-hooks/functions';

import { MainPageMenu } from './components/main';

import { useBurnerFallback } from '~~/components/main/hooks/useBurnerFallback';
import { useScaffoldProviders as useScaffoldAppProviders } from '~~/components/main/hooks/useScaffoldAppProviders';
import { BURNER_FALLBACK_ENABLED } from '~~/config/appConfig';
import { useConnectAppContracts, useLoadAppContracts } from '~~/config/contractContext';

import { Header, MainWrapper, Sidebar, Content } from './main.styled';
import Home from './pages/home';
import History from './pages/history';
import FaqView from './pages/faq';
import Transactions from './pages/transactions';
import { DollarOutlined, HomeOutlined, PlusOutlined, QuestionCircleOutlined, RetweetOutlined } from '@ant-design/icons';
import { truncateAddress } from './helpers';
import { Popover } from './components/popover';
import { Add } from './components/modals';
import { useState } from 'react';
import { ThemeSwitcher } from './components/theme-switcher';

export const MainApp = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const scaffoldAppProviders = useScaffoldAppProviders();
  const ethersContext = useEthersContext();

  useBurnerFallback(scaffoldAppProviders, BURNER_FALLBACK_ENABLED);

  useLoadAppContracts();

  useConnectAppContracts(asEthersAdaptor(ethersContext));

  return (
    <Main layout={false} scrollView={false}>
      <MainWrapper>
        <Header>
          <div className="flex items-center gap-8">
            <a href="/">
              <h1 className="mb-0 text-2xl font-bold">Streaming Bee</h1>
            </a>
            <div className="flex items-center gap-6">
              <div>
                <button
                  className="flex items-center px-3 py-2  font-semibold text-white bg-green-600 pointer-events-auto rounded-md text-[0.8125rem] leading-5 hover:bg-green-500 gap-2"
                  onClick={() => setIsAddModalVisible(!isAddModalVisible)}>
                  <PlusOutlined />
                  Add
                </button>

                <Popover title="Add Vesting" isOpen={isAddModalVisible}>
                  <Add />
                </Popover>
              </div>
            </div>
          </div>

          <div className="flex">
            {ethersContext.account ? (
              <div className="flex flex-col">
                <p className="font-bold text-black">Personal Wallet</p>
                <p className="text-xs">{truncateAddress(ethersContext.account)}</p>
              </div>
            ) : (
              <button
                className="px-3 py-2 ml-8 font-semibold text-white bg-indigo-600 pointer-events-auto rounded-md text-[0.8125rem] leading-5 hover:bg-indigo-500"
                onClick={() => scaffoldAppProviders.createLoginConnector()}>
                Connect Wallet
              </button>
            )}
          </div>
        </Header>

        <Sidebar>
          <ul>
            <li className="py-6 text-center">
              <a href="/" className="text-xl text-black">
                <HomeOutlined />
              </a>
            </li>
            <li className="py-6 text-center">
              <a href="/transactions" className="text-xl text-black">
                <RetweetOutlined />
              </a>
            </li>
            <li className="py-6 text-center">
              <a href="/history" className="text-xl text-black">
                <DollarOutlined />
              </a>
            </li>
            <li className="py-6 text-center">
              <a href="/faq" className="text-xl text-black">
                <QuestionCircleOutlined />
              </a>
            </li>
            <li>
              <ThemeSwitcher />
            </li>
          </ul>
        </Sidebar>

        <Content>
          <BrowserRouter>
            <MainPageMenu />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/history">
                <History />
              </Route>
              <Route exact path="/transactions">
                <Transactions />
              </Route>
              <Route exact path="/faq">
                <FaqView />
              </Route>
            </Switch>
          </BrowserRouter>
        </Content>
      </MainWrapper>
    </Main>
  );
};
