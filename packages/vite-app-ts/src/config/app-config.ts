import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { invariant } from 'ts-invariant';

import { NETWORKS, TNetworkInfoSubgraph, TNetworkNames } from '../models/constants/networks';
const DEBUG = false;
invariant.log('MODE', import.meta.env.MODE, import.meta.env.DEV);
/** ******************************
 * TARGET NETWORK CONFIG: 📡 What chain are your contracts deployed to?
 ****************************** */

/**
 * This constant is your target network that the app is pointed at
 * 🤚🏽  Set your target frontend network <--- select your target frontend network(localhost, rinkeby, xdai, mainnet)
 */

const targetNetwork: TNetworkNames = import.meta.env.VITE_APP_TARGET_NETWORK as TNetworkNames;
invariant.log('VITE_APP_TARGET_NETWORK', import.meta.env.VITE_APP_TARGET_NETWORK);
invariant(NETWORKS[targetNetwork] != null, `Invalid target network: ${targetNetwork}`);

export const TARGET_NETWORK_INFO: TNetworkInfoSubgraph = NETWORKS[targetNetwork];
if (DEBUG) console.log(`📡 Connecting to ${TARGET_NETWORK_INFO.name}`);

/** **************************  ****
 * APP CONFIG:
 ****************************** */
/**
 * localhost faucet enabled
 */
export const FAUCET_ENABLED = import.meta.env.VITE_FAUCET_ALLOWED === 'true' && import.meta.env.DEV;
/**
 * Use burner wallet as fallback
 */
export const BURNER_FALLBACK_ENABLED = import.meta.env.VITE_BURNER_FALLBACK_ALLOWED === 'true' && import.meta.env.DEV;
/**
 * Connect to burner on first load if there are no cached providers
 */
export const CONNECT_TO_BURNER_AUTOMATICALLY =
  import.meta.env.VITE_CONNECT_TO_BURNER_AUTOMATICALLY === 'true' && import.meta.env.DEV;

if (DEBUG)
  invariant.log(
    `import.meta.env.DEV: ${import.meta.env.DEV}`,
    `import.meta.env.VITE_FAUCET_ALLOWED: ${import.meta.env.VITE_FAUCET_ALLOWED}`,
    `import.meta.env.VITE_BURNER_FALLBACK_ALLOWED: ${import.meta.env.VITE_BURNER_FALLBACK_ALLOWED}`,
    `import.meta.env.VITE_CONNECT_TO_BURNER_AUTOMATICALLY: ${import.meta.env.VITE_CONNECT_TO_BURNER_AUTOMATICALLY}`
  );

if (DEBUG)
  invariant.log(
    `FAUCET_ENABLED: ${FAUCET_ENABLED}`,
    `BURNER_FALLBACK_ENABLED: ${BURNER_FALLBACK_ENABLED}`,
    `CONNECT_TO_BURNER_AUTOMATICALLY: ${CONNECT_TO_BURNER_AUTOMATICALLY}`
  );

// export const SUBGRAPH_URI = 'http://localhost:8000/subgraphs/name/scaffold-eth/your-contract';
// export const SUBGRAPH_URI = 'https://api.thegraph.com/subgraphs/name/kamikazebr/onehivevestingrinkeby';

/** ******************************
 * OTHER FILES
 ****************************** */

/**
 * See web3ModalConfig.ts to setup your wallet connectors
 */

/**
 * See contractConnectorConfig.ts for your contract configuration
 */

/**
 * see apiKeysConfig.ts for your api keys
 */

/** ******************************
 * PROVIDERS CONFIG
 ****************************** */

// -------------------
// Connecting to mainnet
// -------------------
// attempt to connect to our own scaffold eth rpc and if that fails fall back to infura...
const mainnetScaffoldEthProvider = new StaticJsonRpcProvider(import.meta.env.VITE_RPC_MAINNET);
const mainnetInfura = new StaticJsonRpcProvider(
  `${import.meta.env.VITE_RPC_MAINNET_INFURA}/${import.meta.env.VITE_KEY_INFURA}`
);
// const mainnetProvider = new InfuraProvider("mainnet",import.meta.env.VITE_KEY_INFURA);

// 🚊 your mainnet provider
export const MAINNET_PROVIDER = mainnetScaffoldEthProvider;

// -------------------
// connecting to local provider
// -------------------

if (DEBUG) console.log('🏠 Connecting to provider:', NETWORKS.localhost.rpcUrl);
// export const LOCAL_PROVIDER: TEthersProvider | undefined =
//   TARGET_NETWORK_INFO === NETWORKS.localhost && import.meta.env.DEV
//     ? new StaticJsonRpcProvider(NETWORKS.localhost.rpcUrl)
//     : undefined;
