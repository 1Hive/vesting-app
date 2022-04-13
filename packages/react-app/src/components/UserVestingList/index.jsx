import { gql, useQuery } from "@apollo/client";
import { Button, DataView, IdentityBadge } from "@1hive/1hive-ui";
import { dateFormat } from "../../helpers/date-utils";
import { formatUnits } from "ethers/lib/utils";
import { Wrapper } from "./index.styled";
import { memo } from "react";

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
      wrappedTokenAmount
    }
  }
`;

const UserVestingList = ({ address, onRedeemVesting }) => {
  const { loading, data, error } = useQuery(USER_VESTINGS_QUERY, {
    pollInterval: 2500,
    variables: { recipient: address },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  console.log(`UserVestingList`, data, error);

  return (
    <Wrapper>
      {address === undefined ? (
        <p>No address provided</p>
      ) : (
        <>
          {address !== undefined && data?.vestings.length > 0 ? (
            <DataView
              display="list"
              fields={["Token Vested", "Start Date", "End Date", "Claimed", ""]}
              entries={data?.vestings}
              renderEntry={({ token, claimedUnderlyingAmount }) => {
                return [
                  <IdentityBadge entity={token.symbol} />,
                  dateFormat(token.startTimestamp),
                  dateFormat(token.endTimestamp),
                  formatUnits(claimedUnderlyingAmount),
                  <Button label="Redeem" onClick={onRedeemVesting} />,
                ];
              }}
            />
          ) : (
            <p>No vestings available</p>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default memo(UserVestingList);
