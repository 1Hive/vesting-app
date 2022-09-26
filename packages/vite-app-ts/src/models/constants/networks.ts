import { TNetworkInfo } from 'eth-hooks/models';
// import { DEBUG } from '~~/config/app-config';

const INFURA_ID = import.meta.env.VITE_KEY_INFURA;

export type TNetworkNames = 'localhost' | 'rinkeby' | 'goerli' | 'gnosis';
export type TNetworkInfoSubgraph = TNetworkInfo & {
  subgraph?: string;
};

let hostname = '';
if (typeof window !== 'undefined') {
  hostname = window?.location?.hostname;
}

export const NETWORKS: Record<TNetworkNames, TNetworkInfoSubgraph> = {
  localhost: {
    name: 'localhost',
    color: '#666666',
    chainId: 31337,
    blockExplorer: '',
    rpcUrl: 'http://' + hostname + ':8545',
    subgraph: 'http://localhost:8000/subgraphs/name/scaffold-eth/your-contract',
  },
  rinkeby: {
    name: 'rinkeby',
    color: '#e0d068',
    chainId: 4,
    rpcUrl: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
    faucet: 'https://faucet.rinkeby.io/',
    blockExplorer: 'https://rinkeby.etherscan.io/',
    subgraph: 'https://api.thegraph.com/subgraphs/name/kamikazebr/onehivevestingrinkeby',
  },
  goerli: {
    name: 'goerli',
    color: '#0975F6',
    chainId: 5,
    faucet: 'https://goerli-faucet.slock.it/',
    blockExplorer: 'https://goerli.etherscan.io/',
    rpcUrl: `https://goerli.infura.io/v3/${INFURA_ID}`,
    subgraph: 'https://api.studio.thegraph.com/query/29898/streamingbee-goerli/0.0.8',
  },
  gnosis: {
    name: 'gnosis',
    color: '#48a9a6',
    chainId: 100,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: 'https://rpc.gnosischain.com',
    faucet: 'https://xdai-faucet.top/',
    blockExplorer: 'https://blockscout.com/poa/xdai/',
  },
};

export const getNetworkByChainID = (chainId: number | undefined): TNetworkInfoSubgraph | undefined => {
  if (!chainId) {
    // if (DEBUG) {
    console.log(`getNetworkByChainID:chainId undefined`);
    // }
    return undefined;
  }
  const key = (Object.keys(NETWORKS) as Array<TNetworkNames>).find((key) => NETWORKS[key].chainId === chainId);
  console.log(`getNetworkByChainID:chainId `, key);
  if (!key) {
    return undefined;
  }
  return NETWORKS[key];
};

export const getNetworkNameByChainID = (chainId: number | undefined): string | undefined => {
  const network = getNetworkByChainID(chainId);
  if (!network) {
    return undefined;
  }
  return network.name;
};
export const getNetworkSubgraphEndpoints = (): Record<TNetworkNames, string> => {
  const entries = Object.entries(NETWORKS);

  const endpoints = entries.reduce<Record<string, string>>((prev, curr) => {
    const [key, value] = curr;
    const prevB = prev ?? {};

    // return { key: value.subgraph });
    if (value.subgraph) {
      prevB[key] = value.subgraph;
    }

    return prevB;
  }, {});

  return endpoints as Record<TNetworkNames, string>;
};
