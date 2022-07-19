// import { TypedMap, Entity, Value, ValueKind, store, Bytes, BigInt, BigDecimal } from '@graphprotocol/graph-ts';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Bytes: any;
  BigInt: any;
};

export type Query = {
  __typename?: 'Query';
  vestings: Array<Vesting>;
};

export type VestedErc20Factory = {
  __typename?: 'VestedERC20Factory';
  /** ID is set to 1 */
  id: Scalars['ID'];
  count: Scalars['Int'];
  vestedERC20: Array<VestedErc20>;
};

export type VestedErc20 = {
  __typename?: 'VestedERC20';
  id: Scalars['ID'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  decimals: Scalars['Int'];
  underlying: Erc20;
  startTimestamp: Scalars['BigInt'];
  endTimestamp: Scalars['BigInt'];
  vestings: Array<Vesting>;
};

export type Vesting = {
  __typename?: 'Vesting';
  /** Concatenation of token ID, and recipient */
  id: Scalars['ID'];
  /** Creation timestamp */
  createdAt: Scalars['Int'];
  token: VestedErc20;
  recipient: Scalars['Bytes'];
  underlyingAmount: Scalars['BigInt'];
  claimedUnderlyingAmount: Scalars['BigInt'];
  wrappedTokenAmount: Scalars['BigInt'];
};

export type Erc20 = {
  __typename?: 'ERC20';
  id: Scalars['ID'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  decimals: Scalars['Int'];
};

export type VestingsQueryVariables = Exact<{ [key: string]: never }>;

export type VestingsQuery = {
  __typename?: 'Query';
  vestings: Array<{
    __typename?: 'Vesting';
    claimedUnderlyingAmount: any;
    createdAt: number;
    id: string;
    recipient: any;
    underlyingAmount: any;
    wrappedTokenAmount: any;
    token: VestedErc20;
  }>;
};
