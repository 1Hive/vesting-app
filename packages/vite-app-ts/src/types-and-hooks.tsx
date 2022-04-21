// import { TypedMap, Entity, Value, ValueKind, store, Bytes, BigInt, BigDecimal } from '@graphprotocol/graph-ts';
import { useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
}
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
    token: {
      __typename?: 'VestedERC20';
      decimals: number;
      name: string;
      id: string;
      endTimestamp: any;
      startTimestamp: any;
      symbol: string;
    };
  }>;
};

export const VestingsDocument = `
    query vestings {
  vestings {
    claimedUnderlyingAmount
    createdAt
    id
    recipient
    underlyingAmount
    wrappedTokenAmount
    token {
      decimals
      name
      id
      endTimestamp
      startTimestamp
      symbol
    }
  }
}`;

export const useVestingsQuery = <TData, TError>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables?: VestingsQueryVariables,
  options?: UseQueryOptions<VestingsQuery, TError, TData>
) => {
  return useQuery<VestingsQuery, TError, TData>(
    variables === undefined ? ['vestings'] : ['vestings', variables],
    fetcher<VestingsQuery, VestingsQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      VestingsDocument,
      variables
    ),
    options
  );
};
