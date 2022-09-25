import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import { Main } from '@1hive/1hive-ui';

import FaqView from './pages/faq';
import { DollarOutlined, HomeOutlined, QuestionCircleOutlined, RetweetOutlined } from '@ant-design/icons';
import React from 'react';

import './styles/app.less';
import StreamsPack from './pages/streams-pack';
import MyStreams from './pages/my-streams';
import Dashboard from './pages/dashboard';
import useResponsive from './hooks/use-responsive';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useProvider } from 'wagmi';

export enum RoutesPath {
  DASHBOARD = '/',
  MY_STREAMS = '/my-streams',
  STREAMS_PACK = '/streams-pack',
  FAQ = '/faq',
}

const MainApp = () => {
  // const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  // const [isWalletModal, setIsWalletModal] = useState(false);
  // const scaffoldAppProviders = useScaffoldAppProviders();
  // const ethersContext = useEthersContext();

  const provider = useProvider();
  const { isMobile } = useResponsive();

  // useBurnerFallback(scaffoldAppProviders, BURNER_FALLBACK_ENABLED);

  // useEffect(() => {
  //   console.log('before prov', ethersContext.provider);
  //   ethersContext.provider = provider as unknown as StaticJsonRpcProvider;
  //   console.log('after prov', ethersContext.provider);
  // }, [ethersContext, provider]);

  // useLoadAppContracts();

  // useConnectAppContracts(asEthersAdaptor(ethersContext));

  // const connect = React.useCallback(() => {
  //   if (scaffoldAppProviders.createLoginConnector != null && ethersContext?.openModal != null) {
  //     const connector = scaffoldAppProviders.createLoginConnector() as EthersModalConnector;
  //     ethersContext.openModal(connector);
  //   }
  // }, [ethersContext, scaffoldAppProviders]);

  // const disconnect = React.useCallback(() => {
  //   if (ethersContext?.disconnectModal != null) {
  //     ethersContext.disconnectModal();
  //   }
  // }, [ethersContext]);

  // useEffect(() => {
  //   connect();
  // }, []);

  return (
    <Main layout={false} scrollView={false}>
      <BrowserRouter>
        <main>
          <header>
            <a href="/">
              <h1 className="mb-0 text-2xl font-bold">Streaming Bee</h1>
            </a>
            <div className="flex gap-4">
              {/* {ethersContext.account ? (
                // <>
                //   {!isMobile ? (
                //     <>
                //       <div className="relative flex items-center gap-6">
                //         <div>
                //           <button
                //             className="flex items-center px-3 py-2  font-semibold text-white bg-green-600 pointer-events-auto rounded-md text-[0.8125rem] leading-5 hover:bg-green-500 gap-2"
                //             onClick={() => setIsAddModalVisible(!isAddModalVisible)}>
                //             <PlusOutlined />
                //             Create StreamPack
                //           </button>
                //         </div>
                //       </div>
                //       <Modal visible={isAddModalVisible} footer={null} onCancel={() => setIsAddModalVisible(false)}>
                //         <p className="mb-4 text-base font-bold">Creating new StreamPack</p>
                //         <Add />
                //       </Modal>
                //     </>
                //   ) : null}

                //   <div className="flex flex-wrap gap-4">
                //     {!isMobile ? (
                //       <div className="flex items-center justify-center">
                //         <p className="px-2 py-1 text-xs font-bold text-white uppercase bg-amber-600 rounded-md">
                //           {getNetworkNameByChainID(ethersContext.chainId)}
                //         </p>
                //       </div>
                //     ) : null}

                //     <div className="flex flex-col">
                //       <Popover
                //         content={
                //           <button
                //             onClick={disconnect}
                //             className="px-3 py-2 font-semibold text-white bg-black pointer-events-auto rounded-md text-[0.8125rem] leading-5 hover:bg-gray-500">
                //             Disconnect wallet
                //           </button>
                //         }
                //         trigger="click"
                //         visible={isWalletModal}
                //         onVisibleChange={() => setIsWalletModal(!isWalletModal)}>
                //         <div className="flex items-center justify-center text-right cursor-pointer gap-4 hover:text-gray-600">
                //           <div>
                //             <p className="font-bold text-black">Personal Wallet </p>
                //             <p className="text-sm">{truncateAddress(ethersContext.account)}</p>
                //           </div>
                //           {!isWalletModal ? <DownArrowIcon /> : <UpArrowIcon />}
                //         </div>
                //       </Popover>
                //     </div>
                //   </div>
                // </>
              // ) : (
                // <button
                //   className="flex items-center justify-center px-3 py-2 font-semibold text-white bg-indigo-600 pointer-events-auto gap-2 rounded-md text-[0.8125rem] leading-5 hover:bg-indigo-500"
                //   onClick={connect}>
                //   <ApiOutlined />
                //   Connect Wallet
                // </button>
               
                 )} */}
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
            </Switch>
          </div>
        </main>
      </BrowserRouter>
    </Main>
  );
};

export default MainApp;
