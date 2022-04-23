// ETHERSCAN - Mainnet, Rinkeby, etc
var ETHERSCAN_NETWORK_TYPES = new Map([['main', ''], ['kovan', 'kovan.'], ['rinkeby', 'rinkeby.'], ['ropsten', 'ropsten.'], ['goerli', 'goerli.']]);
var ETHERSCAN_TYPES = new Map([['block', 'block'], ['transaction', 'tx'], ['address', 'address'], ['token', 'token']]); // BLOCKSCOUT - xDai

var BLOCKSCOUT_NETWORK_TYPES = new Map([['xdai', 'xdai'], ['sokol', 'sokol']]);
var BLOCKSCOUT_TYPES = new Map([['block', 'block'], ['transaction', 'tx'], ['address', 'address'], ['token', 'token']]); // POLYGONSCAN - Polygon

var POLYGONSCAN_NETWORK_TYPES = new Map([['polygon', ''], ['mumbai', 'mumbai.']]);
var POLYGONSCAN_TYPES = new Map([['block', 'block'], ['transaction', 'tx'], ['address', 'address'], ['token', 'token']]); // ARBISCAN - Arbitrum

var ARBISCAN_NETWORK_TYPES = new Map([['arbitrum', ''], ['arbtest', 'testnet.']]);
var ARBISCAN_TYPES = new Map([['block', 'block'], ['transaction', 'tx'], ['address', 'address'], ['token', 'token']]);

export { ARBISCAN_NETWORK_TYPES, ARBISCAN_TYPES, BLOCKSCOUT_NETWORK_TYPES, BLOCKSCOUT_TYPES, ETHERSCAN_NETWORK_TYPES, ETHERSCAN_TYPES, POLYGONSCAN_NETWORK_TYPES, POLYGONSCAN_TYPES };
//# sourceMappingURL=provider-types.js.map
