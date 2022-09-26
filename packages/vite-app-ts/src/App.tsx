import { EthComponentsSettingsContext, IEthComponentsSettings } from 'eth-components/models';
import { EthersAppContext } from 'eth-hooks/context';
import { FC, Suspense, lazy } from 'react';

import { ErrorBoundary, ErrorFallback } from '~~/components/common/error-fallback';
import { ContractsAppContext } from '~~/config/contract-context';

import '~~/styles/css/tailwind-base.pcss';
import '~~/styles/css/tailwind-components.pcss';
import '~~/styles/css/tailwind-utilities.pcss';
import '~~/styles/css/app.css';

const BLOCKNATIVE_DAPPID = import.meta.env.VITE_KEY_BLOCKNATIVE_DAPPID;

const MainApp = lazy(() => import('./main'));

// create eth components context for options and API keys
const ethComponentsSettings: IEthComponentsSettings = {
  apiKeys: {
    BlocknativeDappId: BLOCKNATIVE_DAPPID,
  },
};

import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { Chain, chain, configureChains, createClient, useProvider, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ExternalProvider, JsonRpcFetchFunc, StaticJsonRpcProvider } from '@ethersproject/providers';
import { TEthersProvider } from 'eth-hooks/models';

const gnosisChain: Chain = {
  id: 100,
  name: 'Gnosis Chain',
  network: 'gnosis',
  nativeCurrency: {
    decimals: 18,
    name: 'XDAI',
    symbol: 'XDAI',
  },
  rpcUrls: {
    default: 'https://rpc.gnosischain.com',
  },
  blockExplorers: {
    default: { name: 'Blockscout', url: 'https://blockscout.com/' },
  },
  testnet: false,
};

const { chains, provider } = configureChains(
  [gnosisChain, chain.goerli],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'StreamingBee App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
// eslint-disable-next-line import/no-extraneous-dependencies
// import { AbstractConnector } from '@web3-react/abstract-connector';

const App: FC = () => {
  // const providerWagmi = useProvider();
  // const customProvider = (
  //   _provider: TEthersProvider | ExternalProvider | JsonRpcFetchFunc | any,
  //   _connector?: AbstractConnector
  // ) => {
  //   console.log('providerWagmi', providerWagmi);
  //   return providerWagmi as unknown as StaticJsonRpcProvider;
  // };
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider modalSize="compact" chains={chains}>
          <EthComponentsSettingsContext.Provider value={ethComponentsSettings}>
            <ContractsAppContext>
              <EthersAppContext>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <Suspense fallback={<div />}>
                    <MainApp />
                  </Suspense>
                </ErrorBoundary>
              </EthersAppContext>
            </ContractsAppContext>
          </EthComponentsSettingsContext.Provider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ErrorBoundary>
  );
};

export default App;
