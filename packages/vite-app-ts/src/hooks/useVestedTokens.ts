import { gql, useQuery } from '@apollo/client';

const VESTED_TOKENS_GRAPHQL = `
  {
     vestedERC20S{
      id
      name
      symbol
      decimals
      startTimestamp
      endTimestamp
      underlying{
        id
        name
        symbol
        decimals
      }
    }
  }
  `;

const VESTED_TOKENS_GQL = gql(VESTED_TOKENS_GRAPHQL);

export const useVestedTokens = () => {
  return useQuery(VESTED_TOKENS_GQL, { pollInterval: 2500 });
};
