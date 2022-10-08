import { FC, Suspense, lazy } from 'react';

import { ErrorBoundary, ErrorFallback } from '~~/components/common/error-fallback';

import '~~/styles/css/tailwind-base.pcss';
import '~~/styles/css/tailwind-components.pcss';
import '~~/styles/css/tailwind-utilities.pcss';
import '~~/styles/css/app.css';

const MainApp = lazy(() => import('./main'));

// create eth components context for options and API keys
// const ethComponentsSettings: IEthComponentsSettings = {
//   apiKeys: {
//     BlocknativeDappId: BLOCKNATIVE_DAPPID,
//   },
// };

import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { Chain, chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

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
  [chain.goerli],
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

const App: FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider modalSize="compact" chains={chains}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<div />}>
              <MainApp />
            </Suspense>
          </ErrorBoundary>
        </RainbowKitProvider>
      </WagmiConfig>
    </ErrorBoundary>
  );
};

export default App;
