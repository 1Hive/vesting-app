import { ApolloClient, gql, InMemoryCache, useQuery } from '@apollo/client';
import { useEthersContext } from 'eth-hooks/context';
import { useCallback, useMemo } from 'react';
import { getNetworkByChainID, getNetworkNameByChainID, NETWORKS } from '~~/models/constants/networks';
import { VestingsQuery } from '~~/types-and-hooks';

const USER_VESTINGS_QUERY = gql`
  query UserVestings($recipient: Bytes!) @api(contextKey: "network") {
    vestings(where: { recipient: $recipient }) {
      id
      token {
        id
        name
        symbol
        decimals
        underlying {
          id
          name
          symbol
          decimals
        }
        startTimestamp
        endTimestamp
      }
      createdAt
      recipient
      underlyingAmount
      claimedUnderlyingAmount
      wrappedTokenAmount
    }
  }
`;

export const useUserVestings = (account: string, network: string = 'rinkeby') => {
  return useQuery<VestingsQuery>(USER_VESTINGS_QUERY, {
    context: { network },
    pollInterval: 2500,
    variables: { recipient: account },
  });
};
