import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Main } from '@1hive/1hive-ui';

import { useEthersContext } from 'eth-hooks/context';
import { useDexEthPrice } from 'eth-hooks/dapps';
import { asEthersAdaptor } from 'eth-hooks/functions';

import { MainPageMenu } from './components/main';

import { useBurnerFallback } from '~~/components/main/hooks/useBurnerFallback';
import { useScaffoldProviders as useScaffoldAppProviders } from '~~/components/main/hooks/useScaffoldAppProviders';
import { BURNER_FALLBACK_ENABLED } from '~~/config/appConfig';
import { useConnectAppContracts, useLoadAppContracts } from '~~/config/contractContext';
import { Account } from 'eth-components/ant';

import { Header, MainWrapper, Sidebar, Content } from './main.styled';
import Home from './pages/home';
import History from './pages/history';
import FaqView from './pages/faq';
import Transactions from './pages/transactions';
import { DollarOutlined, HomeOutlined, QuestionCircleOutlined, RetweetOutlined } from '@ant-design/icons';

export const MainApp = () => {
  const scaffoldAppProviders = useScaffoldAppProviders();
  const ethersContext = useEthersContext();

  useBurnerFallback(scaffoldAppProviders, BURNER_FALLBACK_ENABLED);

  useLoadAppContracts();

  useConnectAppContracts(asEthersAdaptor(ethersContext));

  const [ethPrice] = useDexEthPrice(scaffoldAppProviders.mainnetAdaptor?.provider, scaffoldAppProviders.targetNetwork);

  return (
    <Main style={{ width: '100%' }}>
      <MainWrapper>
        <Header>
          <div className="flex items-center">
            <a href="/">
              <h1 className="text-2xl font-bold">Streaming Bee</h1>
              <button className="flex items-center gap-6"></button>
            </a>
          </div>

          <div className="flex">
            <Account
              createLoginConnector={scaffoldAppProviders.createLoginConnector}
              ensProvider={scaffoldAppProviders.mainnetAdaptor?.provider}
              price={ethPrice}
              blockExplorer={scaffoldAppProviders.targetNetwork.blockExplorer}
              hasContextConnect={true}
            />
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
                <DollarOutlined />
              </a>
            </li>
            <li className="py-6 text-center">
              <a href="/history" className="text-xl text-black">
                <RetweetOutlined />
              </a>
            </li>
            <li className="py-6 text-center">
              <a href="/faq" className="text-xl text-black">
                <QuestionCircleOutlined />
              </a>
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
