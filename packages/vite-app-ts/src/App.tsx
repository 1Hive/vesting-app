import { EthComponentsSettingsContext, IEthComponentsSettings } from 'eth-components/models';
import { EthersAppContext } from 'eth-hooks/context';
import { lazier } from 'eth-hooks/helpers';
import { FC, Suspense } from 'react';

import { ErrorBoundary, ErrorFallback } from '~~/components/common/ErrorFallback';
import { ContractsAppContext } from '~~/config/contractContext';

import '~~/styles/css/tailwind-base.pcss';
import '~~/styles/css/tailwind-components.pcss';
import '~~/styles/css/tailwind-utilities.pcss';
import '~~/styles/css/app.css';

const BLOCKNATIVE_DAPPID = import.meta.env.VITE_KEY_BLOCKNATIVE_DAPPID;

// create eth components context for options and API keys
const ethComponentsSettings: IEthComponentsSettings = {
  apiKeys: {
    BlocknativeDappId: BLOCKNATIVE_DAPPID,
  },
};

const MainPage = lazier(() => import('./main'), 'MainApp');

const App: FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <EthComponentsSettingsContext.Provider value={ethComponentsSettings}>
        <ContractsAppContext>
          <EthersAppContext>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<div />}>
                <MainPage />
              </Suspense>
            </ErrorBoundary>
          </EthersAppContext>
        </ContractsAppContext>
      </EthComponentsSettingsContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
