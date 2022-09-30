import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { MultiAPILink } from '@habx/apollo-multi-endpoint-link';
import { getNetworkSubgraphEndpoints } from './models/constants/networks';

const run = async (): Promise<void> => {
  await import('./helpers/__global');
  // dynamic imports for code splitting
  const { lazy, Suspense, StrictMode } = await import('react');
  const ReactDOM = await import('react-dom');

  const endpoints = getNetworkSubgraphEndpoints();
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      new MultiAPILink({
        httpSuffix: '',
        endpoints,
        createHttpLink: () => createHttpLink(),
      }),
    ]),
  });

  const App = lazy(() => import('./App'));

  ReactDOM.render(
    <StrictMode>
      <ApolloProvider client={client}>
        <Suspense fallback={<div />}>
          <App />
        </Suspense>
      </ApolloProvider>
    </StrictMode>,
    document.getElementById('root')
  );
};

void run();

export {};
