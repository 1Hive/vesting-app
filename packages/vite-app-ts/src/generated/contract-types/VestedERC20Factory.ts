/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface VestedERC20FactoryInterface extends utils.Interface {
  contractName: "VestedERC20Factory";
  functions: {
    "createVestedERC20(bytes32,bytes32,uint8,address,uint64,uint64)": FunctionFragment;
    "implementation()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "createVestedERC20",
    values: [
      BytesLike,
      BytesLike,
      BigNumberish,
      string,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "implementation",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "createVestedERC20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "implementation",
    data: BytesLike
  ): Result;

  events: {
    "DeployVestedERC20(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "DeployVestedERC20"): EventFragment;
}

export type DeployVestedERC20Event = TypedEvent<
  [string],
  { vestedERC0: string }
>;

export type DeployVestedERC20EventFilter =
  TypedEventFilter<DeployVestedERC20Event>;

export interface VestedERC20Factory extends BaseContract {
  contractName: "VestedERC20Factory";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: VestedERC20FactoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    createVestedERC20(
      name: BytesLike,
      symbol: BytesLike,
      decimals: BigNumberish,
      underlying: string,
      startTimestamp: BigNumberish,
      endTimestamp: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    implementation(overrides?: CallOverrides): Promise<[string]>;
  };

  createVestedERC20(
    name: BytesLike,
    symbol: BytesLike,
    decimals: BigNumberish,
    underlying: string,
    startTimestamp: BigNumberish,
    endTimestamp: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  implementation(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    createVestedERC20(
      name: BytesLike,
      symbol: BytesLike,
      decimals: BigNumberish,
      underlying: string,
      startTimestamp: BigNumberish,
      endTimestamp: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    implementation(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "DeployVestedERC20(address)"(
      vestedERC0?: null
    ): DeployVestedERC20EventFilter;
    DeployVestedERC20(vestedERC0?: null): DeployVestedERC20EventFilter;
  };

  estimateGas: {
    createVestedERC20(
      name: BytesLike,
      symbol: BytesLike,
      decimals: BigNumberish,
      underlying: string,
      startTimestamp: BigNumberish,
      endTimestamp: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    implementation(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    createVestedERC20(
      name: BytesLike,
      symbol: BytesLike,
      decimals: BigNumberish,
      underlying: string,
      startTimestamp: BigNumberish,
      endTimestamp: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    implementation(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
