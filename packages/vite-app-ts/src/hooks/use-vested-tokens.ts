import { gql, useQuery } from '@apollo/client';
import { VestedErc20 } from '~~/types-and-hooks';

type VestedTokensType = {
  vestedERC20S: Array<VestedErc20>;
};

const VESTED_TOKENS_GQL = gql`
  query VestedTokens @api(contextKey: "network") {
    vestedERC20S {
      id
      name
      symbol
      decimals
      startTimestamp
      endTimestamp
      underlying {
        id
        name
        symbol
        decimals
      }
    }
  }
`;

export const useVestedTokens = (network: string = 'rinkeby') => {
  return useQuery<VestedTokensType>(VESTED_TOKENS_GQL, {
    context: { network },
    pollInterval: 2500,
  });
};
