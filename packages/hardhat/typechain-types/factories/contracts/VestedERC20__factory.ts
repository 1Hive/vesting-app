/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  VestedERC20,
  VestedERC20Interface,
} from "../../contracts/VestedERC20";

const _abi = [
  {
    inputs: [],
    name: "Error_Wrap_AmountTooLarge",
    type: "error",
  },
  {
    inputs: [],
    name: "Error_Wrap_VestOver",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "redeemedAmount",
        type: "uint256",
      },
    ],
    name: "Redeem",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "wrappedAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "underlyingAmount",
        type: "uint256",
      },
    ],
    name: "Wrap",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "claimedUnderlyingAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "_decimals",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "endTimestamp",
    outputs: [
      {
        internalType: "uint64",
        name: "_endTimestamp",
        type: "uint64",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "holder",
        type: "address",
      },
    ],
    name: "getRedeemableAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "redeem",
    outputs: [
      {
        internalType: "uint256",
        name: "redeemedAmount",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startTimestamp",
    outputs: [
      {
        internalType: "uint64",
        name: "_startTimestamp",
        type: "uint64",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "underlying",
    outputs: [
      {
        internalType: "address",
        name: "_underlying",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "underlyingAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "wrap",
    outputs: [
      {
        internalType: "uint256",
        name: "wrappedTokenAmount",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610de8806100206000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c80636f307dc311610097578063a85adeab11610066578063a85adeab1461022b578063a9059cbb1461024c578063dd62ed3e1461025f578063e6fd48bc1461028a57600080fd5b80636f307dc3146101d057806370a08231146101f057806395a2251f1461021057806395d89b411461022357600080fd5b806318160ddd116100d357806318160ddd1461018757806323b872dd14610190578063313ce567146101a3578063619cfc35146101bd57600080fd5b806306fdde0314610105578063095ea7b3146101235780630daf3df01461014657806313bac82014610174575b600080fd5b61010d610292565b60405161011a9190610be4565b60405180910390f35b610136610131366004610c55565b6102c6565b604051901515815260200161011a565b610166610154366004610c7f565b60036020526000908152604090205481565b60405190815260200161011a565b610166610182366004610c9a565b610333565b61016660005481565b61013661019e366004610cc6565b6104a9565b6101ab610605565b60405160ff909116815260200161011a565b6101666101cb366004610c7f565b61061d565b6101d8610641565b6040516001600160a01b03909116815260200161011a565b6101666101fe366004610c7f565b60016020526000908152604090205481565b61016661021e366004610c7f565b610659565b61010d6106ff565b610233610724565b60405167ffffffffffffffff909116815260200161011a565b61013661025a366004610c55565b61073c565b61016661026d366004610d02565b600260209081526000928352604080842090915290825290205481565b61023361081b565b6060600061029e610833565b60408051823560208201819052929350015b6040516020818303038152906040529250505090565b3360008181526002602090815260408083206001600160a01b038716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925906103219086815260200190565b60405180910390a35060015b92915050565b600061033e42610844565b600061034861081b565b67ffffffffffffffff169050600061035e610724565b67ffffffffffffffff16905080421061038a57604051634bb83d4360e01b815260040160405180910390fd5b6103948282610d42565b6103a090600019610d59565b85106103bf576040516303642f3d60e51b815260040160405180910390fd5b81421061042d576103d04282610d42565b6103da8383610d42565b6103e49087610d7b565b6103ee9190610d59565b92506103fa8584610d42565b6001600160a01b03851660009081526003602052604081208054909190610422908490610d9a565b909155506104319050565b8492505b61043b848461088c565b6000610445610641565b905061045c6001600160a01b0382163330896108f6565b60408051858152602081018890526001600160a01b038716917f18a5ed48bb0a697c64a5aef8f28cec1f29ab01da27a45c5f835099781ef1ea46910160405180910390a250505092915050565b6001600160a01b03831660009081526002602090815260408083203384529091528120546000198114610505576104e08382610d42565b6001600160a01b03861660009081526002602090815260408083203384529091529020555b6001600160a01b0385166000908152600160209081526040808320546003909252909120546105348583610d42565b6001600160a01b0380891660009081526001602052604080822093909355908816815290812080548701905561056b82878561098f565b905080156105a85761057d8183610d42565b6001600160a01b03808a16600090815260036020526040808220939093559089168152208054820190555b866001600160a01b0316886001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef886040516105ed91815260200190565b60405180910390a360019450505050505b9392505050565b600080610610610833565b6040013560f81c92915050565b6001600160a01b03811660009081526003602052604081205461032d908390610a3e565b60008061064c610833565b6041013560601c92915050565b3360008181526003602052604081205490916106759082610a3e565b91506106818282610d9a565b3360009081526003602052604090205581156106f95760006106a1610641565b90506106b76001600160a01b0382168585610afd565b6040518381526001600160a01b0385169033907fd12200efa34901b99367694174c3b0d32c99585fdf37c7c26892136ddd0836d99060200160405180910390a3505b50919050565b6060600061070b610833565b60408051602080840135908201819052929350016102b0565b60008061072f610833565b605d013560c01c92915050565b3360009081526001602090815260408083205460039092528220546107618483610d42565b33600090815260016020526040808220929092556001600160a01b038716815290812080548601905561079582868561098f565b905080156107cf576107a78183610d42565b33600090815260036020526040808220929092556001600160a01b0388168152208054820190555b6040518581526001600160a01b0387169033907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a350600195945050505050565b600080610826610833565b6055013560c01c92915050565b600119368181013560f01c90030190565b6108898160405160240161085a91815260200190565b60408051601f198184030181529190526020810180516001600160e01b031663f5b1bba960e01b179052610b7c565b50565b8060008082825461089d9190610d9a565b90915550506001600160a01b0382166000818152600160209081526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b60006040516323b872dd60e01b81526001600160a01b03851660048201526001600160a01b038416602482015282604482015260008060648360008a5af191505061094081610b9d565b6109885760405162461bcd60e51b81526020600482015260146024820152731514905394d1915497d19493d357d1905253115160621b60448201526064015b60405180910390fd5b5050505050565b6000808060001985870985870292508281108382030391505080600014156109c957600084116109be57600080fd5b5082900490506105fe565b8084116109d557600080fd5b60008486880960026001871981018816978890046003810283188082028403028082028403028082028403028082028403028082028403029081029092039091026000889003889004909101858311909403939093029303949094049190911702949350505050565b600080610a4961081b565b67ffffffffffffffff1690506000610a5f610724565b67ffffffffffffffff169050814211610a7d5760009250505061032d565b804210610ab1576001600160a01b038516600090815260016020526040902054610aa8908590610d42565b9250505061032d565b83610abc8383610d42565b610ac68442610d42565b6001600160a01b038816600090815260016020526040902054610ae99190610d7b565b610af39190610d59565b610aa89190610d42565b600060405163a9059cbb60e01b81526001600160a01b03841660048201528260248201526000806044836000895af1915050610b3881610b9d565b610b765760405162461bcd60e51b815260206004820152600f60248201526e1514905394d1915497d19052531151608a1b604482015260640161097f565b50505050565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b60003d82610baf57806000803e806000fd5b8060208114610bc7578015610bd85760009250610bdd565b816000803e60005115159250610bdd565b600192505b5050919050565b600060208083528351808285015260005b81811015610c1157858101830151858201604001528201610bf5565b81811115610c23576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b0381168114610c5057600080fd5b919050565b60008060408385031215610c6857600080fd5b610c7183610c39565b946020939093013593505050565b600060208284031215610c9157600080fd5b6105fe82610c39565b60008060408385031215610cad57600080fd5b82359150610cbd60208401610c39565b90509250929050565b600080600060608486031215610cdb57600080fd5b610ce484610c39565b9250610cf260208501610c39565b9150604084013590509250925092565b60008060408385031215610d1557600080fd5b610d1e83610c39565b9150610cbd60208401610c39565b634e487b7160e01b600052601160045260246000fd5b600082821015610d5457610d54610d2c565b500390565b600082610d7657634e487b7160e01b600052601260045260246000fd5b500490565b6000816000190483118215151615610d9557610d95610d2c565b500290565b60008219821115610dad57610dad610d2c565b50019056fea26469706673582212204b6bbf07c311581a36d2d4096cc2cc4847cb6b8754140b7c6f8baa67c3255b7164736f6c634300080b0033";

type VestedERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VestedERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class VestedERC20__factory extends ContractFactory {
  constructor(...args: VestedERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<VestedERC20> {
    return super.deploy(overrides || {}) as Promise<VestedERC20>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): VestedERC20 {
    return super.attach(address) as VestedERC20;
  }
  override connect(signer: Signer): VestedERC20__factory {
    return super.connect(signer) as VestedERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VestedERC20Interface {
    return new utils.Interface(_abi) as VestedERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): VestedERC20 {
    return new Contract(address, _abi, signerOrProvider) as VestedERC20;
  }
}