import { gql, useQuery } from '@apollo/client';
import { VestingsQuery } from '~~/types-and-hooks';
const USER_VESTINGS_QUERY = gql`
  query UserVestings($recipient: Bytes!) {
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
    }
  }
`;

export const useUserVestings = (account: string) => {
  return useQuery<VestingsQuery>(USER_VESTINGS_QUERY, { pollInterval: 2500, variables: { recipient: account } });
};
