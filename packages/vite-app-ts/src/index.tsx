import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { SUBGRAPH_URI } from './config/appConfig';

const run = async (): Promise<void> => {
  await import('./helpers/__global');
  // dynamic imports for code splitting
  const { lazy, Suspense, StrictMode } = await import('react');
  const ReactDOM = await import('react-dom');
  // const subgraphUri = 'http://localhost:8000/subgraphs/name/scaffold-eth/your-contract';

  const client = new ApolloClient({
    uri: SUBGRAPH_URI,
    cache: new InMemoryCache(),
  });
  const App = lazy(() => import('./App'));

  ReactDOM.render(
    <StrictMode>
      <Suspense fallback={<div />}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </Suspense>
    </StrictMode>,
    document.getElementById('root')
  );
};

void run();

export {};
