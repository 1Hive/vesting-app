import { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { useEthersContext } from 'eth-hooks/context';
import { useDexEthPrice } from 'eth-hooks/dapps';
import { asEthersAdaptor } from 'eth-hooks/functions';

import { MainPageMenu } from './components/main';

import { useBurnerFallback } from '~~/components/main/hooks/useBurnerFallback';
import { useScaffoldProviders as useScaffoldAppProviders } from '~~/components/main/hooks/useScaffoldAppProviders';
import { BURNER_FALLBACK_ENABLED } from '~~/config/appConfig';
import { useConnectAppContracts, useLoadAppContracts } from '~~/config/contractContext';
import { Account } from 'eth-components/ant';

import Home from './pages/home';
import History from './pages/history';
import { Header, MainWrapper, Sidebar, Content } from './main.styled';

export const Main: FC = () => {
  const scaffoldAppProviders = useScaffoldAppProviders();
  const ethersContext = useEthersContext();

  useBurnerFallback(scaffoldAppProviders, BURNER_FALLBACK_ENABLED);

  useLoadAppContracts();

  useConnectAppContracts(asEthersAdaptor(ethersContext));

  const [ethPrice] = useDexEthPrice(scaffoldAppProviders.mainnetAdaptor?.provider, scaffoldAppProviders.targetNetwork);

  return (
    <MainWrapper>
      <Header>
        <h1>Streaming Bee</h1>

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
        <p>Sidebar</p>
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
          </Switch>
        </BrowserRouter>
      </Content>
    </MainWrapper>
  );
};
